export const roadmapStyles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Sora:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pf-root {
    font-family: 'Sora', sans-serif;
    background: #09090d;
    min-height: 100vh;
    color: #d4d4e8;
    display: flex;
    flex-direction: column;
  }

  .pf-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 28px;
    border-bottom: 0.5px solid #1e1e2e;
    background: #0d0d14;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .pf-logo { display: flex; align-items: center; gap: 10px; }
  .pf-logo-dot { width: 9px; height: 9px; border-radius: 50%; background: #7c6ef0; }
  .pf-logo-text {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    color: #7878a0;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .pf-topbar-right {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: #444458;
    letter-spacing: 0.05em;
  }

  .pf-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    flex: 1;
    min-height: 0;
  }
  @media (max-width: 768px) {
    .pf-layout { grid-template-columns: 1fr; }
    .pf-sidebar { border-right: none; border-bottom: 0.5px solid #1e1e2e; }
  }

  .pf-sidebar {
    background: #0d0d14;
    border-right: 0.5px solid #1e1e2e;
    padding: 20px 18px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
  }

  .pf-field { display: flex; flex-direction: column; gap: 6px; }
  .pf-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    font-weight: 500;
    color: #444460;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .pf-field-error {
    font-size: 10px;
    color: #e07070;
    font-family: 'IBM Plex Mono', monospace;
  }

  .pf-select {
    width: 100%;
    background: #13131e;
    border: 0.5px solid #252535;
    color: #c4c4d8;
    border-radius: 8px;
    padding: 8px 32px 8px 11px;
    font-size: 12px;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23555570' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    outline: none;
    transition: border-color 0.15s;
  }
  .pf-select:focus { border-color: #7c6ef0; }
  .pf-select.invalid { border-color: #8a4040; }

  .pf-chips { display: flex; flex-wrap: wrap; gap: 5px; }
  .pf-chip {
    padding: 4px 9px;
    border-radius: 6px;
    border: 0.5px solid #252535;
    background: #13131e;
    color: #7878a0;
    font-size: 10px;
    font-family: 'IBM Plex Mono', monospace;
    cursor: pointer;
    transition: all 0.15s;
    user-select: none;
  }
  .pf-chip:hover { border-color: #3a3a55; color: #a0a0c0; }
  .pf-chip.active { background: #1e1840; border-color: #7c6ef0; color: #b0a8f8; }

  .pf-level-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; }
  .pf-lvl {
    padding: 7px 4px;
    border-radius: 7px;
    border: 0.5px solid #252535;
    background: #13131e;
    color: #7878a0;
    font-size: 10px;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
    text-align: center;
    transition: all 0.15s;
    user-select: none;
  }
  .pf-lvl:hover { border-color: #3a3a55; }
  .pf-lvl.active { background: #111e30; border-color: #378add; color: #85b7eb; }

  .pf-slider-row { display: flex; align-items: center; gap: 10px; }
  .pf-slider-row input[type=range] {
    flex: 1;
    accent-color: #7c6ef0;
    height: 3px;
    cursor: pointer;
  }
  .pf-slider-val {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: #7c6ef0;
    font-weight: 500;
    min-width: 52px;
    text-align: right;
  }

  .pf-goal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }
  .pf-goal {
    padding: 8px 6px;
    border-radius: 8px;
    border: 0.5px solid #252535;
    background: #13131e;
    color: #7878a0;
    font-size: 10px;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
    text-align: center;
    transition: all 0.15s;
    user-select: none;
    line-height: 1.4;
  }
  .pf-goal:hover { border-color: #3a3a55; }
  .pf-goal.active { background: #0e1e18; border-color: #1d9e75; color: #5dcaa5; }

  .pf-divider { height: 0.5px; background: #1a1a28; }

  .pf-toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #13131e;
    border: 0.5px solid #252535;
    border-radius: 8px;
    padding: 9px 12px;
  }
  .pf-toggle-label { font-size: 12px; color: #c4c4d4; }
  .pf-toggle-sub { font-size: 10px; color: #44445a; margin-top: 2px; }

  .pf-switch { position: relative; width: 34px; height: 19px; flex-shrink: 0; }
  .pf-switch input { opacity: 0; width: 0; height: 0; }
  .pf-switch-slider {
    position: absolute;
    inset: 0;
    background: #252535;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;
  }
  .pf-switch-slider::before {
    content: '';
    position: absolute;
    width: 13px; height: 13px;
    left: 3px; top: 3px;
    background: #555570;
    border-radius: 50%;
    transition: 0.2s;
  }
  .pf-switch input:checked + .pf-switch-slider { background: #1e1840; }
  .pf-switch input:checked + .pf-switch-slider::before {
    background: #7c6ef0;
    transform: translateX(15px);
  }

  .pf-deadline-box {
    background: #13131e;
    border: 0.5px solid #252535;
    border-radius: 8px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .pf-deadline-top { display: flex; align-items: center; justify-content: space-between; }
  .pf-dl-val {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 22px;
    font-weight: 500;
    color: #d4d4e8;
  }
  .pf-dl-unit { font-size: 10px; color: #444460; margin-top: 2px; }
  .pf-dl-badges { display: flex; gap: 5px; flex-wrap: wrap; }
  .pf-dl-badge {
    padding: 3px 8px;
    border-radius: 5px;
    background: #1a1830;
    border: 0.5px solid #2e2c50;
    color: #8888b0;
    font-size: 10px;
    font-family: 'IBM Plex Mono', monospace;
    cursor: pointer;
    transition: all 0.15s;
    user-select: none;
  }
  .pf-dl-badge:hover { border-color: #5050a0; }
  .pf-dl-badge.active { background: #1e1840; border-color: #7c6ef0; color: #b0a8f8; }

  .pf-error-banner {
    background: #1a1014;
    border: 0.5px solid #4a2830;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 11px;
    color: #e07070;
    line-height: 1.5;
  }

  .pf-gen-btn {
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
    margin-top: auto;
    letter-spacing: 0.02em;
  }
  .pf-gen-btn:hover:not(:disabled) { background: #6a5cd8; }
  .pf-gen-btn:active:not(:disabled) { transform: scale(0.98); }
  .pf-gen-btn:disabled { background: #252535; color: #44445a; cursor: not-allowed; }

  .pf-main { background: #09090d; overflow-y: auto; padding: 24px; }

  .pf-empty, .pf-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 400px;
    gap: 16px;
  }
  .pf-empty-icon {
    width: 48px; height: 48px;
    border-radius: 12px;
    background: #13131e;
    border: 0.5px solid #252535;
    display: flex; align-items: center; justify-content: center;
  }
  .pf-empty-text {
    font-size: 12px;
    color: #383855;
    text-align: center;
    max-width: 240px;
    line-height: 1.7;
  }
  .pf-spinner {
    width: 30px; height: 30px;
    border-radius: 50%;
    border: 2px solid #1e1e2e;
    border-top-color: #7c6ef0;
    animation: pf-spin 0.8s linear infinite;
  }
  @keyframes pf-spin { to { transform: rotate(360deg); } }
  .pf-loading-msg { font-size: 12px; color: #444460; }

  .pf-rhs-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 22px;
    gap: 16px;
    flex-wrap: wrap;
  }
  .pf-rhs-title { font-size: 15px; font-weight: 500; color: #d4d4e8; margin-bottom: 6px; }
  .pf-rhs-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
  .pf-meta-row { display: flex; gap: 6px; flex-wrap: wrap; }
  .pf-meta-chip {
    font-size: 10px;
    font-family: 'IBM Plex Mono', monospace;
    padding: 2px 8px;
    border-radius: 4px;
    background: #13131e;
    border: 0.5px solid #252535;
    color: #666680;
  }
  .pf-meta-chip.dl { background: #1a1830; border-color: #2e2c50; color: #8888b0; }
  .pf-meta-chip.proj { background: #0a1e14; border-color: #1a3525; color: #3d9e65; }
  .pf-meta-chip.no-proj { color: #333348; }

  .pf-download-btn {
    padding: 6px 12px;
    border-radius: 6px;
    background: #13131e;
    border: 0.5px solid #378add;
    color: #85b7eb;
    font-size: 10px;
    font-family: 'IBM Plex Mono', monospace;
    cursor: pointer;
    transition: all 0.15s;
  }
  .pf-download-btn:hover { background: #111e30; }

  .pf-progress-wrap { display: flex; flex-direction: column; align-items: flex-end; gap: 5px; }
  .pf-progress-track {
    background: #13131e;
    border-radius: 6px;
    height: 4px;
    width: 160px;
    overflow: hidden;
  }
  .pf-progress-fill {
    height: 100%;
    border-radius: 6px;
    background: #7c6ef0;
    transition: width 0.4s ease;
  }
  .pf-progress-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: #444460;
  }

  .pf-timeline { display: flex; flex-direction: column; }
  .pf-week-card {
    display: flex;
    gap: 14px;
    padding-bottom: 20px;
    animation: pf-fade-in 0.3s ease both;
  }
  .pf-week-card:last-child { padding-bottom: 0; }
  @keyframes pf-fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .pf-tl-col { display: flex; flex-direction: column; align-items: center; width: 26px; flex-shrink: 0; }
  .pf-tl-dot {
    width: 22px; height: 22px;
    border-radius: 50%;
    border: 1.5px solid #252535;
    background: #0d0d14;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;
    z-index: 1;
  }
  .pf-tl-dot.active { background: #1e1840; border-color: #7c6ef0; }
  .pf-tl-dot.done { background: #0a1e14; border-color: #1d9e75; }
  .pf-tl-line { width: 1px; background: #1a1a28; flex: 1; }

  .pf-card {
    flex: 1;
    background: #0d0d14;
    border: 0.5px solid #1e1e2e;
    border-radius: 10px;
    padding: 14px;
    transition: border-color 0.15s;
  }
  .pf-card:hover { border-color: #2a2a40; }

  .pf-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .pf-week-badge {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    font-weight: 500;
    color: #7c6ef0;
    background: #1e1840;
    padding: 2px 7px;
    border-radius: 4px;
    letter-spacing: 0.04em;
  }
  .pf-week-badge.done { color: #1d9e75; background: #0a1e14; }
  .pf-deadline-dot {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    color: #ba7517;
    background: #1e1600;
    padding: 2px 7px;
    border-radius: 4px;
    border: 0.5px solid #3a2e00;
  }

  .pf-card-title { font-size: 12px; font-weight: 500; color: #d4d4e8; margin-bottom: 8px; }
  .pf-topics { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 10px; }
  .pf-topic-tag {
    font-size: 9px;
    font-family: 'IBM Plex Mono', monospace;
    padding: 2px 7px;
    border-radius: 4px;
    background: #13131e;
    border: 0.5px solid #252535;
    color: #666680;
  }

  .pf-task-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px; }
  .pf-task-item {
    display: flex;
    align-items: flex-start;
    gap: 7px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    text-align: left;
    width: 100%;
    font: inherit;
    color: inherit;
  }
  .pf-cb {
    width: 13px; height: 13px;
    border-radius: 3px;
    border: 1px solid #333348;
    background: #13131e;
    flex-shrink: 0;
    margin-top: 1px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s;
  }
  .pf-cb.checked { background: #7c6ef0; border-color: #7c6ef0; }
  .pf-task-text { font-size: 11px; color: #7878a0; line-height: 1.5; transition: all 0.15s; }
  .pf-task-text.done { color: #333348; text-decoration: line-through; }

  .pf-proj-box {
    background: #09090d;
    border: 0.5px solid #151e18;
    border-radius: 7px;
    padding: 9px 11px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .pf-proj-icon {
    width: 28px; height: 28px;
    border-radius: 6px;
    background: #0a1e14;
    border: 0.5px solid #1a3525;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .pf-proj-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    font-weight: 500;
    color: #378add;
    letter-spacing: 0.05em;
    margin-bottom: 3px;
  }
  .pf-proj-name { font-size: 11px; color: #85b7eb; }

  .pf-no-proj-box {
    background: #09090d;
    border: 0.5px solid #1a1a28;
    border-radius: 7px;
    padding: 8px 11px;
  }
  .pf-no-proj-label { font-size: 10px; color: #333348; font-family: 'IBM Plex Mono', monospace; }
`;
