export const ROLE_OPTIONS = [
  { value: "", label: "Select a role..." },
  { value: "Frontend Engineer", label: "Frontend Engineer" },
  { value: "Backend Engineer", label: "Backend Engineer" },
  { value: "Full Stack Engineer", label: "Full Stack Engineer" },
  { value: "ML Engineer", label: "ML Engineer" },
  { value: "Data Engineer", label: "Data Engineer" },
  { value: "DevOps Engineer", label: "DevOps / Platform Engineer" },
  { value: "Product Manager", label: "Product Manager" },
];

export const EXPERIENCE_LEVELS = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-level" },
  { value: "senior", label: "Senior" },
];

export const INTERVIEW_TYPES = [
  { value: "behavioral", label: "Behavioral", description: "STAR stories, leadership, teamwork" },
  { value: "technical", label: "Technical", description: "Role-specific knowledge and problem solving" },
  { value: "system-design", label: "System Design", description: "Architecture, scale, trade-offs" },
  { value: "mixed", label: "Mixed", description: "Blend of behavioral and technical" },
];

export const FOCUS_CHIPS = [
  "Leadership",
  "Conflict",
  "System Design",
  "JavaScript",
  "React",
  "Node.js",
  "Databases",
  "APIs",
  "Testing",
  "AWS",
  "Communication",
  "Problem Solving",
];

export const QUESTION_COUNT = { min: 3, max: 8, default: 5 };

export const INITIAL_FORM = {
  role: "",
  level: "mid",
  interviewType: "mixed",
  questionCount: QUESTION_COUNT.default,
};

export const VIEW_PHASE = {
  EMPTY: "empty",
  LOADING: "loading",
  PRACTICE: "practice",
  EVALUATING: "evaluating",
  FEEDBACK: "feedback",
  COMPLETE: "complete",
  ERROR: "error",
};

export const SCORE_LABELS = {
  content: "Content",
  structure: "Structure",
  relevance: "Relevance",
  depth: "Depth",
  delivery: "Delivery",
};

export const VERDICT_STYLES = {
  strong: { label: "Strong answer", color: "#1d9e75", bg: "#0a1e14" },
  acceptable: { label: "Acceptable", color: "#378add", bg: "#111e30" },
  "needs-work": { label: "Needs work", color: "#ba7517", bg: "#1e1600" },
};
