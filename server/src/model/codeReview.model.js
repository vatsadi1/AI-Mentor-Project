const mongoose = require("mongoose");

const codeReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  language: { type: String, required: true },
  context: { type: String, default: "" },
  reviewFocus: { type: String, default: "all" },
  codeLength: { type: Number, required: true },
  review: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
});

const codeReviewModel = mongoose.model("CodeReview", codeReviewSchema);
module.exports = codeReviewModel;
