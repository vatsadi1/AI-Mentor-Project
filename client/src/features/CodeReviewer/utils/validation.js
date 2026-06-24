import { MAX_CODE_LENGTH } from "../constants";

export function validateCodeReviewForm(form) {
  const errors = {};

  if (!form.code?.trim()) {
    errors.code = "Paste your code snippet to review.";
  } else if (form.code.length > MAX_CODE_LENGTH) {
    errors.code = `Code exceeds ${MAX_CODE_LENGTH.toLocaleString()} character limit.`;
  } else if (form.code.trim().length < 10) {
    errors.code = "Code snippet is too short (minimum 10 characters).";
  }

  if (!form.language) {
    errors.language = "Select a programming language.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
