import express from "express";
import fs from "fs";
import path from "path";
import auth from "../../../middleware/auth.js";

const router = express.Router();
const uploadDir = "uploads/"; // Directory where files are uploaded
const pdfDir = "pdf/";
// Utility function to filter files by extension
const isImage = (fileName) => {
  const imageExtensions = [".jpeg", ".jpg", ".png", ".gif", ".webp"];
  return imageExtensions.includes(path.extname(fileName).toLowerCase());
};

const isVideo = (fileName) => {
  const videoExtensions = [
    ".mp4",
    ".avi",
    ".flv",
    ".webm",
    ".mov",
    ".mp2t",
    ".3gpp",
    ".3gpp2",
    ".quicktime",
    ".x-msvideo",
    ".x-ms-wmv",
    ".mpeg",
    ".ogg",
    ".x-m4v",
    ".x-ms-asf",
    ".x-ms-wvx",
    ".x-ms-wmx",
    ".x-matroska",
    ".x-fli",
    ".x-f4v",
    ".vnd.vivo",
    ".vnd.ms-playready.media.pyv",
    ".vnd.mpegurl",
    ".vnd.fvt",
    ".h261",
    ".h263",
    ".h264",
    ".mjpeg",
  ];
  return videoExtensions.includes(path.extname(fileName).toLowerCase());
};

const isPDF = (fileName) => {
  return path.extname(fileName).toLowerCase() === ".pdf";
};

const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

// GET API to fetch all images and videos
router.get("/", auth, async (req, res) => {
  try {
    // Read the files in the upload directory
    fs.readdir(uploadDir, (err, files) => {
      if (err) {
        return res.status(500).json({ message: "Error reading the directory" });
      }

      // Separate files into images and videos
      const mediaImages = [];
      const mediaVideos = [];

      files.forEach((file) => {
        const filePath = path.join(uploadDir, file);
        if (isImage(file)) {
          mediaImages.push({
            fileName: file,
            url: `${req.protocol}://${req.get("host")}/${filePath}`,
          });
        } else if (isVideo(file)) {
          mediaVideos.push({
            fileName: file,
            url: `${req.protocol}://${req.get("host")}/${filePath}`,
          });
        }
      });

      res.status(200).json({ mediaImages, mediaVideos });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/pdf", auth, async (req, res) => {
  try {
    // Read the files in the pdf directory
    fs.readdir(pdfDir, (err, files) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error reading the PDF directory" });
      }

      // Filter PDF files
      const pdfFiles = files.filter(isPDF).map((file) => {
        return {
          fileName: file,
          url: `${req.protocol}://${req.get("host")}/${pdfDir}${file}`,
        };
      });

      res.status(200).json({ pdfFiles });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/", auth, async (req, res) => {
  const { fileName } = req.query;
  const filePath = path.join(uploadDir, fileName);

  try {
    await deleteFile(filePath);
    res.status(200).json({ message: "File deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting the file." });
  }
});

// DELETE API to remove a PDF file
router.delete("/pdf", auth, async (req, res) => {
  const { fileName } = req.query;
  const filePath = path.join(pdfDir, fileName);

  try {
    await deleteFile(filePath);
    res.status(200).json({ message: "PDF deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting the PDF." });
  }
});

export default router;
