import { roadmapStyles } from "../../Roadmaps/styles/roadmapStyles";

export const interviewStyles = `${roadmapStyles}

  .pf-textarea {
    width: 100%;
    min-height: 160px;
    background: #13131e;
    border: 0.5px solid #252535;
    color: #c4c4d8;
    border-radius: 8px;
    padding: 12px;
    font-size: 13px;
    font-family: 'Sora', sans-serif;
    line-height: 1.6;
    resize: vertical;
    outline: none;
    transition: border-color 0.15s;
  }
  .pf-textarea:focus { border-color: #7c6ef0; }
  .pf-textarea::placeholder { color: #444460; }

  .pf-question-box {
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 12px;
    padding: 18px;
    margin-bottom: 16px;
  }
  .pf-question-meta {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 12px;
  }
  .pf-q-badge {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    padding: 2px 8px;
    border-radius: 4px;
    border: 0.5px solid #252535;
    background: #13131e;
    color: #666680;
  }
  .pf-q-badge.diff-easy { color: #1d9e75; border-color: #1a3525; background: #0a1e14; }
  .pf-q-badge.diff-medium { color: #378add; border-color: #1a2840; background: #111e30; }
  .pf-q-badge.diff-hard { color: #ba7517; border-color: #3a2e00; background: #1e1600; }

  .pf-question-text {
    font-size: 15px;
    font-weight: 500;
    color: #d4d4e8;
    line-height: 1.55;
    margin-bottom: 12px;
  }

  .pf-tips-box {
    background: #09090d;
    border: 0.5px solid #1a1a28;
    border-radius: 8px;
    padding: 10px 12px;
  }
  .pf-tips-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    color: #444460;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .pf-tips-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .pf-tips-list li {
    font-size: 11px;
    color: #7878a0;
    padding-left: 12px;
    position: relative;
  }
  .pf-tips-list li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: #7c6ef0;
    font-size: 10px;
  }

  .pf-progress-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
    gap: 12px;
    flex-wrap: wrap;
  }
  .pf-progress-dots {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .pf-progress-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #252535;
    transition: background 0.2s;
  }
  .pf-progress-dot.active { background: #7c6ef0; }
  .pf-progress-dot.done { background: #1d9e75; }

  .pf-submit-btn {
    width: 100%;
    padding: 11px;
    border-radius: 8px;
    background: #7c6ef0;
    border: none;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
    transition: all 0.15s;
    margin-top: 12px;
  }
  .pf-submit-btn:hover:not(:disabled) { background: #6a5cd8; }
  .pf-submit-btn:disabled { background: #252535; color: #44445a; cursor: not-allowed; }

  .pf-secondary-btn {
    padding: 9px 14px;
    border-radius: 8px;
    background: #13131e;
    border: 0.5px solid #252535;
    color: #c4c4d8;
    font-size: 12px;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
    transition: all 0.15s;
  }
  .pf-secondary-btn:hover { border-color: #7c6ef0; color: #b0a8f8; }

  .pf-score-overall {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    border-radius: 12px;
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    margin-bottom: 16px;
  }
  .pf-score-circle {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 2px solid #7c6ef0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 20px;
    font-weight: 500;
    color: #b0a8f8;
  }
  .pf-verdict-badge {
    display: inline-block;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    padding: 2px 8px;
    border-radius: 4px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .pf-score-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 16px;
  }
  @media (max-width: 480px) { .pf-score-grid { grid-template-columns: 1fr; } }

  .pf-score-item {
    background: #13131e;
    border: 0.5px solid #252535;
    border-radius: 8px;
    padding: 10px 12px;
  }
  .pf-score-item-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }
  .pf-score-item-label {
    font-size: 10px;
    color: #666680;
    font-family: 'IBM Plex Mono', monospace;
  }
  .pf-score-item-val {
    font-size: 11px;
    color: #b0a8f8;
    font-family: 'IBM Plex Mono', monospace;
  }
  .pf-score-bar-track {
    height: 3px;
    background: #252535;
    border-radius: 3px;
    overflow: hidden;
  }
  .pf-score-bar-fill {
    height: 100%;
    border-radius: 3px;
    background: #7c6ef0;
    transition: width 0.5s ease;
  }

  .pf-feedback-section {
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 12px;
  }
  .pf-feedback-title {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    color: #444460;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .pf-feedback-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .pf-feedback-list li {
    font-size: 12px;
    color: #7878a0;
    line-height: 1.55;
    padding-left: 14px;
    position: relative;
  }
  .pf-feedback-list.strengths li::before {
    content: '+';
    position: absolute;
    left: 0;
    color: #1d9e75;
    font-weight: 600;
  }
  .pf-feedback-list.improvements li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: #ba7517;
  }

  .pf-delivery-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    margin-bottom: 12px;
  }
  @media (max-width: 640px) { .pf-delivery-grid { grid-template-columns: 1fr; } }

  .pf-delivery-item {
    background: #13131e;
    border: 0.5px solid #252535;
    border-radius: 8px;
    padding: 10px;
  }
  .pf-delivery-label {
    font-size: 9px;
    font-family: 'IBM Plex Mono', monospace;
    color: #444460;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 4px;
  }
  .pf-delivery-text { font-size: 11px; color: #7878a0; line-height: 1.5; }

  .pf-improved-box {
    background: #1e1840;
    border: 0.5px solid #7c6ef0;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
  }
  .pf-improved-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    color: #b0a8f8;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .pf-improved-text { font-size: 12px; color: #c4c4d8; line-height: 1.6; }

  .pf-followup {
    background: #111e30;
    border: 0.5px solid #1a2840;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 16px;
  }
  .pf-followup-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    color: #378add;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .pf-followup-text { font-size: 12px; color: #85b7eb; line-height: 1.5; }

  .pf-summary-card {
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
  }
  .pf-summary-score {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 36px;
    color: #b0a8f8;
    margin: 12px 0;
  }
  .pf-summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
    margin-top: 16px;
  }
  .pf-summary-item {
    background: #13131e;
    border-radius: 8px;
    padding: 10px;
    border: 0.5px solid #252535;
  }
`;
