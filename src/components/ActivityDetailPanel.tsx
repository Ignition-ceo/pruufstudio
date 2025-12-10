import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  FileText,
  Clock,
  User,
  Building2,
  Layers,
  ExternalLink,
} from "lucide-react";

interface ActivityEvent {
  id: string;
  timestamp: Date;
  event: string;
  source: string;
  department: string;
  actor: string;
  status: "success" | "failed" | "in_progress" | "warning";
  metadata: {
    job_id?: string;
    template_id?: string;
    template_name?: string;
    smartdoc_name?: string;
    treap_profile?: string;
    channel?: string;
    duration_ms?: number;
    error_message?: string;
    records_processed?: number;
  };
}

interface ActivityDetailPanelProps {
  event: ActivityEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatTimestamp(date: Date): string {
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function getStatusBadge(status: ActivityEvent["status"]) {
  const config = {
    success: { label: "Success", className: "bg-green-100 text-green-700 hover:bg-green-100" },
    failed: { label: "Failed", className: "bg-red-100 text-red-700 hover:bg-red-100" },
    in_progress: { label: "In Progress", className: "bg-blue-100 text-blue-700 hover:bg-blue-100" },
    warning: { label: "Warning", className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" },
  };
  return config[status];
}

export function ActivityDetailPanel({
  event,
  open,
  onOpenChange,
}: ActivityDetailPanelProps) {
  if (!event) return null;

  const statusConfig = getStatusBadge(event.status);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-xl font-semibold pr-8">
            {event.event}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Status Badge */}
          <Badge className={statusConfig.className}>{statusConfig.label}</Badge>

          {/* Key Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Timestamp</p>
                <p className="font-medium">{formatTimestamp(event.timestamp)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Actor</p>
                <p className="font-medium">{event.actor}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium">{event.department}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Source Module</p>
                <p className="font-medium">{event.source}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Related Objects */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Related Objects</h4>
            <div className="space-y-2">
              {event.metadata.template_name && (
                <Link
                  to={`/templates/${event.metadata.template_id || "1"}`}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Template: {event.metadata.template_name}</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              )}

              {event.metadata.smartdoc_name && (
                <Link
                  to="/smartdocs/documents"
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Smart Doc: {event.metadata.smartdoc_name}</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              )}

              {event.metadata.treap_profile && (
                <Link
                  to="/issuance/treap"
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">TREAP Profile: {event.metadata.treap_profile}</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              )}

              {event.metadata.job_id && (
                <Link
                  to="/issuance/jobs"
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Issuance Job: {event.metadata.job_id}</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              )}
            </div>
          </div>

          <Separator />

          {/* Technical Metadata */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Technical Details</h4>
            <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-2">
              {event.metadata.job_id && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">job_id</span>
                  <span className="font-mono">{event.metadata.job_id}</span>
                </div>
              )}
              {event.metadata.template_id && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">template_id</span>
                  <span className="font-mono">{event.metadata.template_id}</span>
                </div>
              )}
              {event.metadata.channel && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">channel</span>
                  <span className="font-mono">{event.metadata.channel}</span>
                </div>
              )}
              {event.metadata.records_processed !== undefined && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">records_processed</span>
                  <span className="font-mono">{event.metadata.records_processed}</span>
                </div>
              )}
              {event.metadata.duration_ms !== undefined && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">duration_ms</span>
                  <span className="font-mono">{event.metadata.duration_ms}</span>
                </div>
              )}
              {event.metadata.error_message && (
                <div className="flex flex-col gap-1 text-sm pt-2 border-t border-border">
                  <span className="text-red-600">error_message</span>
                  <span className="font-mono text-red-600 text-xs break-all">
                    {event.metadata.error_message}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
