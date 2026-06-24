import { resumeStyles } from "../../Resume/styles/resumeStyles";

export const codeReviewStyles =
  resumeStyles +
  `
  .pf-code-editor {
    width: 100%;
    background: #0a0a10;
    border: 0.5px solid #252535;
    color: #c4c4d8;
    border-radius: 8px;
    padding: 12px;
    font-size: 11px;
    font-family: 'IBM Plex Mono', monospace;
    resize: vertical;
    min-height: 200px;
    outline: none;
    transition: border-color 0.15s;
    line-height: 1.6;
    tab-size: 2;
  }
  .pf-code-editor:focus { border-color: #7c6ef0; }
  .pf-code-editor::placeholder { color: #383855; }
  .pf-code-editor.invalid { border-color: #8a4040; }

  .pf-char-count {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    color: #444460;
    text-align: right;
    margin-top: 4px;
  }
  .pf-char-count.warn { color: #ba7517; }

  .pf-verdict-badge {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    padding: 4px 10px;
    border-radius: 6px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    display: inline-block;
  }

  .pf-issue-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
  .pf-issue-card {
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 10px;
    padding: 14px;
    animation: pf-fade-in 0.3s ease both;
  }
  .pf-issue-top {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }
  .pf-issue-line {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    color: #666680;
  }
  .pf-issue-title { font-size: 12px; font-weight: 500; color: #d4d4e8; margin-bottom: 6px; }
  .pf-issue-desc { font-size: 11px; color: #7878a0; line-height: 1.6; margin-bottom: 6px; }
  .pf-issue-suggestion { font-size: 10px; color: #666680; line-height: 1.6; }
  .pf-code-fix {
    margin-top: 10px;
    background: #0a0a10;
    border: 0.5px solid #252535;
    border-radius: 6px;
    padding: 10px 12px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: #85b7eb;
    line-height: 1.6;
    white-space: pre-wrap;
    overflow-x: auto;
  }

  .pf-finding-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
  .pf-finding-card {
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 10px;
    padding: 12px 14px;
    animation: pf-fade-in 0.3s ease both;
  }
  .pf-finding-top {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }
  .pf-finding-title { font-size: 11px; font-weight: 500; color: #d4d4e8; }
  .pf-finding-desc { font-size: 10px; color: #7878a0; line-height: 1.6; margin-bottom: 4px; }
  .pf-finding-action { font-size: 10px; color: #666680; line-height: 1.6; }

  .pf-refactor-box {
    background: #0a0a10;
    border: 0.5px solid #2e2c50;
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 20px;
    animation: pf-fade-in 0.3s ease both;
  }
  .pf-refactor-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    color: #7c6ef0;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .pf-refactor-code {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: #85b7eb;
    line-height: 1.7;
    white-space: pre-wrap;
    overflow-x: auto;
  }
`;
