import { VIEW_PHASE } from "../constants";
import { EmptyIcon } from "../../Roadmaps/components/icons";
import DualFeedbackPanel from "./DualFeedbackPanel";

function difficultyClass(difficulty) {
  if (difficulty === "easy") return "diff-easy";
  if (difficulty === "hard") return "diff-hard";
  return "diff-medium";
}

export default function SessionPanel({
  phase,
  group,
  currentQuestion,
  answer,
  setAnswer,
  answerError,
  submitError,
  peerSubmitted,
  selfSubmitted,
  processingEval,
  currentResults,
  allResults,
  currentUserId,
  isHost,
  onSubmitAnswer,
  onNextQuestion,
}) {
  if (phase === VIEW_PHASE.LOBBY || phase === VIEW_PHASE.CREATING || phase === VIEW_PHASE.JOINING) {
    return (
      <section className="pf-main" aria-label="Practice group">
        <div className="pf-empty">
          <div className="pf-empty-icon">
            <EmptyIcon />
          </div>
          <p className="pf-empty-text">
            Practice mock interviews with a friend. Create a room or join with a code — both of you
            must be logged in. An AI interviewer scores each answer by topic.
          </p>
        </div>
      </section>
    );
  }

  if (phase === VIEW_PHASE.WAITING && group) {
    return (
      <section className="pf-main" aria-label="Waiting room">
        <div className="pf-empty">
          <div className="pf-empty-icon">
            <EmptyIcon />
          </div>
          <p className="pf-empty-text">
            {group.guest
              ? "Both friends are here. The host can start the mock practice session."
              : "Share your room code with a friend. They need to log in and join before you start."}
          </p>
          <p className="pf-topic-badge" style={{ marginTop: "16px" }}>
            {group.topicName}
          </p>
        </div>
      </section>
    );
  }

  if (phase === VIEW_PHASE.STARTING) {
    return (
      <section className="pf-main" aria-label="Starting session" aria-busy="true">
        <div className="pf-loading">
          <div className="pf-spinner" role="status" />
          <p className="pf-loading-msg">Generating interview questions for both of you…</p>
        </div>
      </section>
    );
  }

  if (phase === VIEW_PHASE.COMPLETE && group) {
    return (
      <section className="pf-main" aria-label="Session summary">
        <h2 className="pf-rhs-title">Session complete</h2>
        <p className="pf-topic-badge">{group.topicName}</p>

        <div className="pf-summary-card" style={{ marginTop: "16px" }}>
          <p className="pf-tips-label">Scores by question & topic</p>

          {allResults.map((item) => (
            <div key={item.questionIndex} style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "12px", color: "#7878a0", marginBottom: "8px" }}>
                Q{item.questionIndex + 1} · {item.topic}
              </p>
              <div className="pf-summary-grid">
                {item.results.map((r) => (
                  <div key={r.userId} className="pf-summary-item">
                    <p className="pf-score-item-label">{r.userName}</p>
                    <p
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "18px",
                        color: "#b0a8f8",
                        marginTop: "4px",
                      }}
                    >
                      {r.overallScore}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!currentQuestion || !group) return null;

  const questionIndex = group.currentQuestionIndex;
  const isLast = questionIndex + 1 >= group.questions.length;

  if (phase === VIEW_PHASE.FEEDBACK && currentResults.length > 0) {
    const topic = currentResults[0]?.topic || currentQuestion.category;
    return (
      <section className="pf-main" aria-label="AI feedback">
        <div className="pf-progress-header">
          <h2 className="pf-rhs-title">
            Question {questionIndex + 1} of {group.questions.length}
          </h2>
        </div>
        <DualFeedbackPanel
          topic={topic}
          results={currentResults}
          currentUserId={currentUserId}
          onNext={onNextQuestion}
          isLast={isLast}
          isHost={isHost}
        />
      </section>
    );
  }

  return (
    <section className="pf-main" aria-label="Practice session">
      <div className="pf-progress-header">
        <div>
          <h2 className="pf-rhs-title">
            Question {questionIndex + 1} of {group.questions.length}
          </h2>
          <span className="pf-topic-badge">{group.topicName}</span>
        </div>
        <div className="pf-progress-dots">
          {group.questions.map((q, i) => (
            <span
              key={q.id}
              className={`pf-progress-dot${i === questionIndex ? " active" : ""}${i < questionIndex ? " done" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="pf-question-box">
        <div className="pf-question-meta">
          <span className="pf-q-badge">{currentQuestion.category}</span>
          <span className={`pf-q-badge ${difficultyClass(currentQuestion.difficulty)}`}>
            {currentQuestion.difficulty}
          </span>
        </div>
        <p className="pf-question-text">{currentQuestion.question}</p>
        {currentQuestion.tips?.length > 0 && (
          <div className="pf-tips-box">
            <p className="pf-tips-label">What strong answers cover</p>
            <ul className="pf-tips-list">
              {currentQuestion.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {phase === VIEW_PHASE.EVALUATING ? (
        <div className="pf-loading" style={{ minHeight: "120px" }}>
          <div className="pf-spinner" role="status" />
          <p className="pf-loading-msg">
            {processingEval
              ? "AI interviewer is scoring both answers…"
              : selfSubmitted && !peerSubmitted
                ? "Waiting for your friend to submit their answer…"
                : "Submitting your answer…"}
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitAnswer();
          }}
        >
          <label className="pf-label" htmlFor="pg-answer">
            Your answer
          </label>
          <textarea
            id="pg-answer"
            className="pf-textarea"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Both friends answer the same question. The AI scores each answer by topic."
            rows={8}
            disabled={selfSubmitted}
          />
          {answerError && (
            <p className="pf-field-error" role="alert" style={{ marginTop: "8px" }}>
              {answerError}
            </p>
          )}
          {submitError && (
            <p className="pf-field-error" role="alert" style={{ marginTop: "8px" }}>
              {submitError}
            </p>
          )}
          <button
            type="submit"
            className="pf-submit-btn"
            disabled={selfSubmitted || !answer.trim()}
          >
            {selfSubmitted ? "Answer submitted" : "Submit answer"}
          </button>
        </form>
      )}
    </section>
  );
}
