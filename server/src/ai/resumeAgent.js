const axios = require("axios");
const http = require("http");

const FALLBACK_ANALYSIS = {
  overallScore: 0,
  atsScore: 0,
  summary: "Analysis could not be completed. Please try again.",
  scores: {
    structure: 0,
    content: 0,
    keywords: 0,
    atsCompatibility: 0,
    impact: 0,
  },
  sections: [],
  strengths: [],
  improvements: [
    {
      priority: "high",
      category: "System",
      issue: "AI analysis failed",
      suggestion: "Retry the analysis or check your API configuration.",
    },
  ],
  keywords: { found: [], missing: [], recommended: [] },
  bulletRewrites: [],
};

async function analyzeResumeAgent({ resumeText, targetRole, jobDescription }) {
  try {
    if (!resumeText || resumeText.length < 50) {
      throw new Error("Resume text is too short to analyze");
    }

    const truncatedResume =
      resumeText.length > 12000 ? resumeText.slice(0, 12000) + "\n...[truncated]" : resumeText;

    const jobContext = jobDescription?.trim()
      ? `\nTARGET JOB DESCRIPTION:\n${jobDescription.trim().slice(0, 4000)}\n`
      : "";

    const prompt = `You are an elite Technical Recruiter, ATS specialist, and Senior Career Coach with 20+ years of experience reviewing software engineering resumes at top tech companies.

Analyze the resume below for a candidate targeting: ${targetRole || "a software engineering role"}.
${jobContext}
RESUME TEXT:
${truncatedResume}

EVALUATION CRITERIA:
- Structure & formatting (clear sections, scannable layout)
- Content quality (relevant experience, skills, education)
- Keyword optimization (industry terms, role-specific skills)
- ATS compatibility (parseable format, standard headings, no graphics/tables issues)
- Impact & achievements (quantified results, action verbs, ownership)

RULES:
- Be specific and actionable — no generic advice.
- Score each category 0–100 based on industry standards.
- Identify missing sections if applicable.
- Suggest keywords missing for the target role.
- Provide 2–4 bullet rewrites for weak bullets found in the resume.
- Return ONLY valid JSON — no markdown, no code fences, no explanation.

FORMAT:
{
  "overallScore": 75,
  "atsScore": 68,
  "summary": "2-3 sentence executive summary of resume quality",
  "scores": {
    "structure": 80,
    "content": 70,
    "keywords": 65,
    "atsCompatibility": 68,
    "impact": 72
  },
  "sections": [
    {
      "name": "Contact Information",
      "status": "good",
      "feedback": "Specific feedback for this section"
    }
  ],
  "strengths": ["Strength 1", "Strength 2"],
  "improvements": [
    {
      "priority": "high",
      "category": "Impact",
      "issue": "What is wrong",
      "suggestion": "How to fix it"
    }
  ],
  "keywords": {
    "found": ["keyword1", "keyword2"],
    "missing": ["missing1", "missing2"],
    "recommended": ["recommended1", "recommended2"]
  },
  "bulletRewrites": [
    {
      "original": "Original weak bullet from resume",
      "improved": "Stronger rewritten version",
      "reason": "Why this is better"
    }
  ]
}

For section status use only: "good", "needs_work", or "missing".
For improvement priority use only: "high", "medium", or "low".`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 4096,
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

    const raw = response?.data?.choices?.[0]?.message?.content;
    if (!raw) {
      throw new Error("Empty AI response");
    }

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON object found in AI response");
    }

    const analysis = JSON.parse(jsonMatch[0]);

    if (typeof analysis.overallScore !== "number") {
      throw new Error("Invalid analysis format");
    }

    return analysis;
  } catch (error) {
    console.error("❌ RESUME AI AGENT ERROR:", error.message);
    return { ...FALLBACK_ANALYSIS, summary: `Analysis failed: ${error.message}` };
  }
}

module.exports = analyzeResumeAgent;
