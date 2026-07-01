import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

export async function startInterviewSession(payload) {
  const { data } = await client.post("/interview/session", payload);
  return data;
}

export async function evaluateInterviewAnswer(payload) {
  const { data } = await client.post("/api/interview/evaluate", payload);
  return data;
}

export function getErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again."
    );
  }

  return error?.message || "An unexpected error occurred.";
}
