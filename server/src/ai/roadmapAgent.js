const axios = require("axios");
const http = require("http");

async function generateRoadmapAgent(data) {
try {
// Validation
if (
!data ||
!data.role ||
!Array.isArray(data.techStack)
) {
throw new Error("Invalid input data");
}


const prompt = `


You are an elite Senior Software Engineer, Technical Mentor, Career Coach, Hiring Manager, Freelance Consultant, and Curriculum Designer with 20+ years of experience mentoring developers from beginner to senior level.

Your task is to generate the highest quality learning roadmap possible.

Analyze the user's profile deeply before creating the roadmap.

USER PROFILE:

Role: ${data.role}

Tech Stack: ${data.techStack.join(", ")}

Level: ${data.level}

Time Commitment: ${data.timeCommitment}

Deadline: ${data.deadline}

Goal Type: ${data.goalType}

Projects: ${data.projects}

THINKING PROCESS:

Before generating the roadmap:

* Analyze the user's current level.
* Determine the most efficient path to reach the target role.
* Remove unnecessary topics.
* Prioritize high ROI skills.
* Follow industry standards used by top companies.
* Focus on practical skills over theory.
* Optimize the roadmap for maximum employability.
* Consider modern industry trends and hiring expectations.
* Build knowledge progressively from fundamentals to advanced concepts.
* Avoid overwhelming the learner.
* Ensure every week has a clear purpose.
* Ensure every topic contributes directly toward the user's goal.

GOAL-SPECIFIC BEHAVIOR:

If Goal Type = job:

* Focus on employability.
* Include portfolio projects.
* Include interview preparation.
* Include resume-ready projects.
* Prioritize commonly asked interview topics.

If Goal Type = freelance:

* Focus on client-ready skills.
* Include deployment.
* Include portfolio building.
* Include real-world business projects.
* Include project planning concepts.

If Goal Type = interview:

* Focus heavily on interview preparation.
* Include revision weeks.
* Include interview-focused exercises.

If Goal Type = project:

* Focus on building increasingly complex projects.
* Prioritize implementation over theory.

PROJECT RULES:

If Projects = yes:

* Every week should contribute toward a meaningful project.
* Projects should increase in complexity.

If Projects = no:

* Do not include projects.

ROADMAP QUALITY RULES:

* Respect the user's deadline.
* Respect the user's time commitment.
* Keep the roadmap realistic.
* Keep the roadmap actionable.
* Avoid generic advice.
* Avoid repetition.
* Include only valuable topics.
* Generate between 4 and 12 weeks depending on the deadline.

OUTPUT RULES:

* Return ONLY valid JSON.
* No markdown.
* No explanation.
* No notes.
* No code fences.
* Output must be directly parsable using JSON.parse().

FORMAT:

[
{
"week": "Week 1",
"title": "Topic Title",
"goal": "Clear learning objective",
"topics": [
"Topic 1",
"Topic 2"
],
"tasks": [
"Task 1",
"Task 2",
"Task 3"
],
"project": "Project Name"
}
]
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
    temperature: 0.4,
    max_tokens: 4096,
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    timeout: 20000,
    httpAgent: new http.Agent({
      keepAlive: false,
    }),
  }
);

const raw =
  response?.data?.choices?.[0]?.message?.content;

if (!raw) {
  throw new Error("Empty AI response");
}

console.log("✅ AI Response received");

 

const jsonMatch = raw.match(/\[[\s\S]*\]/);

if (!jsonMatch) {
  throw new Error("No JSON array found in AI response");
}

 

try {
  roadmap = JSON.parse(jsonMatch[0]);
} catch (parseError) {
  console.error("❌ JSON PARSE ERROR");
  console.error(cleaned);

  throw new Error("Invalid JSON returned by AI");
}

if (!Array.isArray(roadmap)) {
  throw new Error("Roadmap is not an array");
}

return roadmap;


} catch (error) {
console.error("❌ AI AGENT ERROR:", error.message);


return [
  {
    week: "Week 1",
    title: "Roadmap Generation Failed",
    goal: "Retry roadmap generation",
    topics: [
      "Check AI service",
      "Retry request"
    ],
    tasks: [
      "Generate roadmap again"
    ],
    project: "N/A",
  },
];


}
}

module.exports = generateRoadmapAgent;
