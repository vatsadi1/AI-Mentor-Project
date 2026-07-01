import {
  EXPERIENCE_LEVELS,
  FOCUS_CHIPS,
  INTERVIEW_TYPES,
  QUESTION_COUNT,
  ROLE_OPTIONS,
  VIEW_PHASE,
} from "../constants";

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="pf-field-error" role="alert">
      {message}
    </p>
  );
}

export default function SetupSidebar({
  mode,
  setMode,
  form,
  selectedFocus,
  joinCode,
  setJoinCode,
  fieldErrors,
  submitError,
  phase,
  group,
  onFormChange,
  onToggleFocus,
  onCreate,
  onJoin,
  onLeave,
  onStartSession,
  peerOnline,
}) {
  const isBusy =
    phase === VIEW_PHASE.CREATING ||
    phase === VIEW_PHASE.JOINING ||
    phase === VIEW_PHASE.STARTING;

  const inRoom = Boolean(group);
  const canStart =
    inRoom &&
    group.isHost &&
    group.guest &&
    group.status === "waiting" &&
    phase === VIEW_PHASE.WAITING;

  return (
    <aside className="pf-sidebar" aria-label="Practice group setup">
      {!inRoom ? (
        <>
          <div className="pf-mode-tabs">
            <button
              type="button"
              className={`pf-mode-tab${mode === "create" ? " active" : ""}`}
              onClick={() => setMode("create")}
            >
              Create room
            </button>
            <button
              type="button"
              className={`pf-mode-tab${mode === "join" ? " active" : ""}`}
              onClick={() => setMode("join")}
            >
              Join friend
            </button>
          </div>

          {mode === "create" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onCreate();
              }}
              style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}
            >
              <div className="pf-field">
                <label className="pf-label" htmlFor="pg-topic">
                  Session topic (optional)
                </label>
                <input
                  id="pg-topic"
                  type="text"
                  className="pf-select"
                  value={form.topicName}
                  onChange={(e) => onFormChange("topicName", e.target.value)}
                  placeholder="e.g. Frontend Mock — React focus"
                />
              </div>

              <div className="pf-field">
                <label className="pf-label" htmlFor="pg-role">
                  Target role
                </label>
                <select
                  id="pg-role"
                  className={`pf-select${fieldErrors.role ? " invalid" : ""}`}
                  value={form.role}
                  onChange={(e) => onFormChange("role", e.target.value)}
                >
                  {ROLE_OPTIONS.map((option) => (
                    <option key={option.value || "empty"} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FieldError message={fieldErrors.role} />
              </div>

              <div className="pf-field">
                <span className="pf-label">Experience level</span>
                <div className="pf-level-grid" role="group">
                  {EXPERIENCE_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      className={`pf-lvl${form.level === level.value ? " active" : ""}`}
                      onClick={() => onFormChange("level", level.value)}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pf-field">
                <span className="pf-label">Interview type</span>
                <div className="pf-goal-grid" role="group">
                  {INTERVIEW_TYPES.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      className={`pf-goal${form.interviewType === type.value ? " active" : ""}`}
                      onClick={() => onFormChange("interviewType", type.value)}
                      title={type.description}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pf-field">
                <span className="pf-label">Focus areas (optional)</span>
                <div className="pf-chips" role="group">
                  {FOCUS_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      className={`pf-chip${selectedFocus.has(chip) ? " active" : ""}`}
                      onClick={() => onToggleFocus(chip)}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pf-field">
                <label className="pf-label" htmlFor="pg-count">
                  Number of questions
                </label>
                <div className="pf-slider-row">
                  <input
                    id="pg-count"
                    type="range"
                    min={QUESTION_COUNT.min}
                    max={QUESTION_COUNT.max}
                    step="1"
                    value={form.questionCount}
                    onChange={(e) => onFormChange("questionCount", Number(e.target.value))}
                  />
                  <span className="pf-slider-val">{form.questionCount} Qs</span>
                </div>
              </div>

              {submitError && <div className="pf-error-banner" role="alert">{submitError}</div>}

              <button type="submit" className="pf-gen-btn" disabled={isBusy}>
                {isBusy ? "Creating room…" : "Create practice room ↗"}
              </button>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onJoin();
              }}
              style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}
            >
              <div className="pf-field">
                <label className="pf-label" htmlFor="pg-join-code">
                  Friend&apos;s room code
                </label>
                <input
                  id="pg-join-code"
                  type="text"
                  className="pf-join-input"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="ABC123"
                  maxLength={8}
                />
              </div>

              {submitError && <div className="pf-error-banner" role="alert">{submitError}</div>}

              <button type="submit" className="pf-gen-btn" disabled={isBusy}>
                {isBusy ? "Joining…" : "Join practice room ↗"}
              </button>
            </form>
          )}
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
          <div>
            <p className="pf-label">Room code — share with friend</p>
            <div className="pf-room-code">{group.roomCode}</div>
          </div>

          <div>
            <p className="pf-label">Topic</p>
            <p style={{ fontSize: "13px", color: "#c4c4d8" }}>{group.topicName}</p>
          </div>

          <div>
            <p className="pf-label">Participants</p>
            <div className="pf-participant-row">
              <span className={`pf-participant-chip${group.host?.isYou ? " you" : ""} online`}>
                {group.host?.name}{group.host?.isYou ? " (you)" : ""} · Host
              </span>
              {group.guest ? (
                <span
                  className={`pf-participant-chip${group.guest?.isYou ? " you" : ""} ${peerOnline ? "online" : "offline"}`}
                >
                  {group.guest.name}{group.guest.isYou ? " (you)" : ""}
                </span>
              ) : (
                <span className="pf-participant-chip offline">Waiting for friend…</span>
              )}
            </div>
          </div>

          <div>
            <p className="pf-label">Status</p>
            <p style={{ fontSize: "12px", color: "#7878a0" }}>
              <span className={`pf-status-dot ${group.status}`} />
              {group.status === "waiting" && "Waiting to start"}
              {group.status === "active" && "Session in progress"}
              {group.status === "complete" && "Session complete"}
            </p>
          </div>

          {!group.guest && group.isHost && (
            <div className="pf-waiting-banner">
              Share the room code above. Your friend must log in and join before you can start.
            </div>
          )}

          {canStart && (
            <button type="button" className="pf-gen-btn" onClick={onStartSession} disabled={isBusy}>
              {isBusy ? "Starting session…" : "Start mock practice ↗"}
            </button>
          )}

          {!group.isHost && group.status === "waiting" && (
            <div className="pf-waiting-banner">
              Waiting for the host to start the session…
            </div>
          )}

          {submitError && <div className="pf-error-banner" role="alert">{submitError}</div>}

          <button type="button" className="pf-secondary-btn" onClick={onLeave}>
            Leave room
          </button>
        </div>
      )}
    </aside>
  );
}
