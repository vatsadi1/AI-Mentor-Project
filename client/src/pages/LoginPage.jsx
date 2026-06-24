import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MarketingLayout from "../components/layout/MarketingLayout";
import { useAuth } from "../context/AuthContext";
import { getAuthErrorMessage } from "../services/authService";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <MarketingLayout>
      <div className="max-w-md mx-auto px-5 py-16">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
          <h1 className="text-2xl font-semibold text-zinc-100 mb-1">Welcome back</h1>
          <p className="text-sm text-zinc-500 mb-8">Sign in to save your code review history.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-medium transition-colors"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-sm text-zinc-500 text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-violet-400 hover:text-violet-300 transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </MarketingLayout>
  );
}
