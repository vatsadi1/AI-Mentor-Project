import { Link } from "react-router-dom";

function HeroVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0">
      <div className="absolute -inset-4 bg-violet-600/10 blur-3xl rounded-full" aria-hidden="true" />
      <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur overflow-hidden shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900">
          <span className="w-2 h-2 rounded-full bg-red-500/70" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <span className="w-2 h-2 rounded-full bg-green-500/70" />
          <span className="ml-2 text-[10px] font-mono text-zinc-600">roadmap-preview.json</span>
        </div>
        <div className="p-5 space-y-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-violet-400">role</span>
            <span className="text-zinc-500">:</span>
            <span className="text-emerald-400">&quot;Full Stack Engineer&quot;</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-violet-400">stack</span>
            <span className="text-zinc-500">:</span>
            <span className="text-emerald-400">[&quot;React&quot;, &quot;Node.js&quot;, &quot;Postgres&quot;]</span>
          </div>
          <div className="border-t border-zinc-800 pt-4 space-y-3">
            {[
              { week: "Week 1–2", title: "React fundamentals", done: true },
              { week: "Week 3–4", title: "Node.js & REST APIs", done: false },
              { week: "Week 5–6", title: "Database design", done: false },
            ].map((item) => (
              <div key={item.week} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    item.done
                      ? "bg-violet-600 border-violet-600"
                      : "border-zinc-700 bg-zinc-800"
                  }`}
                >
                  {item.done && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                      <path d="M1 3l2 2 4-4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
                <div>
                  <p className="text-violet-400/80">{item.week}</p>
                  <p className="text-zinc-300">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(124,110,240,0.18),transparent)]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgb(9,9,13)_70%)]" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-5 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-xs font-mono text-violet-300 tracking-wide">
                AI Career Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold leading-[1.1] tracking-tight text-zinc-50 mb-6">
              Forge your path from{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-200">
                learner to hired
              </span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed max-w-xl mb-8">
              Pathforge gives you AI-powered tools to plan your learning, polish your resume,
              practice interviews, and ship better code — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                to="/roadmap"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
              >
                Generate your roadmap
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 font-medium transition-colors"
              >
                Explore services
              </a>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <p className="text-2xl font-semibold text-zinc-100">5</p>
                <p className="text-zinc-500 text-xs mt-0.5">AI tools planned</p>
              </div>
              <div className="w-px bg-zinc-800" aria-hidden="true" />
              <div>
                <p className="text-2xl font-semibold text-zinc-100">5</p>
                <p className="text-zinc-500 text-xs mt-0.5">Live today</p>
              </div>
              <div className="w-px bg-zinc-800" aria-hidden="true" />
              <div>
                <p className="text-2xl font-semibold text-zinc-100">Free</p>
                <p className="text-zinc-500 text-xs mt-0.5">To get started</p>
              </div>
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
