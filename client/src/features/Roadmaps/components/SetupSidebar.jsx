import {
  DEADLINE_PRESETS,
  GOAL_TYPES,
  HOURS_RANGE,
  ROLE_OPTIONS,
  SKILL_LEVELS,
  TECH_CHIPS,
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
  selectedTech,
  fieldErrors,
  submitError,
  phase,
  onFormChange,
  onToggleTech,
  onSubmit,
}) {
  const isLoading = phase === VIEW_PHASE.LOADING;

  return (
    <aside className="pf-sidebar" aria-label="Roadmap configuration">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}
      >
        <div className="pf-field">
          <label className="pf-label" htmlFor="target-role">
            Target role
          </label>
          <select
            id="target-role"
            className={`pf-select${fieldErrors.role ? " invalid" : ""}`}
            value={form.role}
            onChange={(e) => onFormChange("role", e.target.value)}
            aria-invalid={Boolean(fieldErrors.role)}
            aria-describedby={fieldErrors.role ? "role-error" : undefined}
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value || "empty"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError message={fieldErrors.role} id="role-error" />
        </div>

        <div className="pf-field">
          <span className="pf-label">Tech stack</span>
          <div className="pf-chips" role="group" aria-label="Select technologies">
            {TECH_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                className={`pf-chip${selectedTech.has(chip) ? " active" : ""}`}
                onClick={() => onToggleTech(chip)}
                aria-pressed={selectedTech.has(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
          <FieldError message={fieldErrors.techStack} />
        </div>

        <div className="pf-field">
          <span className="pf-label">Current level</span>
          <div className="pf-level-grid" role="group" aria-label="Skill level">
            {SKILL_LEVELS.map((level) => (
              <button
                key={level.value}
                type="button"
                className={`pf-lvl${form.level === level.value ? " active" : ""}`}
                onClick={() => onFormChange("level", level.value)}
                aria-pressed={form.level === level.value}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pf-field">
          <label className="pf-label" htmlFor="hours-slider">
            Weekly time commitment
          </label>
          <div className="pf-slider-row">
            <input
              id="hours-slider"
              type="range"
              min={HOURS_RANGE.min}
              max={HOURS_RANGE.max}
              step={HOURS_RANGE.step}
              value={form.hoursPerWeek}
              onChange={(e) => onFormChange("hoursPerWeek", Number(e.target.value))}
            />
            <span className="pf-slider-val">{form.hoursPerWeek} hrs/wk</span>
          </div>
          <FieldError message={fieldErrors.hoursPerWeek} />
        </div>

        <div className="pf-field">
          <span className="pf-label">Goal type</span>
          <div className="pf-goal-grid" role="group" aria-label="Goal type">
            {GOAL_TYPES.map((goal) => (
              <button
                key={goal.value}
                type="button"
                className={`pf-goal${form.goalType === goal.value ? " active" : ""}`}
                onClick={() => onFormChange("goalType", goal.value)}
                aria-pressed={form.goalType === goal.value}
              >
                {goal.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pf-divider" />

        <div className="pf-field">
          <span className="pf-label">Include projects</span>
          <div className="pf-toggle-row">
            <div>
              <div className="pf-toggle-label">Projects per week</div>
              <div className="pf-toggle-sub">Hands-on build tasks</div>
            </div>
            <label className="pf-switch">
              <input
                type="checkbox"
                checked={form.includeProjects}
                onChange={(e) => onFormChange("includeProjects", e.target.checked)}
              />
              <span className="pf-switch-slider" />
            </label>
          </div>
        </div>

        <div className="pf-field">
          <span className="pf-label">Deadline — complete in</span>
          <div className="pf-deadline-box">
            <div className="pf-deadline-top">
              <div>
                <div className="pf-dl-val">{form.deadlineDays}</div>
                <div className="pf-dl-unit">days from today</div>
              </div>
              <input
                type="range"
                min="7"
                max="180"
                step="1"
                value={form.deadlineDays}
                onChange={(e) => onFormChange("deadlineDays", Number(e.target.value))}
                style={{ width: 110, accentColor: "#7c6ef0" }}
                aria-label="Deadline in days"
              />
            </div>
            <div className="pf-dl-badges">
              {DEADLINE_PRESETS.map((preset) => (
                <button
                  key={preset.days}
                  type="button"
                  className={`pf-dl-badge${form.deadlineDays === preset.days ? " active" : ""}`}
                  onClick={() => onFormChange("deadlineDays", preset.days)}
                  aria-pressed={form.deadlineDays === preset.days}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
          <FieldError message={fieldErrors.deadlineDays} />
        </div>

        {submitError && (
          <div className="pf-error-banner" role="alert">
            {submitError}
          </div>
        )}

        <button type="submit" className="pf-gen-btn" disabled={isLoading}>
          {isLoading ? "Generating…" : "Generate roadmap ↗"}
        </button>
      </form>
    </aside>
  );
}
