import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";

interface IndividualIssuanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock templates for demonstration
const mockTemplates = [
  { id: "1", name: "University Diploma" },
  { id: "2", name: "Professional Certificate" },
  { id: "3", name: "Training Completion" },
  { id: "4", name: "Employment Verification" },
];

export const IndividualIssuanceModal = ({
  open,
  onOpenChange,
}: IndividualIssuanceModalProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [recipientIdentifier, setRecipientIdentifier] = useState("");
  const [optionalLabel, setOptionalLabel] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTemplate || !recipientIdentifier) {
      toast({
        title: "Missing fields",
        description: "Please select a template and enter a recipient identifier.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Smart Doc Issued",
      description: `Successfully issued Smart Doc to recipient`,
    });

    // Reset form and close modal
    setSelectedTemplate("");
    setRecipientIdentifier("");
    setOptionalLabel("");
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const handleClose = () => {
    setSelectedTemplate("");
    setRecipientIdentifier("");
    setOptionalLabel("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border border-border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-xl font-semibold text-foreground">
              Issue Smart Doc
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Template Select */}
          <div className="space-y-2">
            <Label htmlFor="template" className="text-sm font-medium text-foreground">
              Smart Doc Template
            </Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger
                id="template"
                className="w-full h-11 rounded-lg border-border bg-background hover:border-muted-foreground/30 transition-colors"
              >
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border rounded-lg">
                {mockTemplates.map((template) => (
                  <SelectItem
                    key={template.id}
                    value={template.id}
                    className="cursor-pointer rounded-md"
                  >
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Recipient Identifier */}
          <div className="space-y-2">
            <Label htmlFor="recipient" className="text-sm font-medium text-foreground">
              Recipient Identifier
            </Label>
            <Input
              id="recipient"
              type="text"
              placeholder="Email or Unique ID (DID)"
              value={recipientIdentifier}
              onChange={(e) => setRecipientIdentifier(e.target.value)}
              className="h-11 rounded-lg border-border bg-background hover:border-muted-foreground/30 focus:border-primary transition-colors"
            />
            <p className="text-xs text-muted-foreground">
              Enter the recipient's email address or decentralized identifier
            </p>
          </div>

          {/* Optional Label */}
          <div className="space-y-2">
            <Label htmlFor="label" className="text-sm font-medium text-foreground">
              Label / Tag
              <span className="text-muted-foreground font-normal ml-1">(optional)</span>
            </Label>
            <Input
              id="label"
              type="text"
              placeholder="e.g., Class of 2024"
              value={optionalLabel}
              onChange={(e) => setOptionalLabel(e.target.value)}
              className="h-11 rounded-lg border-border bg-background hover:border-muted-foreground/30 focus:border-primary transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 h-11 rounded-full border-border text-foreground hover:bg-muted/50 font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedTemplate || !recipientIdentifier || isSubmitting}
              className="flex-1 h-11 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium disabled:opacity-50"
            >
              {isSubmitting ? "Issuing..." : "Issue Smart Doc"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
