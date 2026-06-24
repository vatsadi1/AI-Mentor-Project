export const ROLE_OPTIONS = [
  { value: "", label: "Select a role..." },
  { value: "Frontend Engineer", label: "Frontend Engineer" },
  { value: "Backend Engineer", label: "Backend Engineer" },
  { value: "Full Stack Engineer", label: "Full Stack Engineer" },
  { value: "ML Engineer", label: "ML Engineer" },
  { value: "Data Engineer", label: "Data Engineer" },
  { value: "DevOps Engineer", label: "DevOps / Platform Engineer" },
  { value: "Mobile Developer", label: "Mobile Developer" },
];

export const TECH_CHIPS = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Go",
  "Docker",
  "AWS",
  "Postgres",
  "Next.js",
  "Kubernetes",
];

export const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Mid-level" },
  { value: "advanced", label: "Advanced" },
];

export const GOAL_TYPES = [
  { value: "job", label: "New job" },
  { value: "freelance", label: "Freelance" },
  { value: "project", label: "Personal project" },
  { value: "interview", label: "Interview prep" },
];

export const DEADLINE_PRESETS = [
  { days: 14, label: "2 wks" },
  { days: 30, label: "1 mo" },
  { days: 60, label: "2 mo" },
  { days: 90, label: "3 mo" },
  { days: 180, label: "6 mo" },
];

export const HOURS_RANGE = { min: 5, max: 40, step: 5, default: 15 };

export const INITIAL_FORM = {
  role: "",
  level: "beginner",
  goalType: "job",
  includeProjects: true,
  hoursPerWeek: HOURS_RANGE.default,
  deadlineDays: 30,
};

export const VIEW_PHASE = {
  EMPTY: "empty",
  LOADING: "loading",
  ROADMAP: "roadmap",
  ERROR: "error",
};
