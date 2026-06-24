import { CheckIcon, DoneCheckIcon, ProjectIcon } from "./icons";

function TaskItem({ text, checked, onToggle }) {
  return (
    <button type="button" className="pf-task-item" onClick={onToggle} aria-pressed={checked}>
      <span className={`pf-cb${checked ? " checked" : ""}`} aria-hidden="true">
        {checked && <CheckIcon />}
      </span>
      <span className={`pf-task-text${checked ? " done" : ""}`}>{text}</span>
    </button>
  );
}

export default function RoadmapWeekCard({
  week,
  index,
  isLast,
  showProjects,
  isDeadlineWeek,
  taskStates,
  onToggleTask,
}) {
  const tasks = week.tasks ?? [];
  const allDone = tasks.length > 0 && tasks.every((_, i) => taskStates[`${index}-${i}`]);
  const isFirst = index === 0;
  const cardId = `${week.week}-${week.title}`.replace(/\s+/g, "-").toLowerCase();

  return (
    <article
      className="pf-week-card"
      style={{ animationDelay: `${index * 0.07}s` }}
      aria-labelledby={`${cardId}-title`}
    >
      <div className="pf-tl-col" aria-hidden="true">
        <div className={`pf-tl-dot${isFirst ? " active" : ""}${allDone ? " done" : ""}`}>
          {allDone && <DoneCheckIcon />}
        </div>
        {!isLast && <div className="pf-tl-line" />}
      </div>

      <div className="pf-card">
        <div className="pf-card-top">
          <span className={`pf-week-badge${allDone ? " done" : ""}`}>{week.week}</span>
          {isDeadlineWeek && <span className="pf-deadline-dot">Deadline target</span>}
        </div>

        <h3 id={`${cardId}-title`} className="pf-card-title">
          {week.title}
        </h3>

        {week.topics?.length > 0 && (
          <div className="pf-topics">
            {week.topics.map((topic) => (
              <span key={topic} className="pf-topic-tag">
                {topic}
              </span>
            ))}
          </div>
        )}

        {tasks.length > 0 && (
          <div className="pf-task-list">
            {tasks.map((task, taskIndex) => (
              <TaskItem
                key={`${cardId}-task-${taskIndex}`}
                text={task}
                checked={!!taskStates[`${index}-${taskIndex}`]}
                onToggle={() => onToggleTask(index, taskIndex)}
              />
            ))}
          </div>
        )}

        {showProjects && week.project ? (
          <div className="pf-proj-box">
            <div className="pf-proj-icon">
              <ProjectIcon />
            </div>
            <div>
              <div className="pf-proj-label">PROJECT</div>
              <div className="pf-proj-name">{week.project}</div>
            </div>
          </div>
        ) : (
          !showProjects && (
            <div className="pf-no-proj-box">
              <div className="pf-no-proj-label">No project this week — theory and practice only</div>
            </div>
          )
        )}
      </div>
    </article>
  );
}
