const crypto = require("crypto");
const { generateInterviewQuestions } = require("../ai/interviewAgent.js");
const practiceGroupModel = require("../model/practiceGroup.model.js");

const VALID_LEVELS = ["junior", "mid", "senior"];
const VALID_TYPES = ["behavioral", "technical", "system-design", "mixed"];

function generateRoomCode() {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
}

function normalizeFocusAreas(areas) {
  if (!Array.isArray(areas)) return [];
  return areas.map((a) => String(a).trim()).filter(Boolean);
}

function buildTopicName(role, interviewType) {
  const typeLabels = {
    behavioral: "Behavioral",
    technical: "Technical",
    "system-design": "System Design",
    mixed: "Mixed",
  };
  return `${role} — ${typeLabels[interviewType] || interviewType} Mock`;
}

function serializeGroup(group, currentUserId) {
  const host = group.hostId;
  const guest = group.guestId;
  const hostId = host?._id || host;
  const guestId = guest?._id || guest;
  const userId = currentUserId ? String(currentUserId) : null;

  return {
    id: group._id,
    roomCode: group.roomCode,
    topicName: group.topicName,
    status: group.status,
    role: group.role,
    level: group.level,
    interviewType: group.interviewType,
    focusAreas: group.focusAreas,
    questionCount: group.questionCount,
    questions: group.questions,
    currentQuestionIndex: group.currentQuestionIndex,
    host: host
      ? {
          id: hostId,
          name: host.name,
          isYou: userId ? String(hostId) === userId : false,
        }
      : null,
    guest: guest
      ? {
          id: guestId,
          name: guest.name,
          isYou: userId ? String(guestId) === userId : false,
        }
      : null,
    isHost: userId ? String(hostId) === userId : false,
    answers: group.answers.map((a) => ({
      userId: a.userId,
      questionId: a.questionId,
      submittedAt: a.submittedAt,
    })),
    evaluations: group.evaluations,
  };
}

async function populateGroup(query) {
  return query.populate("hostId", "name email").populate("guestId", "name email");
}

async function createGroup(req, res) {
  try {
    const { role, level, interviewType, focusAreas, questionCount, topicName } = req.body;

    if (!role || !level || !interviewType || !questionCount) {
      return res.status(400).json({
        message: "role, level, interviewType, and questionCount are required",
      });
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

    let roomCode = generateRoomCode();
    let attempts = 0;
    while (attempts < 5) {
      const existing = await practiceGroupModel.findOne({ roomCode });
      if (!existing) break;
      roomCode = generateRoomCode();
      attempts += 1;
    }

    const group = await practiceGroupModel.create({
      roomCode,
      topicName: topicName?.trim() || buildTopicName(role.trim(), interviewType),
      hostId: req.user._id,
      role: role.trim(),
      level,
      interviewType,
      focusAreas: normalizeFocusAreas(focusAreas),
      questionCount: count,
    });

    const populated = await populateGroup(practiceGroupModel.findById(group._id));

    return res.status(201).json({
      message: "Practice group created",
      group: serializeGroup(populated, req.user._id),
    });
  } catch (error) {
    console.error("Create group error:", error);
    return res.status(500).json({ message: "Failed to create practice group", error: error.message });
  }
}

async function joinGroup(req, res) {
  try {
    const { roomCode } = req.body;
    if (!roomCode?.trim()) {
      return res.status(400).json({ message: "roomCode is required" });
    }

    const code = roomCode.trim().toUpperCase();
    const group = await populateGroup(practiceGroupModel.findOne({ roomCode: code }));

    if (!group) {
      return res.status(404).json({ message: "Room not found. Check the code and try again." });
    }

    const userId = String(req.user._id);
    const hostId = String(group.hostId._id);
    const guestId = group.guestId ? String(group.guestId._id) : null;

    if (userId === hostId) {
      return res.status(200).json({
        message: "Rejoined your room",
        group: serializeGroup(group, req.user._id),
      });
    }

    if (guestId && userId !== guestId) {
      return res.status(409).json({ message: "This room is full. Only two participants are allowed." });
    }

    if (group.status !== "waiting") {
      return res.status(409).json({ message: "This session has already started or ended." });
    }

    if (!guestId) {
      group.guestId = req.user._id;
      await group.save();
      const updated = await populateGroup(practiceGroupModel.findById(group._id));
      return res.status(200).json({
        message: "Joined practice group",
        group: serializeGroup(updated, req.user._id),
      });
    }

    return res.status(200).json({
      message: "Already in room",
      group: serializeGroup(group, req.user._id),
    });
  } catch (error) {
    console.error("Join group error:", error);
    return res.status(500).json({ message: "Failed to join practice group", error: error.message });
  }
}

async function getGroup(req, res) {
  try {
    const code = req.params.roomCode?.trim().toUpperCase();
    const group = await populateGroup(practiceGroupModel.findOne({ roomCode: code }));

    if (!group) {
      return res.status(404).json({ message: "Room not found" });
    }

    const userId = String(req.user._id);
    const hostId = String(group.hostId._id);
    const guestId = group.guestId ? String(group.guestId._id) : null;

    if (userId !== hostId && userId !== guestId) {
      return res.status(403).json({ message: "You are not a member of this room" });
    }

    return res.status(200).json({ group: serializeGroup(group, req.user._id) });
  } catch (error) {
    console.error("Get group error:", error);
    return res.status(500).json({ message: "Failed to fetch practice group", error: error.message });
  }
}

async function startGroupSession(groupId) {
  const group = await practiceGroupModel.findById(groupId);
  if (!group) throw new Error("Group not found");

  if (!group.guestId) {
    throw new Error("Waiting for a friend to join before starting");
  }

  if (group.status !== "waiting") {
    return group;
  }

  const questions = await generateInterviewQuestions({
    role: group.role,
    level: group.level,
    interviewType: group.interviewType,
    focusAreas: group.focusAreas,
    questionCount: group.questionCount,
  });

  group.questions = questions;
  group.status = "active";
  group.currentQuestionIndex = 0;
  group.answers = [];
  group.evaluations = [];
  await group.save();

  return group;
}

module.exports = {
  createGroup,
  joinGroup,
  getGroup,
  startGroupSession,
  serializeGroup,
  populateGroup,
};
