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
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* Gradient background with network - fills from left to right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e40af] via-[#2563eb] to-[#3b82f6]">
        <GeometricNetwork />
      </div>
      
      {/* Content container */}
      <div className="relative z-10 pt-16 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-8 text-center drop-shadow-lg">
            Create a new SmartDoc
          </h1>
          
          <div className="flex flex-col items-center gap-8">
            <div className="relative">
              <div className="absolute -inset-[2px] rounded-2xl bg-white/40 animate-[border-glow_3s_ease-in-out_infinite] blur-sm" />
              <div className="relative border-2 border-white/60 rounded-2xl p-2 bg-white/20 backdrop-blur-md">
                <SegmentedControl
                  options={modeOptions}
                  value={mode}
                  onChange={setMode}
                />
              </div>
            </div>
            
            {/* White panels section */}
            <div className="w-full">
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
      </div>
    </div>
  );
};
