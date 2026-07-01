const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");
const userModel = require("../model/user.model.js");
const practiceGroupModel = require("../model/practiceGroup.model.js");
const { evaluateInterviewAnswer } = require("../ai/interviewAgent.js");
const {
  startGroupSession,
  serializeGroup,
  populateGroup,
} = require("../controller/practiceGroupController.js");

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return secret;
}

async function authenticateSocket(socket, next) {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Authentication required"));
    }

    const payload = jwt.verify(token, getJwtSecret());
    const user = await userModel.findById(payload.sub).select("-password");
    if (!user) {
      return next(new Error("Invalid token"));
    }

    socket.user = user;
    next();
  } catch {
    next(new Error("Invalid token"));
  }
}

function getParticipantIds(group) {
  const hostId = group.hostId?._id || group.hostId;
  const guestId = group.guestId?._id || group.guestId;
  return [String(hostId), guestId ? String(guestId) : null].filter(Boolean);
}

async function loadGroup(roomCode) {
  return populateGroup(practiceGroupModel.findOne({ roomCode: roomCode.toUpperCase() }));
}

async function emitRoomState(io, roomCode, userId) {
  const group = await loadGroup(roomCode);
  if (!group) return;
  io.to(roomCode).emit("room:state", { group: serializeGroup(group, userId) });
}

async function evaluateQuestionAnswers(group, question) {
  const participantIds = getParticipantIds(group);
  const questionAnswers = group.answers.filter((a) => a.questionId === question.id);
  const results = [];

  for (const participantId of participantIds) {
    const answerDoc = questionAnswers.find((a) => String(a.userId) === participantId);
    if (!answerDoc) continue;

    const user =
      String(group.hostId._id || group.hostId) === participantId
        ? group.hostId
        : group.guestId;

    const evaluation = await evaluateInterviewAnswer({
      role: group.role,
      level: group.level,
      interviewType: group.interviewType,
      question: question.question,
      category: question.category,
      difficulty: question.difficulty,
      answer: answerDoc.answer,
    });

    const entry = {
      userId: participantId,
      userName: user?.name || "Participant",
      questionId: question.id,
      topic: question.category,
      answer: answerDoc.answer,
      evaluation,
      evaluatedAt: new Date(),
    };

    group.evaluations.push(entry);
    results.push(entry);
  }

  await group.save();
  return results;
}

