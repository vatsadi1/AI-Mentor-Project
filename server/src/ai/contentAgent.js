const { callGroq, extractJson } = require("./groqClient");

const SYSTEM_PROMPT = `You are an elite technical content strategist, developer advocate, and professional writer with 20+ years of experience crafting portfolio posts, open-source READMEs, and technical blog content for engineers at companies like Stripe, Vercel, GitHub, and top developer publications (Dev.to, Hashnode, CSS-Tricks).

You write content that is:
- Authentic and human — never generic AI slop or corporate filler
- Technically precise — accurate terminology, realistic examples, no hand-waving
- Structured for scanability — strong hooks, clear headings, logical flow
- Voice-aware — you adapt tone, vocabulary, and rhythm to match the author's stated style
- Platform-native — LinkedIn posts differ from READMEs differ from blog outlines
- Your response will be parsed by JSON.parse().
- Any invalid JSON will cause a system failure.
- Return exactly one JSON object and nothing else.

Rules:
- Return ONLY valid JSON. No markdown code fences. No commentary outside JSON.
- Write in the requested language (default English).
- For README and blog content, use Markdown formatting inside JSON string fields.
- Never invent fake metrics, company names, or project details unless the user provided them as examples.
- If context is thin, make reasonable professional assumptions and note them in writingTips.
- Quality scores are self-assessment of the draft you produce (honest, not inflated).`;

const CONTENT_TYPE_INSTRUCTIONS = {
  portfolio_post: `CONTENT TYPE: Portfolio / Professional Post (LinkedIn, Dev.to, personal blog)
- Open with a scroll-stopping hook (question, bold claim, or micro-story) — not "I'm excited to share"
- Use short paragraphs (1-3 sentences) and line breaks for mobile readability
- Include 1 concrete technical insight or lesson learned
- End with a clear call-to-action (question, invite to connect, link placeholder)
- Length: 150-350 words unless user specifies otherwise
- Avoid hashtag spam; 3-5 relevant tags max`,

  readme: `CONTENT TYPE: Project README (GitHub/GitLab)
- Structure: Title + one-line description → Badges placeholder → Features → Quick Start → Installation → Usage (with code examples) → Configuration → Contributing → License
- Include realistic placeholder commands and code blocks in Markdown
- Quick Start must get a developer running in under 2 minutes
- Use tables for config options when appropriate
- Tone: clear, welcoming, professional — like a well-maintained OSS project
- Include a "Why this project?" section if context supports it`,

  blog_outline: `CONTENT TYPE: Technical Blog Outline (deep-dive article)
- Provide: compelling title, subtitle, meta description, full outline with H2/H3 sections
- Each section: heading, 2-4 bullet points of what to cover, optional code/example notes
- Include: intro hook strategy, key takeaways box, conclusion CTA
- Also provide a "fullDraft" field with a polished intro paragraph + one sample section written out
- Target: article that teaches something specific, not surface-level listicles
- Suggest internal linking topics and related concepts`,

  social_thread: `CONTENT TYPE: Social Thread (Twitter/X, Bluesky, Mastodon)
- 5-10 numbered posts, each under 280 characters (mark character count per post)
- Thread arc: hook → problem → insight → example → takeaway → CTA
- First post must stand alone as a hook
- Technical but accessible; one idea per post
- Include a suggested pinned reply or link placeholder on final post`,

  case_study: `CONTENT TYPE: Project Case Study (portfolio piece)
- Structure: Challenge → Approach → Implementation → Results → Lessons Learned
- Use STAR-adjacent narrative for professional credibility
- Include technical stack, architecture decisions, trade-offs made
- Quantify impact where user provided metrics; use placeholders like "[X% improvement]" if not
- Suitable for portfolio site or Medium publication`,
};

