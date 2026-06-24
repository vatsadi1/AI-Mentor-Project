import { useCallback, useRef, useState } from "react";
import {
  ACCEPTED_EXTENSIONS,
  MAX_FILE_SIZE_MB,
  ROLE_OPTIONS,
  VIEW_PHASE,
} from "../constants";
import { UploadIcon } from "./icons";

function FieldError({ message, id }) {
  if (!message) return null;
  return (
    <p id={id} className="pf-field-error" role="alert">
      {message}
    </p>
  );
}

export default function UploadSidebar({
  form,
  file,
  fieldErrors,
  submitError,
  phase,
  onFormChange,
  onFileChange,
  onClearFile,
  onSubmit,
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const isLoading = phase === VIEW_PHASE.LOADING;

  const handleFile = useCallback(
    (selected) => {
      if (selected) onFileChange(selected);
    },
    [onFileChange]
  );

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setDragOver(false);
      const dropped = event.dataTransfer.files?.[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );

  const zoneClass = [
    "pf-upload-zone",
    dragOver ? "drag-over" : "",
    file ? "has-file" : "",
    fieldErrors.file ? "invalid" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className="pf-sidebar" aria-label="Resume upload configuration">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}
      >
        <div className="pf-field">
          <span className="pf-label">Upload resume</span>
          <div
            className={zoneClass}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
            aria-label="Upload resume file"
          >
            <div className="pf-upload-icon">
              <UploadIcon />
            </div>
            <div className="pf-upload-title">
              {file ? "File selected" : "Drop file or click to browse"}
            </div>
            <div className="pf-upload-sub">
              PDF or .txt · max {MAX_FILE_SIZE_MB} MB
            </div>
            {file && (
              <>
                <div className="pf-upload-filename">{file.name}</div>
                <button
                  type="button"
                  className="pf-clear-btn"
                  style={{ marginTop: 8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClearFile();
                    if (inputRef.current) inputRef.current.value = "";
                  }}
                >
                  Remove file
                </button>
              </>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_EXTENSIONS.join(",")}
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
          <FieldError message={fieldErrors.file} />
        </div>

        <div className="pf-field">
          <label className="pf-label" htmlFor="target-role">
            Target role
          </label>
          <select
            id="target-role"
            className={`pf-select${fieldErrors.targetRole ? " invalid" : ""}`}
            value={form.targetRole}
            onChange={(e) => onFormChange("targetRole", e.target.value)}
            aria-invalid={Boolean(fieldErrors.targetRole)}
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value || "empty"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError message={fieldErrors.targetRole} />
        </div>

        <div className="pf-field">
          <label className="pf-label" htmlFor="job-description">
            Job description (optional)
          </label>
          <textarea
            id="job-description"
            className="pf-textarea"
            placeholder="Paste a job posting to tailor keyword and ATS feedback…"
            value={form.jobDescription}
            onChange={(e) => onFormChange("jobDescription", e.target.value)}
            rows={4}
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
          AI analyzes structure, keywords, ATS compatibility, and impact. Results are tailored to
          your target role.
        </p>

        {submitError && (
          <div className="pf-error-banner" role="alert">
            {submitError}
          </div>
        )}

        <button type="submit" className="pf-gen-btn" disabled={isLoading}>
          {isLoading ? "Analyzing…" : "Analyze resume ↗"}
        </button>
      </form>
    </aside>
  );
}
