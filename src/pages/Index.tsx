import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { SegmentedControl } from "@/components/SegmentedControl";
import { CreatePanel } from "@/components/CreatePanel";
import { RecentsGrid } from "@/components/RecentsGrid";
import { ChevronRight } from "lucide-react";

const Index = () => {
  const [mode, setMode] = useState("document");

  const modeOptions = [
    { value: "document", label: "Create from Document" },
    { value: "template", label: "Choose Template" },
    { value: "ai", label: "Describe Template (AI)" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-20">
        {/* Hero Section */}
        <section className="w-full bg-gradient-hero py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-5xl font-bold text-foreground">
                Create a new SmartDoc
              </h1>
              <button className="p-2 hover:bg-card/50 rounded-full transition-colors">
                <ChevronRight className="h-6 w-6 text-foreground" />
              </button>
            </div>
            
            <div className="flex flex-col items-center gap-8">
              <SegmentedControl
                options={modeOptions}
                value={mode}
                onChange={setMode}
              />
              
              <CreatePanel mode={mode} />
            </div>
          </div>
        </section>

        {/* Recents Section */}
        <RecentsGrid />
      </main>
    </div>
  );
};

export default Index;
