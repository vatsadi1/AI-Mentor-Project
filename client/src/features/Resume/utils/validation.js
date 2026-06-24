import { ACCEPTED_EXTENSIONS, MAX_FILE_SIZE_BYTES } from "../constants";

export function validateResumeForm(form, file) {
  const errors = {};

  if (!form.targetRole?.trim()) {
    errors.targetRole = "Select a target role.";
  }

  if (!file) {
    errors.file = "Upload a resume file.";
  } else {
    const name = file.name.toLowerCase();
    const hasValidExt = ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));
    if (!hasValidExt) {
      errors.file = "Only PDF and .txt files are supported.";
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      errors.file = "File must be under 5 MB.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildResumeFormData(form, file) {
  const data = new FormData();
  data.append("resume", file);
  data.append("targetRole", form.targetRole.trim());
  if (form.jobDescription?.trim()) {
    data.append("jobDescription", form.jobDescription.trim());
  }
  return data;
}
