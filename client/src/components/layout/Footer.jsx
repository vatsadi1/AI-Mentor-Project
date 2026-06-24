import { Link } from "react-router-dom";
import { SERVICES } from "../../constants/services";

const FOOTER_LINKS = {
  Product: [
    { label: "Roadmap Generator", href: "/roadmap", external: false },
    { label: "How it works", href: "/#how-it-works", external: true },
    { label: "Features", href: "/#features", external: true },
  ],
  Company: [
    { label: "About", href: "/#about", external: true },
    { label: "FAQ", href: "/#faq", external: true },
    { label: "Contact", href: "mailto:hello@pathforge.dev", external: true },
  ],
};

export default function Footer() {
  const comingSoonCount = SERVICES.filter((s) => !s.available).length;

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              <span className="font-mono text-sm font-medium tracking-widest uppercase text-zinc-400">
                Pathforge
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              AI-powered career tools to help you learn faster, interview smarter, and land your
              next role.
            </p>
            <p className="mt-4 text-xs font-mono text-zinc-600">
              {comingSoonCount + 1} tools · 1 live now
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-4">
              Coming soon
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.filter((s) => !s.available).map((service) => (
                <li key={service.id} className="text-sm text-zinc-600">
                  {service.shortName}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Pathforge. Built for learners and builders.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
