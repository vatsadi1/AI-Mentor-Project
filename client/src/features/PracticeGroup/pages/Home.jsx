import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { INITIAL_FORM, VIEW_PHASE } from "../constants";
import SetupSidebar from "../components/SetupSidebar";
import SessionPanel from "../components/SessionPanel";
import { usePracticeGroup } from "../hooks/usePracticeGroup";
import { practiceGroupStyles } from "../styles/practiceGroupStyles";

export default function PracticeGroupHome() {
  const { roomCode: urlRoomCode } = useParams();
  const { user } = useAuth();
  const [form, setForm] = useState(INITIAL_FORM);
  const [selectedFocus, setSelectedFocus] = useState(new Set());

  const {
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
    currentQuestion,
    isHost,
    createGroup,
    joinGroup,
    handleStartSession,
    handleSubmitAnswer,
    handleNextQuestion,
    leaveRoom,
  } = usePracticeGroup(urlRoomCode || "");

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

  const handleCreate = useCallback(() => {
    createGroup(form, selectedFocus);
  }, [form, selectedFocus, createGroup]);

  const handleJoin = useCallback(() => {
    joinGroup(joinCode);
  }, [joinCode, joinGroup]);

  const currentUserId = user?.id || user?._id;

  return (
    <>
      <style>{practiceGroupStyles}</style>
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
            <span className="pf-topbar-right">Friend Mock Practice</span>
          </div>
        </header>

        <div className="pf-layout">
          <SetupSidebar
            mode={mode}
            setMode={setMode}
            form={form}
            selectedFocus={selectedFocus}
            joinCode={joinCode}
            setJoinCode={setJoinCode}
            fieldErrors={fieldErrors}
            submitError={submitError}
            phase={phase}
            group={group}
            onFormChange={handleFormChange}
            onToggleFocus={handleToggleFocus}
            onCreate={handleCreate}
            onJoin={handleJoin}
            onLeave={leaveRoom}
            onStartSession={handleStartSession}
            peerOnline={peerOnline}
          />

          <SessionPanel
            phase={phase}
            group={group}
            currentQuestion={currentQuestion}
            answer={answer}
            setAnswer={setAnswer}
            answerError={answerError}
            submitError={submitError}
            peerSubmitted={peerSubmitted}
            selfSubmitted={selfSubmitted}
            processingEval={processingEval}
            currentResults={currentResults}
            allResults={allResults}
            currentUserId={currentUserId}
            isHost={isHost}
            onSubmitAnswer={handleSubmitAnswer}
            onNextQuestion={handleNextQuestion}
          />
        </div>
      </div>
    </>
  );
}
