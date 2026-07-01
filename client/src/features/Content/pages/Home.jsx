import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { INITIAL_FORM, VIEW_PHASE } from "../constants";
import SetupSidebar from "../components/SetupSidebar";
import ContentPanel from "../components/ContentPanel";
import { useContentWriter } from "../hooks/useContentWriter";
import { contentStyles } from "../styles/contentStyles";

export default function Home() {
  const [form, setForm] = useState(INITIAL_FORM);

  const { phase, draft, meta, fieldErrors, submitError, generate } = useContentWriter();

  const handleFormChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    generate(form);
  }, [form, generate]);

  const showResult =
    phase === VIEW_PHASE.RESULT || (phase === VIEW_PHASE.ERROR && draft);

  return (
    <>
      <style>{contentStyles}</style>
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
            <span className="pf-topbar-right">AI Content Writer</span>
          </div>
        </header>

        <div className="pf-layout">
          <SetupSidebar
            form={form}
            fieldErrors={fieldErrors}
            submitError={submitError}
            phase={phase}
            onFormChange={handleFormChange}
            onSubmit={handleSubmit}
          />

          <ContentPanel
            phase={showResult ? VIEW_PHASE.RESULT : phase}
            draft={draft}
            meta={meta}
          />
        </div>
      </div>
    </>
  );
}
