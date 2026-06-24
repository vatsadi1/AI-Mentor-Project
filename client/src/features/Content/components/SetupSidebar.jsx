import {
  CONTENT_TYPES,
  LENGTH_OPTIONS,
  PLATFORM_OPTIONS,
  TONE_OPTIONS,
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
  form,
  fieldErrors,
  submitError,
  phase,
  onFormChange,
  onSubmit,
}) {
  const isLoading = phase === VIEW_PHASE.LOADING;

  return (
    <aside className="pf-sidebar" aria-label="Content writer configuration">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}
      >
        <div className="pf-field">
          <span className="pf-label">Content type</span>
          <div className="pf-goal-grid" role="group" aria-label="Content type">
            {CONTENT_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                className={`pf-goal${form.contentType === type.value ? " active" : ""}`}
                onClick={() => onFormChange("contentType", type.value)}
                aria-pressed={form.contentType === type.value}
                title={type.description}
                disabled={isLoading}
              >
                {type.label}
              </button>
            ))}
          </div>
          <FieldError message={fieldErrors.contentType} />
        </div>

        <div className="pf-field">
          <label className="pf-label" htmlFor="content-topic">
            Topic / project context
          </label>
          <textarea
            id="content-topic"
            className={`pf-textarea${fieldErrors.topic ? " invalid" : ""}`}
            placeholder="Describe your project, idea, or what you want to write about. Include tech stack, problem solved, and key outcomes…"
            value={form.topic}
            onChange={(e) => onFormChange("topic", e.target.value)}
            rows={5}
            aria-invalid={Boolean(fieldErrors.topic)}
            disabled={isLoading}
          />
          <FieldError message={fieldErrors.topic} />
        </div>

        <div className="pf-field">
          <span className="pf-label">Tone</span>
          <div className="pf-level-grid" role="group" aria-label="Writing tone">
            {TONE_OPTIONS.map((tone) => (
              <button
                key={tone.value}
                type="button"
                className={`pf-lvl${form.tone === tone.value ? " active" : ""}`}
                onClick={() => onFormChange("tone", tone.value)}
                aria-pressed={form.tone === tone.value}
                disabled={isLoading}
              >
                {tone.label}
              </button>
            ))}
          </div>
          <FieldError message={fieldErrors.tone} />
        </div>

        <div className="pf-field">
          <span className="pf-label">Length</span>
          <div className="pf-level-grid" role="group" aria-label="Content length">
            {LENGTH_OPTIONS.map((len) => (
              <button
                key={len.value}
                type="button"
                className={`pf-lvl${form.length === len.value ? " active" : ""}`}
                onClick={() => onFormChange("length", len.value)}
                aria-pressed={form.length === len.value}
                title={len.description}
                disabled={isLoading}
              >
                {len.label}
              </button>
            ))}
          </div>
          <FieldError message={fieldErrors.length} />
        </div>

        <div className="pf-field">
          <label className="pf-label" htmlFor="content-audience">
            Target audience (optional)
          </label>
          <input
            id="content-audience"
            type="text"
            className="pf-input"
            placeholder="e.g. Junior frontend devs, hiring managers…"
            value={form.audience}
            onChange={(e) => onFormChange("audience", e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="pf-field">
          <label className="pf-label" htmlFor="content-platform">
            Platform
          </label>
          <select
            id="content-platform"
            className="pf-select"
            value={form.platform}
            onChange={(e) => onFormChange("platform", e.target.value)}
            disabled={isLoading}
          >
            {PLATFORM_OPTIONS.map((option) => (
              <option key={option.value || "any"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="pf-field">
          <label className="pf-label" htmlFor="content-voice">
            Voice / style notes (optional)
          </label>
          <textarea
            id="content-voice"
            className="pf-textarea"
            placeholder="How should this sound? e.g. First person, witty, no jargon, British English…"
            value={form.voiceNotes}
            onChange={(e) => onFormChange("voiceNotes", e.target.value)}
            rows={2}
            disabled={isLoading}
          />
        </div>

        <div className="pf-field">
          <label className="pf-label" htmlFor="content-keypoints">
            Key points (optional, one per line)
          </label>
          <textarea
            id="content-keypoints"
            className="pf-textarea"
            placeholder={"Built with Next.js 15\nReduced load time by 40%\nOpen-sourced the CLI tool"}
            value={form.keyPoints}
            onChange={(e) => onFormChange("keyPoints", e.target.value)}
            rows={3}
            disabled={isLoading}
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
          AI drafts portfolio posts, READMEs, blog outlines, and threads tailored to your voice
          and platform.
        </p>

        {submitError && (
          <div className="pf-error-banner" role="alert">
            {submitError}
          </div>
        )}

        <button type="submit" className="pf-gen-btn" disabled={isLoading}>
          {isLoading ? "Generating…" : "Generate content ↗"}
        </button>
      </form>
    </aside>
  );
}
