import axios from "axios";
import { apiClient } from "../../../services/authService";

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

export async function createPracticeGroup(payload) {
  const { data } = await apiClient.post("/practice-group/create", payload);
  return data;
}

export async function joinPracticeGroup(roomCode) {
  const { data } = await apiClient.post("/practice-group/join", { roomCode });
  return data;
}

export async function fetchPracticeGroup(roomCode) {
  const { data } = await apiClient.get(`/practice-group/${roomCode}`);
  return data;
}
