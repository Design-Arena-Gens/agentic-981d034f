"use client";

import { motion } from "framer-motion";

import { WORKFLOW_TIMELINE } from "../lib/constants";

export function WorkflowTimeline() {
  return (
    <section className="relative mx-auto mt-32 w-full max-w-6xl">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-semibold text-white">Forge Engine Timeline</h2>
        <p className="mt-3 max-w-2xl text-center text-base text-slate-300/90 md:mx-auto">
          Every session runs through an orchestrated pipeline of coordinated agents with validation gates and audit logs.
        </p>
      </div>
      <div className="relative">
        <div className="absolute inset-x-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent md:block" />
        <div className="grid gap-8 md:grid-cols-5">
          {WORKFLOW_TIMELINE.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-left backdrop-blur"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-xs text-slate-300/80">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
