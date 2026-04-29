import { useState, useCallback } from "react";

const Roadmap = {
  fe: [
    { week: "Week 1–2", title: "HTML & CSS foundations", topics: ["Semantic HTML", "Flexbox", "CSS Grid", "Responsive design"], tasks: ["Build a responsive nav bar", "Style a card component", "Create a 3-column grid layout"], project: "Personal portfolio — landing page" },
    { week: "Week 3–4", title: "JavaScript core", topics: ["ES6+", "DOM manipulation", "Async/await", "Fetch API"], tasks: ["Build a to-do list", "Create a weather widget from a public API", "Implement local storage persistence"], project: "Interactive quiz app" },
    { week: "Week 5–6", title: "React fundamentals", topics: ["JSX", "useState / useEffect", "Component patterns", "Props & lifting state"], tasks: ["Rebuild the quiz app in React", "Add global state with Context", "Write 3 reusable components"], project: "React recipe finder" },
    { week: "Week 7–8", title: "TypeScript & testing", topics: ["Type annotations", "Generics", "React + TS", "Vitest basics"], tasks: ["Type the recipe finder project", "Write unit tests for 5 components", "Add a CI check with GitHub Actions"], project: "Typed component library (3 components)" },
  ],
  be: [
    { week: "Week 1–2", title: "Node.js & Express", topics: ["HTTP fundamentals", "REST design", "Express routing", "Middleware"], tasks: ["Build a REST API with 5 endpoints", "Add request validation", "Write error handling middleware"], project: "Books CRUD API" },
    { week: "Week 3–4", title: "Databases", topics: ["SQL basics", "Postgres", "Prisma ORM", "Migrations"], tasks: ["Design a relational schema", "Run migrations", "Write 10 SQL queries"], project: "API + Postgres — user auth system" },
    { week: "Week 5–6", title: "Auth & security", topics: ["JWT", "Bcrypt", "OWASP top 10", "Rate limiting"], tasks: ["Implement JWT refresh flow", "Add rate limiting", "Write input sanitisation middleware"], project: "Secure auth microservice" },
    { week: "Week 7–8", title: "Docker & deployment", topics: ["Dockerfile", "Docker Compose", "CI/CD basics", "AWS EC2"], tasks: ["Dockerize the auth service", "Write a Compose file with Postgres", "Deploy to EC2 with a GitHub Action"], project: "Fully deployed API on AWS" },
  ],
  ml: [
    { week: "Week 1–2", title: "Python & data fundamentals", topics: ["NumPy", "Pandas", "Matplotlib", "EDA patterns"], tasks: ["Clean a messy CSV dataset", "Plot 5 chart types", "Build a data pipeline"], project: "EDA report on a Kaggle dataset" },
    { week: "Week 3–4", title: "ML foundations", topics: ["Regression", "Classification", "Scikit-learn", "Model evaluation"], tasks: ["Train a linear regression model", "Evaluate with cross-validation", "Tune hyperparameters"], project: "House price predictor" },
    { week: "Week 5–6", title: "Neural networks", topics: ["PyTorch basics", "CNN", "Transfer learning", "Training loops"], tasks: ["Train a CNN on CIFAR-10", "Fine-tune ResNet18", "Log experiments with W&B"], project: "Image classifier — 90%+ accuracy" },
    { week: "Week 7–8", title: "MLOps & deployment", topics: ["FastAPI", "Docker", "Model versioning", "Cloud inference"], tasks: ["Wrap model in a FastAPI endpoint", "Containerise and push to ECR", "Set up model monitoring"], project: "Deployed ML API with dashboard" },
  ],
  fs: [
    { week: "Week 1–2", title: "Full stack foundations", topics: ["Next.js routing", "API routes", "SSR vs CSR", "Tailwind CSS"], tasks: ["Scaffold a Next.js app", "Create 3 API routes", "Build a responsive layout"], project: "Blog with Next.js + Markdown" },
    { week: "Week 3–4", title: "Database & auth", topics: ["Prisma", "PostgreSQL", "NextAuth.js", "Sessions"], tasks: ["Set up Prisma with Postgres", "Add NextAuth with GitHub provider", "Protect API routes"], project: "Auth-gated dashboard" },
    { week: "Week 5–6", title: "State & data fetching", topics: ["React Query", "Zustand", "Optimistic updates", "Error boundaries"], tasks: ["Migrate fetch calls to React Query", "Add a global store with Zustand", "Handle loading and error states"], project: "Real-time task manager" },
    { week: "Week 7–8", title: "Deploy & scale", topics: ["Vercel", "Edge functions", "Monitoring", "Caching"], tasks: ["Deploy to Vercel with preview envs", "Add Sentry error tracking", "Implement Redis caching"], project: "Production-ready SaaS starter" },
  ],
  devops: [
    { week: "Week 1–2", title: "Linux & networking", topics: ["Bash scripting", "Networking basics", "SSH", "Systemd"], tasks: ["Write 5 bash scripts", "Configure a firewall with UFW", "Set up SSH key auth"], project: "Automated server setup script" },
    { week: "Week 3–4", title: "Docker & containers", topics: ["Dockerfile", "Docker Compose", "Networking", "Volumes"], tasks: ["Containerise a Node app", "Write a multi-service Compose file", "Push to Docker Hub"], project: "Containerised full stack app" },
    { week: "Week 5–6", title: "Kubernetes", topics: ["Pods & deployments", "Services", "Helm", "Ingress"], tasks: ["Deploy an app to a local k8s cluster", "Write a Helm chart", "Expose via Ingress"], project: "K8s cluster with 3 services" },
    { week: "Week 7–8", title: "CI/CD & observability", topics: ["GitHub Actions", "Prometheus", "Grafana", "Alerting"], tasks: ["Build a full CI/CD pipeline", "Set up Prometheus metrics", "Create a Grafana dashboard"], project: "End-to-end DevOps pipeline" },
  ],
};

