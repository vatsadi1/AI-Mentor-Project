import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { NAV_LINKS, SERVICES } from "../../constants/services";
import ServiceIcon from "./ServiceIcon";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <span className="w-2 h-2 rounded-full bg-violet-500 group-hover:scale-110 transition-transform" />
      <span className="font-mono text-sm font-medium tracking-widest uppercase text-zinc-400">
        Pathforge
      </span>
    </Link>
  );
}

function ServicesDropdown({ isOpen, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="absolute top-full left-0 mt-2 w-80 rounded-xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden z-50"
      role="menu"
      aria-label="Services"
    >
      <div className="px-4 py-3 border-b border-zinc-800/80">
        <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
          AI Career Tools
        </p>
      </div>
      <ul className="py-2">
        {SERVICES.map((service) => (
          <li key={service.id}>
            {service.available ? (
              <Link
                to={service.href}
                role="menuitem"
                onClick={onClose}
                className="flex items-start gap-3 px-4 py-3 hover:bg-violet-500/10 transition-colors group"
              >
                <span className="mt-0.5 text-violet-400 group-hover:text-violet-300">
                  <ServiceIcon name={service.icon} />
                </span>
                <span>
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-100">{service.name}</span>
                    <span className="text-[9px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                      Live
                    </span>
                  </span>
                  <span className="block text-xs text-zinc-500 mt-0.5 leading-relaxed">
                    {service.description}
                  </span>
                </span>
              </Link>
            ) : (
              <div
                role="menuitem"
                aria-disabled="true"
                className="flex items-start gap-3 px-4 py-3 opacity-60 cursor-not-allowed"
              >
                <span className="mt-0.5 text-zinc-600">
                  <ServiceIcon name={service.icon} />
                </span>
                <span>
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-400">{service.name}</span>
                    <span className="text-[9px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-zinc-700">
                      Soon
                    </span>
                  </span>
                  <span className="block text-xs text-zinc-600 mt-0.5 leading-relaxed">
                    {service.description}
                  </span>
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!userMenuOpen) return;

    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <nav
        className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-800/50"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="relative">
            <button
              type="button"
              onClick={() => setServicesOpen((open) => !open)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-800/50"
            >
              Services
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <path
                  d="M1 1l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <ServicesDropdown isOpen={servicesOpen} onClose={() => setServicesOpen(false)} />
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {!loading && !isAuthenticated && (
            <>
              <Link
                to="/login"
                className="px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-800/50"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-200 transition-colors"
              >
                Register
              </Link>
            </>
          )}
          {!loading && isAuthenticated && (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((open) => !open)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-zinc-800/50 transition-colors"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <span className="w-7 h-7 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-xs font-medium text-violet-300">
                  {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                </span>
                <span className="text-sm text-zinc-300 max-w-[120px] truncate">{user.name}</span>
              </button>
              {userMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 rounded-xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-zinc-800/80">
                    <p className="text-sm text-zinc-200 truncate">{user.name}</p>
                    <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
          <Link
            to="/roadmap"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors"
          >
            Get started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 text-zinc-400 hover:text-zinc-100"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-5 py-4 space-y-4">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 rounded-lg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div>
            <p className="px-3 text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-2">
              Services
            </p>
            <ul className="space-y-1">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  {service.available ? (
                    <Link
                      to={service.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800/60"
                    >
                      <span className="text-violet-400">
                        <ServiceIcon name={service.icon} />
                      </span>
                      <span className="text-sm text-zinc-200">{service.name}</span>
                      <span className="ml-auto text-[9px] font-mono uppercase text-emerald-400">Live</span>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3 px-3 py-2.5 opacity-50">
                      <span className="text-zinc-600">
                        <ServiceIcon name={service.icon} />
                      </span>
                      <span className="text-sm text-zinc-500">{service.name}</span>
                      <span className="ml-auto text-[9px] font-mono uppercase text-zinc-600">Soon</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {!loading && !isAuthenticated && (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="flex-1 text-center px-4 py-2.5 text-sm rounded-lg border border-zinc-700 text-zinc-300"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center px-4 py-2.5 text-sm font-medium rounded-lg bg-violet-600 text-white"
              >
                Register
              </Link>
            </div>
          )}
          {!loading && isAuthenticated && (
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800">
              <div>
                <p className="text-sm text-zinc-200">{user.name}</p>
                <p className="text-xs text-zinc-500 truncate">{user.email}</p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1"
              >
                Log out
              </button>
            </div>
          )}
          <Link
            to="/roadmap"
            className="block w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg bg-violet-600 text-white"
          >
            Get started
          </Link>
        </div>
      )}
    </header>
  );
}
