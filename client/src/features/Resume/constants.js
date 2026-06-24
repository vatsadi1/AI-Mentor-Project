export const ROLE_OPTIONS = [
  { value: "", label: "Select a role..." },
  { value: "Frontend Engineer", label: "Frontend Engineer" },
  { value: "Backend Engineer", label: "Backend Engineer" },
  { value: "Full Stack Engineer", label: "Full Stack Engineer" },
  { value: "ML Engineer", label: "ML Engineer" },
  { value: "Data Engineer", label: "Data Engineer" },
  { value: "DevOps Engineer", label: "DevOps / Platform Engineer" },
  { value: "Mobile Developer", label: "Mobile Developer" },
  { value: "Software Engineer", label: "Software Engineer (General)" },
];

export const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "text/plain": [".txt"],
};

export const ACCEPTED_EXTENSIONS = [".pdf", ".txt"];
export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const SCORE_CATEGORIES = [
  { key: "structure", label: "Structure" },
  { key: "content", label: "Content" },
  { key: "keywords", label: "Keywords" },
  { key: "atsCompatibility", label: "ATS" },
  { key: "impact", label: "Impact" },
];

export const INITIAL_FORM = {
  targetRole: "",
  jobDescription: "",
};

export const VIEW_PHASE = {
  EMPTY: "empty",
  LOADING: "loading",
  ANALYSIS: "analysis",
  ERROR: "error",
};

export const PRIORITY_COLORS = {
  high: { bg: "#1a1014", border: "#4a2830", text: "#e07070" },
  medium: { bg: "#1e1600", border: "#3a2e00", text: "#ba7517" },
  low: { bg: "#111e30", border: "#1a3050", text: "#85b7eb" },
};

export const SECTION_STATUS = {
  good: { label: "Good", color: "#1d9e75", bg: "#0a1e14" },
  needs_work: { label: "Needs work", color: "#ba7517", bg: "#1e1600" },
  missing: { label: "Missing", color: "#e07070", bg: "#1a1014" },
};
