import { Link } from "react-router-dom";

export default function CtaSection() {
  return (
    <section id="about" className="py-24 border-t border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-5">
        <div className="relative rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 via-zinc-900 to-zinc-950 overflow-hidden px-8 py-14 sm:px-14 sm:py-16 text-center">
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,110,240,0.15),transparent_60%)]"
            aria-hidden="true"
          />

          <div className="relative">
            <p className="text-[10px] font-mono uppercase tracking-widest text-violet-400 mb-4">
              Ready to start?
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-50 mb-4 max-w-xl mx-auto">
              Your personalized learning roadmap is one click away
            </h2>
            <p className="text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
              Stop guessing what to learn next. Get a clear, AI-generated plan built around your
              goals and schedule.
            </p>
            <Link
              to="/roadmap"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
            >
              Generate my roadmap
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
