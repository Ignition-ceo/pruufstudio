import { useState } from "react";
import { Upload, Link2, FileText, Settings, ArrowRight, Shield, GraduationCap, Umbrella, Users, DollarSign, Plane, Heart, Truck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExtractionReviewPanel, type ExtractedField } from "./ExtractionReviewPanel";
import { useToast } from "@/hooks/use-toast";

const actionChips = [
  { icon: Upload, label: "Upload file" },
  { icon: Link2, label: "Import from URL" },
];

const sectors = [
  { icon: Shield, label: "KYC & Compliance" },
  { icon: GraduationCap, label: "Education" },
  { icon: Umbrella, label: "Insurance" },
  { icon: Users, label: "HR" },
  { icon: DollarSign, label: "Financial Services" },
  { icon: Plane, label: "Travel" },
  { icon: Heart, label: "Health" },
  { icon: Truck, label: "Logistics" },
];

const mockExtractedFields: ExtractedField[] = [
  { id: "doc-1", name: "Full Name", type: "text", required: true, confidence: 97 },
  { id: "doc-2", name: "Document Number", type: "text", required: true, confidence: 94 },
  { id: "doc-3", name: "Date of Birth", type: "date", required: true, confidence: 91 },
  { id: "doc-4", name: "Issue Date", type: "date", required: true, confidence: 88 },
  { id: "doc-5", name: "Expiry Date", type: "date", required: false, confidence: 85 },
  { id: "doc-6", name: "Nationality", type: "text", required: false, confidence: 72 },
  { id: "doc-7", name: "Category", type: "enum", required: false, confidence: 65 },
];

export const CreateFromDocumentPanel = () => {
  const { toast } = useToast();
  const [state, setState] = useState<"idle" | "extracting" | "review">("idle");

  const handleFileUpload = () => {
    setState("extracting");
    setTimeout(() => setState("review"), 2000);
  };

  if (state === "extracting") {
    return (
      <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-4 py-20">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground font-medium">Extracting fields from document…</p>
      </div>
    );
  }

  if (state === "review") {
    return (
      <ExtractionReviewPanel
        templateName="Uploaded Document"
        initialFields={mockExtractedFields}
        showConfidence
        onBack={() => setState("idle")}
        onContinue={(fields) => {
          toast({ title: "Fields confirmed", description: `${fields.length} fields ready for card design.` });
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-5xl flex flex-col gap-6">
      {/* Main upload bar */}
      <div 
        onClick={handleFileUpload}
        className="bg-card rounded-xl border border-border hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md px-6 py-5 flex items-center gap-4"
      >
        <Upload className="h-6 w-6 text-muted-foreground flex-shrink-0" />
        <div className="flex-1">
          <input 
            type="text" 
            placeholder="Upload or drop a document to start"
            className="w-full bg-transparent text-lg outline-none pointer-events-none text-foreground placeholder:text-muted-foreground"
            readOnly
          />
        </div>
        <Settings className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <Button size="lg" className="rounded-full gap-2" onClick={(e) => { e.stopPropagation(); handleFileUpload(); }}>
          Go
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Action chips */}
      <div className="flex flex-wrap gap-3 justify-center">
        {actionChips.map((chip) => (
          <button
            key={chip.label}
            onClick={() => handleFileUpload()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary hover:bg-accent transition-colors text-sm font-medium shadow-sm"
          >
            <chip.icon className="h-4 w-4" />
            {chip.label}
          </button>
        ))}
      </div>

      {/* Sector quick-starts */}
      <div className="flex flex-wrap gap-3">
        {sectors.map((sector) => (
          <button
            key={sector.label}
            onClick={() => handleFileUpload()}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-primary hover:bg-accent transition-all text-sm font-medium shadow-sm"
          >
            <sector.icon className="h-4 w-4" />
            {sector.label}
          </button>
        ))}
      </div>
    </div>
  );
};
