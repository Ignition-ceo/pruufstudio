import { useState } from "react";
import { CreateFromDocumentPanel } from "@/components/CreateFromDocumentPanel";
import { ChooseTemplatePanel } from "@/components/ChooseTemplatePanel";
import { DescribeTemplateAiPanel } from "@/components/DescribeTemplateAiPanel";
import { GeometricNetwork } from "@/components/GeometricNetwork";
import { cn } from "@/lib/utils";

type Mode = "document" | "template" | "ai";

const modeOptions: { value: Mode; label: string }[] = [
  { value: "document", label: "Create from Document" },
  { value: "template", label: "Choose Template" },
  { value: "ai", label: "Describe Template (AI)" },
];

export const SmartDocHero = () => {
  const [mode, setMode] = useState<Mode>("document");

  return (
    <div className="w-full min-h-screen bg-gradient-hero relative overflow-hidden md:rounded-tl-3xl">
      {/* Subtle constellation pattern */}
      <div className="absolute inset-0 opacity-[0.03] blur-[0.5px]">
        <GeometricNetwork />
      </div>

      <div className="relative z-10 px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          {/* Hero Card */}
          <div 
            className="bg-white rounded-[24px] border border-[hsl(var(--brand-grey))] shadow-hero-card px-5 py-5 md:px-6 md:py-6"
          >
            {/* Title */}
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground text-center mb-5">
              Create a new SmartDoc
            </h1>

            {/* Pill Selector */}
            <div className="flex justify-center mb-5">
              <div className="inline-flex gap-2 p-1">
                {modeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setMode(option.value)}
                    className={cn(
                      "px-4 md:px-6 py-2.5 md:py-3 rounded-full text-sm font-medium transition-all duration-150",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      mode === option.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-white border border-[hsl(var(--brand-grey))] text-[hsl(var(--brand-muted))] hover:border-muted-foreground/40 hover:bg-muted/30"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Content */}
            <div className="relative min-h-[120px]">
              <div
                key={mode}
                className="animate-in fade-in slide-in-from-bottom-1 duration-150"
              >
                {mode === "document" && <HeroDocumentContent />}
                {mode === "template" && <HeroTemplateContent />}
                {mode === "ai" && <HeroAiContent />}
              </div>
            </div>
          </div>

          {/* Full Panel Content (below hero card) */}
          <div className="w-full">
            {mode === "document" && <CreateFromDocumentPanel />}
            {mode === "template" && <ChooseTemplatePanel />}
            {mode === "ai" && <DescribeTemplateAiPanel />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Minimal content previews inside the hero card
const HeroDocumentContent = () => (
  <p className="text-center text-muted-foreground text-sm">
    Upload a document to automatically extract fields and create a SmartDoc template.
  </p>
);

const HeroTemplateContent = () => (
  <p className="text-center text-muted-foreground text-sm">
    Browse our library of pre-built templates to get started quickly.
  </p>
);

const HeroAiContent = () => (
  <p className="text-center text-muted-foreground text-sm">
    Describe what you need and let AI generate the perfect template for you.
  </p>
);
