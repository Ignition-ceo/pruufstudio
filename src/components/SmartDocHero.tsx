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
    <div className="w-full bg-gradient-hero py-16 px-8 relative overflow-hidden">
      <GeometricNetwork />
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-5xl font-bold text-foreground mb-8 text-center">
          Create a new SmartDoc
        </h1>
        
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-[#1e40af] via-[#2563eb] to-[#1e40af] animate-[border-glow_3s_ease-in-out_infinite] opacity-60 blur-sm" />
            <div className="relative border-2 border-blue rounded-2xl p-2 bg-background/50 backdrop-blur-sm">
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
