import { useState } from "react";
import { SegmentedControl } from "@/components/SegmentedControl";
import { CreateFromDocumentPanel } from "@/components/CreateFromDocumentPanel";
import { ChooseTemplatePanel } from "@/components/ChooseTemplatePanel";
import { DescribeTemplateAiPanel } from "@/components/DescribeTemplateAiPanel";
import { GeometricNetwork } from "@/components/GeometricNetwork";

export const SmartDocHero = () => {
  const [mode, setMode] = useState("document");

  const modeOptions = [
    { value: "document", label: "Create from Document" },
    { value: "template", label: "Choose Template" },
    { value: "ai", label: "Describe Template (AI)" },
  ];

  return (
    <div className="w-full bg-gradient-hero py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 relative overflow-hidden md:rounded-tl-3xl">
      <GeometricNetwork />
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight bg-gradient-text-blue-green bg-clip-text text-transparent animate-shimmer bg-[length:200%_200%] mb-6 md:mb-8 text-center">
          Create a new SmartDoc
        </h1>
        
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <div className="relative w-full max-w-2xl">
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-primary via-primary to-primary animate-[border-glow_3s_ease-in-out_infinite] opacity-60 blur-sm" />
            <div className="relative border border-border rounded-2xl px-3 py-3 md:px-6 md:py-5 bg-background/50 backdrop-blur-sm shadow-sm">
              <SegmentedControl
                options={modeOptions}
                value={mode}
                onChange={setMode}
              />
            </div>
          </div>
          
          {mode === "document" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
              <CreateFromDocumentPanel />
            </div>
          )}
          {mode === "template" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
              <ChooseTemplatePanel />
            </div>
          )}
          {mode === "ai" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
              <DescribeTemplateAiPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
