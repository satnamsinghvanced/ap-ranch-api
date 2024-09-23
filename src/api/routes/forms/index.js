import express from "express";
import pool from "../../../db/index.js";
import auth from "../../../middleware/auth.js";
import deleteFile from "../../helpers/deleteMedia.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { description, tabs, buttonStatus } = req.body;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [formResult] = await connection.query(
      `INSERT INTO forms (description) VALUES (?)`,
      [description]
    );
    const formId = formResult.insertId;
    for (const tab of tabs) {
      await connection.query(
        `INSERT INTO formsButtons (buttonTxt, link, formId) VALUES (?, ?, ?)`,
        [tab.buttonTxt, tab.link, formId]
      );
    }

    for (const button of buttonStatus) {
      await connection.query(
        `INSERT INTO formsButtonStatus (buttonTxt, hidden, formId) VALUES (?, ?, ?)`,
        [button.buttonTxt, button.hidden, formId]
      );
    }
    await connection.commit();
    connection.release();
    res.status(201).json({ message: "Form is submitted." });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [form] = await connection.query("SELECT * FROM forms");
    const [formButton] = await connection.query("SELECT * FROM formsButtons");
    const [buttonStatus] = await connection.query(
      "SELECT * FROM formsButtonStatus"
    );
    connection.release();
    const response = form.map((val) => {
      return {
        ...val,
        formButton: formButton.filter((x) => x.formId === val.id),
        buttonStatus: buttonStatus.filter((x) => x.formId === val.id),
      };
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.put("/", auth, async (req, res) => {
  const { id } = req.query; // Get form id from URL params
  const { description, tabs, buttonStatus } = req.body; // Get updated description and tabs from request body
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [formButton] = await connection.query(
      "SELECT * FROM formsButtons WHERE formId = ?",
      [id]
    );

    const linkArray = tabs.map((x) => x.link);

    for (const tab of formButton) {
      const filePath = tab.link;
      if (!linkArray.includes(filePath)) {
        await deleteFile(filePath);
      }
    }

    // Update form description
    await connection.query(`UPDATE forms SET description = ? WHERE id = ?`, [
      description,
      id,
    ]);

    // Delete existing buttons related to this form
    await connection.query(`DELETE FROM formsButtons WHERE formId = ?`, [id]);
    await connection.query(`DELETE FROM formsButtonStatus WHERE formId = ?`, [
      id,
    ]);
    // Insert new buttons if provided
    if (tabs && Array.isArray(tabs)) {
      for (const tab of tabs) {
        await connection.query(
          `INSERT INTO formsButtons (buttonTxt, link, formId) VALUES (?, ?, ?)`,
          [tab.buttonTxt, tab.link, id]
        );
      }
    }

    if (buttonStatus && Array.isArray(buttonStatus)) {
      for (const button of buttonStatus) {
        await connection.query(
          `INSERT INTO formsButtonStatus (buttonTxt, hidden, formId) VALUES (?, ?, ?)`,
          [button.buttonTxt, button.hidden, id]
        );
      }
    }
    // Commit transaction
    await connection.commit();
    res.status(200).json({ message: "Form and buttons updated successfully." });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  } finally {
    if (connection) connection.release();
  }
});

router.delete("/", auth, async (req, res) => {
  const { id } = req.query;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const [formButton] = await connection.query(
      "SELECT * FROM formsButtons WHERE formId = ?",
      [id]
    );

    for (const tab of formButton) {
      const filePath = tab.link;
      if (filePath) {
        await deleteFile(filePath);
      }
    }

    // Delete the form (buttons will be deleted due to the foreign key constraint)
    await connection.query(`DELETE FROM forms WHERE id = ?`, [id]);

    await connection.commit();
    res.status(200).json({ message: "Form deleted successfully." });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  } finally {
    if (connection) connection.release();
  }
});

export default router;
