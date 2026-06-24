import { useCallback, useState } from "react";
import {
  CONTENT_TYPE_LABELS,
  QUALITY_CATEGORIES,
  VIEW_PHASE,
} from "../constants";
import { CopyIcon, PenIcon } from "./icons";

function ScoreBar({ label, value, primary = false }) {
  const score = Math.min(100, Math.max(0, Number(value) || 0));
  const color =
    score >= 80 ? "#1d9e75" : score >= 60 ? "#ba7517" : "#e07070";

  return (
    <div className={`pf-score-card${primary ? " primary" : ""}`}>
      <div className="pf-score-val-inline" style={{ color }}>
        {score}
      </div>
      <div className="pf-score-label">{label}</div>
      <div className="pf-score-bar-wrap">
        <div className="pf-score-bar-track">
          <div
            className="pf-score-bar-fill"
            style={{ width: `${score}%`, background: color }}
          />
        </div>
      </div>
    </div>
  );
}

function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [text]);

  if (!text) return null;

  return (
    <button type="button" className="pf-copy-btn" onClick={handleCopy}>
      <CopyIcon />
      {copied ? "Copied!" : label}
    </button>
  );
}

function MarkdownBlock({ content, label }) {
  if (!content) return null;

  return (
    <div className="pf-content-block">
      {label && <div className="pf-block-title">{label}</div>}
      <pre className="pf-markdown-preview">{content}</pre>
      <CopyButton text={content} label="Copy content" />
    </div>
  );
}

