import {
  PRIORITY_COLORS,
  SCORE_CATEGORIES,
  SECTION_STATUS,
  VIEW_PHASE,
} from "../constants";
import ScoreCard from "./ScoreCard";
import { EmptyIcon } from "./icons";

export default function AnalysisPanel({ phase, analysis, meta }) {
  if (phase === VIEW_PHASE.EMPTY) {
    return (
      <section className="pf-main" aria-label="Resume analysis results">
        <div className="pf-empty">
          <div className="pf-empty-icon">
            <EmptyIcon />
          </div>
          <p className="pf-empty-text">
            Upload your resume and select a target role to receive AI-powered feedback on structure,
            keywords, and ATS compatibility.
          </p>
        </div>
      </section>
    );
  }

  if (phase === VIEW_PHASE.LOADING) {
    return (
      <section className="pf-main" aria-label="Resume analysis results" aria-busy="true">
        <div className="pf-loading">
          <div className="pf-spinner" role="status" aria-label="Analyzing resume" />
          <p className="pf-loading-msg">Analyzing your resume…</p>
        </div>
      </section>
    );
  }

  if (phase === VIEW_PHASE.ERROR && !analysis) {
    return (
      <section className="pf-main" aria-label="Resume analysis results">
        <div className="pf-empty">
          <div className="pf-empty-icon">
            <EmptyIcon />
          </div>
          <p className="pf-empty-text">
            Fix the form errors on the left, or try again once the server is available.
          </p>
        </div>
      </section>
    );
  }

  if (!analysis || !meta) return null;

  const scores = analysis.scores ?? {};
  const keywords = analysis.keywords ?? { found: [], missing: [], recommended: [] };

  return (
    <section className="pf-main" aria-label="Resume analysis results">
      <header className="pf-rhs-header">
        <div>
          <h2 className="pf-rhs-title">Resume analysis</h2>
          <div className="pf-meta-row">
            <span className="pf-meta-chip">{meta.targetRole}</span>
            <span className="pf-meta-chip">{meta.fileName}</span>
            {meta.hasJobDescription && (
              <span className="pf-meta-chip proj">Job description included</span>
            )}
          </div>
        </div>
      </header>

      <div className="pf-score-grid">
        <ScoreCard label="Overall score" value={analysis.overallScore ?? 0} primary />
        <ScoreCard label="ATS score" value={analysis.atsScore ?? 0} primary />
        {SCORE_CATEGORIES.map((cat) => (
          <ScoreCard key={cat.key} label={cat.label} value={scores[cat.key] ?? 0} />
        ))}
      </div>

      {analysis.summary && (
        <div className="pf-summary-box">
          <div className="pf-summary-label">Summary</div>
          <p className="pf-summary-text">{analysis.summary}</p>
        </div>
      )}

      {analysis.sections?.length > 0 && (
        <>
          <div className="pf-block-title">Section breakdown</div>
          <div className="pf-section-grid">
            {analysis.sections.map((section) => {
              const status = SECTION_STATUS[section.status] ?? SECTION_STATUS.needs_work;
              return (
                <div key={section.name} className="pf-section-card">
                  <div className="pf-section-top">
                    <span className="pf-section-name">{section.name}</span>
                    <span
                      className="pf-section-badge"
                      style={{
                        color: status.color,
                        background: status.bg,
                        border: `0.5px solid ${status.color}33`,
                      }}
                    >
                      {status.label}
                    </span>
                  </div>
                  <p className="pf-section-feedback">{section.feedback}</p>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="pf-two-col">
        {analysis.strengths?.length > 0 && (
          <div>
            <div className="pf-block-title">Strengths</div>
            <div className="pf-strength-list">
              {analysis.strengths.map((item) => (
                <div key={item} className="pf-strength-item">
                  <span className="pf-strength-dot" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {analysis.improvements?.length > 0 && (
          <div>
            <div className="pf-block-title">Improvements</div>
            <div className="pf-improve-list">
              {analysis.improvements.map((item, index) => {
                const colors = PRIORITY_COLORS[item.priority] ?? PRIORITY_COLORS.medium;
                return (
                  <div key={`${item.issue}-${index}`} className="pf-improve-card">
                    <div className="pf-improve-top">
                      <span
                        className="pf-priority-badge"
                        style={{
                          color: colors.text,
                          background: colors.bg,
                          border: `0.5px solid ${colors.border}`,
                        }}
                      >
                        {item.priority}
                      </span>
                      <span className="pf-improve-category">{item.category}</span>
                    </div>
                    <p className="pf-improve-issue">{item.issue}</p>
                    <p className="pf-improve-suggestion">{item.suggestion}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {(keywords.found?.length > 0 ||
        keywords.missing?.length > 0 ||
        keywords.recommended?.length > 0) && (
        <>
          <div className="pf-block-title">Keyword analysis</div>
          <div className="pf-kw-grid">
            {keywords.found?.length > 0 && (
              <div className="pf-kw-box">
                <div className="pf-block-title" style={{ marginBottom: 0 }}>
                  Found
                </div>
                <div className="pf-kw-tags">
                  {keywords.found.map((kw) => (
                    <span key={kw} className="pf-kw-tag found">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {keywords.missing?.length > 0 && (
              <div className="pf-kw-box">
                <div className="pf-block-title" style={{ marginBottom: 0 }}>
                  Missing
                </div>
                <div className="pf-kw-tags">
                  {keywords.missing.map((kw) => (
                    <span key={kw} className="pf-kw-tag missing">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {keywords.recommended?.length > 0 && (
              <div className="pf-kw-box">
                <div className="pf-block-title" style={{ marginBottom: 0 }}>
                  Recommended
                </div>
                <div className="pf-kw-tags">
                  {keywords.recommended.map((kw) => (
                    <span key={kw} className="pf-kw-tag recommended">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {analysis.bulletRewrites?.length > 0 && (
        <>
          <div className="pf-block-title">Bullet rewrites</div>
          <div className="pf-rewrite-list">
            {analysis.bulletRewrites.map((item, index) => (
              <div key={`${item.original}-${index}`} className="pf-rewrite-card">
                <div className="pf-rewrite-label">Original</div>
                <p className="pf-rewrite-original">{item.original}</p>
                <div className="pf-rewrite-label">Improved</div>
                <p className="pf-rewrite-improved">{item.improved}</p>
                {item.reason && <p className="pf-rewrite-reason">{item.reason}</p>}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
