"use client";

import { motion } from "framer-motion";
import { ArrowRight, CircuitBoard, Image as ImageIcon, PenSquare, Workflow } from "lucide-react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type HeroProps = {
  onStart?: () => void;
};

export function Hero({ onStart }: HeroProps) {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10 py-28 text-center">
      <div className="absolute -top-32 h-[620px] w-[620px] rounded-full bg-purple-500/30 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 space-y-6"
      >
        <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
          <Badge>NexaForge Pro</Badge>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-widest text-slate-300/80">
            Agentic Website Foundry
          </span>
        </div>
        <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-6xl">
          Orchestrate AI agents to design, write and launch your next web product.
        </h1>
        <p className="mx-auto max-w-2xl text-balance text-lg text-slate-300">
          From industry intelligence to deployment-ready code, NexaForge Pro aligns Architect, Copywriter, Visual and
          Integration agents to deliver production-grade Next.js experiences in hours.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={onStart} className="group">
            Begin Forge Session
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" className="backdrop-blur">
            View Agent Runbooks
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full rounded-[40px] border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl shadow-[0px_30px_120px_-40px_rgba(56,189,248,0.45)]"
      >
        <div className="rounded-[36px] border border-white/5 bg-gradient-to-br from-slate-950/80 via-slate-900/30 to-slate-950/90 p-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AGENT_CARDS.map((agent) => (
              <motion.div
                key={agent.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-left shadow-lg shadow-indigo-900/10"
                whileHover={{ y: -4 }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-sky-500/20 text-indigo-300">
                  <agent.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{agent.title}</h3>
                <p className="mt-2 text-sm text-slate-300/80">{agent.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const AGENT_CARDS = [
  {
    title: "Architect",
    description: "Maps industry DNA to component systems and Supabase foundations ahead of build.",
    icon: CircuitBoard,
  },
  {
    title: "Copywriter",
    description: "Produces tone-aligned copy, SEO schema and launch messaging from GPT-4o.",
    icon: PenSquare,
  },
  {
    title: "Visual",
    description: "Generates cinematic hero art, color palettes and motion overlays via DALL·E.",
    icon: ImageIcon,
  },
  {
    title: "Integration",
    description: "Automates Stripe checkout, calendars and contact flows with Supabase Edge functions.",
    icon: Workflow,
  },
];
