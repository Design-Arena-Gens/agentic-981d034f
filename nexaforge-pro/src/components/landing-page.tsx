"use client";

import { useRef } from "react";

import { ForgeExperience } from "./forge-experience";
import { Hero } from "./hero";
import { WorkflowTimeline } from "./workflow-timeline";
import { FeatureGrid } from "./feature-grid";
import { Pricing } from "./pricing";
import { Footer } from "./footer";

export function LandingPage() {
  const forgeRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative flex min-h-screen flex-col items-center px-6 pb-24 pt-24 text-white">
      <Hero onStart={() => forgeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })} />
      <div ref={forgeRef} className="mt-10 w-full max-w-6xl">
        <ForgeExperience />
      </div>
      <WorkflowTimeline />
      <FeatureGrid />
      <Pricing />
      <Footer />
    </div>
  );
}
