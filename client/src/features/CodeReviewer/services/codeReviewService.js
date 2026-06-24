import axios from "axios";
import { apiClient } from "../../../services/authService";

export async function reviewCode(payload) {
  const { data } = await apiClient.post("/code-review/review", payload);
  return data;
}

export function getErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.message ||
      "Unable to review code. Please try again."
    );
  }
  return error?.message || "An unexpected error occurred.";
}
