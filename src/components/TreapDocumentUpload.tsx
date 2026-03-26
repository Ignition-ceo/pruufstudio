import { useState, useRef, DragEvent } from "react";
import { Upload, FileText, FileImage, File, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ExtractionProgress } from "@/components/ExtractionProgress";
import { TreapExtractionReview } from "@/components/TreapExtractionReview";

const mockProfiles = [
  { id: "1", name: "HR Onboarding Letters", template: "Employment Certificate" },
  { id: "2", name: "Academic Transcripts", template: "University Diploma" },
  { id: "3", name: "Training Certificates", template: "Training Completion" },
];

const acceptedTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

const fileTypeIcon = (type: string) => {
  if (type.startsWith("image/")) return <FileImage className="w-8 h-8 text-primary" />;
  if (type.includes("pdf")) return <FileText className="w-8 h-8 text-red-500" />;
  return <File className="w-8 h-8 text-primary" />;
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

interface TreapDocumentUploadProps {
  onBack: () => void;
}

export const TreapDocumentUpload = ({ onBack }: TreapDocumentUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [profileId, setProfileId] = useState("");
  const [dragging, setDragging] = useState(false);
  const [phase, setPhase] = useState<"upload" | "progress" | "review">("upload");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (acceptedTypes.includes(f.type)) setFile(f);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleExtract = () => setPhase("progress");
  const handleProgressDone = () => setPhase("review");

  if (phase === "review") {
    const profile = mockProfiles.find((p) => p.id === profileId);
    return (
      <TreapExtractionReview
        templateName={profile?.template || "Employment Certificate"}
        fileName={file?.name || "document.pdf"}
        onBack={() => setPhase("upload")}
        onDashboard={onBack}
      />
    );
  }

  if (phase === "progress") {
    return (
      <div className="space-y-6">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to dashboard
        </button>
        <ExtractionProgress onComplete={handleProgressDone} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </button>

      <div>
        <h2 className="text-xl font-semibold text-foreground">Upload document for extraction</h2>
        <p className="text-sm text-muted-foreground mt-1">Upload a document and select a profile to extract fields and issue a credential.</p>
      </div>

      <Card className="border border-border rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <CardContent className="p-6 space-y-6">
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
              dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
            }`}
          >
            <Upload className="w-10 h-10 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">Drag & drop or click to upload</p>
            <p className="text-xs text-muted-foreground">PDF, DOCX, PNG, or JPG</p>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>

          {/* File preview */}
          {file && (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
              {fileTypeIcon(file.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => setFile(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Profile selector */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Match against profile</Label>
            <Select value={profileId} onValueChange={setProfileId}>
              <SelectTrigger className="h-11 rounded-lg border-border bg-background">
                <SelectValue placeholder="Select a TREAP profile…" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-50">
                {mockProfiles.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action */}
          <Button
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-11 px-6"
            disabled={!file || !profileId}
            onClick={handleExtract}
          >
            Extract & issue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
