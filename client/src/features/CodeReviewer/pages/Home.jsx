import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { INITIAL_FORM, VIEW_PHASE } from "../constants";
import CodeInputSidebar from "../components/CodeInputSidebar";
import ReviewPanel from "../components/ReviewPanel";
import { useCodeReviewer } from "../hooks/useCodeReviewer";
import { codeReviewStyles } from "../styles/codeReviewStyles";

export default function Home() {
  const [form, setForm] = useState(INITIAL_FORM);
  const { phase, review, meta, fieldErrors, submitError, submitReview } = useCodeReviewer();

  const handleFormChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    submitReview(form);
  }, [form, submitReview]);

  const showReview =
    phase === VIEW_PHASE.REVIEW || (phase === VIEW_PHASE.ERROR && review);

  return (
    <>
      <style>{codeReviewStyles}</style>
      <div className="pf-root">
        <header className="pf-topbar">
          <Link to="/" className="pf-logo" style={{ textDecoration: "none" }}>
            <div className="pf-logo-dot" aria-hidden="true" />
            <span className="pf-logo-text">Pathforge</span>
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
            <span className="pf-topbar-right">AI Code Reviewer</span>
          </div>
        </header>

        <div className="pf-layout">
          <CodeInputSidebar
            form={form}
            fieldErrors={fieldErrors}
            submitError={submitError}
            phase={phase}
            onFormChange={handleFormChange}
            onSubmit={handleSubmit}
          />

          <ReviewPanel
            phase={showReview ? VIEW_PHASE.REVIEW : phase}
            review={review}
            meta={meta}
          />
        </div>
      </div>
    </>
  );
}
