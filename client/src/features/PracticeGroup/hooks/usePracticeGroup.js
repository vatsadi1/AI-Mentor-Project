import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { VIEW_PHASE } from "../constants";
import {
  createPracticeGroup,
  fetchPracticeGroup,
  getErrorMessage,
  joinPracticeGroup,
} from "../services/practiceGroupService";
import {
  connectSocket,
  disconnectSocket,
  joinRoom,
  nextQuestion,
  startSession,
  submitAnswer,
} from "../services/socketService";
import { buildCreatePayload, validateAnswer, validateCreateForm, validateJoinCode } from "../utils/validation";

function enrichGroup(group, userId) {
  if (!group || !userId) return group;
  const uid = String(userId);
  return {
    ...group,
    isHost: group.host ? String(group.host.id) === uid : false,
    host: group.host ? { ...group.host, isYou: String(group.host.id) === uid } : null,
    guest: group.guest ? { ...group.guest, isYou: String(group.guest.id) === uid } : null,
  };
}

export function usePracticeGroup(initialRoomCode = "") {
  const { user } = useAuth();
  const [phase, setPhase] = useState(initialRoomCode ? VIEW_PHASE.JOINING : VIEW_PHASE.LOBBY);
  const [mode, setMode] = useState(initialRoomCode ? "join" : "create");
  const [group, setGroup] = useState(null);
  const [joinCode, setJoinCode] = useState(initialRoomCode);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [answerError, setAnswerError] = useState("");
  const [answer, setAnswer] = useState("");
  const [peerSubmitted, setPeerSubmitted] = useState(false);
  const [selfSubmitted, setSelfSubmitted] = useState(false);
  const [processingEval, setProcessingEval] = useState(false);
  const [currentResults, setCurrentResults] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [peerOnline, setPeerOnline] = useState(false);
  const joinedRef = useRef(false);
  const userId = user?.id || user?._id;

  const applyGroup = useCallback(
    (g) => enrichGroup(g, userId),
    [userId]
  );

  const roomCode = group?.roomCode || joinCode.trim().toUpperCase();
  const currentQuestion = group?.questions?.[group?.currentQuestionIndex] ?? null;
  const isHost = group?.isHost ?? false;

  const resetQuestionState = useCallback(() => {
    setAnswer("");
    setAnswerError("");
    setPeerSubmitted(false);
    setSelfSubmitted(false);
    setProcessingEval(false);
    setCurrentResults([]);
  }, []);

  const refreshGroup = useCallback(async () => {
    const code = group?.roomCode || joinCode.trim().toUpperCase();
    if (!code) return;
    try {
      const data = await fetchPracticeGroup(code);
      setGroup(applyGroup(data.group));
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    }
  }, [group?.roomCode, joinCode, applyGroup]);

  const setupSocketListeners = useCallback(
    (socket) => {
      socket.off("room:joined");
      socket.off("room:peer-joined");
      socket.off("room:presence");
      socket.off("room:error");
      socket.off("session:started");
      socket.off("answer:received");
      socket.off("evaluations:processing");
      socket.off("evaluations:ready");
      socket.off("question:changed");
      socket.off("session:complete");

      socket.on("room:joined", ({ group: g }) => {
        setGroup(applyGroup(g));
        setPhase(g.status === "active" ? VIEW_PHASE.PRACTICE : VIEW_PHASE.WAITING);
        setSubmitError("");
      });

      socket.on("room:peer-joined", () => {
        setPeerOnline(true);
        refreshGroup();
      });

      socket.on("room:presence", ({ userId, online }) => {
        if (userId !== String(user?.id || user?._id)) {
          setPeerOnline(online);
        }
      });

      socket.on("room:error", ({ message }) => {
        setSubmitError(message);
        setPhase((current) => {
          if (current === VIEW_PHASE.STARTING) return VIEW_PHASE.WAITING;
          if (current === VIEW_PHASE.EVALUATING) return VIEW_PHASE.PRACTICE;
          return current;
        });
      });

      socket.on("session:started", ({ group: g }) => {
        setGroup(applyGroup(g));
        resetQuestionState();
        setPhase(VIEW_PHASE.PRACTICE);
        setSubmitError("");
      });

      socket.on("answer:received", ({ userId, submittedCount, totalParticipants }) => {
        const myId = String(user?.id || user?._id);
        if (userId !== myId) setPeerSubmitted(true);
        else setSelfSubmitted(true);

        if (submittedCount < totalParticipants) {
          setPhase(VIEW_PHASE.EVALUATING);
        }
      });

      socket.on("evaluations:processing", () => {
        setProcessingEval(true);
        setPhase(VIEW_PHASE.EVALUATING);
      });

      socket.on("evaluations:ready", ({ results, topic, questionIndex }) => {
        setProcessingEval(false);
        setCurrentResults(results);
        setAllResults((prev) => [...prev, { questionIndex, topic, results }]);
        setPhase(VIEW_PHASE.FEEDBACK);
      });

      socket.on("question:changed", ({ group: g }) => {
        setGroup(applyGroup(g));
        resetQuestionState();
        setPhase(VIEW_PHASE.PRACTICE);
      });

      socket.on("session:complete", ({ group: g }) => {
        setGroup(applyGroup(g));
        setPhase(VIEW_PHASE.COMPLETE);
      });
    },
    [user, resetQuestionState, refreshGroup, applyGroup]
  );

  useEffect(() => {
    const socket = connectSocket();
    setupSocketListeners(socket);

    return () => {
      socket.off("room:joined");
      socket.off("room:peer-joined");
      socket.off("room:presence");
      socket.off("room:error");
      socket.off("session:started");
      socket.off("answer:received");
      socket.off("evaluations:processing");
      socket.off("evaluations:ready");
      socket.off("question:changed");
      socket.off("session:complete");
    };
  }, [setupSocketListeners]);

  useEffect(() => {
    if (!initialRoomCode || joinedRef.current) return;

    async function autoJoin() {
      joinedRef.current = true;
      setPhase(VIEW_PHASE.JOINING);
      try {
        const data = await joinPracticeGroup(initialRoomCode);
        setGroup(applyGroup(data.group));
        joinRoom(data.group.roomCode);
        setPhase(VIEW_PHASE.WAITING);
      } catch (error) {
        setSubmitError(getErrorMessage(error));
        setPhase(VIEW_PHASE.ERROR);
      }
    }

    autoJoin();
  }, [initialRoomCode, applyGroup]);

  const createGroup = useCallback(async (form, selectedFocus) => {
    const validation = validateCreateForm(form);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setSubmitError("Fix the highlighted fields before creating a room.");
      return;
    }

    setFieldErrors({});
    setSubmitError("");
    setPhase(VIEW_PHASE.CREATING);

    try {
      const payload = buildCreatePayload(form, selectedFocus);
      const data = await createPracticeGroup(payload);
      setGroup(applyGroup(data.group));
      joinRoom(data.group.roomCode);
      setPhase(VIEW_PHASE.WAITING);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
      setPhase(VIEW_PHASE.ERROR);
    }
  }, [applyGroup]);

  const joinGroup = useCallback(async (code) => {
    const validation = validateJoinCode(code);
    if (!validation.isValid) {
      setSubmitError(validation.error);
      return;
    }

    setSubmitError("");
    setPhase(VIEW_PHASE.JOINING);

    try {
      const data = await joinPracticeGroup(code);
      setGroup(applyGroup(data.group));
      joinRoom(data.group.roomCode);
      setPhase(VIEW_PHASE.WAITING);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
      setPhase(VIEW_PHASE.LOBBY);
    }
  }, [applyGroup]);

  const handleStartSession = useCallback(() => {
    if (!roomCode) return;
    setPhase(VIEW_PHASE.STARTING);
    startSession(roomCode);
  }, [roomCode]);

  const handleSubmitAnswer = useCallback(() => {
    const validation = validateAnswer(answer);
    if (!validation.isValid) {
      setAnswerError(validation.error);
      return;
    }

    if (!currentQuestion || !roomCode) return;

    setAnswerError("");
    setSelfSubmitted(true);
    setPhase(VIEW_PHASE.EVALUATING);
    submitAnswer(roomCode, currentQuestion.id, answer.trim());
  }, [answer, currentQuestion, roomCode]);

  const handleNextQuestion = useCallback(() => {
    if (!roomCode || !isHost) return;
    nextQuestion(roomCode);
  }, [roomCode, isHost]);

  const leaveRoom = useCallback(() => {
    disconnectSocket();
    setGroup(null);
    setJoinCode("");
    resetQuestionState();
    setAllResults([]);
    setPhase(VIEW_PHASE.LOBBY);
    joinedRef.current = false;
  }, [resetQuestionState]);

  return {
    phase,
    mode,
    setMode,
    group,
    joinCode,
    setJoinCode,
    fieldErrors,
    submitError,
    answerError,
    answer,
    setAnswer,
    peerSubmitted,
    selfSubmitted,
    processingEval,
    currentResults,
    allResults,
    peerOnline,
    roomCode,
    currentQuestion,
    isHost,
    createGroup,
    joinGroup,
    handleStartSession,
    handleSubmitAnswer,
    handleNextQuestion,
    refreshGroup,
    leaveRoom,
  };
}
