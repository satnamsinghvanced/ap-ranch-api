import express from "express";
import pool from "../../../db/index.js";
import upload from "../../../middleware/multer.js";
const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    res.status(200).json(imagePath);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

export default router;
