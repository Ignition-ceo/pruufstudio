import { useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface ExtractedField {
  label: string;
  value: string;
  confidence: number;
}

const mockFields: ExtractedField[] = [
  { label: "Recipient Name", value: "Sarah J. Mitchell", confidence: 97 },
  { label: "Position", value: "Senior Product Manager", confidence: 94 },
  { label: "Department", value: "Product & Strategy", confidence: 88 },
  { label: "Start Date", value: "2021-03-15", confidence: 92 },
  { label: "End Date", value: "2024-12-01", confidence: 78 },
  { label: "Employee ID", value: "EMP-20210315", confidence: 61 },
];

const confidenceBadge = (c: number) => {
  if (c >= 90) return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 text-[10px]">{c}%</Badge>;
  if (c >= 70) return <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200 text-[10px]">{c}%</Badge>;
  return <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 text-[10px]">{c}%</Badge>;
};

interface TreapExtractionReviewProps {
  templateName: string;
  fileName: string;
  onBack: () => void;
  onDashboard: () => void;
}

export const TreapExtractionReview = ({ templateName, fileName, onBack, onDashboard }: TreapExtractionReviewProps) => {
  const { toast } = useToast();
  const [fields, setFields] = useState<ExtractedField[]>(mockFields);

  const updateField = (index: number, value: string) => {
    setFields((prev) => prev.map((f, i) => (i === index ? { ...f, value } : f)));
  };

  const handleAccept = () => {
    toast({ title: "Credential issued", description: `Credential issued to ${fields[0]?.value || "recipient"}.` });
    onDashboard();
  };

  const handleReject = () => {
    toast({ title: "Document rejected", description: "The document has been rejected." });
    onBack();
  };

  const handleSave = () => {
    toast({ title: "Saved for review", description: "The document has been saved to the manual review queue." });
    onDashboard();
  };

  // Mock document lines for the preview
  const docLines = [
    { text: "ACME CORPORATION", bold: true, size: "lg" },
    { text: "Human Resources Department", bold: false, size: "sm" },
    { text: "" },
    { text: "EMPLOYMENT CERTIFICATE", bold: true, size: "md" },
    { text: "" },
    { text: `This is to certify that ${fields[0]?.value || "—"} has been employed`, highlight: true },
    { text: `as ${fields[1]?.value || "—"} in the ${fields[2]?.value || "—"} department`, highlight: true },
    { text: `from ${fields[3]?.value || "—"} to ${fields[4]?.value || "—"}.`, highlight: true },
    { text: "" },
    { text: `Employee ID: ${fields[5]?.value || "—"}`, highlight: true },
    { text: "" },
    { text: "This certificate is issued upon request for whatever legal purpose it may serve." },
    { text: "" },
    { text: "" },
    { text: "________________________" },
    { text: "Director of Human Resources" },
  ];

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to upload
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Review extraction</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            <FileText className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />{fileName} — matched to <span className="font-medium text-foreground">{templateName}</span>
          </p>
        </div>
        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 w-fit">Template matched · 91%</Badge>
      </div>

      {/* Desktop split panel */}
      <div className="hidden md:block">
        <ResizablePanelGroup direction="horizontal" className="min-h-[480px] rounded-2xl border border-border overflow-hidden">
          {/* Document preview */}
          <ResizablePanel defaultSize={60} minSize={40}>
            <div className="h-full bg-muted/30 p-6 overflow-auto">
              <div className="bg-background border border-border rounded-lg shadow-sm p-8 max-w-[480px] mx-auto space-y-1">
                {docLines.map((line, i) => {
                  if (!line.text) return <div key={i} className="h-3" />;
                  return (
                    <p
                      key={i}
                      className={`text-sm leading-relaxed ${line.bold ? "font-bold" : ""} ${
                        line.size === "lg" ? "text-base" : line.size === "md" ? "text-sm" : "text-xs text-muted-foreground"
                      } ${line.highlight ? "bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded" : ""}`}
                    >
                      {line.text}
                    </p>
                  );
                })}
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          {/* Fields panel */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="h-full p-5 overflow-auto space-y-3">
              <p className="text-sm font-semibold text-foreground mb-2">Extracted fields</p>
              {fields.map((f, i) => (
                <div key={i} className={`flex items-center gap-2 p-2 rounded-lg border ${f.confidence < 70 ? "border-l-4 border-l-amber-400 border-border" : "border-border"}`}>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{f.label}</span>
                      {confidenceBadge(f.confidence)}
                    </div>
                    <Input
                      value={f.value}
                      onChange={(e) => updateField(i, e.target.value)}
                      className="h-8 text-sm rounded border-border"
                    />
                  </div>
                </div>
              ))}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Mobile stacked */}
      <div className="md:hidden space-y-4">
        <Card className="rounded-2xl border border-border">
          <CardContent className="p-4">
            <p className="text-sm font-semibold text-foreground mb-3">Extracted fields</p>
            <div className="space-y-3">
              {fields.map((f, i) => (
                <div key={i} className={`p-2 rounded-lg border ${f.confidence < 70 ? "border-l-4 border-l-amber-400 border-border" : "border-border"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">{f.label}</span>
                    {confidenceBadge(f.confidence)}
                  </div>
                  <Input value={f.value} onChange={(e) => updateField(i, e.target.value)} className="h-8 text-sm rounded border-border" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action bar */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button variant="outline" className="rounded-full border-destructive text-destructive hover:bg-destructive/10" onClick={handleReject}>
          Reject
        </Button>
        <Button variant="outline" className="rounded-full border-border" onClick={handleSave}>
          Save for manual review
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium sm:ml-auto">
              Accept & issue credential
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Issue credential?</AlertDialogTitle>
              <AlertDialogDescription>
                A verifiable credential will be issued to <span className="font-medium">{fields[0]?.value}</span> using the <span className="font-medium">{templateName}</span> template. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
              <AlertDialogAction className="rounded-full bg-primary" onClick={handleAccept}>Issue credential</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
