import axios from "axios";

const client = axios.create({
  baseURL: "/api",
});

export async function analyzeResume(formData) {
  const { data } = await client.post("/resume/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export function getErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.message ||
      "Unable to analyze resume. Please try again."
    );
  }

  return error?.message || "An unexpected error occurred.";
}
