import { useState } from "react";
import { X, Upload, Plus, Trash2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Department {
  id: string;
  name: string;
  code: string;
}

interface CreateOrganizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    shortCode?: string;
    description?: string;
    departments: { name: string; code?: string }[];
  }) => void;
}

export function CreateOrganizationModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateOrganizationModalProps) {
  const [name, setName] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [description, setDescription] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addDepartment = () => {
    if (departments.length < 3) {
      setDepartments([
        ...departments,
        { id: crypto.randomUUID(), name: "", code: "" },
      ]);
    }
  };

  const removeDepartment = (id: string) => {
    setDepartments(departments.filter((d) => d.id !== id));
  };

  const updateDepartment = (
    id: string,
    field: "name" | "code",
    value: string
  ) => {
    setDepartments(
      departments.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    onSubmit({
      name: name.trim(),
      shortCode: shortCode.trim() || undefined,
      description: description.trim() || undefined,
      departments: departments
        .filter((d) => d.name.trim())
        .map((d) => ({ name: d.name.trim(), code: d.code.trim() || undefined })),
    });

    // Reset form
    setName("");
    setShortCode("");
    setDescription("");
    setLogoPreview(null);
    setDepartments([]);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setName("");
    setShortCode("");
    setDescription("");
    setLogoPreview(null);
    setDepartments([]);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) resetForm();
        onOpenChange(value);
      }}
    >
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Create Organization
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-6">
          {/* Logo Upload */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">
              Organization Logo
            </Label>
            <div
              className={cn(
                "relative border-2 border-dashed rounded-xl p-8 text-center transition-colors",
                "hover:border-primary/50 hover:bg-primary/5",
                logoPreview ? "border-primary/30 bg-primary/5" : "border-border"
              )}
            >
              {logoPreview ? (
                <div className="relative inline-block">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="h-24 w-24 object-contain rounded-xl mx-auto"
                  />
                  <button
                    type="button"
                    onClick={() => setLogoPreview(null)}
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click to upload logo
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    PNG, JPG up to 2MB
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Organization Name */}
          <div>
            <Label htmlFor="org-name" className="text-sm font-medium text-foreground">
              Organization Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="org-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter organization name"
              className="mt-1.5"
              required
            />
          </div>

          {/* Short Code */}
          <div>
            <Label htmlFor="short-code" className="text-sm font-medium text-foreground">
              Organization Short Code / Label
            </Label>
            <Input
              id="short-code"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              placeholder="e.g., ACME"
              className="mt-1.5"
            />
            <p className="text-xs text-muted-foreground mt-1">
              A brief identifier for internal reference (optional)
            </p>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-foreground">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the organization"
              className="mt-1.5 min-h-[80px] resize-none"
            />
          </div>

          {/* Initial Departments */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium text-foreground">
                Initial Departments
              </Label>
              {departments.length < 3 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addDepartment}
                  className="h-8"
                >
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Add Department
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Add up to 3 departments during setup (you can add more later)
            </p>

            {departments.length > 0 && (
              <div className="space-y-3">
                {departments.map((dept, index) => (
                  <div
                    key={dept.id}
                    className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">
                          Department Name
                        </Label>
                        <Input
                          value={dept.name}
                          onChange={(e) =>
                            updateDepartment(dept.id, "name", e.target.value)
                          }
                          placeholder="e.g., Human Resources"
                          className="mt-1 h-9"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">
                          Internal Code
                        </Label>
                        <Input
                          value={dept.code}
                          onChange={(e) =>
                            updateDepartment(dept.id, "code", e.target.value)
                          }
                          placeholder="e.g., HR"
                          className="mt-1 h-9"
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDepartment(dept.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive mt-5"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {departments.length === 0 && (
              <div className="text-center py-6 border border-dashed border-border rounded-lg">
                <Building2 className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No departments added yet
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-border">
            <Button
              type="submit"
              className="w-full"
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Organization"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
