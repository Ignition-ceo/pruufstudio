import { useState } from "react";
import { X, Upload, CheckCircle2, AlertCircle, FileSpreadsheet, ArrowRight, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface CSVUploadWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTemplate: string;
}

const steps = [
  { id: 1, title: "Upload CSV", description: "Select your data file" },
  { id: 2, title: "Map Columns", description: "Match fields to template" },
  { id: 3, title: "Validate", description: "Preview and verify" },
  { id: 4, title: "Confirm", description: "Start issuance" },
];

// Mock template fields
const mockTemplateFields = [
  { id: "recipient_name", name: "Recipient Name", required: true },
  { id: "recipient_id", name: "Recipient ID", required: true },
  { id: "issue_date", name: "Issue Date", required: true },
  { id: "expiry_date", name: "Expiry Date", required: false },
  { id: "grade", name: "Grade", required: false },
];

// Mock CSV columns (simulated from uploaded file)
const mockCSVColumns = [
  "Full Name",
  "Student ID",
  "Email Address",
  "Date Issued",
  "Expiration Date",
  "Final Grade",
  "Department",
];

// Mock preview data
const mockPreviewData = [
  { row: 1, status: "valid", mappedFields: 5 },
  { row: 2, status: "valid", mappedFields: 5 },
  { row: 3, status: "warning", mappedFields: 4 },
  { row: 4, status: "valid", mappedFields: 5 },
  { row: 5, status: "valid", mappedFields: 5 },
];

export const CSVUploadWizard = ({
  open,
  onOpenChange,
  selectedTemplate,
}: CSVUploadWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [columnMappings, setColumnMappings] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      setUploadedFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleMappingChange = (fieldId: string, csvColumn: string) => {
    setColumnMappings((prev) => ({
      ...prev,
      [fieldId]: csvColumn,
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = () => {
    toast({
      title: "Issuance job started",
      description: "Your CSV issuance job has been queued for processing.",
    });
    onOpenChange(false);
    resetWizard();
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setUploadedFile(null);
    setColumnMappings({});
  };

  const handleClose = () => {
    onOpenChange(false);
    resetWizard();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return uploadedFile !== null;
      case 2:
        const requiredFields = mockTemplateFields.filter((f) => f.required);
        return requiredFields.every((f) => columnMappings[f.id]);
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] bg-card border border-border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-foreground">
              CSV Upload & Issue
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8 rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 mt-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep > step.id
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <span className="font-medium">{step.id}</span>
                  <span className="hidden sm:inline">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-6 h-0.5 mx-1 ${
                      currentStep > step.id ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </DialogHeader>

        <div className="p-6 min-h-[300px]">
          {/* Step 1: Upload CSV */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Upload a CSV file containing the data for your Smart Doc issuance.
              </p>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : uploadedFile
                    ? "border-primary/50 bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {uploadedFile ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileSpreadsheet className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                      className="rounded-full"
                    >
                      Remove file
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Drop your CSV file here
                      </p>
                      <p className="text-sm text-muted-foreground">
                        or click to browse
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      style={{ position: "absolute" }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Map Columns */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Map your CSV columns to the Smart Doc Template fields.
              </p>
              <div className="space-y-3">
                {mockTemplateFields.map((field) => (
                  <div
                    key={field.id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-border bg-background"
                  >
                    <div className="flex-1">
                      <span className="font-medium text-foreground">{field.name}</span>
                      {field.required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <Select
                      value={columnMappings[field.id] || ""}
                      onValueChange={(value) => handleMappingChange(field.id, value)}
                    >
                      <SelectTrigger className="w-[200px] h-10 rounded-lg border-border bg-background">
                        <SelectValue placeholder="Select column..." />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border z-50">
                        <SelectItem value="none">— Not mapped —</SelectItem>
                        {mockCSVColumns.map((col) => (
                          <SelectItem key={col} value={col}>
                            {col}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Validate & Preview */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Review the validation results before starting the issuance job.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                  <p className="text-2xl font-semibold text-primary">245</p>
                  <p className="text-sm text-muted-foreground">Total Records</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <p className="text-2xl font-semibold text-emerald-600">242</p>
                  <p className="text-sm text-muted-foreground">Valid</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
                  <p className="text-2xl font-semibold text-amber-600">3</p>
                  <p className="text-sm text-muted-foreground">Warnings</p>
                </div>
              </div>
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="p-3 bg-muted/50 border-b border-border">
                  <span className="text-sm font-medium text-foreground">
                    Preview (first 5 rows)
                  </span>
                </div>
                <div className="divide-y divide-border">
                  {mockPreviewData.map((row) => (
                    <div
                      key={row.row}
                      className="flex items-center justify-between p-3 hover:bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        {row.status === "valid" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                        )}
                        <span className="text-sm text-foreground">Row {row.row}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {row.mappedFields} fields mapped
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 text-center">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Ready to Start Issuance
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You are about to issue Smart Docs to 245 recipients.
                </p>
                <div className="space-y-2 text-sm text-left max-w-xs mx-auto">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Template:</span>
                    <span className="text-foreground font-medium">
                      {selectedTemplate || "University Diploma"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">File:</span>
                    <span className="text-foreground font-medium">
                      {uploadedFile?.name || "data.csv"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Records:</span>
                    <span className="text-foreground font-medium">245</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-border flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="rounded-full h-10 px-5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              className="rounded-full h-10 px-5"
            >
              Cancel
            </Button>
            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-5"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleConfirm}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-5"
              >
                Start Issuance
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
