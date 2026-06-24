const FEATURES = [
  {
    title: "Personalized plans",
    description:
      "Roadmaps adapt to your role, tech stack, skill level, and deadline — not generic templates.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.3" />
        <path d="M11 3v2M11 17v2M3 11h2M17 11h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Week-by-week structure",
    description:
      "Clear topics, tasks, and optional projects for every week so you always know what to do next.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M3 9h16M8 4V2M14 4V2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Export & track progress",
    description:
      "Download your roadmap as PDF and check off tasks as you complete them to stay motivated.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 3v10M7 9l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 17h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Built for real goals",
    description:
      "Whether you're targeting a new job, freelance work, or interview prep — plans match your intent.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 3l2.5 5.5L19 9.5l-4.5 4 1 6L11 16.5 6.5 19.5l1-6L3 9.5l5.5-1L11 3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "AI-powered guidance",
    description:
      "Smart recommendations powered by AI that understand modern tech roles and learning paths.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M7 11a4 4 0 108 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M11 7V5M11 17v-2M5 11H3M19 11h-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "More tools incoming",
    description:
      "Resume analysis, interview coaching, content writing, and code review — all launching soon.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M4 11h14M11 4v14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-zinc-900/30 border-t border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-5">
        <div className="max-w-2xl mb-14">
          <p className="text-[10px] font-mono uppercase tracking-widest text-violet-400 mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-50 mb-4">
            Designed for serious learners
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            Pathforge is built to cut through noise and give you a clear, actionable path — starting
            with the roadmap generator.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 transition-colors"
            >
              <div className="text-violet-400 mb-4">{feature.icon}</div>
              <h3 className="text-base font-medium text-zinc-100 mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
