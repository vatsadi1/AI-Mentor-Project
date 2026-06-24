const {
  generateInterviewQuestions,
  evaluateInterviewAnswer,
} = require("../ai/interviewAgent.js");
const interviewSessionModel = require("../model/interviewSession.model.js");

const VALID_LEVELS = ["junior", "mid", "senior"];
const VALID_TYPES = ["behavioral", "technical", "system-design", "mixed"];

function normalizeFocusAreas(areas) {
  if (!Array.isArray(areas)) return [];
  return areas.map((a) => String(a).trim()).filter(Boolean);
}

async function startSession(req, res) {
  try {
    const { role, level, interviewType, focusAreas, questionCount } = req.body;

    if (!role || !level || !interviewType || !questionCount) {
      return res.status(400).json({ message: "role, level, interviewType, and questionCount are required" });
    }

    if (!VALID_LEVELS.includes(level)) {
      return res.status(400).json({ message: "Invalid experience level" });
    }

    if (!VALID_TYPES.includes(interviewType)) {
      return res.status(400).json({ message: "Invalid interview type" });
    }

    const count = Number(questionCount);
    if (!Number.isInteger(count) || count < 3 || count > 8) {
      return res.status(400).json({ message: "questionCount must be between 3 and 8" });
    }

    const cleanedData = {
      role: role.trim(),
      level,
      interviewType,
      focusAreas: normalizeFocusAreas(focusAreas),
      questionCount: count,
    };

    const questions = await generateInterviewQuestions(cleanedData);

    const sessionDoc = await interviewSessionModel.create({
      ...cleanedData,
      questions,
      evaluations: [],
    });

    return res.status(200).json({
      message: "Interview session started",
      sessionId: sessionDoc._id,
      questions: sessionDoc.questions,
      meta: {
        role: cleanedData.role,
        level: cleanedData.level,
        interviewType: cleanedData.interviewType,
        focusAreas: cleanedData.focusAreas,
        questionCount: cleanedData.questionCount,
      },
    });
  } catch (error) {
    console.error("Start session error:", error);
    return res.status(500).json({
      message: "Failed to start interview session",
      error: error.message,
    });
  }
}

async function evaluateAnswer(req, res) {
  try {
    const {
      sessionId,
      questionId,
      question,
      category,
      difficulty,
      answer,
    } = req.body;

    if (!sessionId || !questionId || !question || !answer) {
      return res.status(400).json({
        message: "sessionId, questionId, question, and answer are required",
      });
    }

    const trimmedAnswer = answer.trim();
    if (trimmedAnswer.length < 20) {
      return res.status(400).json({
        message: "Answer must be at least 20 characters for meaningful feedback",
      });
    }

    if (trimmedAnswer.length > 5000) {
      return res.status(400).json({ message: "Answer must be under 5000 characters" });
    }

    const session = await interviewSessionModel.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Interview session not found" });
    }

    const evaluation = await evaluateInterviewAnswer({
      role: session.role,
      level: session.level,
      interviewType: session.interviewType,
      question: question.trim(),
      category: category || "General",
      difficulty: difficulty || "medium",
      answer: trimmedAnswer,
    });

    session.evaluations.push({
      questionId,
      answer: trimmedAnswer,
      evaluation,
    });
    await session.save();

    return res.status(200).json({
      message: "Answer evaluated successfully",
      evaluation,
    });
  } catch (error) {
    console.error("Evaluate answer error:", error);
    return res.status(500).json({
      message: "Failed to evaluate answer",
      error: error.message,
    });
  }
}

module.exports = { startSession, evaluateAnswer };
