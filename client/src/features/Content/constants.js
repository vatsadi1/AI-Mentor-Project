export const CONTENT_TYPES = [
  {
    value: "portfolio_post",
    label: "Portfolio Post",
    description: "LinkedIn, Dev.to, or personal blog post",
  },
  {
    value: "readme",
    label: "README",
    description: "GitHub project documentation",
  },
  {
    value: "blog_outline",
    label: "Blog Outline",
    description: "Deep-dive technical article structure",
  },
  {
    value: "social_thread",
    label: "Social Thread",
    description: "Twitter/X or Bluesky thread",
  },
  {
    value: "case_study",
    label: "Case Study",
    description: "Portfolio project write-up",
  },
];

export const TONE_OPTIONS = [
  { value: "professional", label: "Professional" },
  { value: "conversational", label: "Conversational" },
  { value: "technical", label: "Technical" },
  { value: "storytelling", label: "Storytelling" },
  { value: "concise", label: "Concise" },
];

export const LENGTH_OPTIONS = [
  { value: "short", label: "Short", description: "~150–300 words" },
  { value: "medium", label: "Medium", description: "~400–700 words" },
  { value: "long", label: "Long", description: "~800+ words" },
];

export const PLATFORM_OPTIONS = [
  { value: "", label: "Any platform" },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "Dev.to", label: "Dev.to" },
  { value: "Hashnode", label: "Hashnode" },
  { value: "GitHub", label: "GitHub" },
  { value: "Twitter/X", label: "Twitter / X" },
  { value: "Personal blog", label: "Personal blog" },
];

export const QUALITY_CATEGORIES = [
  { key: "clarity", label: "Clarity" },
  { key: "engagement", label: "Engagement" },
  { key: "technicalAccuracy", label: "Technical" },
  { key: "voiceMatch", label: "Voice match" },
];

export const INITIAL_FORM = {
  contentType: "portfolio_post",
  topic: "",
  tone: "professional",
  length: "medium",
  audience: "",
  platform: "",
  voiceNotes: "",
  keyPoints: "",
};

export const VIEW_PHASE = {
  EMPTY: "empty",
  LOADING: "loading",
  RESULT: "result",
  ERROR: "error",
};

export const CONTENT_TYPE_LABELS = {
  portfolio_post: "Portfolio Post",
  readme: "README",
  blog_outline: "Blog Outline",
  social_thread: "Social Thread",
  case_study: "Case Study",
};
