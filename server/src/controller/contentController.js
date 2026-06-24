const { generateContent } = require("../ai/contentAgent.js");
const contentDraftModel = require("../model/contentDraft.model.js");

const VALID_CONTENT_TYPES = [
  "portfolio_post",
  "readme",
  "blog_outline",
  "social_thread",
  "case_study",
];

const VALID_TONES = [
  "professional",
  "conversational",
  "technical",
  "storytelling",
  "concise",
];

const VALID_LENGTHS = ["short", "medium", "long"];

async function generateDraft(req, res) {
  try {
    const {
      contentType,
      topic,
      tone = "professional",
      length = "medium",
      audience = "",
      platform = "",
      voiceNotes = "",
      keyPoints = [],
    } = req.body;

    if (!contentType?.trim()) {
      return res.status(400).json({ message: "Content type is required" });
    }

    if (!VALID_CONTENT_TYPES.includes(contentType)) {
      return res.status(400).json({ message: "Invalid content type" });
    }

    if (!topic?.trim() || topic.trim().length < 10) {
      return res.status(400).json({
        message: "Topic must be at least 10 characters. Describe your project or idea.",
      });
    }

    if (topic.trim().length > 5000) {
      return res.status(400).json({ message: "Topic must be under 5000 characters" });
    }

    if (!VALID_TONES.includes(tone)) {
      return res.status(400).json({ message: "Invalid tone" });
    }

    if (!VALID_LENGTHS.includes(length)) {
      return res.status(400).json({ message: "Invalid length preference" });
    }

    const normalizedKeyPoints = Array.isArray(keyPoints)
      ? keyPoints.map((p) => String(p).trim()).filter(Boolean).slice(0, 8)
      : [];

    const input = {
      contentType,
      topic: topic.trim(),
      tone,
      length,
      audience: String(audience || "").trim(),
      platform: String(platform || "").trim(),
      voiceNotes: String(voiceNotes || "").trim(),
      keyPoints: normalizedKeyPoints,
    };

    const draft = await generateContent(input);

    const doc = await contentDraftModel.create({
      ...input,
      draft,
    });

    return res.status(200).json({
      message: "Content generated successfully",
      draft,
      id: doc._id,
      meta: {
        contentType,
        tone,
        length,
        hasVoiceNotes: Boolean(input.voiceNotes),
        keyPointCount: normalizedKeyPoints.length,
      },
    });
  } catch (error) {
    console.error("Content Controller Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

module.exports = { generateDraft };
