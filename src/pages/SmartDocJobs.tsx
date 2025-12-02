import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, RefreshCw, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";

const mockJobs = [
  { id: "JOB-001", name: "Employment Certificate Batch", status: "completed", documents: 150, created: "2024-01-15", duration: "2m 34s" },
  { id: "JOB-002", name: "Academic Transcript Import", status: "processing", documents: 89, created: "2024-01-15", duration: "1m 12s" },
  { id: "JOB-003", name: "License Renewal Set", status: "failed", documents: 45, created: "2024-01-14", duration: "0m 45s" },
  { id: "JOB-004", name: "Training Certificates", status: "completed", documents: 200, created: "2024-01-14", duration: "4m 15s" },
  { id: "JOB-005", name: "ID Card Generation", status: "queued", documents: 75, created: "2024-01-14", duration: "-" },
];

const statusConfig = {
  completed: { label: "Completed", icon: CheckCircle2, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  processing: { label: "Processing", icon: Loader2, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  failed: { label: "Failed", icon: XCircle, color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  queued: { label: "Queued", icon: Clock, color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
};

export default function SmartDocJobs() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">SmartDoc Jobs</h1>
        <p className="text-muted-foreground">
          Monitor and manage your document processing jobs
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={2} />
          <Input placeholder="Search jobs..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Jobs List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Jobs</CardTitle>
          <CardDescription>View all SmartDoc processing jobs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockJobs.map((job) => {
              const status = statusConfig[job.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              return (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${status.color}`}>
                      <StatusIcon className={`h-5 w-5 ${job.status === "processing" ? "animate-spin" : ""}`} />
                    </div>
                    <div>
                      <p className="font-medium">{job.name}</p>
                      <p className="text-sm text-muted-foreground">{job.id} • {job.documents} documents</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{job.created}</p>
                      <p className="text-sm text-muted-foreground">{job.duration}</p>
                    </div>
                    <Badge variant="outline" className={status.color}>
                      {status.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
