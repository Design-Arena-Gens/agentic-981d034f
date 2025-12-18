export function Footer() {
  return (
    <footer className="mx-auto mt-32 flex w-full max-w-6xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-slate-300/80 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">NexaForge Pro</p>
          <p className="mt-1 text-slate-200">Autonomous website foundry by senior full-stack architects.</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.26em] text-white/60">
          <a href="#" className="hover:text-white">
            Workflow
          </a>
          <a href="#" className="hover:text-white">
            Docs
          </a>
          <a href="#" className="hover:text-white">
            Status
          </a>
          <a href="#" className="hover:text-white">
            Support
          </a>
        </nav>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} NexaForge Collective. All rights reserved.</p>
        <div className="flex gap-3">
          <a href="mailto:hello@nexaforge.pro" className="hover:text-slate-200">
            hello@nexaforge.pro
          </a>
          <span className="h-4 w-px bg-white/10" />
          <span>Built on Next.js · Supabase · Stripe · OpenAI</span>
        </div>
      </div>
    </footer>
  );
}
