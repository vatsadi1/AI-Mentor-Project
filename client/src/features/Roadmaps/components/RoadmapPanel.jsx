import { VIEW_PHASE } from "../constants";
import { EmptyIcon } from "./icons";
import RoadmapWeekCard from "./RoadmapWeekCard";

function weeksFromDays(days) {
  return Math.max(1, Math.round(days / 7));
}

export default function RoadmapPanel({
  phase,
  roadmap,
  meta,
  taskStates,
  onToggleTask,
  onDownloadPdf,
}) {
  if (phase === VIEW_PHASE.EMPTY) {
    return (
      <section className="pf-main" aria-label="Roadmap results">
        <div className="pf-empty">
          <div className="pf-empty-icon">
            <EmptyIcon />
          </div>
          <p className="pf-empty-text">
            Select a role and configure your preferences, then generate a personalized roadmap.
          </p>
        </div>
      </section>
    );
  }

  if (phase === VIEW_PHASE.LOADING) {
    return (
      <section className="pf-main" aria-label="Roadmap results" aria-busy="true">
        <div className="pf-loading">
          <div className="pf-spinner" role="status" aria-label="Generating roadmap" />
          <p className="pf-loading-msg">Generating your roadmap…</p>
        </div>
      </section>
    );
  }

  if (phase === VIEW_PHASE.ERROR && !roadmap.length) {
    return (
      <section className="pf-main" aria-label="Roadmap results">
        <div className="pf-empty">
          <div className="pf-empty-icon">
            <EmptyIcon />
          </div>
          <p className="pf-empty-text">
            Fix the form errors on the left, or try generating again once the server is available.
          </p>
        </div>
      </section>
    );
  }

  if (!meta || !roadmap.length) {
    return null;
  }

  const totalTasks = roadmap.reduce((sum, week) => sum + (week.tasks?.length ?? 0), 0);
  const doneTasks = Object.values(taskStates).filter(Boolean).length;
  const progress = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const deadlineDays = parseInt(meta.deadline, 10) || 0;

  return (
    <section className="pf-main" aria-label="Roadmap results">
      <header className="pf-rhs-header">
        <div>
          <h2 className="pf-rhs-title">{meta.role} roadmap</h2>
          <div className="pf-meta-row">
            <span className="pf-meta-chip">{meta.levelLabel}</span>
            <span className="pf-meta-chip">{meta.goalLabel}</span>
            <span className="pf-meta-chip">{meta.timeCommitment}</span>
            {deadlineDays > 0 && (
              <span className="pf-meta-chip dl">
                Deadline: {deadlineDays} days ({weeksFromDays(deadlineDays)} wks)
              </span>
            )}
            {meta.includeProjects ? (
              <span className="pf-meta-chip proj">Projects included</span>
            ) : (
              <span className="pf-meta-chip no-proj">No projects</span>
            )}
          </div>
        </div>

        <div className="pf-rhs-actions">
          <button type="button" className="pf-download-btn" onClick={onDownloadPdf}>
            Download PDF
          </button>
          <div className="pf-progress-wrap">
            <div
              className="pf-progress-track"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Task completion progress"
            >
              <div className="pf-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="pf-progress-label">
              {doneTasks} of {totalTasks} tasks done
            </span>
          </div>
        </div>
      </header>

      <div className="pf-timeline">
        {roadmap.map((week, index) => (
          <RoadmapWeekCard
            key={`${week.week}-${week.title}`}
            week={week}
            index={index}
            isLast={index === roadmap.length - 1}
            showProjects={meta.includeProjects}
            isDeadlineWeek={index === roadmap.length - 1}
            taskStates={taskStates}
            onToggleTask={onToggleTask}
          />
        ))}
      </div>
    </section>
  );
}
