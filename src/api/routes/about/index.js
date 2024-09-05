import express from "express";
import pool from "../../../db/index.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { image, name, descriptions } = req.body;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    await connection.query(
      `INSERT INTO abouts (image, name, descriptions) VALUES (?, ?, ?)`,
      [image, name, descriptions]
    );
    await connection.commit();
    connection.release();
    res.status(201).json({ message: "About added successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [about] = await connection.query("SELECT * FROM abouts");
    connection.release();
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.put("/", async (req, res) => {
  const { id } = req.query;
  const { image, name, descriptions } = req.body;

  // Check if the required fields are present
  if (!image || !name || !descriptions) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [result] = await connection.query(
      `UPDATE abouts SET image = ?, name = ?, descriptions = ? WHERE id = ?`,
      [image, name, descriptions, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "About not found" });
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

router.delete("/", async (req, res) => {
  const { id } = req.query;

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [result] = await connection.query("DELETE FROM abouts WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "About not found" });
    }

    await connection.commit();
    connection.release();

    res.status(200).json({ message: "About deleted successfully" });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

export default router;
