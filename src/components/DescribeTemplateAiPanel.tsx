import { useState } from "react";
import { Plus, Mic, ArrowRight, Sparkles, Edit3 } from "lucide-react";
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

const promptsByCategory: Record<string, string[]> = {
  "Identity / KYC": [
    "KYC profile for a fintech app",
    "Digital identity verification form",
    "Customer onboarding checklist",
    "Identity document collection template",
    "Age verification proof document",
    "Know Your Customer compliance form",
  ],
  "Education": [
    "Student enrollment proof for universities",
    "Academic transcript request form",
    "Course completion certificate",
    "Educational background verification",
    "Scholarship application document",
    "Letter of recommendation template",
  ],
  "Employment / HR": [
    "Employment letter template for HR",
    "Job offer acceptance document",
    "Employee onboarding checklist",
    "Performance review form",
    "Background verification request",
    "Salary certificate template",
  ],
  "Financial": [
    "Proof of income for loan applications",
    "Bank statement verification form",
    "Credit assessment document",
    "Tax compliance certificate",
    "Financial disclosure statement",
    "Investment verification template",
  ],
  "Government": [
    "Government service application form",
    "Public records request document",
    "License renewal checklist",
    "Citizen verification template",
    "Permit application document",
    "Compliance certificate form",
  ],
  "Travel": [
    "Visa application document checklist",
    "Travel authorization form",
    "Passport verification template",
    "Travel insurance proof document",
    "Hotel booking confirmation",
    "Immigration document checklist",
  ],
  "Healthcare": [
    "Medical records request form",
    "Patient consent document",
    "Health insurance verification",
    "Vaccination certificate template",
    "Medical history form",
    "Healthcare provider authorization",
  ],
  "Other": [
    "General verification document",
    "Custom form template",
    "Multi-purpose checklist",
    "Standard proof document",
    "Flexible application form",
    "Universal consent template",
  ],
};

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
      <div className="relative group">
        <div className={cn(
          "absolute -inset-1 rounded-[28px] opacity-0 blur-xl transition-all duration-500",
          "bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600",
          isFocused && "opacity-70 animate-pulse"
        )} />
        <div className={cn(
          "relative bg-card rounded-3xl border-2 p-2 shadow-lg transition-all duration-300",
          isFocused 
            ? "border-primary shadow-[0_0_40px_rgba(59,130,246,0.3)]" 
            : "border-border hover:border-primary/50"
        )}>
          <div className="flex items-start gap-3 p-4">
            <button className="mt-2 p-2 rounded-full hover:bg-primary/10 transition-all duration-200 hover:scale-110">
              <Plus className="h-5 w-5 text-primary" />
            </button>
            
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Describe the SmartDoc you need, and we'll blueprint it."
              className="flex-1 border-0 bg-transparent resize-none text-base focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[60px] placeholder:text-muted-foreground/60"
              rows={2}
            />
            
            <div className="flex items-center gap-2 mt-2">
              <button className="p-2 rounded-full hover:bg-primary/10 transition-all duration-200 hover:scale-110">
                <Mic className="h-5 w-5 text-primary" />
              </button>
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isLoading}
                size="icon"
                className="rounded-full h-10 w-10 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 justify-center px-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden",
              activeCategory === category
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105"
            )}
          >
            {activeCategory === category && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" 
                   style={{
                     backgroundSize: '200% 100%',
                     animation: 'shimmer 2s linear infinite'
                   }} />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      {/* Quick prompt cards */}
      <div className="space-y-3 px-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Edit3 className="h-4 w-4 text-blue-500" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">Quick prompts (click to use & edit)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in duration-300">
          {promptsByCategory[activeCategory].map((quickPrompt, index) => (
            <button
              key={`${activeCategory}-${index}`}
              onClick={() => handleQuickPrompt(quickPrompt)}
              className="group p-4 text-left rounded-xl border border-border bg-gradient-to-br from-card to-blue-50/30 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 text-sm relative overflow-hidden hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:scale-110">
                <Edit3 className="h-3.5 w-3.5 text-blue-500" />
              </div>
              <span className="relative z-10">{quickPrompt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Result card */}
      {result && (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-[20px] opacity-30 blur-lg animate-pulse" />
          <div className="relative bg-gradient-to-br from-card to-blue-50/50 rounded-2xl border-2 border-blue-200 p-6 shadow-xl shadow-blue-500/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{result.title}</h3>
            </div>
            <ul className="space-y-2">
              {result.fields.map((field, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-foreground/80 group/item hover:text-foreground transition-colors">
                  <span className="text-blue-500 mt-0.5 font-bold">✦</span>
                  <span>{field}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center px-4">
        AI can make mistakes. Please review generated content carefully.
      </p>
    </div>
  );
};
