"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";

import { FEATURE_MATRIX } from "../lib/constants";

export function FeatureGrid() {
  return (
    <section className="mx-auto mt-32 w-full max-w-6xl">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURE_MATRIX.map((item, index) => {
          const Icon = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[item.icon];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-sky-500/0 opacity-0 transition group-hover:opacity-100" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-indigo-200">
                  {Icon ? <Icon className="h-5 w-5" /> : null}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300/90">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
