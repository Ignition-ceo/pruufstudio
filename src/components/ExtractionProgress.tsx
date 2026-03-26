import { useState, useEffect } from "react";
import { Upload, ScanSearch, Puzzle, CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  { label: "Uploading document", icon: Upload, delay: 1000 },
  { label: "Extracting fields", icon: ScanSearch, delay: 2000 },
  { label: "Matching template", icon: Puzzle, delay: 1000 },
  { label: "Ready for review", icon: CheckCircle2, delay: 0 },
];

interface ExtractionProgressProps {
  onComplete: () => void;
}

export const ExtractionProgress = ({ onComplete }: ExtractionProgressProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= steps.length) {
      onComplete();
      return;
    }
    const delay = steps[current].delay;
    if (delay === 0) {
      const t = setTimeout(() => setCurrent((c) => c + 1), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCurrent((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [current, onComplete]);

  return (
    <Card className="border border-border rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] max-w-md mx-auto">
      <CardContent className="p-8">
        <h2 className="text-lg font-semibold text-foreground mb-6 text-center">Processing document…</h2>
        <div className="space-y-1">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const done = i < current;
            const active = i === current && current < steps.length;
            return (
              <div key={i} className="flex items-center gap-4 py-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  done ? "bg-green-100 text-green-600" : active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {active ? <Loader2 className="w-4 h-4 animate-spin" /> : done ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-sm font-medium ${done ? "text-green-600" : active ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
