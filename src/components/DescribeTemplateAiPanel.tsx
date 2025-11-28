import { useState } from "react";
import { Plus, Mic, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const categories = [
  "Identity / KYC",
  "Education",
  "Employment / HR",
  "Financial",
  "Government",
  "Travel",
  "Healthcare",
  "Other",
];

const quickPrompts = [
  "KYC profile for a fintech app",
  "Student enrollment proof for universities",
  "Employment letter template for HR",
  "Proof of income for loan applications",
  "Visa application document checklist",
  "Medical records request form",
];

export const DescribeTemplateAiPanel = () => {
  const [prompt, setPrompt] = useState("");
  const [activeCategory, setActiveCategory] = useState("Identity / KYC");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ title: string; fields: string[] } | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResult(null);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 600));
    
    setIsLoading(false);
    setResult({
      title: "Suggested SmartDoc template",
      fields: [
        "Full Name & Contact Details",
        "Document Upload (ID, Passport)",
        "Address Verification",
        "Signature & Date",
        "Consent & Privacy Agreement"
      ]
    });
  };

  const handleQuickPrompt = (quickPrompt: string) => {
    setPrompt(quickPrompt);
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Main prompt bar */}
      <div className={cn(
        "bg-card rounded-3xl border-2 p-2 shadow-lg transition-all duration-200",
        isFocused ? "border-primary shadow-xl" : "border-border"
      )}>
        <div className="flex items-start gap-3 p-4">
          <button className="mt-2 p-2 rounded-full hover:bg-accent transition-colors">
            <Plus className="h-5 w-5 text-muted-foreground" />
          </button>
          
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Describe the SmartDoc you need, and we'll blueprint it."
            className="flex-1 border-0 bg-transparent resize-none text-base focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[60px]"
            rows={2}
          />
          
          <div className="flex items-center gap-2 mt-2">
            <button className="p-2 rounded-full hover:bg-accent transition-colors">
              <Mic className="h-5 w-5 text-muted-foreground" />
            </button>
            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isLoading}
              size="icon"
              className="rounded-full h-10 w-10"
            >
              {isLoading ? (
                <Sparkles className="h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 justify-center px-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeCategory === category
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Quick prompt cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-4">
        {quickPrompts.map((quickPrompt, index) => (
          <button
            key={index}
            onClick={() => handleQuickPrompt(quickPrompt)}
            className="p-4 text-left rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all text-sm"
          >
            {quickPrompt}
          </button>
        ))}
      </div>

      {/* Result card */}
      {result && (
        <div className="bg-card rounded-2xl border border-border p-6 shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">{result.title}</h3>
          </div>
          <ul className="space-y-2">
            {result.fields.map((field, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5">•</span>
                {field}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center px-4">
        AI can make mistakes. Please review generated content carefully.
      </p>
    </div>
  );
};
