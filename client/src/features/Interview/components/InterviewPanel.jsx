import { useState } from "react";
import { VIEW_PHASE } from "../constants";
import { EmptyIcon } from "../../Roadmaps/components/icons";
import FeedbackCard from "./FeedbackCard";

function difficultyClass(difficulty) {
  if (difficulty === "easy") return "diff-easy";
  if (difficulty === "hard") return "diff-hard";
  return "diff-medium";
}

export default function InterviewPanel({
  phase,
  meta,
  questions,
  currentIndex,
  currentQuestion,
  currentEvaluation,
  evaluations,
  answerError,
  onSubmitAnswer,
  onNextQuestion,
}) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentQuestion) {
      onSubmitAnswer(answer, currentQuestion);
    }
  };

  const handleNext = () => {
    setAnswer("");
    onNextQuestion();
  };

  const averageScore =
    evaluations.length > 0
      ? Math.round(
          evaluations.reduce((sum, e) => sum + (e.evaluation.overallScore ?? 0), 0) /
            evaluations.length
        )
      : 0;

  if (phase === VIEW_PHASE.EMPTY) {
    return (
      <section className="pf-main" aria-label="Interview practice">
        <div className="pf-empty">
          <div className="pf-empty-icon">
            <EmptyIcon />
          </div>
          <p className="pf-empty-text">
            Configure your role and interview type, then start a mock session. Answer each question
            and get AI feedback on content and delivery.
          </p>
        </div>
      </section>
    );
  }

  if (phase === VIEW_PHASE.LOADING) {
    return (
      <section className="pf-main" aria-label="Interview practice" aria-busy="true">
        <div className="pf-loading">
          <div className="pf-spinner" role="status" aria-label="Preparing interview" />
          <p className="pf-loading-msg">Generating tailored interview questions…</p>
        </div>
      </section>
    );
  }

  if (phase === VIEW_PHASE.ERROR && !questions.length) {
    return (
      <section className="pf-main" aria-label="Interview practice">
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

  if (phase === VIEW_PHASE.COMPLETE) {
    return (
      <section className="pf-main" aria-label="Session summary">
        <div className="pf-progress-header">
          <div>
            <h2 className="pf-rhs-title">Session complete</h2>
            {meta && (
              <div className="pf-meta-row">
                <span className="pf-meta-chip">{meta.role}</span>
                <span className="pf-meta-chip">{meta.levelLabel}</span>
                <span className="pf-meta-chip">{meta.typeLabel}</span>
              </div>
            )}
          </div>
        </div>

        <div className="pf-summary-card">
          <p className="pf-tips-label">Average score</p>
          <p className="pf-summary-score">{averageScore}</p>
          <p style={{ fontSize: "12px", color: "#7878a0" }}>
            You completed {evaluations.length} of {questions.length} questions
          </p>

          <div className="pf-summary-grid">
            {evaluations.map((item, index) => (
              <div key={item.questionId} className="pf-summary-item">
                <p className="pf-score-item-label">Q{index + 1}</p>
                <p
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "18px",
                    color: "#b0a8f8",
                    marginTop: "4px",
                  }}
                >
                  {item.evaluation.overallScore}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!currentQuestion) return null;

  return (
    <section className="pf-main" aria-label="Interview practice">
      <div className="pf-progress-header">
        <div>
          <h2 className="pf-rhs-title">Question {currentIndex + 1} of {questions.length}</h2>
          {meta && (
            <div className="pf-meta-row">
              <span className="pf-meta-chip">{meta.role}</span>
              <span className="pf-meta-chip">{meta.typeLabel}</span>
            </div>
          )}
        </div>
        <div className="pf-progress-dots" aria-label="Question progress">
          {questions.map((q, i) => (
            <span
              key={q.id}
              className={`pf-progress-dot${i === currentIndex ? " active" : ""}${i < evaluations.length ? " done" : ""}`}
            />
          ))}
        </div>
      </div>

      {phase === VIEW_PHASE.FEEDBACK && currentEvaluation ? (
        <FeedbackCard
          evaluation={currentEvaluation}
          onNext={handleNext}
          isLast={currentIndex + 1 >= questions.length}
        />
      ) : (
        <>
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

          <form onSubmit={handleSubmit}>
            <label className="pf-label" htmlFor="interview-answer">
              Your answer
            </label>
            <textarea
              id="interview-answer"
              className="pf-textarea"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Structure behavioral answers with STAR (Situation, Task, Action, Result). Be specific and use real examples."
              disabled={phase === VIEW_PHASE.EVALUATING}
              rows={8}
            />
            {answerError && (
              <p className="pf-field-error" role="alert" style={{ marginTop: "8px" }}>
                {answerError}
              </p>
            )}
            <button
              type="submit"
              className="pf-submit-btn"
              disabled={phase === VIEW_PHASE.EVALUATING || !answer.trim()}
            >
              {phase === VIEW_PHASE.EVALUATING ? "Analyzing your answer…" : "Get feedback"}
            </button>
          </form>
        </>
      )}
    </section>
  );
}
