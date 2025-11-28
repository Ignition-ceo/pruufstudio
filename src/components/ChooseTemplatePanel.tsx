import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const ChooseTemplatePanel = () => {
  return (
    <div className="w-full max-w-3xl bg-card rounded-2xl border border-border shadow-card h-[240px]">
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
              className="aspect-[3/2] rounded-lg bg-secondary hover:bg-accent transition-colors p-4 flex items-center justify-center text-sm font-medium"
            >
              {template}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
