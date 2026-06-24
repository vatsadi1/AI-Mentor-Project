import { QUESTION_COUNT } from "../constants";

export function buildSessionPayload(form, selectedFocus) {
  return {
    role: form.role.trim(),
    level: form.level,
    interviewType: form.interviewType,
    focusAreas: [...selectedFocus],
    questionCount: form.questionCount,
  };
}

export function validateSessionForm(form, selectedFocus) {
  const errors = {};

  if (!form.role.trim()) {
    errors.role = "Select a target role.";
  }

  if (!form.level) {
    errors.level = "Select your experience level.";
  }

  if (!form.interviewType) {
    errors.interviewType = "Select an interview type.";
  }

  if (
    form.questionCount < QUESTION_COUNT.min ||
    form.questionCount > QUESTION_COUNT.max
  ) {
    errors.questionCount = `Choose between ${QUESTION_COUNT.min} and ${QUESTION_COUNT.max} questions.`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateAnswer(answer) {
  const trimmed = answer.trim();

  if (trimmed.length < 20) {
    return { isValid: false, error: "Write at least 20 characters before submitting." };
  }

  if (trimmed.length > 5000) {
    return { isValid: false, error: "Answer must be under 5000 characters." };
  }

  return { isValid: true, error: "" };
}
