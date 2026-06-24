import {
  FOCUS_OPTIONS,
  LANGUAGE_OPTIONS,
  MAX_CODE_LENGTH,
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

export default function CodeInputSidebar({
  form,
  fieldErrors,
  submitError,
  phase,
  onFormChange,
  onSubmit,
}) {
  const isLoading = phase === VIEW_PHASE.LOADING;
  const charCount = form.code?.length ?? 0;
  const charWarn = charCount > MAX_CODE_LENGTH * 0.9;

  return (
    <aside className="pf-sidebar" aria-label="Code review configuration">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}
      >
        <div className="pf-field">
          <label className="pf-label" htmlFor="language">
            Language
          </label>
          <select
            id="language"
            className={`pf-select${fieldErrors.language ? " invalid" : ""}`}
            value={form.language}
            onChange={(e) => onFormChange("language", e.target.value)}
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError message={fieldErrors.language} />
        </div>

        <div className="pf-field">
          <span className="pf-label">Review focus</span>
          <div className="pf-chips">
            {FOCUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`pf-chip${form.reviewFocus === option.value ? " active" : ""}`}
                onClick={() => onFormChange("reviewFocus", option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pf-field">
          <label className="pf-label" htmlFor="code-snippet">
            Code snippet
          </label>
          <textarea
            id="code-snippet"
            className={`pf-code-editor${fieldErrors.code ? " invalid" : ""}`}
            placeholder="// Paste your code here for AI review…"
            value={form.code}
            onChange={(e) => onFormChange("code", e.target.value)}
            spellCheck={false}
            rows={12}
          />
          <div className={`pf-char-count${charWarn ? " warn" : ""}`}>
            {charCount.toLocaleString()} / {MAX_CODE_LENGTH.toLocaleString()}
          </div>
          <FieldError message={fieldErrors.code} />
        </div>

        <div className="pf-field">
          <label className="pf-label" htmlFor="context">
            Context (optional)
          </label>
          <textarea
            id="context"
            className="pf-textarea"
            placeholder="Describe what this code does, framework used, or specific concerns…"
            value={form.context}
            onChange={(e) => onFormChange("context", e.target.value)}
            rows={3}
          />
        </div>

        <div className="pf-divider" />

        <p
          style={{
            fontSize: 10,
            color: "#444460",
            lineHeight: 1.6,
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          AI reviews correctness, security, performance, maintainability, and best practices — like
          a senior engineer on your PR.
        </p>

        {submitError && (
          <div className="pf-error-banner" role="alert">
            {submitError}
          </div>
        )}

        <button type="submit" className="pf-gen-btn" disabled={isLoading}>
          {isLoading ? "Reviewing…" : "Review code ↗"}
        </button>
      </form>
    </aside>
  );
}
