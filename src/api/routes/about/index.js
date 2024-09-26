import express from "express";
import pool from "../../../db/index.js";
import auth from "../../../middleware/auth.js";
import deleteFile from "../../helpers/deleteMedia.js";
const router = express.Router();

router.post("/", auth, async (req, res) => {
    let connection;
  try {
    const { image, name, descriptions } = req.body;
    connection = await pool.getConnection();
    await connection.beginTransaction();
    await connection.query(
      `INSERT INTO abouts (image, name, descriptions) VALUES (?, ?, ?)`,
      [image, name, descriptions]
    );
    await connection.commit();
    res.status(201).json({ message: "About added successfully" });
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
    const [about] = await connection.query("SELECT * FROM abouts");
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }finally {
    if (connection) connection.release();
  }
});

router.put("/", auth, async (req, res) => {
    let connection;
  const { id } = req.query;
  const { image, name, descriptions } = req.body;

  // Check if the required fields are present
  if (!image || !name || !descriptions) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [about] = await connection.query(
      "SELECT * FROM abouts WHERE id = ?",
      [id]
    );

    if (about.length === 0) {
      return res.status(200).json({ msg: "About not found" });
    }
    const filePath = about[0].image;
    if (filePath && filePath !== image) {
      await deleteFile(filePath);
    }

    const [result] = await connection.query(
      `UPDATE abouts SET image = ?, name = ?, descriptions = ? WHERE id = ?`,
      [image, name, descriptions, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "About not found" });
    }

    await connection.commit();

    res.status(200).json({ message: "About updated successfully" });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
  }finally {
    if (connection) connection.release();
  }
});

router.delete("/", auth, async (req, res) => {
  const { id } = req.query;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [about] = await connection.query(
      "SELECT * FROM abouts WHERE id = ?",
      [id]
    );

    if (about.length === 0) {
      return res.status(200).json({ msg: "About not found" });
    }
    const filePath = about[0].image;
    if (filePath) {
      await deleteFile(filePath);
    }

    const [result] = await connection.query("DELETE FROM abouts WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "About not found" });
    }

    await connection.commit();

    res.status(200).json({ message: "About deleted successfully" });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }finally {
    if (connection) connection.release();
  }
});

export default router;
