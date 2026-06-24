import { useCallback, useState } from "react";
import { VIEW_PHASE } from "../constants";
import {
  evaluateInterviewAnswer,
  getErrorMessage,
  startInterviewSession,
} from "../services/interviewService";
import { buildSessionPayload, validateAnswer, validateSessionForm } from "../utils/validation";

export function useInterviewCoach() {
  const [phase, setPhase] = useState(VIEW_PHASE.EMPTY);
  const [sessionId, setSessionId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [meta, setMeta] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [evaluations, setEvaluations] = useState([]);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [answerError, setAnswerError] = useState("");

  const startSession = useCallback(async (form, selectedFocus, labels) => {
    const validation = validateSessionForm(form, selectedFocus);

    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setSubmitError("Fix the highlighted fields before starting.");
      setPhase(VIEW_PHASE.ERROR);
      return;
    }

    setFieldErrors({});
    setSubmitError("");
    setAnswerError("");
    setPhase(VIEW_PHASE.LOADING);

    try {
      const payload = buildSessionPayload(form, selectedFocus);
      const data = await startInterviewSession(payload);

      if (!data.questions?.length) {
        throw new Error("No questions were generated.");
      }

      setSessionId(data.sessionId);
      setQuestions(data.questions);
      setMeta({
        ...data.meta,
        levelLabel: labels.levelLabel,
        typeLabel: labels.typeLabel,
      });
      setCurrentIndex(0);
      setEvaluations([]);
      setCurrentEvaluation(null);
      setPhase(VIEW_PHASE.PRACTICE);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
      setPhase(VIEW_PHASE.ERROR);
    }
  }, []);

  const submitAnswer = useCallback(
    async (answer, question) => {
      const validation = validateAnswer(answer);

      if (!validation.isValid) {
        setAnswerError(validation.error);
        return;
      }

      setAnswerError("");
      setPhase(VIEW_PHASE.EVALUATING);

      try {
        const data = await evaluateInterviewAnswer({
          sessionId,
          questionId: question.id,
          question: question.question,
          category: question.category,
          difficulty: question.difficulty,
          answer: answer.trim(),
        });

        const evaluation = data.evaluation;
        setCurrentEvaluation(evaluation);
        setEvaluations((prev) => [...prev, { questionId: question.id, evaluation }]);
        setPhase(VIEW_PHASE.FEEDBACK);
      } catch (error) {
        setAnswerError(getErrorMessage(error));
        setPhase(VIEW_PHASE.PRACTICE);
      }
    },
    [sessionId]
  );

  const goToNextQuestion = useCallback(() => {
    setCurrentEvaluation(null);
    setAnswerError("");

    if (currentIndex + 1 >= questions.length) {
      setPhase(VIEW_PHASE.COMPLETE);
      return;
    }

    setCurrentIndex((i) => i + 1);
    setPhase(VIEW_PHASE.PRACTICE);
  }, [currentIndex, questions.length]);

  const resetSession = useCallback(() => {
    setPhase(VIEW_PHASE.EMPTY);
    setSessionId(null);
    setQuestions([]);
    setMeta(null);
    setCurrentIndex(0);
    setEvaluations([]);
    setCurrentEvaluation(null);
    setFieldErrors({});
    setSubmitError("");
    setAnswerError("");
  }, []);

  return {
    phase,
    sessionId,
    questions,
    meta,
    currentIndex,
    currentQuestion: questions[currentIndex] ?? null,
    evaluations,
    currentEvaluation,
    fieldErrors,
    submitError,
    answerError,
    startSession,
    submitAnswer,
    goToNextQuestion,
    resetSession,
  };
}
