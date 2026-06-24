const mongoose = require("mongoose");

const contentDraftSchema = new mongoose.Schema({
  contentType: { type: String, required: true },
  topic: { type: String, required: true },
  tone: { type: String, required: true },
  length: { type: String, required: true },
  audience: { type: String, default: "" },
  platform: { type: String, default: "" },
  voiceNotes: { type: String, default: "" },
  keyPoints: { type: [String], default: [] },
  draft: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
});

const contentDraftModel = mongoose.model("ContentDraft", contentDraftSchema);
module.exports = contentDraftModel;
