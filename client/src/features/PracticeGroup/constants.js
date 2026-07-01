export {
  ROLE_OPTIONS,
  EXPERIENCE_LEVELS,
  INTERVIEW_TYPES,
  FOCUS_CHIPS,
  QUESTION_COUNT,
  SCORE_LABELS,
  VERDICT_STYLES,
} from "../Interview/constants";

export const INITIAL_FORM = {
  role: "",
  level: "mid",
  interviewType: "mixed",
  questionCount: 5,
  topicName: "",
};

export const VIEW_PHASE = {
  LOBBY: "lobby",
  CREATING: "creating",
  JOINING: "joining",
  WAITING: "waiting",
  STARTING: "starting",
  PRACTICE: "practice",
  EVALUATING: "evaluating",
  FEEDBACK: "feedback",
  COMPLETE: "complete",
  ERROR: "error",
};
