import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  GOAL_TYPES,
  INITIAL_FORM,
  SKILL_LEVELS,
  VIEW_PHASE,
} from "../constants";
import SetupSidebar from "../components/SetupSidebar";
import RoadmapPanel from "../components/RoadmapPanel";
import { useRoadmapGenerator } from "../hooks/useRoadmapGenerator";
import { downloadRoadmapPdf } from "../utils/roadmapPdf";
import { roadmapStyles } from "../styles/roadmapStyles";

export default function Home() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [selectedTech, setSelectedTech] = useState(new Set());
  const [taskStates, setTaskStates] = useState({});

  const {
    phase,
    roadmap,
    meta,
    fieldErrors,
    submitError,
    generate,
  } = useRoadmapGenerator();

  const handleFormChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleToggleTech = useCallback((chip) => {
    setSelectedTech((prev) => {
      const next = new Set(prev);
      if (next.has(chip)) {
        next.delete(chip);
      } else {
        next.add(chip);
      }
      return next;
    });
  }, []);

  const handleToggleTask = useCallback((weekIndex, taskIndex) => {
    const key = `${weekIndex}-${taskIndex}`;
    setTaskStates((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleSubmit = useCallback(() => {
    setTaskStates({});

    const levelLabel =
      SKILL_LEVELS.find((level) => level.value === form.level)?.label ?? form.level;
    const goalLabel =
      GOAL_TYPES.find((goal) => goal.value === form.goalType)?.label ?? form.goalType;

    generate(form, selectedTech, { levelLabel, goalLabel });
  }, [form, selectedTech, generate]);

  const handleDownloadPdf = useCallback(() => {
    if (meta) {
      downloadRoadmapPdf(roadmap, meta);
    }
  }, [roadmap, meta]);

  const showRoadmap =
    phase === VIEW_PHASE.ROADMAP ||
    (phase === VIEW_PHASE.ERROR && roadmap.length > 0);

  return (
    <>
      <style>{roadmapStyles}</style>
      <div className="pf-root">
        <header className="pf-topbar">
          <Link to="/" className="pf-logo" style={{ textDecoration: "none" }}>
            <div className="pf-logo-dot" aria-hidden="true" />
            <span className="pf-logo-text">Pathforge</span>
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
            <span className="pf-topbar-right">AI Career Roadmap Generator</span>
          </div>
        </header>

        <div className="pf-layout">
          <SetupSidebar
            form={form}
            selectedTech={selectedTech}
            fieldErrors={fieldErrors}
            submitError={submitError}
            phase={phase}
            onFormChange={handleFormChange}
            onToggleTech={handleToggleTech}
            onSubmit={handleSubmit}
          />

          <RoadmapPanel
            phase={showRoadmap ? VIEW_PHASE.ROADMAP : phase}
            roadmap={roadmap}
            meta={meta}
            taskStates={taskStates}
            onToggleTask={handleToggleTask}
            onDownloadPdf={handleDownloadPdf}
          />
        </div>
      </div>
    </>
  );
}
