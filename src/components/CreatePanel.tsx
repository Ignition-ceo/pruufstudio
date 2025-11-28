import { Upload, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreatePanelProps {
  mode: string;
}

export const CreatePanel = ({ mode }: CreatePanelProps) => {
  if (mode === "document") {
    return (
      <div className="w-full bg-card rounded-2xl border border-border p-8 shadow-card">
        <div className="flex flex-col items-center justify-center gap-6 py-8">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
            <Upload className="h-8 w-8 text-accent-foreground" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Upload your document</h3>
            <p className="text-muted-foreground text-sm">
              PDF, DOCX, or TXT files supported
            </p>
          </div>
          <Button size="lg" className="rounded-full">
            Choose File
          </Button>
        </div>
      </div>
    );
  }

  if (mode === "template") {
    return (
      <div className="w-full bg-card rounded-2xl border border-border shadow-card">
        <div className="p-6 border-b border-border">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-12 h-12 rounded-xl border-border"
            />
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4">
            {["Invoice", "Contract", "Report", "Proposal"].map((template) => (
              <button
                key={template}
                className="aspect-[3/4] rounded-lg bg-secondary hover:bg-accent transition-colors p-4 flex items-center justify-center text-sm font-medium"
              >
                {template}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (mode === "ai") {
    return (
      <div className="w-full bg-card rounded-2xl border border-border p-6 shadow-card">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
            <Input
              placeholder="Describe your document template..."
              className="pl-12 h-14 rounded-xl border-border text-base"
            />
          </div>
          <Button size="lg" className="rounded-full h-14 px-8">
            Generate
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          AI can make mistakes. Please review generated content carefully.
        </p>
      </div>
    );
  }

  return null;
};
