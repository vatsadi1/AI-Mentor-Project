import { CONTENT_TYPES, LENGTH_OPTIONS, TONE_OPTIONS } from "../constants";

const VALID_TYPES = new Set(CONTENT_TYPES.map((t) => t.value));
const VALID_TONES = new Set(TONE_OPTIONS.map((t) => t.value));
const VALID_LENGTHS = new Set(LENGTH_OPTIONS.map((l) => l.value));

export function validateContentForm(form) {
  const errors = {};

  if (!form.contentType || !VALID_TYPES.has(form.contentType)) {
    errors.contentType = "Select a content type.";
  }

  const topic = form.topic?.trim() ?? "";
  if (!topic) {
    errors.topic = "Describe your topic or project.";
  } else if (topic.length < 10) {
    errors.topic = "Topic must be at least 10 characters.";
  } else if (topic.length > 5000) {
    errors.topic = "Topic must be under 5000 characters.";
  }

  if (!form.tone || !VALID_TONES.has(form.tone)) {
    errors.tone = "Select a tone.";
  }

  if (!form.length || !VALID_LENGTHS.has(form.length)) {
    errors.length = "Select a length.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildContentPayload(form) {
  const keyPoints = form.keyPoints
    ? form.keyPoints
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .slice(0, 8)
    : [];

  return {
    contentType: form.contentType,
    topic: form.topic.trim(),
    tone: form.tone,
    length: form.length,
    audience: form.audience?.trim() || "",
    platform: form.platform?.trim() || "",
    voiceNotes: form.voiceNotes?.trim() || "",
    keyPoints,
  };
}
