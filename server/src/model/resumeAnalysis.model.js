const mongoose = require("mongoose");

const resumeAnalysisSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  targetRole: { type: String, required: true },
  jobDescription: { type: String, default: "" },
  resumeTextLength: { type: Number, required: true },
  analysis: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
});

const resumeAnalysisModel = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);
module.exports = resumeAnalysisModel;
