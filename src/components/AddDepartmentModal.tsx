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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddDepartmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    code?: string;
    description?: string;
    type: string;
    active: boolean;
  }) => void;
  editData?: {
    name: string;
    code?: string;
    description?: string;
    type: string;
    active: boolean;
  } | null;
}

export function AddDepartmentModal({
  open,
  onOpenChange,
  onSubmit,
  editData,
}: AddDepartmentModalProps) {
  const [name, setName] = useState(editData?.name || "");
  const [code, setCode] = useState(editData?.code || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [type, setType] = useState(editData?.type || "Custom");
  const [active, setActive] = useState(editData?.active ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), code: code.trim() || undefined, description: description.trim() || undefined, type, active });
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setCode("");
    setDescription("");
    setType("Custom");
    setActive(true);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) resetForm();
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {editData ? "Edit Department" : "Add Department"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="dept-name">
              Department Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="dept-name"
              placeholder="e.g. Human Resources"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dept-code">Internal Code</Label>
            <Input
              id="dept-code"
              placeholder="e.g. HR-001"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dept-type">Department Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Registrar">Registrar</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Admissions">Admissions</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dept-desc">Description</Label>
            <Textarea
              id="dept-desc"
              placeholder="Brief description of this department's role..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="dept-active">Active</Label>
              <p className="text-sm text-muted-foreground">
                Enable this department for issuance
              </p>
            </div>
            <Switch
              id="dept-active"
              checked={active}
              onCheckedChange={setActive}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              {editData ? "Save Changes" : "Create Department"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
