import { useCallback, useState } from "react";
import { VIEW_PHASE } from "../constants";
import { generateRoadmap, getErrorMessage } from "../services/roadmapService";
import { buildRoadmapPayload, validateRoadmapForm } from "../utils/validation";

export function useRoadmapGenerator() {
  const [phase, setPhase] = useState(VIEW_PHASE.EMPTY);
  const [roadmap, setRoadmap] = useState([]);
  const [meta, setMeta] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const generate = useCallback(async (form, selectedTech, labels) => {
    const validation = validateRoadmapForm(form, selectedTech);

    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setSubmitError("Fix the highlighted fields before generating.");
      setPhase(VIEW_PHASE.ERROR);
      return;
    }

    setFieldErrors({});
    setSubmitError("");
    setPhase(VIEW_PHASE.LOADING);

    try {
      const payload = buildRoadmapPayload(form, selectedTech);
      const data = await generateRoadmap(payload);
      const weeks = Array.isArray(data.roadmap) ? data.roadmap : [];

      if (!weeks.length) {
        throw new Error("The server returned an empty roadmap.");
      }

      setRoadmap(weeks);
      setMeta({
        role: payload.role,
        level: payload.level,
        levelLabel: labels.levelLabel,
        goalType: payload.goalType,
        goalLabel: labels.goalLabel,
        timeCommitment: payload.timeCommitment,
        deadline: payload.deadline,
        includeProjects: form.includeProjects,
        techStack: payload.techStack,
        roadmapId: data.id ?? null,
      });
      setPhase(VIEW_PHASE.ROADMAP);
    } catch (error) {
      setRoadmap([]);
      setMeta(null);
      setSubmitError(getErrorMessage(error));
      setPhase(VIEW_PHASE.ERROR);
    }
  }, []);

  const reset = useCallback(() => {
    setPhase(VIEW_PHASE.EMPTY);
    setRoadmap([]);
    setMeta(null);
    setFieldErrors({});
    setSubmitError("");
  }, []);

  return {
    phase,
    roadmap,
    meta,
    fieldErrors,
    submitError,
    generate,
    reset,
    setFieldErrors,
    setSubmitError,
  };
}
