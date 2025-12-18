import { NextResponse } from "next/server";
import { z } from "zod";

import { runForgePipeline, type ForgeOutput } from "@/lib/agents";
import { supabaseAdmin } from "@/lib/supabase";

const requestSchema = z.object({
  projectName: z.string().min(3),
  industry: z.string().optional(),
  theme: z.string().optional(),
  goals: z.string().min(10),
  tone: z.string().min(3),
  features: z.array(z.string()).max(8).default([]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = requestSchema.parse(body);

    const output = await runForgePipeline(input);

    await persistSession(input.projectName, output, input.industry, input.theme);

    return NextResponse.json({ status: "ok", output });
  } catch (error) {
    console.error("Forge pipeline error", error);
    return NextResponse.json({ status: "error", message: getErrorMessage(error) }, { status: 500 });
  }
}

async function persistSession(
  projectName: string,
  output: ForgeOutput,
  industry?: string,
  theme?: string,
) {
  if (!supabaseAdmin) return;
  try {
    await supabaseAdmin.from("forge_sessions").insert({
      project_name: projectName,
      industry: industry ?? output.industry,
      theme: theme ?? output.theme,
      status: "complete",
      payload: output,
    });
  } catch (error) {
    console.warn("Failed to persist forge session", error);
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof z.ZodError) {
    return error.errors.map((err) => err.message).join(", ");
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Unexpected error";
}
