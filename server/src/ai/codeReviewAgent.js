const axios = require("axios");
const http = require("http");

const FALLBACK_REVIEW = {
  overallScore: 0,
  summary: "Code review could not be completed. Please try again.",
  scores: {
    correctness: 0,
    security: 0,
    performance: 0,
    maintainability: 0,
    readability: 0,
    bestPractices: 0,
  },
  strengths: [],
  issues: [
    {
      severity: "high",
      category: "System",
      line: null,
      title: "AI review failed",
      description: "The review service encountered an error.",
      suggestion: "Retry the review or check your API configuration.",
      codeFix: null,
    },
  ],
  securityFindings: [],
  performanceNotes: [],
  refactoredSnippet: null,
  reviewVerdict: "needs_changes",
};

async function codeReviewAgent({ code, language, context = "", reviewFocus = "all" }) {
  try {
    if (!code || code.trim().length < 10) {
      throw new Error("Code snippet is too short to review");
    }

    const truncatedCode =
      code.length > 15000 ? code.slice(0, 15000) + "\n// ...[truncated]" : code;

    const contextBlock = context?.trim()
      ? `\nADDITIONAL CONTEXT FROM DEVELOPER:\n${context.trim().slice(0, 2000)}\n`
      : "";

    const focusInstruction =
      reviewFocus === "security"
        ? "Prioritize security vulnerabilities, injection risks, auth flaws, and data exposure."
        : reviewFocus === "performance"
          ? "Prioritize algorithmic complexity, memory usage, I/O patterns, and scalability."
          : reviewFocus === "style"
            ? "Prioritize naming, formatting consistency, idiomatic patterns, and code clarity."
            : "Perform a balanced review across all dimensions.";

    const prompt = `You are a Principal Software Engineer and Staff-level Code Reviewer with 20+ years of experience at top tech companies (Google, Meta, Stripe). You conduct rigorous, production-grade code reviews used in real PR approval workflows.

Review the following ${language} code as if it were submitted for merge to a production codebase.
${contextBlock}
REVIEW FOCUS: ${focusInstruction}

CODE TO REVIEW:
\`\`\`${language}
${truncatedCode}
\`\`\`

REVIEW METHODOLOGY:
1. **Correctness** — Logic errors, edge cases, off-by-one, null/undefined handling, race conditions, error handling gaps
2. **Security** — Injection (SQL/XSS/command), auth/authz flaws, secrets exposure, insecure deserialization, OWASP Top 10
3. **Performance** — Time/space complexity, N+1 queries, unnecessary allocations, blocking I/O, caching opportunities
4. **Maintainability** — Single responsibility, coupling, testability, magic numbers, dead code, over-engineering
5. **Readability** — Naming clarity, function length, nesting depth, comments (only where non-obvious logic needs them)
6. **Best Practices** — Language/framework idioms, SOLID principles, DRY without premature abstraction, error propagation

RULES:
- Be specific — cite exact lines, variable names, and patterns found in the code
- Every issue must include a concrete, actionable fix — not vague advice like "consider refactoring"
- Distinguish critical bugs from style preferences
- If code is genuinely good, say so — don't invent problems
- Provide a refactored snippet ONLY if there are meaningful improvements (max 40 lines)
- Score each category 0–100 based on production readiness standards
- Return ONLY valid JSON — no markdown, no code fences, no explanation outside JSON

FORMAT:
{
  "overallScore": 72,
  "reviewVerdict": "approve_with_suggestions",
  "summary": "2-3 sentence executive summary of code quality and main concerns",
  "scores": {
    "correctness": 75,
    "security": 80,
    "performance": 70,
    "maintainability": 68,
    "readability": 74,
    "bestPractices": 71
  },
  "strengths": ["Specific strength 1", "Specific strength 2"],
  "issues": [
    {
      "severity": "critical",
      "category": "Security",
      "line": 42,
      "title": "Short issue title",
      "description": "What is wrong and why it matters in production",
      "suggestion": "Specific fix recommendation",
      "codeFix": "Optional corrected code snippet or null"
    }
  ],
  "securityFindings": [
    {
      "risk": "high",
      "title": "Finding title",
      "description": "Security concern details",
      "mitigation": "How to fix it"
    }
  ],
  "performanceNotes": [
    {
      "impact": "medium",
      "title": "Performance concern",
      "description": "What causes the issue",
      "recommendation": "How to optimize"
    }
  ],
  "refactoredSnippet": "Improved version of key section or null if not needed"
}

For issue severity use only: "critical", "high", "medium", "low", "info".
For reviewVerdict use only: "approve", "approve_with_suggestions", "needs_changes", "reject".
For security risk use only: "critical", "high", "medium", "low".
For performance impact use only: "high", "medium", "low".`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 4096,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 45000,
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

    const review = JSON.parse(jsonMatch[0]);

    if (typeof review.overallScore !== "number") {
      throw new Error("Invalid review format");
    }

    return review;
  } catch (error) {
    console.error("❌ CODE REVIEW AI AGENT ERROR:", error.message);
    return { ...FALLBACK_REVIEW, summary: `Review failed: ${error.message}` };
  }
}

module.exports = codeReviewAgent;
