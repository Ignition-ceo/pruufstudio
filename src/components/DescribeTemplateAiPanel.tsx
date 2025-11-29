import { useState } from "react";
import { Plus, Mic, ArrowRight, Sparkles, Edit3, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import aiNetworkBg from "@/assets/ai-network-bg.jpeg";
import { GeometricNetwork } from "./GeometricNetwork";
import { useToast } from "@/hooks/use-toast";

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

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export const DescribeTemplateAiPanel = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [activeCategory, setActiveCategory] = useState("Identity / KYC");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ schemaName: string; fields: string[] } | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResult(null);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Extract a schema name from the prompt (capitalize first letters)
    const schemaName = prompt
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    setIsLoading(false);
    setResult({
      schemaName: schemaName,
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

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsChatLoading(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 800));

    const aiResponse: ChatMessage = {
      role: "assistant",
      content: "I've updated the template based on your feedback. The changes include enhanced validation fields and additional data points for better verification."
    };
    setChatMessages(prev => [...prev, aiResponse]);
    setIsChatLoading(false);

    // Optionally update the result
    if (result) {
      setResult({
        ...result,
        fields: [...result.fields, "New Field Based on Chat"]
      });
    }
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your template",
        variant: "destructive"
      });
      return;
    }

    // Save logic here
    toast({
      title: "Template saved!",
      description: `"${templateName}" has been saved to your templates.`,
    });

    setSaveDialogOpen(false);
    setTemplateName("");
    setTemplateDescription("");
  };

  return (
    <div className="w-full max-w-5xl space-y-6">
      {/* Magical AI Container */}
      <div className="relative overflow-hidden rounded-[32px] p-8 shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={aiNetworkBg} 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#3b82f6]" />
          <GeometricNetwork />
        </div>
        
        {/* Animated background sparkles */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse" />
          <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
          <Sparkles className="absolute top-1/4 right-10 h-6 w-6 text-white/30 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <Sparkles className="absolute bottom-1/4 left-20 h-4 w-4 text-white/30 animate-pulse" style={{ animationDelay: '0.8s' }} />
        </div>

        {/* Header */}
        <div className="relative z-10 text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-7 w-7 text-white animate-pulse" />
            How can we assist you today?
          </h2>
          <p className="text-white/90 text-sm">
            Describe your SmartDoc needs, and we'll create the perfect blueprint for you.
          </p>
        </div>

        {/* Main prompt bar - white card */}
        <div className="relative group z-10">
          <div className={cn(
            "absolute -inset-1 rounded-[24px] opacity-0 blur-lg transition-all duration-500",
            "bg-white",
            isFocused && "opacity-40"
          )} />
          <div className={cn(
            "relative bg-white rounded-[20px] p-1.5 shadow-2xl transition-all duration-150",
            isFocused && "shadow-[0_0_50px_rgba(59,130,246,0.3)] ring-2 ring-blue-400 ring-offset-2"
          )}>
            <div className="flex items-center gap-3 p-4">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                <div className="relative w-10 h-10 bg-gradient-to-br from-[#1e40af] via-[#2563eb] to-[#7c3aed] rounded-xl shadow-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white relative z-10" />
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full" />
                </div>
              </div>
              
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask anything about your SmartDoc..."
                className="flex-1 border-0 bg-transparent resize-none text-base focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[48px] placeholder:text-gray-400 text-gray-900 transition-all duration-150"
                rows={1}
              />
              
              <div className="flex items-center gap-2">
                <button className="p-2.5 rounded-full hover:bg-gray-100 transition-all duration-150 hover:scale-110">
                  <Mic className="h-5 w-5 text-gray-600" />
                </button>
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isLoading}
                  size="icon"
                  className="rounded-full h-11 w-11 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-150 hover:scale-110 disabled:opacity-50"
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
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-3 justify-center px-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 relative overflow-hidden",
              activeCategory === category
                ? "bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white shadow-lg shadow-blue-500/50 scale-105"
                : "bg-white text-gray-700 hover:bg-gray-50 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 shadow-md border border-gray-200"
            )}
          >
            {activeCategory === category && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_2s_infinite]" 
                     style={{
                       backgroundSize: '200% 100%',
                       animation: 'shimmer 2s linear infinite'
                     }} />
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-white animate-pulse" />
              </>
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      {/* Quick prompt cards */}
      <div className="space-y-4 px-4">
        <div className="flex items-center gap-3 py-2">
          <div className="w-9 h-9 rounded-xl bg-white border border-blue-500 flex items-center justify-center shadow-lg">
            <Edit3 className="h-5 w-5 text-blue-600" />
          </div>
          <span className="text-gray-900 font-normal text-base">
            Choose one of our suggested prompts
          </span>
          <div className="text-gray-500 text-xs px-3 py-1 rounded-full bg-gray-100 border border-gray-200 flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-gray-500" />
            Click to edit
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-200">
          {promptsByCategory[activeCategory].map((quickPrompt, index) => (
            <button
              key={`${activeCategory}-${index}`}
              onClick={() => handleQuickPrompt(quickPrompt)}
              className="group p-5 text-left rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-150 text-sm relative overflow-hidden hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-blue-100/80 flex items-center justify-center group-hover:bg-blue-500 transition-all duration-150 transform group-hover:scale-110">
                <Edit3 className="h-3.5 w-3.5 text-blue-400 group-hover:text-white transition-colors duration-150" />
              </div>
              <div className="absolute top-3 left-3 transition-opacity duration-150">
                <Sparkles className="h-3 w-3 text-blue-500 group-hover:text-blue-600" />
              </div>
              <span className="relative z-10 text-gray-700 group-hover:text-gray-900 font-medium pr-8">{quickPrompt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Result card with save button */}
      {result && (
        <div className="relative group px-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-[28px] opacity-40 blur-2xl animate-pulse" />
          <div className="relative bg-white rounded-[24px] border-2 border-blue-300 p-8 shadow-2xl shadow-blue-500/30 overflow-hidden">
            {/* Decorative sparkles */}
            <Sparkles className="absolute top-4 right-4 h-5 w-5 text-blue-400/60 animate-pulse" />
            <Sparkles className="absolute bottom-6 left-6 h-4 w-4 text-purple-400/60 animate-pulse" style={{ animationDelay: '0.5s' }} />
              
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white border border-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <Sparkles className="h-6 w-6 text-blue-600 animate-pulse" />
                </div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-2xl text-gray-900">
                    Smart Doc Template
                  </h3>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <p className="text-blue-600 text-xl font-semibold">{result.schemaName}</p>
                </div>
              </div>
              
              <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                    <Save className="h-4 w-4 mr-2" />
                    Save Template
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Save Template</DialogTitle>
                    <DialogDescription>
                      Give your template a name and description to save it for future use.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Template Name *</Label>
                      <Input
                        id="name"
                        placeholder="e.g., KYC Verification Form"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what this template is used for..."
                        value={templateDescription}
                        onChange={(e) => setTemplateDescription(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        defaultValue={activeCategory}
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveTemplate}>
                      Save Template
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <ul className="space-y-3 mb-6">
              {result.fields.map((field, index) => (
                <li key={index} className="flex items-start gap-4 text-base text-gray-700 group/item hover:text-gray-900 transition-all duration-150 p-3 rounded-xl hover:bg-blue-50/50 hover:scale-[1.01] hover:-translate-x-1">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 border border-blue-500 flex items-center justify-center text-blue-600 text-xs font-bold shadow-md">{index + 1}</span>
                  <span className="font-medium pt-0.5">{field}</span>
                </li>
              ))}
            </ul>

            {/* Chat Interface */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Sparkles className="h-4 w-4 text-blue-600" />
                Continue conversation to refine template
              </div>
              
              {/* Chat Messages */}
              {chatMessages.length > 0 && (
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "flex gap-3 p-3 rounded-xl",
                        msg.role === "user"
                          ? "bg-blue-50 ml-8"
                          : "bg-gray-50 mr-8"
                      )}
                    >
                      <div className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                      )}>
                        {msg.role === "user" ? "U" : <Sparkles className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 text-sm text-gray-700 pt-1">
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Chat Input */}
              <div className="flex items-center gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleChatSend()}
                  placeholder="Ask to modify fields, add requirements, etc..."
                  className="flex-1"
                  disabled={isChatLoading}
                />
                <Button
                  onClick={handleChatSend}
                  disabled={!chatInput.trim() || isChatLoading}
                  size="icon"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isChatLoading ? (
                    <Sparkles className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center px-4 flex items-center justify-center gap-2">
        <Sparkles className="h-3 w-3 text-gray-400" />
        AI can make mistakes. Please review generated content carefully.
      </p>
    </div>
  );
};
