export const LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "cpp", label: "C++" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "other", label: "Other" },
];

export const FOCUS_OPTIONS = [
  { value: "all", label: "Full review" },
  { value: "security", label: "Security focus" },
  { value: "performance", label: "Performance focus" },
  { value: "style", label: "Style & readability" },
];

export const SCORE_CATEGORIES = [
  { key: "correctness", label: "Correctness" },
  { key: "security", label: "Security" },
  { key: "performance", label: "Performance" },
  { key: "maintainability", label: "Maintainability" },
  { key: "readability", label: "Readability" },
  { key: "bestPractices", label: "Best practices" },
];

export const INITIAL_FORM = {
  language: "javascript",
  reviewFocus: "all",
  context: "",
  code: "",
};

export const VIEW_PHASE = {
  EMPTY: "empty",
  LOADING: "loading",
  REVIEW: "review",
  ERROR: "error",
};

export const MAX_CODE_LENGTH = 15000;

export const SEVERITY_COLORS = {
  critical: { bg: "#1a1014", border: "#6a2030", text: "#ff6060" },
  high: { bg: "#1a1014", border: "#4a2830", text: "#e07070" },
  medium: { bg: "#1e1600", border: "#3a2e00", text: "#ba7517" },
  low: { bg: "#111e30", border: "#1a3050", text: "#85b7eb" },
  info: { bg: "#13131e", border: "#252535", text: "#7878a0" },
};

export const VERDICT_LABELS = {
  approve: { label: "Approve", color: "#1d9e75", bg: "#0a1e14" },
  approve_with_suggestions: { label: "Approve with suggestions", color: "#7c6ef0", bg: "#1e1840" },
  needs_changes: { label: "Needs changes", color: "#ba7517", bg: "#1e1600" },
  reject: { label: "Reject", color: "#e07070", bg: "#1a1014" },
};

export const RISK_COLORS = {
  critical: { text: "#ff6060", bg: "#1a1014" },
  high: { text: "#e07070", bg: "#1a1014" },
  medium: { text: "#ba7517", bg: "#1e1600" },
  low: { text: "#85b7eb", bg: "#111e30" },
};

export const IMPACT_COLORS = {
  high: { text: "#e07070", bg: "#1a1014" },
  medium: { text: "#ba7517", bg: "#1e1600" },
  low: { text: "#85b7eb", bg: "#111e30" },
};
