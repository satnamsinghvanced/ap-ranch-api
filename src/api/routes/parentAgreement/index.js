import express from "express";
import pool from "../../../db/index.js";
import auth from "../../../middleware/auth.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, ageDivision, dateSigned, sign } = req.body;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    await connection.query(
      `INSERT INTO parentsAgreements (name, ageDivision, dateSigned, sign) VALUES (?, ?, ?, ?)`,
      [name, ageDivision, dateSigned, sign]
    );
    await connection.commit();
    connection.release();
    res
      .status(201)
      .json({ message: "Parent Agreement submitted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [agreements] = await connection.query(
      "SELECT * FROM parentsAgreements"
    );
    connection.release();
    res.status(200).json(agreements);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.get("/detail", async (req, res) => {
  const { id } = req.query;
  try {
    const connection = await pool.getConnection();
    const [agreements] = await connection.query(
      "SELECT * FROM parentsAgreements WHERE id = ?",
      [id]
    );
    if (agreements.length === 0) {
      connection.release();
      return res.status(404).json({ msg: "Agreements not found" });
    }
    connection.release();
    res.status(200).json(agreements);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.delete("/", auth, async (req, res) => {
  let connection;
  try {
    const { id } = req.query;
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.query(
      `DELETE FROM parentsAgreements WHERE id = ?`,
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
