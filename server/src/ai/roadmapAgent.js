const axios = require("axios");
const http = require("http");

async function generateRoadmapAgent(data) {
  try {
    // 🔒 Basic validation (avoid undefined crashes)
    if (!data || !data.role || !Array.isArray(data.techStack)) {
      throw new Error("Invalid input data passed to AI agent");
    }

    const prompt = `
You are a senior software engineer mentor.

Create a structured roadmap.

Role: ${data.role}
Tech Stack: ${data.techStack.join(", ")}
Level: ${data.level}
Time per day: ${data.timeCommitment}
Deadline: ${data.deadline}
Goal Type: ${data.goalType}
Projects: ${data.projects}

Return:
- Weekly plan
- Topics
- Projects
`;

    console.log("🚀 Calling Groq API...");

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 10000, // 🔥 Prevent hanging
        httpAgent: new http.Agent({ keepAlive: false }), // 🔥 Fix ECONNRESET
      }
    );

    // 🔍 Safe extraction
    const content =
      response?.data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Invalid AI response structure");
    }

    console.log("✅ AI Response received");

    return content;

  } catch (error) {
    console.error("❌ ERROR TYPE:", error.code || "UNKNOWN");
    console.error(
      "❌ FULL ERROR:",
      error.response?.data || error.message
    );

    // 🔁 Friendly fallback (important for UX)
    return "AI is currently busy. Please try again in a few seconds.";
  }
}

module.exports = generateRoadmapAgent;
//dffdg