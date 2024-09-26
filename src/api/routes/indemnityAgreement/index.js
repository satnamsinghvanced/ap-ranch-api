import express from "express";
import pool from "../../../db/index.js";
import auth from "../../../middleware/auth.js";
const router = express.Router();

router.post("/", async (req, res) => {
  let connection;
  try {
    const {
      name,
      activity,
      courseNumber,
      instructor,
      destination,
      semester,
      email,
      dateSigned,
      sign,
    } = req.body;
    connection = await pool.getConnection();
    await connection.beginTransaction();
    await connection.query(
      `INSERT INTO indemnityAgreements (name,
      activity,
      courseNumber,
      instructor,
      destination,
      semester,
      email,
      dateSigned,
      sign) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        activity,
        courseNumber,
        instructor,
        destination,
        semester,
        email,
        dateSigned,
        sign,
      ]
    );
    await connection.commit();
    res
      .status(201)
      .json({ message: "Indemnity Agreement submitted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }finally {
    if (connection) connection.release();
  }
});

router.get("/", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [agreements] = await connection.query(
      "SELECT * FROM indemnityAgreements"
    );
    res.status(200).json(agreements);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }finally {
    if (connection) connection.release();
  }
});

router.get("/detail", async (req, res) => {
  const { id } = req.query;
  let connection;
  try {
    connection = await pool.getConnection();
    const [agreements] = await connection.query(
      "SELECT * FROM indemnityAgreements WHERE id = ?",
      [id]
    );
    if (agreements.length === 0) {
      return res.status(404).json({ msg: "Agreements not found" });
    }
    res.status(200).json(agreements);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }finally {
    if (connection) connection.release();
  }
});

router.delete("/", auth, async (req, res) => {
  let connection;
  try {
    const { id } = req.query;
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.query(
      `DELETE FROM indemnityAgreements WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ msg: "Agreements not found." });
    }

    await connection.commit();
    res.status(200).json({ message: "Agreements deleted successfully." });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  } finally {
    if (connection) connection.release();
  }
});

export default router;
