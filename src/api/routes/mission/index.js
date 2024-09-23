import express from "express";
import pool from "../../../db/index.js";
import auth from "../../../middleware/auth.js";
import deleteFile from "../../helpers/deleteMedia.js";
const router = express.Router();

router.post("/", auth, async (req, res) => {
  let connection;
  try {
    const { name, description, image } = req.body;
    connection = await pool.getConnection();
    await connection.beginTransaction();
    await connection.query(
      `INSERT INTO missions (name, description, image) VALUES (?, ?, ?)`,
      [name, description, image]
    );
    await connection.commit();
    res.status(201).json({ message: "Mission is submitted" });
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
    const [mission] = await connection.query("SELECT * FROM missions");
    res.status(200).json(mission);
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
    const { name, description, image } = req.body;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [mission] = await connection.query(
      "SELECT * FROM missions WHERE id = ?",
      [id]
    );

    if (mission.length === 0) {
      return res.status(404).json({ msg: "Mission not found." });
    }
    const filePath = mission[0].image;
    if (filePath && filePath !== image) {
      await deleteFile(filePath);
    }

    const [result] = await connection.query(
      `UPDATE missions SET name = ?, description = ?, image = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
      [name, description, image, id]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ msg: "Mission not found." });
    }

    await connection.commit();
    res.status(200).json({ message: "Mission updated successfully." });
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

    const [mission] = await connection.query(
      "SELECT * FROM missions WHERE id = ?",
      [id]
    );

    if (mission.length === 0) {
      return res.status(404).json({ msg: "Mission not found." });
    }
    const filePath = mission[0].image;
    if (filePath) {
      await deleteFile(filePath);
    }

    const [result] = await connection.query(
      `DELETE FROM missions WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ msg: "Mission not found." });
    }

    await connection.commit();
    res.status(200).json({ message: "Mission deleted successfully." });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  } finally {
    if (connection) connection.release();
  }
});

export default router;
