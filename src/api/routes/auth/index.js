import express from "express";
import pool from "../../../db/index.js";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import config from "../../../../config.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const salt = await bcrypt.genSalt(10);
const { JWT_SECRET } = config;
const tokenLifespan = 60 * 60 * 10;
router.post(
  "/",
  [
    check("name", "First name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, email, password } = req.body;
      const connection = await pool.getConnection();
      await connection.beginTransaction();
      const [existingEmail] = await connection.query(
        "SELECT * FROM auth WHERE email = ?",
        [email]
      );

      if (existingEmail.length !== 0) {
        return res.status(409).json({ message: "Email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, salt);
      await connection.query(
        `INSERT INTO auth (name, email, password) VALUES (?, ?, ?)`,
        [name, email, hashedPassword]
      );
      await connection.commit();
      connection.release();
      res.status(201).json({ message: "User created." });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
      console.log(err);
    }
  }
);

router.post(
  "/log-in",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const connection = await pool.getConnection();
      const [user] = await connection.query(
        "SELECT * FROM auth WHERE email = ?",
        [email]
      );

      if (user.length === 0) {
        return res.status(409).json({ message: "User not found" });
      }
      connection.release();
      const detail = user[0];

      const isPasswordValid = await bcrypt.compare(password, detail.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const token = jwt.sign({ _id: detail._id }, JWT_SECRET, {
        expiresIn: "10h",
      });
      const expiresAt = new Date(Date.now() + tokenLifespan * 1000);
      const { password: _, ...userData } = detail;
      const userValue = { ...userData, token, expiresAt };
      res.json({ message: "Login successfully", user: userValue });
    } catch (err) {
      console.error(err.message);
      res.status(401).send({ msg: err.message });
    }
  }
);

export default router;
