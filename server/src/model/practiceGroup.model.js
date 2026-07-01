const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    id: String,
    question: String,
    category: String,
    difficulty: String,
    tips: [String],
  },
  { _id: false }
);

const answerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    questionId: { type: String, required: true },
    answer: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const evaluationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userName: String,
    questionId: { type: String, required: true },
    topic: String,
    answer: String,
    evaluation: { type: mongoose.Schema.Types.Mixed, required: true },
    evaluatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const practiceGroupSchema = new mongoose.Schema({
  roomCode: { type: String, required: true, unique: true, uppercase: true },
  topicName: { type: String, required: true },
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  status: {
    type: String,
    enum: ["waiting", "active", "complete"],
    default: "waiting",
  },
  role: { type: String, required: true },
  level: { type: String, required: true },
  interviewType: { type: String, required: true },
  focusAreas: { type: [String], default: [] },
  questionCount: { type: Number, required: true },
  questions: { type: [questionSchema], default: [] },
  currentQuestionIndex: { type: Number, default: 0 },
  answers: { type: [answerSchema], default: [] },
  evaluations: { type: [evaluationSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

practiceGroupSchema.pre("save", function onSave() {
  this.updatedAt = new Date();
});

const practiceGroupModel = mongoose.model("PracticeGroup", practiceGroupSchema);
module.exports = practiceGroupModel;
