import { SCORE_LABELS, VERDICT_STYLES } from "../constants";

function ScoreBar({ label, value }) {
  return (
    <div className="pf-score-item">
      <div className="pf-score-item-top">
        <span className="pf-score-item-label">{label}</span>
        <span className="pf-score-item-val">{value}</span>
      </div>
      <div className="pf-score-bar-track">
        <div className="pf-score-bar-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function FeedbackCard({ evaluation, onNext, isLast }) {
  const verdictStyle = VERDICT_STYLES[evaluation.verdict] ?? VERDICT_STYLES.acceptable;
  const delivery = evaluation.deliveryFeedback ?? {};

  return (
    <div>
      <div className="pf-score-overall">
        <div className="pf-score-circle">{evaluation.overallScore}</div>
        <div>
          <span
            className="pf-verdict-badge"
            style={{
              color: verdictStyle.color,
              background: verdictStyle.bg,
              border: `0.5px solid ${verdictStyle.color}33`,
            }}
          >
            {verdictStyle.label}
          </span>
          <p style={{ fontSize: "13px", color: "#7878a0", lineHeight: 1.55 }}>{evaluation.summary}</p>
        </div>
      </div>

      <div className="pf-score-grid">
        {Object.entries(SCORE_LABELS).map(([key, label]) => (
          <ScoreBar key={key} label={label} value={evaluation.scores?.[key] ?? 0} />
        ))}
      </div>

      {evaluation.strengths?.length > 0 && (
        <div className="pf-feedback-section">
          <p className="pf-feedback-title">Strengths</p>
          <ul className="pf-feedback-list strengths">
            {evaluation.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {evaluation.improvements?.length > 0 && (
        <div className="pf-feedback-section">
          <p className="pf-feedback-title">Improvements</p>
          <ul className="pf-feedback-list improvements">
            {evaluation.improvements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="pf-feedback-section">
        <p className="pf-feedback-title">Delivery feedback</p>
        <div className="pf-delivery-grid">
          <div className="pf-delivery-item">
            <p className="pf-delivery-label">Clarity</p>
            <p className="pf-delivery-text">{delivery.clarity || "—"}</p>
          </div>
          <div className="pf-delivery-item">
            <p className="pf-delivery-label">Conciseness</p>
            <p className="pf-delivery-text">{delivery.conciseness || "—"}</p>
          </div>
          <div className="pf-delivery-item">
            <p className="pf-delivery-label">Confidence</p>
            <p className="pf-delivery-text">{delivery.confidence || "—"}</p>
          </div>
        </div>
        {delivery.fillerWords?.length > 0 && (
          <p style={{ fontSize: "11px", color: "#666680", marginTop: "8px" }}>
            Filler / weak phrases:{" "}
            <span style={{ color: "#ba7517" }}>{delivery.fillerWords.join(", ")}</span>
          </p>
        )}
        {delivery.suggestedOpener && (
          <p style={{ fontSize: "11px", color: "#7878a0", marginTop: "8px" }}>
            <span style={{ color: "#444460" }}>Suggested opener: </span>
            {delivery.suggestedOpener}
          </p>
        )}
      </div>

      {delivery.improvedAnswer && (
        <div className="pf-improved-box">
          <p className="pf-improved-label">Improved answer</p>
          <p className="pf-improved-text">{delivery.improvedAnswer}</p>
        </div>
      )}

      {evaluation.followUpQuestion && (
        <div className="pf-followup">
          <p className="pf-followup-label">Follow-up question</p>
          <p className="pf-followup-text">{evaluation.followUpQuestion}</p>
        </div>
      )}

      <button type="button" className="pf-gen-btn" onClick={onNext}>
        {isLast ? "View session summary" : "Next question →"}
      </button>
    </div>
  );
}
