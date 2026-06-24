const express = require("express");
const multer = require("multer");
const { analyzeResume } = require("../controller/resumeController");

const resumeRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    const allowed = ["application/pdf", "text/plain"];
    const name = (file.originalname || "").toLowerCase();
    const isAllowed =
      allowed.includes(file.mimetype) || name.endsWith(".pdf") || name.endsWith(".txt");

    if (isAllowed) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and plain text (.txt) files are supported"));
    }
  },
});

function handleUpload(req, res, next) {
  upload.single("resume")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File too large. Maximum size is 5 MB." });
      }
      return res.status(400).json({ message: err.message });
    }
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}

resumeRouter.post("/analyze", handleUpload, analyzeResume);

module.exports = resumeRouter;