const ROLES = [
  { value: "", label: "Select a role..." },
  { value: "fe", label: "Frontend Engineer" },
  { value: "be", label: "Backend Engineer" },
  { value: "fs", label: "Full Stack Engineer" },
  { value: "ml", label: "ML Engineer" },
  { value: "de", label: "Data Engineer" },
  { value: "devops", label: "DevOps / Platform" },
  { value: "ios", label: "iOS Developer" },
  { value: "android", label: "Android Developer" },
];

const TECH_CHIPS = ["React", "TypeScript", "Node.js", "Python", "Go", "Rust", "Docker", "AWS", "Postgres", "Next.js", "TensorFlow", "Kubernetes"];

const GOAL_TYPES = [
  { value: "new-job", label: "New job" },
  { value: "promotion", label: "Promotion" },
  { value: "freelance", label: "Freelance" },
  { value: "startup", label: "Build startup" },
];

const PROJ_TYPES = [
  { value: "guided", label: "Guided projects (step-by-step)" },
  { value: "open", label: "Open-ended builds" },
  { value: "clone", label: "Clone a real product" },
  { value: "oss", label: "Contribute to open source" },
];

const DEADLINE_PRESETS = [
  { days: 14, label: "2 wks" },
  { days: 30, label: "1 mo" },
  { days: 60, label: "2 mo" },
  { days: 90, label: "3 mo" },
  { days: 180, label: "6 mo" },
];

