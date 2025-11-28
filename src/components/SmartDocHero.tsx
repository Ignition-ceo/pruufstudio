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
          <div className="border-2 border-blue rounded-2xl p-2 bg-background/50 backdrop-blur-sm">
            <SegmentedControl
              options={modeOptions}
              value={mode}
              onChange={setMode}
            />
          </div>
          
          {mode === "document" && <CreateFromDocumentPanel />}
          {mode === "template" && <ChooseTemplatePanel />}
          {mode === "ai" && <DescribeTemplateAiPanel />}
        </div>
      </div>
    </div>
  );
};
