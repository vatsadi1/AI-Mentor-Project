import { Link } from "react-router-dom";
import { SERVICES } from "../../constants/services";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/in/your-linkedin",
  },
   {
    label: "Facebook",
    href: "https://Facebook.com/in/your-linkedin",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/your-linkedin",
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com/your-handle",
  },
  {
    label: "Email",
    href: "vidhyarthimarg@gmail.com",
  },
]

const FOOTER_LINKS = {
  Product: [
    { label: "Roadmap Generator", href: "/roadmap", external: false },
    { label: "Resume Analyzer", href: "/resume", external: false },
    { label: "Code Reviewer", href: "/code-review", external: false },
    { label: "Content Writer", href: "/content", external: false },
    { label: "Interview Coach", href: "/interview", external: false },
    { label: "Practice Group", href: "/practice-group", external: false },
    
  ],
  Company: [
    { label: "About", href: "/#about", external: true },
    { label: "FAQ", href: "/#faq", external: true },
    { label: "Contact", href: "", external: true },
     { label: "How it works", href: "/#how-it-works", external: true },
    { label: "Features", href: "/#features", external: true },
  ],
};

export default function Footer() {
  const comingSoonCount = SERVICES.filter((s) => !s.available).length;

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-3 group">
  

  <img
    src="IMG_20260625_050219-removebg-preview.png"
    alt="VidhyarthiMarg Logo"
    className="h-12 w-auto object-contain"
  />

  <span className="font-mono text-sm font-medium tracking-widest uppercase text-zinc-400">
    VidhyarthiMarg
  </span>
</Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              AI-powered career tools to help you learn faster, interview smarter, and land your
              next role.
            </p>
            <p className="mt-4 text-xs font-mono text-zinc-600">
              {comingSoonCount + 6} tools · 6 live now
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
 <div>
  <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-4">
    Social Links
  </h3>

  <ul className="space-y-2.5">
    {SOCIAL_LINKS.map((link) => (
      <li key={link.label}>
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          {link.label}
        </a>
      </li>
    ))}
  </ul>
</div>
             
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} VidhyarthiMarg. Built for learners and builders.
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
