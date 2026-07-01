import { interviewStyles } from "../../Interview/styles/interviewStyles";

export const practiceGroupStyles = `${interviewStyles}

  .pf-room-code {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 0.2em;
    color: #b0a8f8;
    text-align: center;
    padding: 16px;
    background: #0d0d14;
    border: 0.5px solid #252535;
    border-radius: 10px;
    margin: 12px 0;
  }

  .pf-participant-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .pf-participant-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 20px;
    border: 0.5px solid #252535;
    background: #13131e;
    color: #7878a0;
  }

  .pf-participant-chip.you {
    border-color: #7c6ef044;
    color: #b0a8f8;
  }

  .pf-participant-chip.online::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #1d9e75;
  }

  .pf-participant-chip.offline::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #444460;
  }

  .pf-mode-tabs {
    display: flex;
    gap: 6px;
    margin-bottom: 16px;
  }

  .pf-mode-tab {
    flex: 1;
    padding: 8px;
    border-radius: 8px;
    border: 0.5px solid #252535;
    background: #13131e;
    color: #666680;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.15s;
  }

  .pf-mode-tab.active {
    border-color: #7c6ef0;
    color: #b0a8f8;
    background: #1a1830;
  }

  .pf-join-input {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    background: #13131e;
    border: 0.5px solid #252535;
    color: #c4c4d8;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 16px;
    letter-spacing: 0.15em;
    text-align: center;
    text-transform: uppercase;
    outline: none;
  }

  .pf-join-input:focus { border-color: #7c6ef0; }

  .pf-topic-badge {
    display: inline-block;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    padding: 4px 10px;
    border-radius: 6px;
    background: #1a1830;
    border: 0.5px solid #7c6ef044;
    color: #b0a8f8;
    margin-bottom: 12px;
  }

  .pf-dual-scores {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 18px;
  }

  @media (max-width: 720px) {
    .pf-dual-scores { grid-template-columns: 1fr; }
  }

  .pf-peer-score-card {
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 12px;
    padding: 16px;
  }

  .pf-peer-score-card.is-you {
    border-color: #7c6ef044;
  }

  .pf-peer-name {
    font-size: 13px;
    font-weight: 500;
    color: #d4d4e8;
    margin-bottom: 10px;
  }

  .pf-peer-name span {
    font-size: 10px;
    color: #7c6ef0;
    margin-left: 6px;
  }

  .pf-waiting-banner {
    background: #111e30;
    border: 0.5px solid #1a2840;
    border-radius: 8px;
    padding: 12px;
    font-size: 12px;
    color: #7878a0;
    text-align: center;
    margin-bottom: 14px;
  }

  .pf-status-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
  }

  .pf-status-dot.waiting { background: #ba7517; }
  .pf-status-dot.active { background: #1d9e75; }
  .pf-status-dot.complete { background: #378add; }
`;