function buildGeneratePrompt(data) {
  const typeInstructions =
    CONTENT_TYPE_INSTRUCTIONS[data.contentType] || CONTENT_TYPE_INSTRUCTIONS.portfolio_post;

  const keyPointsBlock = data.keyPoints?.length
    ? `\nKEY POINTS TO INCLUDE:\n${data.keyPoints.map((p, i) => `${i + 1}. ${p}`).join("\n")}`
    : "";

  const voiceBlock = data.voiceNotes?.trim()
    ? `\nVOICE / STYLE NOTES:\n${data.voiceNotes.trim()}`
    : "";

  const platformBlock = data.platform?.trim()
    ? `\nTARGET PLATFORM: ${data.platform.trim()}`
    : "";

  const audienceBlock = data.audience?.trim()
    ? `\nTARGET AUDIENCE: ${data.audience.trim()}`
    : "\nTARGET AUDIENCE: Software developers and tech professionals";

  return `Generate professional technical content based on the specifications below.

${typeInstructions}

TOPIC / PROJECT CONTEXT:
${data.topic.trim()}

CONTENT TYPE KEY: ${data.contentType}
TONE: ${data.tone}
LENGTH PREFERENCE: ${data.length}${audienceBlock}${platformBlock}${voiceBlock}${keyPointsBlock}

REQUIREMENTS:
1. Match the tone precisely: ${data.tone}
2. Respect length preference: ${data.length}
3. Content must feel written by a real engineer, not a marketing bot
4. Include actionable, specific details from the topic context
5. For outlines, make sections deep enough to write a full article from
6. Provide honest quality self-scores for the draft
7. Suggest 2-3 alternative titles
8. Include 3-5 practical writingTips for improving or publishing this content
9. Include 2-4 nextSteps (e.g. "Add screenshots", "Publish on Dev.to")

Return JSON in this exact shape:
{
  "title": "Primary title",
  "subtitle": "Optional subtitle or tagline",
  "content": "Full content in Markdown (for portfolio_post, readme, social_thread, case_study) OR empty string for blog_outline",
  "sections": [
    {
      "heading": "Section heading",
      "body": "Section content or bullet points in Markdown",
      "notes": "Optional writer notes for this section"
    }
  ],
  "fullDraft": "For blog_outline only: intro paragraph + one sample section written out. Empty string otherwise.",
  "metadata": {
    "wordCount": 0,
    "readingTimeMinutes": 0,
    "contentTypeLabel": "Human-readable type name",
    "estimatedLength": "e.g. 280 words"
  },
  "quality": {
    "overallScore": 0,
    "clarity": 0,
    "engagement": 0,
    "technicalAccuracy": 0,
    "voiceMatch": 0
  },
  "seo": {
    "keywords": ["keyword1", "keyword2"],
    "metaDescription": "150-160 char meta description",
    "suggestedSlug": "url-friendly-slug"
  },
  "social": {
    "hashtags": ["tag1", "tag2"],
    "hookLine": "Best opening line for social sharing",
    "callToAction": "Suggested CTA"
  },
  "alternativeTitles": ["Title 2", "Title 3"],
  "writingTips": ["Tip 1", "Tip 2"],
  "nextSteps": ["Step 1", "Step 2"]
}`;
}

function clamp(n) {
  return Math.min(100, Math.max(0, Number(n) || 0));
}

function normalizeSections(sections) {
  if (!Array.isArray(sections)) return [];
  return sections
    .map((s) => ({
      heading: String(s.heading || "").trim(),
      body: String(s.body || "").trim(),
      notes: String(s.notes || "").trim(),
    }))
    .filter((s) => s.heading || s.body);
}

async function generateContent(data) {
  const raw = await callGroq({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildGeneratePrompt(data) },
    ],
    temperature: 0.55,
    maxTokens: 4096,
    
  });
  console.log("========== RAW ==========");
console.log(raw);
console.log("=========================");

  const parsed = extractJson(raw);
  const quality = parsed.quality || {};
  const seo = parsed.seo || {};
  const social = parsed.social || {};
  const metadata = parsed.metadata || {};
  

  return {
    title: String(parsed.title || "Untitled").trim(),
    subtitle: String(parsed.subtitle || "").trim(),
    content: String(parsed.content || "").trim(),
    sections: normalizeSections(parsed.sections),
    fullDraft: String(parsed.fullDraft || "").trim(),
    metadata: {
      wordCount: Number(metadata.wordCount) || 0,
      readingTimeMinutes: Number(metadata.readingTimeMinutes) || 0,
      contentTypeLabel: String(metadata.contentTypeLabel || data.contentType).trim(),
      estimatedLength: String(metadata.estimatedLength || "").trim(),
    },
    quality: {
      overallScore: clamp(quality.overallScore),
      clarity: clamp(quality.clarity),
      engagement: clamp(quality.engagement),
      technicalAccuracy: clamp(quality.technicalAccuracy),
      voiceMatch: clamp(quality.voiceMatch),
    },
    seo: {
      keywords: Array.isArray(seo.keywords) ? seo.keywords.map((k) => String(k).trim()).filter(Boolean) : [],
      metaDescription: String(seo.metaDescription || "").trim(),
      suggestedSlug: String(seo.suggestedSlug || "").trim(),
    },
    social: {
      hashtags: Array.isArray(social.hashtags)
        ? social.hashtags.map((h) => String(h).trim()).filter(Boolean)
        : [],
      hookLine: String(social.hookLine || "").trim(),
      callToAction: String(social.callToAction || "").trim(),
    },
    alternativeTitles: Array.isArray(parsed.alternativeTitles)
      ? parsed.alternativeTitles.map((t) => String(t).trim()).filter(Boolean)
      : [],
    writingTips: Array.isArray(parsed.writingTips)
      ? parsed.writingTips.map((t) => String(t).trim()).filter(Boolean)
      : [],
    nextSteps: Array.isArray(parsed.nextSteps)
      ? parsed.nextSteps.map((s) => String(s).trim()).filter(Boolean)
      : [],
      
  };
}

module.exports = { generateContent };
