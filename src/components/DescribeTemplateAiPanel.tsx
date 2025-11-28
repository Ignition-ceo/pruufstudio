import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const DescribeTemplateAiPanel = () => {
  return (
    <div className="w-full max-w-3xl bg-card rounded-2xl border border-border p-6 shadow-card h-[240px] flex flex-col items-center justify-center">
      <div className="flex items-center gap-4 w-full">
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
};
