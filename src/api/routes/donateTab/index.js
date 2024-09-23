import express from "express";
import pool from "../../../db/index.js";
import auth from "../../../middleware/auth.js";
import deleteFile from "../../helpers/deleteMedia.js";
const router = express.Router();

router.post("/", auth, async (req, res) => {
  let connection;
  try {
    const { logo } = req.body;
    connection = await pool.getConnection();
    await connection.beginTransaction();
    await connection.query(`INSERT INTO donateTabs (logo) VALUES (?)`, [logo]);
    await connection.commit();
    res.status(201).json({ message: "Donate tab detail is submitted" });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  } finally {
    if (connection) connection.release();
  }
});

router.get("/", async (req, res) => {
  let connection;
  try {
    const connection = await pool.getConnection();
    const [header] = await connection.query("SELECT * FROM donateTabs");
    res.status(200).json(header);
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  } finally {
    if (connection) connection.release();
  }
});

router.put("/", auth, async (req, res) => {
  let connection;
  try {
    const { id } = req.query;
    const { logo } = req.body;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [header] = await connection.query(
      "SELECT * FROM donateTabs WHERE id = ?",
      [id]
    );

    if (header.length === 0) {
      return res.status(200).json({ msg: "Logo not found" });
    }

    const filePath = header[0].logo;
    if (filePath && filePath !== logo) {
      await deleteFile(filePath);
    }

    const [result] = await connection.query(
      `UPDATE donateTabs SET logo = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
      [logo, id]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ msg: "Detail not found." });
    }

    await connection.commit();
    res
      .status(200)
      .json({ message: "Donate tab detail updated successfully." });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  } finally {
    if (connection) connection.release();
  }
});

router.delete("/", auth, async (req, res) => {
  let connection;
  try {
    const { id } = req.query;
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [header] = await connection.query(
      "SELECT * FROM donateTabs WHERE id = ?",
      [id]
    );

    if (header.length === 0) {
      return res.status(200).json({ msg: "Logo not found" });
    }

    const filePath = header[0].logo;
    if (filePath) {
      await deleteFile(filePath);
    }

    const [result] = await connection.query(
      `DELETE FROM donateTabs WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ msg: "Donate tab detail not found." });
    }

    await connection.commit();
    res
      .status(200)
      .json({ message: "Donate tab detail deleted successfully." });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  } finally {
    if (connection) connection.release();
  }
});

export default router;
