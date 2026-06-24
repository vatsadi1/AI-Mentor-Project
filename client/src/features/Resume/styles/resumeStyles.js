import { roadmapStyles } from "../../Roadmaps/styles/roadmapStyles";

export const resumeStyles =
  roadmapStyles +
  `
  .pf-upload-zone {
    border: 1.5px dashed #252535;
    border-radius: 10px;
    padding: 20px 14px;
    text-align: center;
    cursor: pointer;
    transition: all 0.15s;
    background: #13131e;
  }
  .pf-upload-zone:hover, .pf-upload-zone.drag-over {
    border-color: #7c6ef0;
    background: #16162a;
  }
  .pf-upload-zone.has-file {
    border-style: solid;
    border-color: #1d9e75;
    background: #0a1e14;
  }
  .pf-upload-zone.invalid {
    border-color: #8a4040;
  }
  .pf-upload-icon {
    width: 36px; height: 36px;
    border-radius: 8px;
    background: #1e1840;
    border: 0.5px solid #2e2c50;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 10px;
  }
  .pf-upload-title { font-size: 12px; color: #c4c4d8; margin-bottom: 4px; }
  .pf-upload-sub { font-size: 10px; color: #444460; font-family: 'IBM Plex Mono', monospace; }
  .pf-upload-filename {
    font-size: 11px;
    color: #5dcaa5;
    font-family: 'IBM Plex Mono', monospace;
    margin-top: 8px;
    word-break: break-all;
  }
  .pf-textarea {
    width: 100%;
    background: #13131e;
    border: 0.5px solid #252535;
    color: #c4c4d8;
    border-radius: 8px;
    padding: 10px 11px;
    font-size: 11px;
    font-family: 'Sora', sans-serif;
    resize: vertical;
    min-height: 72px;
    outline: none;
    transition: border-color 0.15s;
    line-height: 1.5;
  }
  .pf-textarea:focus { border-color: #7c6ef0; }
  .pf-textarea::placeholder { color: #383855; }

  .pf-score-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 10px;
    margin-bottom: 20px;
  }
  .pf-score-card {
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 10px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    animation: pf-fade-in 0.3s ease both;
  }
  .pf-score-card.primary {
    border-color: #2e2c50;
    background: #13131e;
  }
  .pf-score-ring {
    position: relative;
    width: 64px; height: 64px;
  }
  .pf-score-ring svg { transform: rotate(-90deg); }
  .pf-score-val {
    position: absolute;
    inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 18px;
    font-weight: 500;
    color: #d4d4e8;
  }
  .pf-score-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    color: #444460;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .pf-score-bar-wrap { width: 100%; }
  .pf-score-bar-track {
    background: #13131e;
    border-radius: 4px;
    height: 4px;
    overflow: hidden;
    margin-top: 4px;
  }
  .pf-score-bar-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.5s ease;
  }

  .pf-summary-box {
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 10px;
    padding: 14px 16px;
    margin-bottom: 20px;
    animation: pf-fade-in 0.3s ease both;
  }
  .pf-summary-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    color: #7c6ef0;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .pf-summary-text { font-size: 12px; color: #a0a0c0; line-height: 1.7; }

  .pf-section-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 10px;
    margin-bottom: 20px;
  }
  .pf-section-card {
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 10px;
    padding: 12px 14px;
    animation: pf-fade-in 0.3s ease both;
  }
  .pf-section-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    gap: 8px;
  }
  .pf-section-name { font-size: 11px; font-weight: 500; color: #d4d4e8; }
  .pf-section-badge {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 8px;
    padding: 2px 6px;
    border-radius: 4px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    flex-shrink: 0;
  }
  .pf-section-feedback { font-size: 10px; color: #666680; line-height: 1.6; }

  .pf-block-title {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    font-weight: 500;
    color: #444460;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .pf-strength-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
  .pf-strength-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 11px;
    color: #7878a0;
    line-height: 1.5;
  }
  .pf-strength-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #1d9e75;
    flex-shrink: 0;
    margin-top: 5px;
  }

  .pf-improve-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
  .pf-improve-card {
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 10px;
    padding: 12px 14px;
    animation: pf-fade-in 0.3s ease both;
  }
  .pf-improve-top {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
    flex-wrap: wrap;
  }
  .pf-priority-badge {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 8px;
    padding: 2px 6px;
    border-radius: 4px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .pf-improve-category {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    color: #666680;
  }
  .pf-improve-issue { font-size: 11px; color: #c4c4d8; margin-bottom: 4px; }
  .pf-improve-suggestion { font-size: 10px; color: #666680; line-height: 1.6; }

  .pf-kw-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
    margin-bottom: 20px;
  }
  .pf-kw-box {
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 10px;
    padding: 12px 14px;
  }
  .pf-kw-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }
  .pf-kw-tag {
    font-size: 9px;
    font-family: 'IBM Plex Mono', monospace;
    padding: 2px 7px;
    border-radius: 4px;
    background: #13131e;
    border: 0.5px solid #252535;
    color: #666680;
  }
  .pf-kw-tag.found { background: #0a1e14; border-color: #1a3525; color: #3d9e65; }
  .pf-kw-tag.missing { background: #1a1014; border-color: #4a2830; color: #e07070; }
  .pf-kw-tag.recommended { background: #1e1840; border-color: #2e2c50; color: #b0a8f8; }

  .pf-rewrite-list { display: flex; flex-direction: column; gap: 10px; }
  .pf-rewrite-card {
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 10px;
    padding: 14px;
    animation: pf-fade-in 0.3s ease both;
  }
  .pf-rewrite-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 8px;
    color: #444460;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .pf-rewrite-original { font-size: 11px; color: #666680; line-height: 1.5; margin-bottom: 10px; }
  .pf-rewrite-improved {
    font-size: 11px;
    color: #85b7eb;
    line-height: 1.5;
    margin-bottom: 6px;
    padding-left: 10px;
    border-left: 2px solid #378add;
  }
  .pf-rewrite-reason { font-size: 10px; color: #444460; line-height: 1.5; }

  .pf-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  @media (max-width: 900px) { .pf-two-col { grid-template-columns: 1fr; } }

  .pf-clear-btn {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: #666680;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .pf-clear-btn:hover { color: #a0a0c0; }
`;
