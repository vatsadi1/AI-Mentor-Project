import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-[family-name:var(--font-sora,'Sora',system-ui,sans-serif)]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
