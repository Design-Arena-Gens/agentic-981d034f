"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { formatCurrency } from "../lib/utils";
import { TIER_PLANS } from "../lib/constants";

export function Pricing() {
  return (
    <section className="mx-auto mt-32 w-full max-w-5xl">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-semibold text-white">Production plans that scale with your runway</h2>
        <p className="mt-3 text-base text-slate-300/90">
          All plans include agent orchestration, Supabase provisioning, Stripe automation, and Vercel deployment.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {TIER_PLANS.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <Card
              className={plan.highlighted ? "border-purple-400/40 bg-white/10 shadow-[0_30px_120px_-40px_rgba(168,85,247,0.6)]" : "bg-white/5"}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  {plan.name}
                  {plan.highlighted ? (
                    <span className="rounded-full border border-purple-400/40 px-3 py-1 text-xs uppercase tracking-widest text-purple-200">
                      Most Popular
                    </span>
                  ) : null}
                </CardTitle>
                <CardDescription className="text-slate-300/80">
                  {plan.subtitle ?? "Autonomous website production"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-4xl font-bold text-white">
                  {formatCurrency(plan.price)}
                  <span className="ml-2 text-base font-normal text-slate-300/70">{plan.subtitle ?? "per build"}</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-200">
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.highlighted ? "default" : "outline"} className="w-full">
                  Engage Agents
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
