import { roadmapStyles } from "../../Roadmaps/styles/roadmapStyles";

export const contentStyles =
  roadmapStyles +
  `
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
  .pf-textarea.invalid { border-color: #8a4040; }
  .pf-textarea::placeholder { color: #383855; }
  .pf-textarea:disabled { opacity: 0.6; cursor: not-allowed; }

  .pf-input {
    width: 100%;
    background: #13131e;
    border: 0.5px solid #252535;
    color: #c4c4d8;
    border-radius: 8px;
    padding: 9px 11px;
    font-size: 11px;
    font-family: 'Sora', sans-serif;
    outline: none;
    transition: border-color 0.15s;
  }
  .pf-input:focus { border-color: #7c6ef0; }
  .pf-input::placeholder { color: #383855; }
  .pf-input:disabled { opacity: 0.6; cursor: not-allowed; }

  .pf-goal-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }
  .pf-goal {
    background: #13131e;
    border: 0.5px solid #252535;
    color: #7878a0;
    border-radius: 8px;
    padding: 8px 10px;
    font-size: 10px;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
    transition: all 0.15s;
    text-align: center;
  }
  .pf-goal:hover:not(:disabled) { border-color: #383855; color: #a0a0c0; }
  .pf-goal.active {
    background: #1e1840;
    border-color: #7c6ef0;
    color: #b0a8f8;
  }
  .pf-goal:disabled { opacity: 0.6; cursor: not-allowed; }

  .pf-content-subtitle {
    font-size: 12px;
    color: #7878a0;
    margin-top: 4px;
    margin-bottom: 10px;
    line-height: 1.5;
  }

  .pf-score-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
    margin-bottom: 20px;
  }
  .pf-score-card {
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    animation: pf-fade-in 0.3s ease both;
  }
  .pf-score-card.primary {
    border-color: #2e2c50;
    background: #13131e;
  }
  .pf-score-val-inline {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 22px;
    font-weight: 500;
  }
  .pf-score-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 8px;
    color: #444460;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-align: center;
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

  .pf-hook-box {
    background: #1e1840;
    border: 0.5px solid #2e2c50;
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
  .pf-hook-text {
    font-size: 13px;
    color: #d4d4e8;
    line-height: 1.6;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .pf-content-block { margin-bottom: 20px; animation: pf-fade-in 0.3s ease both; }
  .pf-markdown-preview {
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 10px;
    padding: 16px 18px;
    font-size: 11px;
    color: #a0a0c0;
    line-height: 1.75;
    white-space: pre-wrap;
    word-break: break-word;
    font-family: 'Sora', sans-serif;
    max-height: 480px;
    overflow-y: auto;
    margin-bottom: 8px;
  }

  .pf-copy-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: #7878a0;
    background: #13131e;
    border: 0.5px solid #252535;
    border-radius: 6px;
    padding: 5px 10px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .pf-copy-btn:hover { border-color: #7c6ef0; color: #b0a8f8; }

  .pf-rhs-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .pf-block-title {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    font-weight: 500;
    color: #444460;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .pf-section-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
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
  .pf-section-feedback { font-size: 10px; color: #666680; line-height: 1.6; white-space: pre-wrap; }
  .pf-section-notes {
    font-size: 9px;
    color: #7c6ef0;
    font-family: 'IBM Plex Mono', monospace;
    margin-top: 8px;
    line-height: 1.5;
  }

  .pf-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  @media (max-width: 900px) { .pf-two-col { grid-template-columns: 1fr; } }

  .pf-strength-list { display: flex; flex-direction: column; gap: 6px; }
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

  .pf-seo-box {
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 10px;
    padding: 14px 16px;
    margin-bottom: 20px;
  }
  .pf-seo-row { margin-bottom: 12px; }
  .pf-seo-row:last-child { margin-bottom: 0; }
  .pf-seo-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 8px;
    color: #444460;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    display: block;
    margin-bottom: 4px;
  }
  .pf-seo-text { font-size: 11px; color: #7878a0; line-height: 1.6; margin-bottom: 6px; }
  .pf-slug {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: #85b7eb;
    background: #111e30;
    padding: 3px 8px;
    border-radius: 4px;
  }

  .pf-kw-tags { display: flex; flex-wrap: wrap; gap: 4px; }
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
  .pf-kw-tag.recommended { background: #1e1840; border-color: #2e2c50; color: #b0a8f8; }

  .pf-next-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
  .pf-next-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 11px;
    color: #7878a0;
    line-height: 1.5;
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 8px;
    padding: 10px 12px;
  }
  .pf-next-num {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: #7c6ef0;
    flex-shrink: 0;
    width: 18px;
  }
`;