// ─── Styles ────────────────────────────────────────────────────────────────
const css = `
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

  /* ── Topbar ── */
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
  .pf-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .pf-logo-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #7c6ef0;
  }
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

  /* ── Layout ── */
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

  /* ── Sidebar ── */
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
    top: 0; left: 0; right: 0; bottom: 0;
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
  .pf-switch input:checked + .pf-switch-slider::before { background: #7c6ef0; transform: translateX(15px); }

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

  /* ── Main ── */
  .pf-main {
    background: #09090d;
    overflow-y: auto;
    padding: 24px;
  }

  .pf-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 400px;
    gap: 14px;
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
    max-width: 200px;
    line-height: 1.7;
  }

  .pf-loading {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    height: 100%; min-height: 400px;
    gap: 16px;
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

  /* ── Roadmap header ── */
  .pf-rhs-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 22px;
    gap: 16px;
  }
  .pf-rhs-title { font-size: 15px; font-weight: 500; color: #d4d4e8; margin-bottom: 6px; }
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

  .pf-progress-wrap { display: flex; flex-direction: column; align-items: flex-end; gap: 5px; flex-shrink: 0; }
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

  /* ── Timeline ── */
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
  .pf-task-item { display: flex; align-items: flex-start; gap: 7px; cursor: pointer; }
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

// ─── Sub-components ─────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
      <path d="M1 2.5l1.5 1.5 3.5-3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DoneCheckIcon() {
  return (
    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
      <path d="M1 3.5l2.5 2.5 4.5-4.5" stroke="#1d9e75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="1" y="1" width="10" height="10" rx="2" stroke="#378add" strokeWidth="1.1" />
      <path d="M3.5 6h5M3.5 4h3" stroke="#378add" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function EmptyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="3" stroke="#383855" strokeWidth="1.2" />
      <path d="M6 10h8M6 7h5M6 13h6" stroke="#383855" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function TaskItem({ text, checked, onToggle }) {
  return (
    <div className="pf-task-item" onClick={onToggle}>
      <div className={`pf-cb${checked ? " checked" : ""}`}>
        {checked && <CheckIcon />}
      </div>
      <span className={`pf-task-text${checked ? " done" : ""}`}>{text}</span>
    </div>
  );
}

function WeekCard({ item, index, isLast, showProj, isDeadline, taskStates, onToggleTask }) {
  const allDone = item.tasks.every((_, i) => taskStates[`${index}-${i}`]);
  const isFirst = index === 0;

  return (
    <div className="pf-week-card" style={{ animationDelay: `${index * 0.07}s` }}>
      <div className="pf-tl-col">
        <div className={`pf-tl-dot${isFirst ? " active" : ""}${allDone ? " done" : ""}`}>
          {allDone && <DoneCheckIcon />}
        </div>
        {!isLast && <div className="pf-tl-line" />}
      </div>
      <div className="pf-card">
        <div className="pf-card-top">
          <span className={`pf-week-badge${allDone ? " done" : ""}`}>{item.week}</span>
          {isDeadline && <span className="pf-deadline-dot">Deadline target</span>}
        </div>
        <div className="pf-card-title">{item.title}</div>
        <div className="pf-topics">
          {item.topics.map((t) => (
            <span key={t} className="pf-topic-tag">{t}</span>
          ))}
        </div>
        <div className="pf-task-list">
          {item.tasks.map((task, ti) => (
            <TaskItem
              key={ti}
              text={task}
              checked={!!taskStates[`${index}-${ti}`]}
              onToggle={() => onToggleTask(index, ti)}
            />
          ))}
        </div>
        {showProj ? (
          <div className="pf-proj-box">
            <div className="pf-proj-icon"><ProjectIcon /></div>
            <div>
              <div className="pf-proj-label">PROJECT</div>
              <div className="pf-proj-name">{item.project}</div>
            </div>
          </div>
        ) : (
          <div className="pf-no-proj-box">
            <div className="pf-no-proj-label">No project this week — theory & practice only</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────────────
export default function CareerRoadmap() {
  const [role, setRole] = useState("");
  const [activeChips, setActiveChips] = useState(new Set());
  const [level, setLevel] = useState("beginner");
  const [hours, setHours] = useState(15);
  const [goal, setGoal] = useState("new-job");
  const [includeProj, setIncludeProj] = useState(true);
  const [projType, setProjType] = useState("guided");
  const [deadline, setDeadline] = useState(30);
  const [phase, setPhase] = useState("empty"); // empty | loading | roadmap
  const [roadmapData, setRoadmapData] = useState(null);
  const [roadmapMeta, setRoadmapMeta] = useState(null);
  const [taskStates, setTaskStates] = useState({});

  const toggleChip = (chip) => {
    setActiveChips((prev) => {
      const n = new Set(prev);
      n.has(chip) ? n.delete(chip) : n.add(chip);
      return n;
    });
  };

  const handleToggleTask = useCallback((weekIdx, taskIdx) => {
    const key = `${weekIdx}-${taskIdx}`;
    setTaskStates((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const totalTasks = roadmapData ? roadmapData.length * 3 : 0;
  const doneTasks = Object.values(taskStates).filter(Boolean).length;
  const progress = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const generate = () => {
    if (!role) return;
    setPhase("loading");
    setTaskStates({});
    const data = ROADMAPS[role] || ROADMAPS.fe;
    const roleLabel = ROLES.find((r) => r.value === role)?.label || "Engineer";
    setTimeout(() => {
      setRoadmapData(data);
      setRoadmapMeta({ roleLabel, level, goal: GOAL_TYPES.find((g) => g.value === goal)?.label || goal, deadline, includeProj });
      setPhase("roadmap");
    }, 1600);
  };

  const weeksFromDays = (d) => Math.max(1, Math.round(d / 7));

  return (
    <>
      <style>{css}</style>
      <div className="pf-root">
        {/* Topbar */}
        <div className="pf-topbar">
          <div className="pf-logo">
            <div className="pf-logo-dot" />
            <span className="pf-logo-text">Pathforge</span>
          </div>
          <div className="pf-topbar-right">AI Career Roadmap Generator</div>
        </div>

        <div className="pf-layout">
          {/* Sidebar */}
          <div className="pf-sidebar">
            {/* Role */}
            <div className="pf-field">
              <div className="pf-label">Target role</div>
              <select className="pf-select" value={role} onChange={(e) => setRole(e.target.value)}>
                {ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>

            {/* Tech stack */}
            <div className="pf-field">
              <div className="pf-label">Tech stack</div>
              <div className="pf-chips">
                {TECH_CHIPS.map((chip) => (
                  <div
                    key={chip}
                    className={`pf-chip${activeChips.has(chip) ? " active" : ""}`}
                    onClick={() => toggleChip(chip)}
                  >{chip}</div>
                ))}
              </div>
            </div>

            {/* Level */}
            <div className="pf-field">
              <div className="pf-label">Current level</div>
              <div className="pf-level-grid">
                {["beginner", "intermediate", "advanced"].map((l) => (
                  <div key={l} className={`pf-lvl${level === l ? " active" : ""}`} onClick={() => setLevel(l)}>
                    {l === "intermediate" ? "Mid-level" : l.charAt(0).toUpperCase() + l.slice(1)}
                  </div>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="pf-field">
              <div className="pf-label">Weekly time commitment</div>
              <div className="pf-slider-row">
                <input type="range" min="5" max="40" step="5" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
                <span className="pf-slider-val">{hours} hrs/wk</span>
              </div>
            </div>

            {/* Goal */}
            <div className="pf-field">
              <div className="pf-label">Goal type</div>
              <div className="pf-goal-grid">
                {GOAL_TYPES.map((g) => (
                  <div key={g.value} className={`pf-goal${goal === g.value ? " active" : ""}`} onClick={() => setGoal(g.value)}>
                    {g.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="pf-divider" />

            {/* Projects toggle */}
            <div className="pf-field">
              <div className="pf-label">Include projects</div>
              <div className="pf-toggle-row">
                <div>
                  <div className="pf-toggle-label">Projects per week</div>
                  <div className="pf-toggle-sub">Hands-on build tasks</div>
                </div>
                <label className="pf-switch">
                  <input type="checkbox" checked={includeProj} onChange={(e) => setIncludeProj(e.target.checked)} />
                  <span className="pf-switch-slider" />
                </label>
              </div>
              <select
                className="pf-select"
                value={projType}
                onChange={(e) => setProjType(e.target.value)}
                disabled={!includeProj}
                style={{ opacity: includeProj ? 1 : 0.35 }}
              >
                {PROJ_TYPES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>

            {/* Deadline */}
            <div className="pf-field">
              <div className="pf-label">Deadline — complete in</div>
              <div className="pf-deadline-box">
                <div className="pf-deadline-top">
                  <div>
                    <div className="pf-dl-val">{deadline}</div>
                    <div className="pf-dl-unit">days from today</div>
                  </div>
                  <input
                    type="range"
                    min="7" max="180" step="1"
                    value={deadline}
                    onChange={(e) => setDeadline(Number(e.target.value))}
                    style={{ width: 110, accentColor: "#7c6ef0" }}
                  />
                </div>
                <div className="pf-dl-badges">
                  {DEADLINE_PRESETS.map((p) => (
                    <div
                      key={p.days}
                      className={`pf-dl-badge${deadline === p.days ? " active" : ""}`}
                      onClick={() => setDeadline(p.days)}
                    >{p.label}</div>
                  ))}
                </div>
              </div>
            </div>

            <button
              className="pf-gen-btn"
              onClick={generate}
              disabled={!role || phase === "loading"}
            >
              {phase === "loading" ? "Generating..." : "Generate roadmap ↗"}
            </button>
          </div>

          {/* Main panel */}
          <div className="pf-main">
            {phase === "empty" && (
              <div className="pf-empty">
                <div className="pf-empty-icon"><EmptyIcon /></div>
                <div className="pf-empty-text">Select a role and configure your preferences, then generate a personalized roadmap</div>
              </div>
            )}

            {phase === "loading" && (
              <div className="pf-loading">
                <div className="pf-spinner" />
                <div className="pf-loading-msg">Generating your roadmap…</div>
              </div>
            )}

            {phase === "roadmap" && roadmapData && roadmapMeta && (
              <>
                <div className="pf-rhs-header">
                  <div>
                    <div className="pf-rhs-title">{roadmapMeta.roleLabel} roadmap</div>
                    <div className="pf-meta-row">
                      <span className="pf-meta-chip">{roadmapMeta.level}</span>
                      <span className="pf-meta-chip">{roadmapMeta.goal}</span>
                      <span className="pf-meta-chip dl">
                        Deadline: {roadmapMeta.deadline} days ({weeksFromDays(roadmapMeta.deadline)} wks)
                      </span>
                      {roadmapMeta.includeProj
                        ? <span className="pf-meta-chip proj">Projects included</span>
                        : <span className="pf-meta-chip no-proj">No projects</span>
                      }
                    </div>
                  </div>
                  <div className="pf-progress-wrap">
                    <div className="pf-progress-track">
                      <div className="pf-progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="pf-progress-label">{doneTasks} of {totalTasks} tasks done</div>
                  </div>
                </div>

                <div className="pf-timeline">
                  {roadmapData.map((item, i) => (
                    <WeekCard
                      key={i}
                      item={item}
                      index={i}
                      isLast={i === roadmapData.length - 1}
                      showProj={roadmapMeta.includeProj}
                      isDeadline={i === roadmapData.length - 1}
                      taskStates={taskStates}
                      onToggleTask={handleToggleTask}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}