const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    tips: [{ type: String }],
  },
  { _id: false }
);

const evaluationSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true },
    answer: { type: String, required: true },
    evaluation: { type: mongoose.Schema.Types.Mixed, required: true },
    evaluatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const interviewSessionSchema = new mongoose.Schema({
  role: { type: String, required: true },
  level: { type: String, enum: ["junior", "mid", "senior"], required: true },
  interviewType: {
    type: String,
    enum: ["behavioral", "technical", "system-design", "mixed"],
    required: true,
  },
  focusAreas: [{ type: String }],
  questionCount: { type: Number, required: true },
  questions: [questionSchema],
  evaluations: [evaluationSchema],
  createdAt: { type: Date, default: Date.now },
});

const interviewSessionModel = mongoose.model("InterviewSession", interviewSessionSchema);

module.exports = interviewSessionModel;
