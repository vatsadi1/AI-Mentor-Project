import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function generateContent(payload) {
  const { data } = await client.post("/api/content/generate", payload);
  return data;
}

export function getErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.message ||
      "Unable to generate content. Please try again."
    );
  }

  return error?.message || "An unexpected error occurred.";
}
