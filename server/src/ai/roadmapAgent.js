const axios = require("axios");
const http = require("http");

async function generateRoadmapAgent(data) {
  try {
    if (!data || !data.role || !Array.isArray(data.techStack)) {
      throw new Error("Invalid input data");
    }

    const prompt = `
You are a senior software engineer mentor.

Generate a roadmap in STRICT JSON format.

INPUT:
Role: ${data.role}
Tech Stack: ${data.techStack.join(", ")}
Level: ${data.level}
Time per day: ${data.timeCommitment}
Deadline: ${data.deadline}
Goal Type: ${data.goalType}
Projects: ${data.projects}

RULES:
- Return ONLY JSON
- No explanation, no markdown
- Max 6 weeks

FORMAT:
[
  {
    "week": "Week 1",
    "title": "Topic title",
    "topics": ["topic1", "topic2"],
    "tasks": ["task1", "task2", "task3"],
    "project": "project name"
  }
]
`;

    console.log("🚀 Calling Groq API...");

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
        httpAgent: new http.Agent({ keepAlive: false }),
      }
    );

    const raw =
      response?.data?.choices?.[0]?.message?.content;

    if (!raw) throw new Error("Empty AI response");

    console.log("✅ AI Response received");

    // 🔥 CLEAN JSON (important)
    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("❌ JSON PARSE ERROR:", cleaned);
      throw new Error("Invalid JSON from AI");
    }

    return parsed;

  } catch (error) {
    console.error("❌ ERROR:", error.message);

    // fallback safe structure
    return [
      {
        week: "Week 1",
        title: "Temporary fallback",
        topics: ["Try again"],
        tasks: ["AI failed, retry request"],
        project: "None",
      },
    ];
  }
}

module.exports = generateRoadmapAgent;