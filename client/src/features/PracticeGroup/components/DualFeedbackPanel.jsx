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

function PeerScoreCard({ result, isYou }) {
  const evaluation = {
    overallScore: result.overallScore,
    scores: result.scores,
    verdict: result.verdict,
    summary: result.summary,
    strengths: result.strengths,
    improvements: result.improvements,
    deliveryFeedback: result.deliveryFeedback,
    followUpQuestion: result.followUpQuestion,
  };

  const verdictStyle = VERDICT_STYLES[evaluation.verdict] ?? VERDICT_STYLES.acceptable;

  return (
    <div className={`pf-peer-score-card${isYou ? " is-you" : ""}`}>
      <p className="pf-peer-name">
        {result.userName}
        {isYou && <span>You</span>}
      </p>

      <div className="pf-score-overall" style={{ marginBottom: "12px" }}>
        <div className="pf-score-circle" style={{ width: "56px", height: "56px", fontSize: "20px" }}>
          {evaluation.overallScore}
        </div>
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
          <p style={{ fontSize: "12px", color: "#7878a0", lineHeight: 1.5, marginTop: "6px" }}>
            {evaluation.summary}
          </p>
        </div>
      </div>

      <div className="pf-score-grid" style={{ gridTemplateColumns: "1fr" }}>
        {Object.entries(SCORE_LABELS).map(([key, label]) => (
          <ScoreBar key={key} label={label} value={evaluation.scores?.[key] ?? 0} />
        ))}
      </div>
    </div>
  );
}

export default function DualFeedbackPanel({ topic, results, currentUserId, onNext, isLast, isHost }) {
  return (
    <div>
      <span className="pf-topic-badge">Topic: {topic}</span>
      <h3 className="pf-rhs-title" style={{ marginBottom: "14px" }}>
        AI interviewer scores
      </h3>
      <p style={{ fontSize: "12px", color: "#666680", marginBottom: "16px" }}>
        The AI evaluated both answers from an interviewer&apos;s perspective — scores reflect content,
        structure, and delivery for this topic.
      </p>

      <div className="pf-dual-scores">
        {results.map((result) => (
          <PeerScoreCard
            key={result.userId}
            result={result}
            isYou={String(result.userId) === String(currentUserId)}
          />
        ))}
      </div>

      {isHost ? (
        <button type="button" className="pf-gen-btn" onClick={onNext}>
          {isLast ? "Finish session" : "Next question →"}
        </button>
      ) : (
        <div className="pf-waiting-banner">Waiting for host to advance to the next question…</div>
      )}
    </div>
  );
}
