import express from "express";
import { createTables } from "../../helpers/createTable.js";
import auth from "../../../middleware/auth.js";
const router = express.Router();
router.post("/", auth, async (req, res) => {
  try {
    await createTables();
    res.status(201).json({ message: "Tables created successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});
export default router;
