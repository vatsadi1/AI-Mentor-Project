const { callGroq, extractJson } = require("./groqClient");

const SYSTEM_PROMPT = `You are an elite technical interviewer, hiring manager, and communication coach with 15+ years of experience at top tech companies (Google, Meta, Amazon, startups).

You evaluate candidates fairly, precisely, and constructively. You never give vague praise. You always provide specific, actionable feedback grounded in the candidate's actual words.

Rules:
- Return ONLY valid JSON. No markdown. No code fences. No commentary outside JSON.
- Be honest but encouraging.
- Score consistently: 90+ exceptional, 75-89 strong, 60-74 acceptable, below 60 needs work.
- For behavioral answers, check STAR method (Situation, Task, Action, Result).
- For technical answers, check accuracy, trade-offs, and depth appropriate to level.
- For delivery analysis from written text, infer clarity, structure, hedging, filler phrases, verbosity, and confidence from word choice — do not claim to hear audio.`;

function buildQuestionsPrompt(data) {
  return `Generate a tailored mock interview question set.

CANDIDATE PROFILE:
- Target role: ${data.role}
- Experience level: ${data.level}
- Interview type: ${data.interviewType}
- Focus areas: ${data.focusAreas.length ? data.focusAreas.join(", ") : "General role readiness"}
- Number of questions: ${data.questionCount}

REQUIREMENTS:
1. Questions must match the role, level, and interview type.
2. Mix difficulty appropriately for the level.
3. Avoid generic questions unless interview type is behavioral.
4. Each question needs a distinct category (e.g. "Leadership", "System Design", "JavaScript", "Problem Solving").
5. Include 2-3 short prep tips per question (what a strong answer should cover).
6. Questions should be realistic — what real interviewers ask today.
7. Do NOT repeat similar questions.

Return JSON in this exact shape:
{
  "questions": [
    {
      "id": "q1",
      "question": "Full interview question text",
      "category": "Category name",
      "difficulty": "easy|medium|hard",
      "tips": ["Tip 1", "Tip 2"]
    }
  ]
}`;
}

function buildEvaluatePrompt(data) {
  return `Evaluate this mock interview answer and provide coaching feedback.

SESSION CONTEXT:
- Role: ${data.role}
- Level: ${data.level}
- Interview type: ${data.interviewType}
- Question category: ${data.category}
- Question difficulty: ${data.difficulty}

QUESTION:
${data.question}

CANDIDATE ANSWER:
${data.answer}

EVALUATION INSTRUCTIONS:
1. Score content quality: relevance, accuracy, depth, use of examples.
2. Score structure: logical flow, STAR for behavioral, clear opening and conclusion.
3. Score delivery (from written text): clarity, conciseness, confidence, filler/hedging language.
4. Identify 2-4 specific strengths quoting or referencing their answer.
5. Identify 2-4 specific improvements with concrete rewrites or additions.
6. List filler or weak phrases found in the answer (empty array if none).
7. Provide a suggested strong opening sentence they could use.
8. Provide a concise improved version of their answer (not longer than 180 words).
9. Suggest one realistic follow-up question the interviewer might ask next.

Return JSON in this exact shape:
{
  "overallScore": 0,
  "scores": {
    "content": 0,
    "structure": 0,
    "relevance": 0,
    "depth": 0,
    "delivery": 0
  },
  "verdict": "strong|acceptable|needs-work",
  "summary": "2-3 sentence overall assessment",
  "strengths": ["..."],
  "improvements": ["..."],
  "deliveryFeedback": {
    "clarity": "One sentence on clarity",
    "conciseness": "One sentence on length and focus",
    "confidence": "One sentence on assertiveness vs hedging",
    "fillerWords": ["um", "like"],
    "suggestedOpener": "A strong first sentence",
    "improvedAnswer": "Rewritten answer"
  },
  "followUpQuestion": "Next probe question"
}`;
}

async function generateInterviewQuestions(data) {
  const raw = await callGroq({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildQuestionsPrompt(data) },
    ],
    temperature: 0.5,
    maxTokens: 3000,
  });

  const parsed = extractJson(raw);

  if (!Array.isArray(parsed.questions) || !parsed.questions.length) {
    throw new Error("AI returned invalid questions format");
  }

  return parsed.questions.map((q, index) => ({
    id: q.id || `q${index + 1}`,
    question: String(q.question || "").trim(),
    category: String(q.category || "General").trim(),
    difficulty: ["easy", "medium", "hard"].includes(q.difficulty) ? q.difficulty : "medium",
    tips: Array.isArray(q.tips) ? q.tips.map((t) => String(t).trim()).filter(Boolean) : [],
  }));
}

async function evaluateInterviewAnswer(data) {
  const raw = await callGroq({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildEvaluatePrompt(data) },
    ],
    temperature: 0.3,
    maxTokens: 3500,
  });

  const parsed = extractJson(raw);

  const scores = parsed.scores || {};
  const clamp = (n) => Math.min(100, Math.max(0, Number(n) || 0));

  return {
    overallScore: clamp(parsed.overallScore),
    scores: {
      content: clamp(scores.content),
      structure: clamp(scores.structure),
      relevance: clamp(scores.relevance),
      depth: clamp(scores.depth),
      delivery: clamp(scores.delivery),
    },
    verdict: ["strong", "acceptable", "needs-work"].includes(parsed.verdict)
      ? parsed.verdict
      : "acceptable",
    summary: String(parsed.summary || "").trim(),
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
    improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
    deliveryFeedback: {
      clarity: parsed.deliveryFeedback?.clarity || "",
      conciseness: parsed.deliveryFeedback?.conciseness || "",
      confidence: parsed.deliveryFeedback?.confidence || "",
      fillerWords: Array.isArray(parsed.deliveryFeedback?.fillerWords)
        ? parsed.deliveryFeedback.fillerWords
        : [],
      suggestedOpener: parsed.deliveryFeedback?.suggestedOpener || "",
      improvedAnswer: parsed.deliveryFeedback?.improvedAnswer || "",
    },
    followUpQuestion: String(parsed.followUpQuestion || "").trim(),
  };
}

module.exports = { generateInterviewQuestions, evaluateInterviewAnswer };
