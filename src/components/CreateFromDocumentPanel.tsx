import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CreateFromDocumentPanel = () => {
  return (
    <div className="w-full max-w-3xl bg-card rounded-2xl border border-border p-8 shadow-card h-[240px] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
          <Upload className="h-8 w-8 text-accent-foreground" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Upload your document</h3>
          <p className="text-muted-foreground text-sm">
            PDF, DOCX, or TXT files supported
          </p>
        </div>
        <Button size="lg" className="rounded-full">
          Choose File
        </Button>
      </div>
    </div>
  );
};
