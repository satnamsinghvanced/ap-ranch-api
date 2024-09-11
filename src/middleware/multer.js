import multer from "multer";
import path from "path";
import fs from "fs"; // Changed from require to import for consistency

// Define the storage with original filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    fs.mkdirSync(dir, { recursive: true });
    return cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    //const filename = file.fieldname + '-' + uniqueSuffix;
    const filename = file.fieldname + '-' + uniqueSuffix + extension;
    cb(null, filename);
    //cb(null, file.originalname); // Keep original filename
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (JPEG, PNG, GIF, WEBP) are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB file size limit
  },
  fileFilter: fileFilter,
  onError: function (err, next) {
    if (err instanceof multer.MulterError) {
      console.log("errors");
      if (err.code === "LIMIT_FILE_SIZE") {
        // Handle file size limit exceeded error
        return next(new Error("File too large"));
      }
    }
    // Pass other errors to the next middleware
    return next(err);
  },
});

// Export the configured multer instance
export default upload;