function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    let joinedRoom = null;

    socket.on("room:join", async ({ roomCode }) => {
      try {
        if (!roomCode?.trim()) {
          socket.emit("room:error", { message: "Room code is required" });
          return;
        }

        const code = roomCode.trim().toUpperCase();
        const group = await loadGroup(code);

        if (!group) {
          socket.emit("room:error", { message: "Room not found" });
          return;
        }

        const userId = String(socket.user._id);
        const participantIds = getParticipantIds(group);

        if (!participantIds.includes(userId)) {
          socket.emit("room:error", { message: "You are not a member of this room" });
          return;
        }

        if (joinedRoom) socket.leave(joinedRoom);
        joinedRoom = code;
        socket.join(code);

        io.to(code).emit("room:presence", {
          userId,
          userName: socket.user.name,
          online: true,
        });

        const serialized = serializeGroup(group, socket.user._id);
        socket.emit("room:joined", { group: serialized });
        socket.to(code).emit("room:peer-joined", {
          user: { id: userId, name: socket.user.name },
        });
      } catch (error) {
        console.error("room:join error:", error);
        socket.emit("room:error", { message: "Failed to join room" });
      }
    });

    socket.on("session:start", async ({ roomCode }) => {
      try {
        const code = roomCode?.trim().toUpperCase();
        const group = await loadGroup(code);

        if (!group) {
          socket.emit("room:error", { message: "Room not found" });
          return;
        }

        if (String(group.hostId._id || group.hostId) !== String(socket.user._id)) {
          socket.emit("room:error", { message: "Only the host can start the session" });
          return;
        }

        const updated = await startGroupSession(group._id);
        const populated = await populateGroup(practiceGroupModel.findById(updated._id));

        io.to(code).emit("session:started", {
          group: serializeGroup(populated, null),
        });
      } catch (error) {
        console.error("session:start error:", error);
        socket.emit("room:error", { message: error.message || "Failed to start session" });
      }
    });

    socket.on("answer:submit", async ({ roomCode, questionId, answer }) => {
      try {
      const code = roomCode?.trim().toUpperCase();
      const trimmedAnswer = answer?.trim();
      
      
      if (!questionId || !trimmedAnswer) {
        return socket.emit("room:error", {
          message: "Question and answer are required",
        });
      }
      
      const group = await loadGroup(code);
      
      if (!group || group.status !== "active") {
        return socket.emit("room:error", {
          message: "Session is not active",
        });
      }
      
      const userId = String(socket.user._id);
      const participantIds = getParticipantIds(group);
      
      const currentQuestion =
        group.questions[group.currentQuestionIndex];
      
      if (!currentQuestion || currentQuestion.id !== questionId) {
        return socket.emit("room:error", {
          message: "This is not the current question",
        });
      }
      
      const alreadySubmitted = group.answers.some(
        (a) =>
          a.questionId === questionId &&
          String(a.userId) === userId
      );
      
      if (alreadySubmitted) {
        return socket.emit("room:error", {
          message:
            "You already submitted an answer for this question",
        });
      }
      
      group.answers.push({
        userId: socket.user._id,
        questionId,
        answer: trimmedAnswer,
      });
      
      await group.save();
      
      // =========================
      // ONLY TO SUBMITTER
      // =========================
      
      socket.emit("answer:submitted", {
        questionId,
        message:
          "Answer submitted successfully. Waiting for your friend...",
      });
      
      // =========================
      // ONLY TO FRIEND
      // =========================
      
      socket.to(code).emit("peer:submitted", {
        questionId,
        userId,
        userName: socket.user.name,
        message:
          `${socket.user.name} has submitted an answer.`,
      });
      
      const submissionsForQuestion = group.answers.filter(
        (a) => a.questionId === questionId
      );
      
      // =========================
      // BOTH USERS ANSWERED
      // =========================
      
      if (
        submissionsForQuestion.length ===
        participantIds.length
      ) {
        io.to(code).emit(
          "evaluations:processing",
          {
            questionId,
            topic: currentQuestion.category,
          }
        );
      
        const results =
          await evaluateQuestionAnswers(
            group,
            currentQuestion
          );
      
        io.to(code).emit("evaluations:ready", {
          questionId,
          topic: currentQuestion.category,
          questionIndex:
            group.currentQuestionIndex,
          results: results.map((r) => ({
            userId: r.userId,
            userName: r.userName,
            topic: r.topic,
            overallScore:
              r.evaluation.overallScore,
            scores: r.evaluation.scores,
            verdict: r.evaluation.verdict,
            summary: r.evaluation.summary,
            strengths: r.evaluation.strengths,
            improvements:
              r.evaluation.improvements,
            deliveryFeedback:
              r.evaluation.deliveryFeedback,
            followUpQuestion:
              r.evaluation.followUpQuestion,
          })),
        });
      }
      
      
      } catch (error) {
      console.error(
      "answer:submit error:",
      error
      );
      
    
      socket.emit("room:error", {
        message: "Failed to submit answer",
      });
      
      
      }
      });
      

    socket.on("question:next", async ({ roomCode }) => {
      try {
        const code = roomCode?.trim().toUpperCase();
        const group = await practiceGroupModel.findOne({ roomCode: code });

        if (!group) {
          socket.emit("room:error", { message: "Room not found" });
          return;
        }

        if (String(group.hostId._id || group.hostId) !== String(socket.user._id)) {
          socket.emit("room:error", { message: "Only the host can advance questions" });
          return;
        }

        const nextIndex = group.currentQuestionIndex + 1;

        if (nextIndex >= group.questions.length) {
          group.status = "complete";
          await group.save();
          const populated = await populateGroup(practiceGroupModel.findById(group._id));
          io.to(code).emit("session:complete", {
            group: serializeGroup(populated, null),
          });
          return;
        }

        group.currentQuestionIndex = nextIndex;
        await group.save();

        const populated = await populateGroup(practiceGroupModel.findById(group._id));
        io.to(code).emit("question:changed", {
          group: serializeGroup(populated, null),
          questionIndex: nextIndex,
          question: group.questions[nextIndex],
        });
      } catch (error) {
        console.error("question:next error:", error);
        socket.emit("room:error", { message: "Failed to advance question" });
      }
    });

    socket.on("disconnect", () => {
      if (joinedRoom) {
        socket.to(joinedRoom).emit("room:presence", {
          userId: String(socket.user._id),
          userName: socket.user.name,
          online: false,
        });
      }
    });
  });

  return io;
}

module.exports = { initSocket };
