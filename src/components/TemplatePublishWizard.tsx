import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, FileText, Rocket, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const categories = [
  "Identity / KYC", "Education", "Employment / HR", "Financial",
  "Government", "Travel", "Healthcare", "Other",
];

interface FieldSummary {
  name: string;
  type: string;
  required: boolean;
}

interface TemplatePublishWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultName?: string;
  fields?: FieldSummary[];
}

export function TemplatePublishWizard({ open, onOpenChange, defaultName = "", fields = [] }: TemplatePublishWizardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  // Step 1
  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [version, setVersion] = useState("1.0");

  // Step 3
  const [publishMode, setPublishMode] = useState<"draft" | "publish">("publish");
  const [isPublishing, setIsPublishing] = useState(false);

  const [jsonOpen, setJsonOpen] = useState(false);

  const jsonPreview = JSON.stringify({
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    type: ["VerifiableCredential", name.replace(/\s+/g, "") || "Template"],
    credentialSubject: Object.fromEntries(fields.map((f) => [f.name.replace(/\s+/g, "_").toLowerCase(), f.type])),
  }, null, 2);

  const handlePublish = () => {
    if (!name.trim()) return;
    setIsPublishing(true);
    setTimeout(() => {
      const mockId = `tpl-${Date.now()}`;
      toast({
        title: publishMode === "publish" ? "Template published!" : "Template saved as draft",
        description: `"${name}" v${version} is now ${publishMode === "publish" ? "available for issuance" : "saved"}.`,
      });
      onOpenChange(false);
      navigate(`/templates/${mockId}`);
    }, 600);
  };

  const canProceed = step === 1 ? name.trim().length > 0 : true;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Publish Template</DialogTitle>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                s < step ? "bg-primary text-primary-foreground" : s === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {s < step ? <Check className="h-3.5 w-3.5" /> : s}
              </div>
              <span className={cn("text-xs font-medium hidden sm:inline", s === step ? "text-foreground" : "text-muted-foreground")}>
                {s === 1 ? "Details" : s === 2 ? "Review" : "Publish"}
              </span>
              {s < 3 && <div className="w-8 h-px bg-border" />}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Template name *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. KYC Verification Form" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this template used for?" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Version</Label>
                <Input value={version} onChange={(e) => setVersion(e.target.value)} placeholder="1.0" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{fields.length} fields defined</p>
            <div className="rounded-xl border border-border divide-y max-h-52 overflow-y-auto">
              {fields.map((f, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5 text-sm">
                  <span className="font-medium">{f.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="capitalize text-xs">{f.type}</Badge>
                    {f.required && <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Required</Badge>}
                  </div>
                </div>
              ))}
              {fields.length === 0 && <div className="px-4 py-6 text-center text-sm text-muted-foreground">No fields defined</div>}
            </div>

            <Collapsible open={jsonOpen} onOpenChange={setJsonOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground">
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", jsonOpen && "rotate-180")} />
                  View JSON-LD preview
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <pre className="mt-2 rounded-lg bg-muted p-4 text-xs overflow-x-auto font-mono">{jsonPreview}</pre>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="rounded-xl border border-border p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">{name}</p>
                <p className="text-xs text-muted-foreground">v{version} · {fields.length} fields · {category || "Uncategorized"}</p>
              </div>
              <Badge variant="secondary">{category || "Other"}</Badge>
            </div>

            <RadioGroup value={publishMode} onValueChange={(v) => setPublishMode(v as "draft" | "publish")} className="grid grid-cols-2 gap-3">
              <label className={cn(
                "flex flex-col items-center gap-2 rounded-xl border-2 p-5 cursor-pointer transition-all",
                publishMode === "draft" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              )}>
                <RadioGroupItem value="draft" className="sr-only" />
                <FileText className="h-6 w-6 text-muted-foreground" />
                <span className="font-medium text-sm">Save as draft</span>
                <span className="text-xs text-muted-foreground text-center">Not available for issuance yet</span>
              </label>
              <label className={cn(
                "flex flex-col items-center gap-2 rounded-xl border-2 p-5 cursor-pointer transition-all",
                publishMode === "publish" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              )}>
                <RadioGroupItem value="publish" className="sr-only" />
                <Rocket className="h-6 w-6 text-primary" />
                <span className="font-medium text-sm">Publish & activate</span>
                <span className="text-xs text-muted-foreground text-center">Immediately available for issuance</span>
              </label>
            </RadioGroup>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={() => step === 1 ? onOpenChange(false) : setStep(step - 1)} className="rounded-full">
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)} disabled={!canProceed} className="rounded-full">Continue</Button>
          ) : (
            <Button onClick={handlePublish} disabled={isPublishing} className="rounded-full">
              {isPublishing ? "Publishing…" : publishMode === "publish" ? "Publish template" : "Save draft"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
