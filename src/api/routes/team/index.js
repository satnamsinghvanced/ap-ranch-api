import express from "express";
import pool from "../../../db/index.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { image, name, descriptions, role } = req.body;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [team] = await connection.query(
      `INSERT INTO team (image, name, descriptions,role) VALUES (?, ?, ?, ?)`,
      [image, name, descriptions, role]
    );
    await connection.commit();
    connection.release();
    res.status(201).json({ message: "Team member added successfully", team });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [teamMembers] = await connection.query("SELECT * FROM team");
    connection.release();
    res.status(200).json(teamMembers);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});
router.get("/detail", async (req, res) => {
  const { id } = req.query;
  try {
    const connection = await pool.getConnection();
    const [teamMember] = await connection.query(
      "SELECT * FROM team WHERE id = ?",
      [id]
    );

    if (teamMember.length === 0) {
      return res.status(404).json({ msg: "Team member not found" });
    }

    connection.release();
    res.status(200).json(teamMember[0]);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});
router.put("/", async (req, res) => {
  const { id } = req.query;
  const { image, name, descriptions, role } = req.body;

  // Check if the required fields are present
  if (!image || !name || !descriptions || !role) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [result] = await connection.query(
      `UPDATE team SET image = ?, name = ?, descriptions = ?, role = ? WHERE id = ?`,
      [image, name, descriptions, role, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Team member not found" });
    }

    await connection.commit();
    connection.release();

    res.status(200).json({ message: "Team member updated successfully" });
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

    const [result] = await connection.query("DELETE FROM team WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Team member not found" });
    }

    await connection.commit();
    connection.release();

    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});
export default router;
