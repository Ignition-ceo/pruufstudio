import { Upload, Link2, FileText, Settings, ArrowRight, Shield, GraduationCap, Umbrella, Users, DollarSign, Plane, Heart, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const actionChips = [
  { icon: Upload, label: "Upload file" },
  { icon: Link2, label: "Import from URL" },
  { icon: FileText, label: "Paste text" },
  { icon: Settings, label: "Connected source" },
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

export const CreateFromDocumentPanel = () => {
  const handleFileUpload = () => {
    console.log("File picker triggered");
  };

  const handleActionClick = (label: string) => {
    console.log(`Action clicked: ${label}`);
  };

  const handleSectorClick = (label: string) => {
    console.log(`Selected sector: ${label}`);
  };

  return (
    <div className="w-full max-w-5xl flex flex-col gap-6">
      {/* Main upload bar */}
      <div 
        onClick={handleFileUpload}
        className="bg-card rounded-2xl border-2 border-border hover:border-primary/50 transition-all cursor-pointer shadow-card hover:shadow-card-hover p-6 flex items-center gap-4"
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
            onClick={() => handleActionClick(chip.label)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary hover:bg-accent transition-colors text-sm font-medium"
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
            onClick={() => handleSectorClick(sector.label)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-primary hover:bg-accent transition-all text-sm font-medium"
          >
            <sector.icon className="h-4 w-4" />
            {sector.label}
          </button>
        ))}
      </div>
    </div>
  );
};
