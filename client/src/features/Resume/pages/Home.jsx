import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { INITIAL_FORM, VIEW_PHASE } from "../constants";
import UploadSidebar from "../components/UploadSidebar";
import AnalysisPanel from "../components/AnalysisPanel";
import { useResumeAnalyzer } from "../hooks/useResumeAnalyzer";
import { resumeStyles } from "../styles/resumeStyles";

export default function Home() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [file, setFile] = useState(null);

  const { phase, analysis, meta, fieldErrors, submitError, analyze } = useResumeAnalyzer();

  const handleFormChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    analyze(form, file);
  }, [form, file, analyze]);

  const showAnalysis =
    phase === VIEW_PHASE.ANALYSIS ||
    (phase === VIEW_PHASE.ERROR && analysis);

  return (
    <>
      <style>{resumeStyles}</style>
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
            <span className="pf-topbar-right">AI Resume Analyzer</span>
          </div>
        </header>

        <div className="pf-layout">
          <UploadSidebar
            form={form}
            file={file}
            fieldErrors={fieldErrors}
            submitError={submitError}
            phase={phase}
            onFormChange={handleFormChange}
            onFileChange={setFile}
            onClearFile={() => setFile(null)}
            onSubmit={handleSubmit}
          />

          <AnalysisPanel
            phase={showAnalysis ? VIEW_PHASE.ANALYSIS : phase}
            analysis={analysis}
            meta={meta}
          />
        </div>
      </div>
    </>
  );
}
