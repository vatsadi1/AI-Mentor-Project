import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  EXPERIENCE_LEVELS,
  INITIAL_FORM,
  INTERVIEW_TYPES,
  VIEW_PHASE,
} from "../constants";
import SetupSidebar from "../components/SetupSidebar";
import InterviewPanel from "../components/InterviewPanel";
import { useInterviewCoach } from "../hooks/useInterviewCoach";
import { interviewStyles } from "../styles/interviewStyles";

export default function InterviewHome() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [selectedFocus, setSelectedFocus] = useState(new Set());

  const {
    phase,
    questions,
    meta,
    currentIndex,
    currentQuestion,
    currentEvaluation,
    evaluations,
    fieldErrors,
    submitError,
    answerError,
    startSession,
    submitAnswer,
    goToNextQuestion,
    resetSession,
  } = useInterviewCoach();

  const hasSession =
    phase === VIEW_PHASE.PRACTICE ||
    phase === VIEW_PHASE.EVALUATING ||
    phase === VIEW_PHASE.FEEDBACK ||
    phase === VIEW_PHASE.COMPLETE;

  const handleFormChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleToggleFocus = useCallback((chip) => {
    setSelectedFocus((prev) => {
      const next = new Set(prev);
      if (next.has(chip)) next.delete(chip);
      else next.add(chip);
      return next;
    });
  }, []);

  const handleStart = useCallback(() => {
    const levelLabel =
      EXPERIENCE_LEVELS.find((l) => l.value === form.level)?.label ?? form.level;
    const typeLabel =
      INTERVIEW_TYPES.find((t) => t.value === form.interviewType)?.label ?? form.interviewType;

    startSession(form, selectedFocus, { levelLabel, typeLabel });
  }, [form, selectedFocus, startSession]);

  const handleReset = useCallback(() => {
    resetSession();
  }, [resetSession]);

  return (
    <>
      <style>{interviewStyles}</style>
      <div className="pf-root">
        <header className="pf-topbar">
          <Link to="/" className="pf-logo" style={{ textDecoration: "none" }}>
            <div className="pf-logo-dot" aria-hidden="true" />
            <span className="pf-logo-text">VidhyarthiMarg</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link
              to="/"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                color: "#7878a0",
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              ← Back to home
            </Link>
            <span className="pf-topbar-right">AI Interview Coach</span>
          </div>
        </header>

        <div className="pf-layout">
          <SetupSidebar
            form={form}
            selectedFocus={selectedFocus}
            fieldErrors={fieldErrors}
            submitError={submitError}
            phase={phase}
            onFormChange={handleFormChange}
            onToggleFocus={handleToggleFocus}
            onSubmit={handleStart}
            onReset={handleReset}
            hasSession={hasSession}
          />

          <InterviewPanel
            phase={phase}
            meta={meta}
            questions={questions}
            currentIndex={currentIndex}
            currentQuestion={currentQuestion}
            currentEvaluation={currentEvaluation}
            evaluations={evaluations}
            answerError={answerError}
            onSubmitAnswer={submitAnswer}
            onNextQuestion={goToNextQuestion}
          />
        </div>
      </div>
    </>
  );
}
