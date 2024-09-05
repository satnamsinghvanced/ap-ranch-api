import express from "express";
import pool from "../../../db/index.js";
import sendContactEmail from "../../helpers/sendEmail.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phoneNumber, reason, comments } = req.body;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [contactForm] = await connection.query(
      `INSERT INTO contactForm (name, email, phoneNumber, reason, comments) VALUES (?, ?, ?, ?, ?)`,
      [name, email, phoneNumber, reason, comments]
    );
    await sendContactEmail(name, email, phoneNumber, reason, comments);
    await connection.commit();
    connection.release();
    res.status(201).json({ message: "Data uploaded successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

export default router;
