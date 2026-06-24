import axios from "axios";

const client = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export async function generateRoadmap(payload) {
  const { data } = await client.post("/roadmap/generate", payload);
  return data;
}

export function getErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.message ||
      "Unable to generate roadmap. Please try again."
    );
  }

  return error?.message || "An unexpected error occurred.";
}
