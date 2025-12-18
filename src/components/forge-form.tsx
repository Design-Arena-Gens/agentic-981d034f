"use client";

import { useMemo, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";

import { INDUSTRIES, THEMES } from "../lib/constants";
import type { ForgeOutput } from "../lib/agents";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";

type Props = {
  onComplete?: (result: ForgeOutput) => void;
};

export function ForgeForm({ onComplete }: Props) {
  const [isPending, startTransition] = useTransition();
  const [features, setFeatures] = useState<string[]>([]);

  const featureSuggestions = useMemo(
    () => ["AI onboarding", "Stripe billing", "Calendar sync", "Supabase auth", "Analytics"],
    [],
  );

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid gap-6 rounded-[36px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl md:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const payload = {
          projectName: String(formData.get("projectName") ?? ""),
          industry: String(formData.get("industry") || ""),
          theme: String(formData.get("theme") || ""),
          goals: String(formData.get("goals") ?? ""),
          tone: String(formData.get("tone") ?? ""),
          features,
        };

        startTransition(async () => {
          try {
            const result = await submitForgeRequest(payload);
            toast.success("Forge agents completed run");
            onComplete?.(result.output);
          } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : "Failed to run Forge pipeline");
          }
        });
      }}
    >
      <div className="space-y-5">
        <FormField label="Project name" description="How should agents refer to your build?">
          <Input name="projectName" placeholder="Ex: Orbit Ledger" required autoComplete="off" />
        </FormField>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Industry" description="Architect agent will override if misaligned.">
            <Select name="industry" items={INDUSTRIES} placeholder="Auto-select" />
          </FormField>
          <FormField label="Visual theme" description="Visual agent styles DALL·E and UI primitives.">
            <Select name="theme" items={THEMES} placeholder="Auto-select" />
          </FormField>
        </div>
        <FormField label="Strategic goals" description="Tell architect what outcomes to optimise for.">
          <Textarea name="goals" placeholder="MVP for B2B lead gen, integrate product demo and secure lead capture." required />
        </FormField>
      </div>
      <div className="space-y-5">
        <FormField label="Voice & tone" description="Copywriter agent adapts brand linguistics.">
          <Input name="tone" placeholder="Confident, enterprise-grade, technically articulate." required />
        </FormField>
        <FormField label="Key capabilities" description="Highlight product modules for integration agent.">
          <FeatureSelector
            value={features}
            onToggle={(feature) =>
              setFeatures((current) =>
                current.includes(feature)
                  ? current.filter((item) => item !== feature)
                  : [...current, feature].slice(0, 8),
              )
            }
            suggestions={featureSuggestions}
          />
        </FormField>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Coordinating agents…
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              Launch Forge Engine
            </span>
          )}
        </Button>
      </div>
    </motion.form>
  );
}

function FormField({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label className="text-sm text-slate-100">{label}</Label>
        {description ? <p className="text-xs text-slate-400">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}

function Select({ name, items, placeholder }: { name: string; items: readonly string[]; placeholder: string }) {
  return (
    <select
      name={name}
      className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70"
      defaultValue=""
    >
      <option value="">{placeholder}</option>
      {items.map((item) => (
        <option key={item} value={item} className="bg-slate-950 text-slate-100">
          {item}
        </option>
      ))}
    </select>
  );
}

function FeatureSelector({
  value,
  onToggle,
  suggestions,
}: {
  value: string[];
  onToggle: (value: string) => void;
  suggestions: string[];
}) {
  const [custom, setCustom] = useState("");

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {suggestions.map((feature) => {
          const active = value.includes(feature);
          return (
            <button
              key={feature}
              type="button"
              onClick={() => onToggle(feature)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition",
                active
                  ? "border-indigo-400 bg-indigo-500/20 text-indigo-100"
                  : "border-white/10 bg-white/5 text-slate-200 hover:border-white/40",
              )}
            >
              {feature}
            </button>
          );
        })}
      </div>
      <div className="flex gap-2">
        <Input
          value={custom}
          onChange={(event) => setCustom(event.target.value)}
          placeholder="Add custom feature"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (!custom.trim()) return;
            onToggle(custom.trim());
            setCustom("");
          }}
        >
          <Wand2 className="mr-2 h-3.5 w-3.5" />
          Add
        </Button>
      </div>
      <p className="text-xs text-slate-400/80">Selected: {value.length || "None"} / 8</p>
    </div>
  );
}

type ForgeResponse = { status: "ok"; output: ForgeOutput };

async function submitForgeRequest(payload: {
  projectName: string;
  industry?: string;
  theme?: string;
  goals: string;
  tone: string;
  features: string[];
}) {
  const response = await fetch("/api/forge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.json().catch(() => ({ message: "Forge pipeline failed" }));
    throw new Error(message.message ?? "Forge pipeline failed");
  }

  return (await response.json()) as ForgeResponse;
}
