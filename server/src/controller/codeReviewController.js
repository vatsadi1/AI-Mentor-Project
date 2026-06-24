const codeReviewAgent = require("../ai/codeReviewAgent.js");
const codeReviewModel = require("../model/codeReview.model.js");

const VALID_LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "go",
  "rust",
  "cpp",
  "ruby",
  "php",
  "sql",
  "html",
  "css",
  "other",
];

const VALID_FOCUS = ["all", "security", "performance", "style"];
const MAX_CODE_LENGTH = 15000;

async function reviewCode(req, res) {
  try {
    const { code, language, context = "", reviewFocus = "all" } = req.body;

    if (!code?.trim()) {
      return res.status(400).json({ message: "Code snippet is required" });
    }

    if (code.length > MAX_CODE_LENGTH) {
      return res.status(400).json({
        message: `Code exceeds maximum length of ${MAX_CODE_LENGTH} characters`,
      });
    }

    const lang = (language || "javascript").toLowerCase();
    if (!VALID_LANGUAGES.includes(lang)) {
      return res.status(400).json({ message: "Invalid programming language" });
    }

    const focus = reviewFocus.toLowerCase();
    if (!VALID_FOCUS.includes(focus)) {
      return res.status(400).json({ message: "Invalid review focus" });
    }

    const review = await codeReviewAgent({
      code: code.trim(),
      language: lang,
      context: context?.trim() || "",
      reviewFocus: focus,
    });

    const doc = await codeReviewModel.create({
      userId: req.user?._id ?? null,
      language: lang,
      context: context?.trim() || "",
      reviewFocus: focus,
      codeLength: code.trim().length,
      review,
    });

    return res.status(200).json({
      message: "Code reviewed successfully",
      review,
      id: doc._id,
      meta: {
        language: lang,
        reviewFocus: focus,
        codeLength: code.trim().length,
        hasContext: Boolean(context?.trim()),
      },
    });
  } catch (error) {
    console.error("Code Review Controller Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

async function getReviewHistory(req, res) {
  try {
    const reviews = await codeReviewModel
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .select("language reviewFocus codeLength review.overallScore review.reviewVerdict createdAt");

    return res.status(200).json({ reviews });
  } catch (error) {
    console.error("Review History Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = { reviewCode, getReviewHistory };
