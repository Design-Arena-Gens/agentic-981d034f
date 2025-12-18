"use client";

import { motion } from "framer-motion";
import { Copy, Download, Palette, Rocket, Sparkles, Workflow } from "lucide-react";
import { toast } from "sonner";

import type { ForgeOutput } from "../lib/agents";
import { formatCurrency, shimmer, toBase64 } from "../lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

type Props = {
  output?: ForgeOutput;
};

export function OutputPane({ output }: Props) {
  if (!output) {
    return (
      <div className="mt-16 grid gap-6 text-center text-slate-300">
        <p className="text-sm uppercase tracking-widest text-white/60">Forge intelligence pending</p>
        <p className="text-lg text-slate-300/80">
          Launch a Forge session to receive agent output including sitemap, copy, palette, and integration plan.
        </p>
        <motion.img
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          src={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 360))}`}
          alt="Forge placeholder"
          className="mx-auto w-full max-w-4xl rounded-3xl border border-white/10"
        />
      </div>
    );
  }

  const metaEntries = Object.entries(output.seo.meta ?? {});

  return (
    <section className="mt-16 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-6 md:grid-cols-[1.2fr_1fr]"
      >
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/30 to-slate-950/90 p-8">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-300/60">
            <span>{output.industry}</span>
            <span className="h-px w-6 bg-white/10" />
            <span>{output.theme}</span>
          </div>
          <h2 className="mt-6 text-3xl font-semibold text-white">{output.copy.heroTitle}</h2>
          <p className="mt-3 text-base text-slate-300/90">{output.copy.heroSubtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => handleCopy(JSON.stringify(output, null, 2))} className="group">
              <Copy className="mr-2 h-4 w-4" /> Copy JSON
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Runbook
            </Button>
          </div>
          <dl className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.32em] text-slate-400">Summary</dt>
              <dd className="mt-2 text-sm text-slate-200/90">{output.summary}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.32em] text-slate-400">Sitemap Nodes</dt>
              <dd className="mt-2 flex flex-wrap gap-2 text-sm text-slate-200/90">
                {output.sitemap.map((item) => (
                  <Badge key={item} className="border-white/10 bg-white/10 text-slate-200">
                    {item}
                  </Badge>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <Card className="border-white/10 bg-white/[0.04]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Palette className="h-5 w-5 text-indigo-300" /> Palette direction
            </CardTitle>
            <CardDescription className="text-slate-300/80">
              Visual agent maps these swatches to Tailwind tokens & MagicUI shaders.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(output.visual.palette).map(([key, value]) => (
                <div key={key} className="space-y-2 rounded-2xl border border-white/5 bg-white/5 p-3">
                  <div className="h-14 w-full rounded-xl" style={{ background: value as string }} />
                  <p className="text-xs font-medium uppercase tracking-widest text-slate-200">{key}</p>
                  <p className="text-[10px] text-slate-400">{value}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-300/80">Prompt: {output.visual.prompt}</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]"
      >
        <Card className="bg-white/[0.04]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Sparkles className="h-5 w-5 text-purple-300" /> SEO Signals
            </CardTitle>
            <CardDescription className="text-slate-300/80">
              Copywriter agent ensures search readiness with structured data and messaging.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-300">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Meta Description</p>
              <p className="mt-2 text-slate-200/90">{output.seo.description}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Keywords</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {output.seo.keywords.map((keyword) => (
                  <Badge key={keyword} className="border-white/10 bg-white/10 text-slate-200">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            <details className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer text-xs uppercase tracking-[0.3em] text-white/60">
                JSON-LD Blueprint
              </summary>
              <pre className="mt-3 overflow-hidden rounded-xl bg-slate-950/80 p-4 text-xs text-slate-300">
                {JSON.stringify(output.seo.jsonLd, null, 2)}
              </pre>
            </details>
            {metaEntries.length ? (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Meta Tags</p>
                <div className="mt-3 space-y-2 text-xs">
                  {metaEntries.map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                      <span className="text-slate-400">{key}</span>
                      <span className="text-slate-200">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="bg-white/[0.04]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Workflow className="h-5 w-5 text-sky-300" /> Integration Readiness
            </CardTitle>
            <CardDescription className="text-slate-300/80">
              Integration agent configures Supabase schemas, Stripe catalog, and automation runbooks.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-sm text-slate-200">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Stripe Products</p>
              <div className="mt-2 space-y-2">
                {output.integrations.stripeProducts.map((product) => (
                  <div
                    key={`${product.name}-${product.price}`}
                    className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-2"
                  >
                    <div>
                      <p className="font-medium text-white">{product.name}</p>
                      <p className="text-xs text-slate-400">Interval: {product.interval ?? "one_time"}</p>
                    </div>
                    <p className="text-sm font-semibold text-white">{formatCurrency(product.price)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Supabase Schema</p>
              <div className="mt-2 space-y-3">
                {output.integrations.supabase.tables.map((table) => (
                  <div key={table.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="font-medium text-white">{table.name}</p>
                    <ul className="mt-2 space-y-1 text-xs text-slate-300/80">
                      {table.columns.map((col) => (
                        <li key={col.name} className="flex justify-between">
                          <span>{col.name}</span>
                          <span className="text-slate-400">{col.type}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Edge Functions</p>
              <div className="flex flex-wrap gap-2">
                {output.integrations.supabase.edgeFunctions.map((fn) => (
                  <Badge key={fn} className="border-white/10 bg-white/10 text-slate-200">
                    {fn}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Automations</p>
              <ul className="space-y-2 text-xs text-slate-300/90">
                {output.integrations.automations.map((automation) => (
                  <li key={automation} className="rounded-xl bg-white/5 px-3 py-2">
                    {automation}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Launch trajectory</p>
            <p>
              Integration agent reports readiness once Supabase, Stripe, and Vercel deploy hooks complete validation.
            </p>
          </div>
          <div className="min-w-[220px]">
            <Progress value={86} />
            <p className="mt-1 text-right text-xs text-slate-400">86% launch ready</p>
          </div>
        </div>
      </div>

      <Card className="border-white/10 bg-white/[0.03]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Rocket className="h-5 w-5 text-emerald-300" /> Deployment Checklist
          </CardTitle>
          <CardDescription className="text-slate-300/80">
            Integration agent auto-populates runbook to synchronize Vercel, Supabase, and DNS.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="grid gap-4 text-sm text-slate-200 md:grid-cols-3">
            {CHECKLIST.map((item) => (
              <li key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.32em] text-white/60">{item.step}</p>
                <p className="mt-2 font-medium text-white">{item.title}</p>
                <p className="mt-2 text-xs text-slate-300/80">{item.description}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </section>
  );
}

function handleCopy(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => toast.success("Forge output copied"))
    .catch(() => toast.error("Failed to copy"));
}

const CHECKLIST = [
  {
    step: "01",
    title: "Provision Supabase",
    description: "Apply schema, RLS, storage buckets, and secrets for Edge Functions.",
  },
  {
    step: "02",
    title: "Stripe Catalog Sync",
    description: "Create products, price IDs, and webhook endpoints with signing secrets.",
  },
  {
    step: "03",
    title: "Vercel Launch",
    description: "Deploy Next.js bundle, assign domain, and execute smoke tests.",
  },
];
