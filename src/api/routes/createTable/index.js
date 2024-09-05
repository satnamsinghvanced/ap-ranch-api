import express from "express";
import { createTables } from "../../helpers/createTable.js";
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    await createTables();
    res.status(201).json({ message: "Tables created successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});
export default router;
