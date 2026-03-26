import { useState } from "react";
import { GripVertical, X, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const dataTypes = ["text", "number", "date", "boolean", "enum"];

export interface ExtractedField {
  id: string;
  name: string;
  type: string;
  required: boolean;
  confidence?: number;
}

interface ExtractionReviewPanelProps {
  templateName: string;
  initialFields: ExtractedField[];
  showConfidence?: boolean;
  onBack: () => void;
  onContinue: (fields: ExtractedField[]) => void;
}

function confidenceBadge(score: number) {
  if (score >= 90) return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">{score}%</Badge>;
  if (score >= 70) return <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">{score}%</Badge>;
  return <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">{score}%</Badge>;
}

export function ExtractionReviewPanel({
  templateName,
  initialFields,
  showConfidence = false,
  onBack,
  onContinue,
}: ExtractionReviewPanelProps) {
  const [fields, setFields] = useState<ExtractedField[]>(initialFields);
  const [editingId, setEditingId] = useState<string | null>(null);

  const updateField = (id: string, updates: Partial<ExtractedField>) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const addField = () => {
    const newField: ExtractedField = {
      id: `new-${Date.now()}`,
      name: "",
      type: "text",
      required: false,
    };
    setFields((prev) => [...prev, newField]);
    setEditingId(newField.id);
  };

  const moveField = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= fields.length) return;
    const updated = [...fields];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setFields(updated);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">Review extracted fields</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Template:</span>
            <Badge variant="secondary" className="font-medium">{templateName}</Badge>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{fields.length} fields</span>
      </div>

      {/* Field table */}
      <div className="rounded-xl border border-border overflow-hidden bg-card">
        {/* Header row */}
        <div className={`grid gap-3 px-4 py-3 bg-muted/50 text-xs font-medium text-muted-foreground ${showConfidence ? "grid-cols-[32px_1fr_120px_80px_80px_40px_40px]" : "grid-cols-[32px_1fr_120px_80px_40px_40px]"}`}>
          <div />
          <div>Field Name</div>
          <div>Data Type</div>
          <div>Required</div>
          {showConfidence && <div>Confidence</div>}
          <div />
          <div />
        </div>

        {/* Rows */}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={`grid gap-3 px-4 py-3 items-center border-t border-border hover:bg-muted/20 transition-colors ${showConfidence ? "grid-cols-[32px_1fr_120px_80px_80px_40px_40px]" : "grid-cols-[32px_1fr_120px_80px_40px_40px]"}`}
          >
            {/* Grip + reorder */}
            <div className="flex flex-col items-center gap-0.5">
              <GripVertical className="h-4 w-4 text-muted-foreground/50" />
              <div className="flex flex-col">
                <button onClick={() => moveField(index, -1)} disabled={index === 0} className="text-muted-foreground hover:text-foreground disabled:opacity-30">
                  <ChevronUp className="h-3 w-3" />
                </button>
                <button onClick={() => moveField(index, 1)} disabled={index === fields.length - 1} className="text-muted-foreground hover:text-foreground disabled:opacity-30">
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Field name */}
            {editingId === field.id ? (
              <Input
                autoFocus
                value={field.name}
                onChange={(e) => updateField(field.id, { name: e.target.value })}
                onBlur={() => setEditingId(null)}
                onKeyDown={(e) => e.key === "Enter" && setEditingId(null)}
                className="h-8 text-sm"
              />
            ) : (
              <button
                onClick={() => setEditingId(field.id)}
                className="text-left text-sm font-medium text-foreground hover:text-primary truncate"
              >
                {field.name || <span className="text-muted-foreground italic">Click to name…</span>}
              </button>
            )}

            {/* Type */}
            <Select value={field.type} onValueChange={(v) => updateField(field.id, { type: v })}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dataTypes.map((t) => (
                  <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Required */}
            <Switch checked={field.required} onCheckedChange={(v) => updateField(field.id, { required: v })} />

            {/* Confidence */}
            {showConfidence && (
              <div>{field.confidence != null ? confidenceBadge(field.confidence) : "—"}</div>
            )}

            {/* Delete */}
            <button onClick={() => removeField(field.id)} className="text-muted-foreground hover:text-destructive transition-colors">
              <X className="h-4 w-4" />
            </button>

            <div />
          </div>
        ))}

        {/* Add field */}
        <div className="px-4 py-3 border-t border-border">
          <Button variant="ghost" size="sm" onClick={addField} className="text-primary">
            <Plus className="h-4 w-4 mr-1" />
            Add field
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="rounded-full">Back</Button>
        <Button onClick={() => onContinue(fields)} className="rounded-full">Continue to card design</Button>
      </div>
    </div>
  );
}
