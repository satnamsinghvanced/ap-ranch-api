import express from "express";
import pool from "../../../db/index.js";
import sendContactEmail from "../../helpers/sendEmail.js";
import auth from "../../../middleware/auth.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phoneNumber, reason, comments } = req.body;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [contactForm] = await connection.query(
      `INSERT INTO contactForms (name, email, phoneNumber, reason, comments) VALUES (?, ?, ?, ?, ?)`,
      [name, email, phoneNumber, reason, comments]
    );
    await sendContactEmail(name, email, phoneNumber, reason, comments);
    await connection.commit();
    connection.release();
    res.status(201).json({ message: "Thank you for submit." });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.get("/user-detail", auth, async (req, res) => {
  let connection;
  try {
    const connection = await pool.getConnection();
    const [mission] = await connection.query("SELECT * FROM contactForms");
    res.status(200).json(mission);
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  } finally {
    if (connection) connection.release();
  }
});

router.delete("/user-detail", auth, async (req, res) => {
  let connection;
  try {
    const { id } = req.query;
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.query(
      `DELETE FROM contactForms WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ msg: "Mission not found." });
    }
    await connection.commit();
    res.status(200).json({ message: "Contact deleted successfully." });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  } finally {
    if (connection) connection.release();
  }
});

router.post("/detail", auth, async (req, res) => {
  try {
    const { description } = req.body;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    await connection.query(
      `INSERT INTO contactDetailForms (description) VALUES (?)`,
      [description]
    );
    await connection.commit();
    connection.release();
    res.status(201).json({ message: "Contact Detail submitted." });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [contactDetail] = await connection.query(
      "SELECT * FROM contactDetailForms"
    );
    connection.release();
    res.status(200).json(contactDetail);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.put("/", auth, async (req, res) => {
  try {
    const { id } = req.query;
    const { description } = req.body;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.query(
      `UPDATE contactDetailForms SET description = ? WHERE id = ?`,
      [description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    await connection.commit();
    connection.release();

    res.status(200).json({ message: "About updated successfully" });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    const { id } = req.query;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.query(
      "DELETE FROM contactDetailForms WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Contact detail not found" });
    }

    await connection.commit();
    connection.release();

    res.status(200).json({ message: "Contact detail deleted successfully" });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

export default router;
