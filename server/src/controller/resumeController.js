const analyzeResumeAgent = require("../ai/resumeAgent.js");
const resumeAnalysisModel = require("../model/resumeAnalysis.model.js");
const { extractTextFromFile } = require("../utils/pdfExtractor.js");

const VALID_ROLES = [
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Engineer",
  "ML Engineer",
  "Data Engineer",
  "DevOps Engineer",
  "Mobile Developer",
  "Software Engineer",
];

async function analyzeResume(req, res) {
  try {
    const file = req.file;
    const { targetRole, jobDescription = "" } = req.body;

    if (!file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    if (!targetRole?.trim()) {
      return res.status(400).json({ message: "Target role is required" });
    }

    const role = targetRole.trim();
    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({ message: "Invalid target role" });
    }

    let resumeText;
    try {
      resumeText = await extractTextFromFile(file);
    } catch (extractError) {
      return res.status(400).json({ message: extractError.message });
    }

    if (!resumeText || resumeText.length < 50) {
      return res.status(400).json({
        message: "Could not extract enough text from the file. Try a text-based PDF or .txt file.",
      });
    }

    const analysis = await analyzeResumeAgent({
      resumeText,
      targetRole: role,
      jobDescription: jobDescription?.trim() || "",
    });

    const doc = await resumeAnalysisModel.create({
      fileName: file.originalname,
      fileType: file.mimetype,
      targetRole: role,
      jobDescription: jobDescription?.trim() || "",
      resumeTextLength: resumeText.length,
      analysis,
    });

    return res.status(200).json({
      message: "Resume analyzed successfully",
      analysis,
      id: doc._id,
      meta: {
        fileName: file.originalname,
        targetRole: role,
        hasJobDescription: Boolean(jobDescription?.trim()),
      },
    });
  } catch (error) {
    console.error("Resume Controller Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

module.exports = { analyzeResume };
