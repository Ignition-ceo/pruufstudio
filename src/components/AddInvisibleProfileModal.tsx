import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Mock templates
const mockTemplates = [
  { id: "1", name: "University Diploma" },
  { id: "2", name: "Professional Certificate" },
  { id: "3", name: "Training Completion" },
  { id: "4", name: "Employment Certificate" },
  { id: "5", name: "Course Credential" },
];

interface AddInvisibleProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddInvisibleProfileModal = ({
  open,
  onOpenChange,
}: AddInvisibleProfileModalProps) => {
  const { toast } = useToast();
  const [profileName, setProfileName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [printerHint, setPrinterHint] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setProfileName("");
    setSelectedTemplate("");
    setPrinterHint("");
    setIsActive(true);
  };

  const handleSave = async () => {
    if (!profileName.trim()) {
      toast({
        title: "Profile name required",
        description: "Please enter a name for this Invisible Issuance profile.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedTemplate) {
      toast({
        title: "Template required",
        description: "Please select a Smart Doc Template for this profile.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Profile created",
      description: `"${profileName}" has been configured for Invisible Issuance.`,
    });

    setIsSubmitting(false);
    resetForm();
    onOpenChange(false);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] bg-card border border-border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-foreground">
              Add Invisible Issuance Profile
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8 rounded-full hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-5">
          {/* Profile Name */}
          <div className="space-y-2">
            <Label htmlFor="profileName" className="text-sm font-medium text-foreground">
              Profile Name
            </Label>
            <Input
              id="profileName"
              placeholder="e.g., HR Onboarding Letters"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="h-11 rounded-lg border-border bg-background hover:border-primary/50 focus:border-primary transition-colors"
            />
          </div>

          {/* Smart Doc Template */}
          <div className="space-y-2">
            <Label htmlFor="template" className="text-sm font-medium text-foreground">
              Smart Doc Template
            </Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger className="h-11 rounded-lg border-border bg-background hover:border-primary/50 focus:border-primary transition-colors">
                <SelectValue placeholder="Select a template..." />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-50">
                {mockTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Printer/Source Hint */}
          <div className="space-y-2">
            <Label htmlFor="printerHint" className="text-sm font-medium text-foreground">
              Printer/Source Hint{" "}
              <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="printerHint"
              placeholder="e.g., HR Department Printer"
              value={printerHint}
              onChange={(e) => setPrinterHint(e.target.value)}
              className="h-11 rounded-lg border-border bg-background hover:border-primary/50 focus:border-primary transition-colors"
            />
            <p className="text-xs text-muted-foreground">
              A label to help identify the source system or printer for this profile
            </p>
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="active" className="text-sm font-medium text-foreground">
                Active
              </Label>
              <p className="text-xs text-muted-foreground">
                Enable this profile to start issuing Smart Docs automatically
              </p>
            </div>
            <Switch
              id="active"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-border flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="rounded-full h-10 px-5 border-border hover:bg-muted"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSubmitting}
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-10 px-6"
          >
            {isSubmitting ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
