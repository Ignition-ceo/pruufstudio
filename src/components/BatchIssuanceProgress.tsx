import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface Credential {
  id: string;
  recipient: string;
  status: "pending" | "processing" | "success" | "failed";
  timestamp?: string;
  error?: string;
}

const mockRecipients = [
  "Alice Johnson", "Bob Martinez", "Charlie Kim", "Diana Patel", "Ethan Brown",
  "Fiona Chen", "George Wilson", "Hannah Lee", "Ibrahim Hassan", "Julia Rivera",
  "Kevin Park", "Laura Smith", "Marcus Davis", "Nina Fernandez", "Oliver Chang",
];

interface BatchIssuanceProgressProps {
  total?: number;
  templateName?: string;
  onClose: () => void;
}

export function BatchIssuanceProgress({ total = 15, templateName = "University Diploma", onClose }: BatchIssuanceProgressProps) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credential[]>(() =>
    mockRecipients.slice(0, total).map((name, i) => ({
      id: `CRED-${1000 + i}`,
      recipient: name,
      status: "pending" as const,
    }))
  );
  const [isComplete, setIsComplete] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  const processed = credentials.filter((c) => c.status === "success" || c.status === "failed");
  const succeeded = credentials.filter((c) => c.status === "success").length;
  const failed = credentials.filter((c) => c.status === "failed").length;
  const remaining = total - processed.length;
  const progress = (processed.length / total) * 100;

  useEffect(() => {
    const processingIndex = credentials.findIndex((c) => c.status === "pending");
    if (processingIndex === -1) {
      setIsComplete(true);
      return;
    }

    // Mark current as processing
    setCredentials((prev) => prev.map((c, i) => i === processingIndex ? { ...c, status: "processing" } : c));

    const timer = setTimeout(() => {
      setCredentials((prev) =>
        prev.map((c, i) => {
          if (i !== processingIndex) return c;
          const isFailed = Math.random() < 0.1; // 10% failure rate
          return {
            ...c,
            status: isFailed ? "failed" : "success",
            timestamp: new Date().toLocaleTimeString(),
            error: isFailed ? "Validation failed: missing required field" : undefined,
          };
        })
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [credentials]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [credentials]);

  const mockJobId = "JOB-2024-001";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        {isComplete ? (
          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
        ) : (
          <Loader2 className="h-6 w-6 text-primary animate-spin" />
        )}
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {isComplete ? "Issuance complete" : "Issuing credentials…"}
          </h3>
          <p className="text-sm text-muted-foreground">{templateName}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <Progress value={progress} className="h-3" />
        <p className="text-sm text-muted-foreground text-center">
          {processed.length} of {total} credentials {isComplete ? "processed" : "issued"}
        </p>
      </div>

      {/* Log */}
      <div ref={logRef} className="rounded-xl border border-border max-h-52 overflow-y-auto divide-y divide-border">
        {credentials.filter((c) => c.status !== "pending").map((cred) => (
          <div key={cred.id}>
            <div className="flex items-center justify-between px-4 py-2.5 text-sm">
              <div className="flex items-center gap-2">
                {cred.status === "processing" && <Loader2 className="h-3.5 w-3.5 text-primary animate-spin" />}
                {cred.status === "success" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                {cred.status === "failed" && <XCircle className="h-3.5 w-3.5 text-destructive" />}
                <span className="font-medium text-foreground">{cred.recipient}</span>
              </div>
              <span className="text-xs text-muted-foreground">{cred.timestamp}</span>
            </div>
            {cred.error && (
              <Collapsible>
                <CollapsibleTrigger className="px-4 pb-2 text-xs text-destructive flex items-center gap-1 hover:underline">
                  <ChevronDown className="h-3 w-3" /> Error details
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-3 text-xs text-destructive/80">{cred.error}</CollapsibleContent>
              </Collapsible>
            )}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total", value: total, color: "text-foreground" },
          { label: "Succeeded", value: succeeded, color: "text-emerald-600" },
          { label: "Failed", value: failed, color: "text-destructive" },
          { label: "Remaining", value: remaining, color: "text-muted-foreground" },
        ].map((s) => (
          <div key={s.label} className="text-center p-3 rounded-xl bg-muted/50">
            <p className={cn("text-xl font-semibold", s.color)}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      {isComplete && (
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose} className="rounded-full">Close</Button>
          <Button onClick={() => { onClose(); navigate(`/issuance/jobs/${mockJobId}`); }} className="rounded-full">
            View job details
          </Button>
        </div>
      )}
    </div>
  );
}
