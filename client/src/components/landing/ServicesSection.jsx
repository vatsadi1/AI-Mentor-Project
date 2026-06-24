import { Link } from "react-router-dom";
import { SERVICES } from "../../constants/services";
import ServiceIcon from "../layout/ServiceIcon";

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 border-t border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[10px] font-mono uppercase tracking-widest text-violet-400 mb-3">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-50 mb-4">
            Everything you need to grow
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            One platform, five AI tools. Start with a personalized roadmap today — the rest are
            on the way.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className={`group relative rounded-2xl border p-6 transition-all duration-200 ${
                service.available
                  ? "border-violet-500/30 bg-violet-500/5 hover:border-violet-500/50 hover:bg-violet-500/10"
                  : "border-zinc-800 bg-zinc-900/40 opacity-80"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className={`p-2.5 rounded-xl ${
                    service.available
                      ? "bg-violet-500/15 text-violet-400"
                      : "bg-zinc-800 text-zinc-600"
                  }`}
                >
                  <ServiceIcon name={service.icon} />
                </span>
                <span
                  className={`text-[9px] font-mono uppercase tracking-wide px-2 py-1 rounded-full border ${
                    service.available
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-zinc-800 text-zinc-500 border-zinc-700"
                  }`}
                >
                  {service.available ? "Live" : "Coming soon"}
                </span>
              </div>

              <h3 className="text-lg font-medium text-zinc-100 mb-2">{service.shortName}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-5">{service.description}</p>

              {service.available ? (
                <Link
                  to={service.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Open tool
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 6h7M7 3.5L9.5 6 7 8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ) : (
                <span className="text-sm text-zinc-600 font-mono">Available soon</span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
