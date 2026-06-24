import { useCallback, useState } from "react";
import { VIEW_PHASE } from "../constants";
import { analyzeResume, getErrorMessage } from "../services/resumeService";
import { buildResumeFormData, validateResumeForm } from "../utils/validation";

export function useResumeAnalyzer() {
  const [phase, setPhase] = useState(VIEW_PHASE.EMPTY);
  const [analysis, setAnalysis] = useState(null);
  const [meta, setMeta] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const analyze = useCallback(async (form, file) => {
    const validation = validateResumeForm(form, file);

    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setSubmitError("Fix the highlighted fields before analyzing.");
      setPhase(VIEW_PHASE.ERROR);
      return;
    }

    setFieldErrors({});
    setSubmitError("");
    setPhase(VIEW_PHASE.LOADING);

    try {
      const formData = buildResumeFormData(form, file);
      const data = await analyzeResume(formData);

      if (!data.analysis) {
        throw new Error("The server returned an empty analysis.");
      }

      setAnalysis(data.analysis);
      setMeta({
        fileName: data.meta?.fileName ?? file.name,
        targetRole: data.meta?.targetRole ?? form.targetRole,
        hasJobDescription: data.meta?.hasJobDescription ?? Boolean(form.jobDescription?.trim()),
        analysisId: data.id ?? null,
      });
      setPhase(VIEW_PHASE.ANALYSIS);
    } catch (error) {
      setAnalysis(null);
      setMeta(null);
      setSubmitError(getErrorMessage(error));
      setPhase(VIEW_PHASE.ERROR);
    }
  }, []);

  const reset = useCallback(() => {
    setPhase(VIEW_PHASE.EMPTY);
    setAnalysis(null);
    setMeta(null);
    setFieldErrors({});
    setSubmitError("");
  }, []);

  return {
    phase,
    analysis,
    meta,
    fieldErrors,
    submitError,
    analyze,
    reset,
  };
}
