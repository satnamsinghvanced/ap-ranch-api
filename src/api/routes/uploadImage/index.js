import express from "express";
import upload from "../../../middleware/multer.js";
import pdfUpload from "../../../middleware/pdfMulter.js";
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

router.post("/pdf", pdfUpload.single("pdf"), async (req, res) => {
  try {
    const pdfPath = req.file.path;
    res.status(200).json(pdfPath);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

export default router;
