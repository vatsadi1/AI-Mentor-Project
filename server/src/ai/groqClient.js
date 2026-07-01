const axios = require("axios");
const http = require("http");
const { jsonrepair } = require("jsonrepair");

async function callGroq({ messages, temperature = 0.4, maxTokens = 4096 }) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.1-8b-instant",
      messages,
      temperature,
      max_tokens: maxTokens,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 30000,
      httpAgent: new http.Agent({ keepAlive: false }),
    }
  );

  const content = response?.data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Empty AI response");
  }

  return content;
}

function extractJson(raw) {
  const objectMatch = raw.match(/\{[\s\S]*\}/);
  const arrayMatch = raw.match(/\[[\s\S]*\]/);
  const candidate = objectMatch?.[0] ?? arrayMatch?.[0];

  if (!candidate) {
    throw new Error("No JSON found in AI response");
  }

  return JSON.parse(candidate);
}
 

function extractJson(raw) {
  try {
    return JSON.parse(raw);
  } catch {}

  try {
    const repaired = jsonrepair(raw);
    return JSON.parse(repaired);
  } catch (err) {
    console.error("FAILED JSON:");
    console.log(raw);
    throw err;
  }
}

module.exports = { callGroq, extractJson };
