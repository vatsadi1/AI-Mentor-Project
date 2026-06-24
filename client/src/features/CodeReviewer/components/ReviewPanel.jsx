import {
  FOCUS_OPTIONS,
  IMPACT_COLORS,
  LANGUAGE_OPTIONS,
  RISK_COLORS,
  SCORE_CATEGORIES,
  SEVERITY_COLORS,
  VERDICT_LABELS,
  VIEW_PHASE,
} from "../constants";
import ScoreCard from "../../Resume/components/ScoreCard";
import { EmptyIcon } from "./icons";

function getLabel(options, value) {
  return options.find((o) => o.value === value)?.label ?? value;
}

export default function ReviewPanel({ phase, review, meta }) {
  if (phase === VIEW_PHASE.EMPTY) {
    return (
      <section className="pf-main" aria-label="Code review results">
        <div className="pf-empty">
          <div className="pf-empty-icon">
            <EmptyIcon />
          </div>
          <p className="pf-empty-text">
            Paste your code snippet and select a language to receive production-grade AI feedback on
            bugs, security, performance, and best practices.
          </p>
        </div>
      </section>
    );
  }

  if (phase === VIEW_PHASE.LOADING) {
    return (
      <section className="pf-main" aria-label="Code review results" aria-busy="true">
        <div className="pf-loading">
          <div className="pf-spinner" role="status" aria-label="Reviewing code" />
          <p className="pf-loading-msg">Reviewing your code…</p>
        </div>
      </section>
    );
  }

  if (phase === VIEW_PHASE.ERROR && !review) {
    return (
      <section className="pf-main" aria-label="Code review results">
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

  if (!review || !meta) return null;

  const scores = review.scores ?? {};
  const verdict = VERDICT_LABELS[review.reviewVerdict] ?? VERDICT_LABELS.needs_changes;

  return (
    <section className="pf-main" aria-label="Code review results">
      <header className="pf-rhs-header">
        <div>
          <h2 className="pf-rhs-title">Code review</h2>
          <div className="pf-meta-row">
            <span className="pf-meta-chip">{getLabel(LANGUAGE_OPTIONS, meta.language)}</span>
            <span className="pf-meta-chip">{getLabel(FOCUS_OPTIONS, meta.reviewFocus)}</span>
            <span className="pf-meta-chip">{meta.codeLength.toLocaleString()} chars</span>
            {meta.hasContext && <span className="pf-meta-chip proj">Context included</span>}
          </div>
        </div>
        {review.reviewVerdict && (
          <span
            className="pf-verdict-badge"
            style={{
              color: verdict.color,
              background: verdict.bg,
              border: `0.5px solid ${verdict.color}33`,
            }}
          >
            {verdict.label}
          </span>
        )}
      </header>

      <div className="pf-score-grid">
        <ScoreCard label="Overall score" value={review.overallScore ?? 0} primary />
        {SCORE_CATEGORIES.map((cat) => (
          <ScoreCard key={cat.key} label={cat.label} value={scores[cat.key] ?? 0} />
        ))}
      </div>

      {review.summary && (
        <div className="pf-summary-box">
          <div className="pf-summary-label">Summary</div>
          <p className="pf-summary-text">{review.summary}</p>
        </div>
      )}

      <div className="pf-two-col">
        {review.strengths?.length > 0 && (
          <div>
            <div className="pf-block-title">Strengths</div>
            <div className="pf-strength-list">
              {review.strengths.map((item) => (
                <div key={item} className="pf-strength-item">
                  <span className="pf-strength-dot" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {review.issues?.length > 0 && (
          <div>
            <div className="pf-block-title">Issues ({review.issues.length})</div>
            <div className="pf-issue-list">
              {review.issues.map((issue, index) => {
                const colors = SEVERITY_COLORS[issue.severity] ?? SEVERITY_COLORS.info;
                return (
                  <div key={`${issue.title}-${index}`} className="pf-issue-card">
                    <div className="pf-issue-top">
                      <span
                        className="pf-priority-badge"
                        style={{
                          color: colors.text,
                          background: colors.bg,
                          border: `0.5px solid ${colors.border}`,
                        }}
                      >
                        {issue.severity}
                      </span>
                      <span className="pf-improve-category">{issue.category}</span>
                      {issue.line != null && (
                        <span className="pf-issue-line">Line {issue.line}</span>
                      )}
                    </div>
                    <p className="pf-issue-title">{issue.title}</p>
                    <p className="pf-issue-desc">{issue.description}</p>
                    {issue.suggestion && (
                      <p className="pf-issue-suggestion">{issue.suggestion}</p>
                    )}
                    {issue.codeFix && <pre className="pf-code-fix">{issue.codeFix}</pre>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {review.securityFindings?.length > 0 && (
        <>
          <div className="pf-block-title">Security findings</div>
          <div className="pf-finding-list">
            {review.securityFindings.map((finding, index) => {
              const colors = RISK_COLORS[finding.risk] ?? RISK_COLORS.medium;
              return (
                <div key={`${finding.title}-${index}`} className="pf-finding-card">
                  <div className="pf-finding-top">
                    <span
                      className="pf-priority-badge"
                      style={{
                        color: colors.text,
                        background: colors.bg,
                        border: `0.5px solid ${colors.text}33`,
                      }}
                    >
                      {finding.risk}
                    </span>
                    <span className="pf-finding-title">{finding.title}</span>
                  </div>
                  <p className="pf-finding-desc">{finding.description}</p>
                  {finding.mitigation && (
                    <p className="pf-finding-action">Fix: {finding.mitigation}</p>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {review.performanceNotes?.length > 0 && (
        <>
          <div className="pf-block-title">Performance notes</div>
          <div className="pf-finding-list">
            {review.performanceNotes.map((note, index) => {
              const colors = IMPACT_COLORS[note.impact] ?? IMPACT_COLORS.medium;
              return (
                <div key={`${note.title}-${index}`} className="pf-finding-card">
                  <div className="pf-finding-top">
                    <span
                      className="pf-priority-badge"
                      style={{
                        color: colors.text,
                        background: colors.bg,
                        border: `0.5px solid ${colors.text}33`,
                      }}
                    >
                      {note.impact}
                    </span>
                    <span className="pf-finding-title">{note.title}</span>
                  </div>
                  <p className="pf-finding-desc">{note.description}</p>
                  {note.recommendation && (
                    <p className="pf-finding-action">Recommendation: {note.recommendation}</p>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {review.refactoredSnippet && (
        <div className="pf-refactor-box">
          <div className="pf-refactor-label">Suggested refactor</div>
          <pre className="pf-refactor-code">{review.refactoredSnippet}</pre>
        </div>
      )}
    </section>
  );
}
