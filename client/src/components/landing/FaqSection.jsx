const FAQS = [
  {
    question: "Is Pathforge free to use?",
    answer:
      "Yes. The Roadmap Generator is free to use right now. Additional services will be added over time.",
  },
  {
    question: "Which service is available today?",
    answer:
      "Only the Generate Roadmap tool is live. Resume Analyzer, AI Interview Coach, Content Writer, and Code Reviewer are coming soon.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account is required. Fill in your preferences and generate a roadmap instantly.",
  },
  {
    question: "Can I download my roadmap?",
    answer:
      "Yes. After generating a roadmap, you can download it as a PDF and track task completion in the app.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="py-24 bg-zinc-900/30 border-t border-zinc-800/60">
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center mb-14">
          <p className="text-[10px] font-mono uppercase tracking-widest text-violet-400 mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-50">
            Common questions
          </h2>
        </div>

        <dl className="space-y-6">
          {FAQS.map((faq) => (
            <div
              key={faq.question}
              className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60"
            >
              <dt className="text-base font-medium text-zinc-100 mb-2">{faq.question}</dt>
              <dd className="text-sm text-zinc-500 leading-relaxed">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
