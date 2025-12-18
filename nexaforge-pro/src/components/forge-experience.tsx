"use client";

import { useState } from "react";

import type { ForgeOutput } from "../lib/agents";
import { ForgeForm } from "./forge-form";
import { OutputPane } from "./output-pane";

export function ForgeExperience() {
  const [output, setOutput] = useState<ForgeOutput | undefined>();

  return (
    <div className="space-y-10">
      <ForgeForm onComplete={setOutput} />
      <OutputPane output={output} />
    </div>
  );
}
