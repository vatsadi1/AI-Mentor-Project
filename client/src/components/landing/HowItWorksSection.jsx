const STEPS = [
  {
    step: "01",
    title: "Tell us your goal",
    description:
      "Pick your target role, tech stack, skill level, time commitment, and deadline.",
  },
  {
    step: "02",
    title: "AI builds your plan",
    description:
      "Our AI generates a structured week-by-week roadmap with topics, tasks, and projects.",
  },
  {
    step: "03",
    title: "Learn and track",
    description:
      "Follow the plan, check off tasks, and export your roadmap as PDF to stay on track.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 border-t border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[10px] font-mono uppercase tracking-widest text-violet-400 mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-50 mb-4">
            Three steps to your roadmap
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            No sign-up required. Configure your preferences and get a personalized plan in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div
            className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"
            aria-hidden="true"
          />

          {STEPS.map((item) => (
            <div key={item.step} className="relative text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-500/15 border border-violet-500/25 text-violet-400 font-mono text-sm font-medium mb-5">
                {item.step}
              </div>
              <h3 className="text-lg font-medium text-zinc-100 mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
