import { useState } from "react";
import { Plus, ChevronDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const allTypes = ["text", "number", "date", "boolean", "enum", "url", "email", "phone"];

export interface SchemaField {
  id: string;
  name: string;
  displayLabel: string;
  type: string;
  required: boolean;
  enumValues?: string[];
  validation?: string;
  description?: string;
}

interface SchemaFieldEditorProps {
  initialFields: SchemaField[];
}

export function SchemaFieldEditor({ initialFields }: SchemaFieldEditorProps) {
  const { toast } = useToast();
  const [fields, setFields] = useState<SchemaField[]>(initialFields);
  const [openId, setOpenId] = useState<string | null>(null);
  const [enumInput, setEnumInput] = useState("");

  const updateField = (id: string, updates: Partial<SchemaField>) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    if (openId === id) setOpenId(null);
  };

  const addField = () => {
    const newField: SchemaField = {
      id: `field-${Date.now()}`,
      name: "",
      displayLabel: "",
      type: "text",
      required: false,
      enumValues: [],
      validation: "",
      description: "",
    };
    setFields((prev) => [...prev, newField]);
    setOpenId(newField.id);
  };

  const addEnumValue = (fieldId: string) => {
    if (!enumInput.trim()) return;
    const field = fields.find((f) => f.id === fieldId);
    if (!field) return;
    updateField(fieldId, { enumValues: [...(field.enumValues || []), enumInput.trim()] });
    setEnumInput("");
  };

  const removeEnumValue = (fieldId: string, index: number) => {
    const field = fields.find((f) => f.id === fieldId);
    if (!field) return;
    updateField(fieldId, { enumValues: (field.enumValues || []).filter((_, i) => i !== index) });
  };

  const handleSave = () => {
    toast({ title: "Fields saved", description: `${fields.length} fields updated successfully.` });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Define the data fields that will be included in this credential
        </p>
        <Button variant="outline" size="sm" onClick={addField}>
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
      </div>

      <div className="space-y-3">
        {fields.map((field) => {
          const isOpen = openId === field.id;
          return (
            <Collapsible key={field.id} open={isOpen} onOpenChange={(o) => setOpenId(o ? field.id : null)}>
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                {/* Collapsed header */}
                <CollapsibleTrigger asChild>
                  <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-sm text-foreground">
                        {field.name || <span className="italic text-muted-foreground">Unnamed field</span>}
                      </span>
                      <Badge variant="outline" className="capitalize text-xs">{field.type}</Badge>
                      {field.required && <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Required</Badge>}
                    </div>
                    <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                  </button>
                </CollapsibleTrigger>

                {/* Expanded content */}
                <CollapsibleContent>
                  <div className="px-5 pb-5 pt-2 border-t border-border space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Field Name</Label>
                        <Input value={field.name} onChange={(e) => updateField(field.id, { name: e.target.value })} placeholder="e.g. full_name" className="h-9 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Display Label</Label>
                        <Input value={field.displayLabel} onChange={(e) => updateField(field.id, { displayLabel: e.target.value })} placeholder="e.g. Full Name" className="h-9 text-sm" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Data Type</Label>
                        <Select value={field.type} onValueChange={(v) => updateField(field.id, { type: v })}>
                          <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {allTypes.map((t) => (
                              <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-3 pt-5">
                        <Switch checked={field.required} onCheckedChange={(v) => updateField(field.id, { required: v })} />
                        <Label className="text-sm">Required</Label>
                      </div>
                    </div>

                    {/* Enum values */}
                    {field.type === "enum" && (
                      <div className="space-y-2">
                        <Label className="text-xs">Allowed Values</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {(field.enumValues || []).map((val, idx) => (
                            <Badge key={idx} variant="secondary" className="gap-1 pr-1">
                              {val}
                              <button onClick={() => removeEnumValue(field.id, idx)} className="ml-1 hover:text-destructive"><Trash2 className="h-3 w-3" /></button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            value={enumInput}
                            onChange={(e) => setEnumInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addEnumValue(field.id))}
                            placeholder="Add a value…"
                            className="h-8 text-sm flex-1"
                          />
                          <Button variant="outline" size="sm" onClick={() => addEnumValue(field.id)} className="h-8">Add</Button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label className="text-xs">Validation Rule (optional)</Label>
                      <Input value={field.validation || ""} onChange={(e) => updateField(field.id, { validation: e.target.value })} placeholder="e.g., min length 2" className="h-9 text-sm" />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Description</Label>
                      <Textarea value={field.description || ""} onChange={(e) => updateField(field.id, { description: e.target.value })} placeholder="What this field represents…" rows={2} className="text-sm" />
                    </div>

                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm" onClick={() => removeField(field.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove field
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          );
        })}
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} className="rounded-full">Save changes</Button>
      </div>
    </div>
  );
}
