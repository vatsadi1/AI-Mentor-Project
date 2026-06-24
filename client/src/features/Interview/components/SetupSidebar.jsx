import {
  EXPERIENCE_LEVELS,
  FOCUS_CHIPS,
  INTERVIEW_TYPES,
  QUESTION_COUNT,
  ROLE_OPTIONS,
  VIEW_PHASE,
} from "../constants";

function FieldError({ message, id }) {
  if (!message) return null;
  return (
    <p id={id} className="pf-field-error" role="alert">
      {message}
    </p>
  );
}

export default function SetupSidebar({
  form,
  selectedFocus,
  fieldErrors,
  submitError,
  phase,
  onFormChange,
  onToggleFocus,
  onSubmit,
  onReset,
  hasSession,
}) {
  const isLoading = phase === VIEW_PHASE.LOADING;
  const isActive =
    phase === VIEW_PHASE.PRACTICE ||
    phase === VIEW_PHASE.EVALUATING ||
    phase === VIEW_PHASE.FEEDBACK ||
    phase === VIEW_PHASE.COMPLETE;

  return (
    <aside className="pf-sidebar" aria-label="Interview configuration">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}
      >
        <div className="pf-field">
          <label className="pf-label" htmlFor="interview-role">
            Target role
          </label>
          <select
            id="interview-role"
            className={`pf-select${fieldErrors.role ? " invalid" : ""}`}
            value={form.role}
            onChange={(e) => onFormChange("role", e.target.value)}
            disabled={isActive}
            aria-invalid={Boolean(fieldErrors.role)}
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
          <div className="pf-level-grid" role="group" aria-label="Experience level">
            {EXPERIENCE_LEVELS.map((level) => (
              <button
                key={level.value}
                type="button"
                className={`pf-lvl${form.level === level.value ? " active" : ""}`}
                onClick={() => !isActive && onFormChange("level", level.value)}
                aria-pressed={form.level === level.value}
                disabled={isActive}
              >
                {level.label}
              </button>
            ))}
          </div>
          <FieldError message={fieldErrors.level} />
        </div>

        <div className="pf-field">
          <span className="pf-label">Interview type</span>
          <div className="pf-goal-grid" role="group" aria-label="Interview type">
            {INTERVIEW_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                className={`pf-goal${form.interviewType === type.value ? " active" : ""}`}
                onClick={() => !isActive && onFormChange("interviewType", type.value)}
                aria-pressed={form.interviewType === type.value}
                disabled={isActive}
                title={type.description}
              >
                {type.label}
              </button>
            ))}
          </div>
          <FieldError message={fieldErrors.interviewType} />
        </div>

        <div className="pf-field">
          <span className="pf-label">Focus areas (optional)</span>
          <div className="pf-chips" role="group" aria-label="Focus areas">
            {FOCUS_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                className={`pf-chip${selectedFocus.has(chip) ? " active" : ""}`}
                onClick={() => !isActive && onToggleFocus(chip)}
                aria-pressed={selectedFocus.has(chip)}
                disabled={isActive}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <div className="pf-field">
          <label className="pf-label" htmlFor="question-count">
            Number of questions
          </label>
          <div className="pf-slider-row">
            <input
              id="question-count"
              type="range"
              min={QUESTION_COUNT.min}
              max={QUESTION_COUNT.max}
              step="1"
              value={form.questionCount}
              onChange={(e) => onFormChange("questionCount", Number(e.target.value))}
              disabled={isActive}
            />
            <span className="pf-slider-val">{form.questionCount} Qs</span>
          </div>
          <FieldError message={fieldErrors.questionCount} />
        </div>

        {submitError && (
          <div className="pf-error-banner" role="alert">
            {submitError}
          </div>
        )}

        {!hasSession ? (
          <button type="submit" className="pf-gen-btn" disabled={isLoading}>
            {isLoading ? "Preparing session…" : "Start interview ↗"}
          </button>
        ) : (
          <button type="button" className="pf-secondary-btn" onClick={onReset}>
            Start new session
          </button>
        )}
      </form>
    </aside>
  );
}
