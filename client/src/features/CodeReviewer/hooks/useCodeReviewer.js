import { useCallback, useState } from "react";
import { VIEW_PHASE } from "../constants";
import { reviewCode, getErrorMessage } from "../services/codeReviewService";
import { validateCodeReviewForm } from "../utils/validation";

export function useCodeReviewer() {
  const [phase, setPhase] = useState(VIEW_PHASE.EMPTY);
  const [review, setReview] = useState(null);
  const [meta, setMeta] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const submitReview = useCallback(async (form) => {
    const validation = validateCodeReviewForm(form);

    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setSubmitError("Fix the highlighted fields before submitting.");
      setPhase(VIEW_PHASE.ERROR);
      return;
    }

    setFieldErrors({});
    setSubmitError("");
    setPhase(VIEW_PHASE.LOADING);

    try {
      const data = await reviewCode({
        code: form.code.trim(),
        language: form.language,
        context: form.context?.trim() || "",
        reviewFocus: form.reviewFocus,
      });

      if (!data.review) {
        throw new Error("The server returned an empty review.");
      }

      setReview(data.review);
      setMeta({
        language: data.meta?.language ?? form.language,
        reviewFocus: data.meta?.reviewFocus ?? form.reviewFocus,
        codeLength: data.meta?.codeLength ?? form.code.length,
        hasContext: data.meta?.hasContext ?? Boolean(form.context?.trim()),
        reviewId: data.id ?? null,
      });
      setPhase(VIEW_PHASE.REVIEW);
    } catch (error) {
      setReview(null);
      setMeta(null);
      setSubmitError(getErrorMessage(error));
      setPhase(VIEW_PHASE.ERROR);
    }
  }, []);

  const reset = useCallback(() => {
    setPhase(VIEW_PHASE.EMPTY);
    setReview(null);
    setMeta(null);
    setFieldErrors({});
    setSubmitError("");
  }, []);

  return {
    phase,
    review,
    meta,
    fieldErrors,
    submitError,
    submitReview,
    reset,
  };
}
