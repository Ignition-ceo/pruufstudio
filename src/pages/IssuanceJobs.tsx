import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, RefreshCw, CheckCircle2, XCircle, Loader2, Clock, Send } from "lucide-react";

const mockJobs = [
  { id: "ISS-001", name: "Employee Badges Q1", type: "Batch", count: 250, status: "completed", created: "2024-01-15 09:30", completed: "2024-01-15 09:45" },
  { id: "ISS-002", name: "Training Certificates", type: "CSV Upload", count: 89, status: "processing", created: "2024-01-15 10:00", completed: "-" },
  { id: "ISS-003", name: "Contractor Access", type: "Single", count: 1, status: "completed", created: "2024-01-15 08:15", completed: "2024-01-15 08:15" },
  { id: "ISS-004", name: "Conference Badges", type: "Batch", count: 500, status: "failed", created: "2024-01-14 14:00", completed: "2024-01-14 14:12" },
  { id: "ISS-005", name: "Student IDs", type: "CSV Upload", count: 1200, status: "queued", created: "2024-01-15 10:30", completed: "-" },
  { id: "ISS-006", name: "Vendor Passes", type: "Batch", count: 45, status: "completed", created: "2024-01-14 11:00", completed: "2024-01-14 11:05" },
];

const statusConfig = {
  completed: { label: "Completed", icon: CheckCircle2, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  processing: { label: "Processing", icon: Loader2, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  failed: { label: "Failed", icon: XCircle, color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  queued: { label: "Queued", icon: Clock, color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
};

export default function IssuanceJobs() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Issuance Jobs</h1>
        <p className="text-muted-foreground">
          Track and manage all credential issuance operations
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,245</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Loader2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Queued</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-muted-foreground">Failed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={2} />
          <Input placeholder="Search jobs..." className="pl-10" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="queued">Queued</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="batch">Batch</SelectItem>
            <SelectItem value="csv">CSV Upload</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Jobs</CardTitle>
          <CardDescription>View all credential issuance jobs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
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
                      <p className="text-sm text-muted-foreground">{job.id} • {job.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-lg font-semibold">{job.count.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Credentials</p>
                    </div>
                    <div className="text-right min-w-[140px]">
                      <p className="text-sm">{job.created}</p>
                      <p className="text-xs text-muted-foreground">{job.completed !== "-" ? `Completed: ${job.completed.split(" ")[1]}` : "In progress"}</p>
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
