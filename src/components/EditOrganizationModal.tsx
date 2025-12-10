import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditOrganizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    shortCode: string;
    category: string;
    description: string;
  }) => void;
  initialData: {
    name: string;
    shortCode: string;
    category: string;
    description: string;
  };
}

export function EditOrganizationModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: EditOrganizationModalProps) {
  const [name, setName] = useState(initialData.name);
  const [shortCode, setShortCode] = useState(initialData.shortCode);
  const [category, setCategory] = useState(initialData.category);
  const [description, setDescription] = useState(initialData.description);

  useEffect(() => {
    if (open) {
      setName(initialData.name);
      setShortCode(initialData.shortCode);
      setCategory(initialData.category);
      setDescription(initialData.description);
    }
  }, [open, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, shortCode, category, description });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Organization Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          {/* Logo Upload */}
          <div className="space-y-2">
            <Label>Organization Logo</Label>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-xl bg-muted/50 border-2 border-dashed border-border flex items-center justify-center">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <Button type="button" variant="outline" size="sm">
                  Upload Logo
                </Button>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG up to 2MB
                </p>
              </div>
            </div>
          </div>

          {/* Organization Name */}
          <div className="space-y-2">
            <Label htmlFor="edit-org-name">Organization Name *</Label>
            <Input
              id="edit-org-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Short Code */}
          <div className="space-y-2">
            <Label htmlFor="edit-short-code">Short Code / Label</Label>
            <Input
              id="edit-short-code"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              placeholder="e.g. ACME-U"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="edit-category">Organization Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
                <SelectItem value="Government">Government</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="edit-org-desc">Description</Label>
            <Textarea
              id="edit-org-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Brief description of your organization..."
            />
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
