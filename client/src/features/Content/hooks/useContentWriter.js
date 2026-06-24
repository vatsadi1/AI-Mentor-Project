import { useCallback, useState } from "react";
import { VIEW_PHASE } from "../constants";
import { generateContent, getErrorMessage } from "../services/contentService";
import { buildContentPayload, validateContentForm } from "../utils/validation";

export function useContentWriter() {
  const [phase, setPhase] = useState(VIEW_PHASE.EMPTY);
  const [draft, setDraft] = useState(null);
  const [meta, setMeta] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const generate = useCallback(async (form) => {
    const validation = validateContentForm(form);

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
      const payload = buildContentPayload(form);
      const data = await generateContent(payload);

      if (!data.draft) {
        throw new Error("The server returned an empty draft.");
      }

      setDraft(data.draft);
      setMeta({
        contentType: data.meta?.contentType ?? form.contentType,
        tone: data.meta?.tone ?? form.tone,
        length: data.meta?.length ?? form.length,
        hasVoiceNotes: data.meta?.hasVoiceNotes ?? Boolean(form.voiceNotes?.trim()),
        keyPointCount: data.meta?.keyPointCount ?? 0,
        draftId: data.id ?? null,
      });
      setPhase(VIEW_PHASE.RESULT);
    } catch (error) {
      setDraft(null);
      setMeta(null);
      setSubmitError(getErrorMessage(error));
      setPhase(VIEW_PHASE.ERROR);
    }
  }, []);

  const reset = useCallback(() => {
    setPhase(VIEW_PHASE.EMPTY);
    setDraft(null);
    setMeta(null);
    setFieldErrors({});
    setSubmitError("");
  }, []);

  return {
    phase,
    draft,
    meta,
    fieldErrors,
    submitError,
    generate,
    reset,
  };
}
