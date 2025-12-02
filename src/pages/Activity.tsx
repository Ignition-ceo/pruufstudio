import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, FileText, Send, Printer, AlertCircle, CheckCircle2, Clock } from "lucide-react";

const mockActivities = [
  { id: 1, type: "smartdoc", action: "Document processed", description: "Employment Certificate for John Doe", timestamp: "2 minutes ago", status: "success" },
  { id: 2, type: "issuance", action: "Credential issued", description: "Academic Transcript - Batch #124", timestamp: "15 minutes ago", status: "success" },
  { id: 3, type: "treap", action: "Print job completed", description: "50 cards printed via TREAP", timestamp: "1 hour ago", status: "success" },
  { id: 4, type: "smartdoc", action: "Processing failed", description: "Invalid document format detected", timestamp: "2 hours ago", status: "error" },
  { id: 5, type: "issuance", action: "Batch issuance started", description: "150 credentials queued", timestamp: "3 hours ago", status: "pending" },
  { id: 6, type: "treap", action: "TREAP configuration updated", description: "New print profile added", timestamp: "4 hours ago", status: "success" },
  { id: 7, type: "smartdoc", action: "Template applied", description: "Healthcare License template", timestamp: "5 hours ago", status: "success" },
  { id: 8, type: "issuance", action: "Credential revoked", description: "Employee ID #4521 revoked", timestamp: "6 hours ago", status: "warning" },
];

const typeConfig = {
  smartdoc: { icon: FileText, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  issuance: { icon: Send, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  treap: { icon: Printer, color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
};

const statusConfig = {
  success: { icon: CheckCircle2, color: "text-green-600" },
  error: { icon: AlertCircle, color: "text-red-600" },
  pending: { icon: Clock, color: "text-yellow-600" },
  warning: { icon: AlertCircle, color: "text-orange-600" },
};

export default function Activity() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Activity Log</h1>
        <p className="text-muted-foreground">
          Track all SmartDoc events, issuance logs, and TREAP operations
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={2} />
          <Input placeholder="Search activity..." className="pl-10" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="smartdoc">SmartDoc</SelectItem>
            <SelectItem value="issuance">Issuance</SelectItem>
            <SelectItem value="treap">TREAP</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Activity List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Detailed operational log of all system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActivities.map((activity) => {
              const typeInfo = typeConfig[activity.type as keyof typeof typeConfig];
              const statusInfo = statusConfig[activity.status as keyof typeof statusConfig];
              const TypeIcon = typeInfo.icon;
              const StatusIcon = statusInfo.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${typeInfo.color}`}>
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{activity.action}</p>
                        <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="capitalize">
                      {activity.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{activity.timestamp}</span>
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
