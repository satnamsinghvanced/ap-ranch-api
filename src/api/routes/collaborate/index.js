import express from "express";
import pool from "../../../db/index.js";
import deleteFile from "../../helpers/deleteMedia.js";
import auth from "../../../middleware/auth.js";
const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { name, descriptions, headerImage, image } = req.body;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    await connection.query(
      `INSERT INTO collaborates (name, descriptions, headerImage, image) VALUES (?, ?, ?, ?)`,
      [name, descriptions, headerImage, image]
    );
    await connection.commit();
    connection.release();
    res.status(201).json({ message: "Collaborate added successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [collaborate] = await connection.query("SELECT * FROM collaborates");
    connection.release();
    res.status(200).json(collaborate);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.get("/detail", async (req, res) => {
  const { id } = req.query;
  try {
    const connection = await pool.getConnection();
    const [collaborate] = await connection.query(
      "SELECT * FROM collaborates WHERE id = ?",
      [id]
    );

    if (collaborate.length === 0) {
      return res.status(404).json({ msg: "Collaboration not found" });
    }
    connection.release();
    res.status(200).json(collaborate[0]);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.put("/", auth, async (req, res) => {
  try {
    const { id } = req.query;
    const { name, descriptions, headerImage, image } = req.body;
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [collaborate] = await connection.query(
      "SELECT * FROM collaborates WHERE id = ?",
      [id]
    );
    if (collaborate.length === 0) {
      return res.status(200).json({ msg: "Collaborate not found" });
    }
    const filePath = collaborate[0].image;
    const headerFile = collaborate[0].headerImage;
    if (filePath && filePath !== image) {
      await deleteFile(filePath);
    }
    if (headerFile && headerFile !== headerImage) {
      await deleteFile(headerFile);
    }
    const [result] = await connection.query(
      `UPDATE collaborates 
         SET name = ?, descriptions = ?, headerImage = ?, image = ? 
         WHERE id = ?`,
      [name, descriptions, headerImage, image, id]
    );

    await connection.commit();
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Collaborate not found" });
    }

    res.status(200).json({ message: "Collaborate updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    const { id } = req.query;
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [collaborate] = await connection.query(
      "SELECT * FROM collaborates WHERE id = ?",
      [id]
    );
    if (collaborate.length === 0) {
      return res.status(200).json({ msg: "Collaborate not found" });
    }
    const filePath = collaborate[0].image;
    const headerFile = collaborate[0].headerImage;
    if (filePath) {
      await deleteFile(filePath);
    }
    if (headerFile) {
      await deleteFile(headerFile);
    }

    const [result] = await connection.query(
      `DELETE FROM collaborates WHERE id = ?`,
      [id]
    );

    await connection.commit();
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Collaborate not found" });
    }

    res.status(200).json({ message: "Collaborate deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

export default router;
