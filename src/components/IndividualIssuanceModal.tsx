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

interface IndividualIssuanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock templates for demonstration
const mockTemplates = [
  { id: "1", name: "Certificate of Completion" },
  { id: "2", name: "Professional Certification" },
  { id: "3", name: "Course Achievement Badge" },
  { id: "4", name: "Membership Credential" },
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
      title: "Credential Issued",
      description: `Successfully issued credential to ${recipientIdentifier}`,
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
      <DialogContent className="sm:max-w-md bg-card border border-brand-grey rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Issue Credential
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Template Select */}
          <div className="space-y-2">
            <Label htmlFor="template" className="text-sm font-medium text-foreground">
              Template
            </Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger
                id="template"
                className="w-full rounded-xl border-brand-grey bg-background focus:ring-brand"
              >
                <SelectValue placeholder="Search or select a template..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-brand-grey rounded-xl">
                {mockTemplates.map((template) => (
                  <SelectItem
                    key={template.id}
                    value={template.id}
                    className="cursor-pointer hover:bg-muted"
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
              className="rounded-xl border-brand-grey bg-background focus:ring-brand"
            />
            <p className="text-xs text-muted-foreground">
              Enter the recipient's email address or decentralized identifier (DID)
            </p>
          </div>

          {/* Optional Label */}
          <div className="space-y-2">
            <Label htmlFor="label" className="text-sm font-medium text-foreground">
              Label / Tag <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="label"
              type="text"
              placeholder="e.g., Spring 2024 Cohort"
              value={optionalLabel}
              onChange={(e) => setOptionalLabel(e.target.value)}
              className="rounded-xl border-brand-grey bg-background focus:ring-brand"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 rounded-full border-brand-grey text-muted-foreground hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-full bg-brand hover:bg-brand/90 text-white font-medium"
            >
              {isSubmitting ? "Issuing..." : "Issue Credential"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