export default function ContentPanel({ phase, draft, meta }) {
  if (phase === VIEW_PHASE.EMPTY) {
    return (
      <section className="pf-main" aria-label="Generated content">
        <div className="pf-empty">
          <div className="pf-empty-icon">
            <PenIcon />
          </div>
          <p className="pf-empty-text">
            Configure your content type, describe your topic, and generate portfolio posts,
            READMEs, blog outlines, or social threads in your voice.
          </p>
        </div>
      </section>
    );
  }

  if (phase === VIEW_PHASE.LOADING) {
    return (
      <section className="pf-main" aria-label="Generated content" aria-busy="true">
        <div className="pf-loading">
          <div className="pf-spinner" role="status" aria-label="Generating content" />
          <p className="pf-loading-msg">Crafting your content…</p>
        </div>
      </section>
    );
  }

  if (phase === VIEW_PHASE.ERROR && !draft) {
    return (
      <section className="pf-main" aria-label="Generated content">
        <div className="pf-empty">
          <div className="pf-empty-icon">
            <PenIcon />
          </div>
          <p className="pf-empty-text">
            Fix the form errors on the left, or try again once the server is available.
          </p>
        </div>
      </section>
    );
  }

  if (!draft || !meta) return null;

  const quality = draft.quality ?? {};
  const seo = draft.seo ?? {};
  const social = draft.social ?? {};
  const metadata = draft.metadata ?? {};
  const typeLabel =
    CONTENT_TYPE_LABELS[meta.contentType] ??
    metadata.contentTypeLabel ??
    meta.contentType;

  const mainContent =
    draft.content ||
    (draft.sections?.length
      ? draft.sections.map((s) => `## ${s.heading}\n\n${s.body}`).join("\n\n")
      : "");

  const copyAllText = [
    draft.title,
    draft.subtitle,
    mainContent,
    draft.fullDraft,
  ]
    .filter(Boolean)
    .join("\n\n");

  return (
    <section className="pf-main" aria-label="Generated content">
      <header className="pf-rhs-header">
        <div>
          <h2 className="pf-rhs-title">{draft.title}</h2>
          {draft.subtitle && <p className="pf-content-subtitle">{draft.subtitle}</p>}
          <div className="pf-meta-row">
            <span className="pf-meta-chip">{typeLabel}</span>
            <span className="pf-meta-chip">{meta.tone}</span>
            <span className="pf-meta-chip">{meta.length}</span>
            {metadata.estimatedLength && (
              <span className="pf-meta-chip proj">{metadata.estimatedLength}</span>
            )}
            {meta.hasVoiceNotes && (
              <span className="pf-meta-chip proj">Custom voice</span>
            )}
          </div>
        </div>
        <CopyButton text={copyAllText} label="Copy all" />
      </header>

      <div className="pf-score-grid">
        <ScoreBar label="Overall quality" value={quality.overallScore} primary />
        {QUALITY_CATEGORIES.map((cat) => (
          <ScoreBar key={cat.key} label={cat.label} value={quality[cat.key]} />
        ))}
      </div>

      {social.hookLine && (
        <div className="pf-hook-box">
          <div className="pf-summary-label">Hook line</div>
          <p className="pf-hook-text">{social.hookLine}</p>
          <CopyButton text={social.hookLine} label="Copy hook" />
        </div>
      )}

      <MarkdownBlock content={mainContent} label="Content" />

      {draft.fullDraft && (
        <MarkdownBlock content={draft.fullDraft} label="Sample draft section" />
      )}

      {draft.sections?.length > 0 && draft.content && (
        <>
          <div className="pf-block-title">Outline sections</div>
          <div className="pf-section-grid">
            {draft.sections.map((section) => (
              <div key={section.heading} className="pf-section-card">
                <div className="pf-section-top">
                  <span className="pf-section-name">{section.heading}</span>
                </div>
                <p className="pf-section-feedback">{section.body}</p>
                {section.notes && (
                  <p className="pf-section-notes">{section.notes}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {!draft.content && draft.sections?.length > 0 && (
        <>
          <div className="pf-block-title">Outline</div>
          <div className="pf-section-grid">
            {draft.sections.map((section) => (
              <div key={section.heading} className="pf-section-card">
                <div className="pf-section-top">
                  <span className="pf-section-name">{section.heading}</span>
                </div>
                <p className="pf-section-feedback">{section.body}</p>
                {section.notes && (
                  <p className="pf-section-notes">{section.notes}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <div className="pf-two-col">
        {draft.alternativeTitles?.length > 0 && (
          <div>
            <div className="pf-block-title">Alternative titles</div>
            <div className="pf-strength-list">
              {draft.alternativeTitles.map((title) => (
                <div key={title} className="pf-strength-item">
                  <span className="pf-strength-dot" />
                  {title}
                </div>
              ))}
            </div>
          </div>
        )}

        {draft.writingTips?.length > 0 && (
          <div>
            <div className="pf-block-title">Writing tips</div>
            <div className="pf-strength-list">
              {draft.writingTips.map((tip) => (
                <div key={tip} className="pf-strength-item">
                  <span className="pf-strength-dot" style={{ background: "#7c6ef0" }} />
                  {tip}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {(seo.keywords?.length > 0 || seo.metaDescription) && (
        <>
          <div className="pf-block-title">SEO</div>
          <div className="pf-seo-box">
            {seo.metaDescription && (
              <div className="pf-seo-row">
                <span className="pf-seo-label">Meta description</span>
                <p className="pf-seo-text">{seo.metaDescription}</p>
                <CopyButton text={seo.metaDescription} label="Copy" />
              </div>
            )}
            {seo.suggestedSlug && (
              <div className="pf-seo-row">
                <span className="pf-seo-label">Suggested slug</span>
                <code className="pf-slug">{seo.suggestedSlug}</code>
              </div>
            )}
            {seo.keywords?.length > 0 && (
              <div className="pf-kw-tags" style={{ marginTop: 8 }}>
                {seo.keywords.map((kw) => (
                  <span key={kw} className="pf-kw-tag recommended">
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {(social.hashtags?.length > 0 || social.callToAction) && (
        <>
          <div className="pf-block-title">Social</div>
          <div className="pf-seo-box">
            {social.callToAction && (
              <div className="pf-seo-row">
                <span className="pf-seo-label">Call to action</span>
                <p className="pf-seo-text">{social.callToAction}</p>
              </div>
            )}
            {social.hashtags?.length > 0 && (
              <div className="pf-kw-tags">
                {social.hashtags.map((tag) => (
                  <span key={tag} className="pf-kw-tag found">
                    {tag.startsWith("#") ? tag : `#${tag}`}
                  </span>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {draft.nextSteps?.length > 0 && (
        <>
          <div className="pf-block-title">Next steps</div>
          <div className="pf-next-list">
            {draft.nextSteps.map((step, index) => (
              <div key={step} className="pf-next-item">
                <span className="pf-next-num">{index + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
