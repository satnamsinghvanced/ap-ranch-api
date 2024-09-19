import express from "express";
import pool from "../../../db/index.js";
import auth from "../../../middleware/auth.js";
const router = express.Router();

router.post("/", auth, async (req, res) => {
  let connection;
  try {
    const { headerLogo } = req.body;
    connection = await pool.getConnection();
    await connection.beginTransaction();
    await connection.query(`INSERT INTO headers (headerLogo) VALUES (?)`, [
      headerLogo,
    ]);
    await connection.commit();
    res.status(201).json({ message: "Header is submitted" });
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
    const [header] = await connection.query("SELECT * FROM headers");
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
    const { headerLogo } = req.body;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [result] = await connection.query(
      `UPDATE headers SET headerLogo = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
      [headerLogo, id]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ msg: "Header not found." });
    }

    await connection.commit();
    res.status(200).json({ message: "Header updated successfully." });
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

    const [result] = await connection.query(
      `DELETE FROM headers WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ msg: "Header not found." });
    }

    await connection.commit();
    res.status(200).json({ message: "Header deleted successfully." });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  } finally {
    if (connection) connection.release();
  }
});

export default router;
