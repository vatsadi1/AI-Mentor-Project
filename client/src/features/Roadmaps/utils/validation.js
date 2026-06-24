export function buildRoadmapPayload(form, selectedTech) {
  const techStack = [...selectedTech];

  return {
    role: form.role.trim(),
    techStack,
    level: form.level,
    timeCommitment: `${form.hoursPerWeek} hrs/week`,
    deadline: `${form.deadlineDays} days`,
    goalType: form.goalType,
    projects: form.includeProjects ? "yes" : "no",
  };
}

export function validateRoadmapForm(form, selectedTech) {
  const errors = {};

  if (!form.role.trim()) {
    errors.role = "Select a target role.";
  }

  if (selectedTech.size === 0) {
    errors.techStack = "Select at least one technology.";
  }

  if (!form.hoursPerWeek || form.hoursPerWeek < 1) {
    errors.hoursPerWeek = "Set your weekly time commitment.";
  }

  if (!form.deadlineDays || form.deadlineDays < 7) {
    errors.deadlineDays = "Deadline must be at least 7 days.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
