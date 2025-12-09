import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Search, FileText, Printer, Inbox } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for all issuance jobs
const mockJobs = [
  {
    id: "JOB-2024-001",
    source: "csv",
    template: "University Diploma",
    dataSource: "Spring 2024 Graduates",
    records: 245,
    status: "completed",
    createdAt: "2024-12-09T14:30:00Z",
  },
  {
    id: "TREAP-2024-001",
    source: "treap",
    template: "Employment Certificate",
    dataSource: "HR Onboarding Letters",
    records: 1,
    status: "completed",
    createdAt: "2024-12-09T12:15:00Z",
  },
  {
    id: "JOB-2024-002",
    source: "csv",
    template: "Professional Certificate",
    dataSource: "Q1 Training Cohort",
    records: 89,
    status: "processing",
    createdAt: "2024-12-09T10:00:00Z",
  },
  {
    id: "TREAP-2024-002",
    source: "treap",
    template: "University Diploma",
    dataSource: "Academic Transcripts",
    records: 1,
    status: "completed",
    createdAt: "2024-12-09T09:45:00Z",
  },
  {
    id: "JOB-2024-003",
    source: "csv",
    template: "Training Completion",
    dataSource: "Certification Batch A",
    records: 156,
    status: "pending",
    createdAt: "2024-12-08T16:45:00Z",
  },
  {
    id: "TREAP-2024-003",
    source: "treap",
    template: "Employment Certificate",
    dataSource: "HR Onboarding Letters",
    records: 1,
    status: "processing",
    createdAt: "2024-12-08T14:20:00Z",
  },
  {
    id: "JOB-2024-004",
    source: "csv",
    template: "Course Credential",
    dataSource: "Winter Workshop",
    records: 32,
    status: "failed",
    createdAt: "2024-12-07T09:20:00Z",
  },
  {
    id: "TREAP-2024-004",
    source: "treap",
    template: "Training Completion",
    dataSource: "Training Certificates",
    records: 1,
    status: "failed",
    createdAt: "2024-12-06T11:30:00Z",
  },
];

const sourceConfig: Record<string, { label: string; icon: typeof FileText }> = {
  csv: { label: "CSV Upload", icon: FileText },
  treap: { label: "Invisible Issuance", icon: Printer },
};

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  completed: { label: "Completed", variant: "default" },
  processing: { label: "Processing", variant: "secondary" },
  pending: { label: "Pending", variant: "outline" },
  failed: { label: "Failed", variant: "destructive" },
};

const IssuanceJobs = () => {
  const [sourceFilter, setSourceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSource = sourceFilter === "all" || job.source === sourceFilter;
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.template.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSource && matchesStatus && matchesSearch;
  });

  // Calculate today's issued count
  const today = new Date().toDateString();
  const todayIssuedCount = mockJobs
    .filter((job) => {
      const jobDate = new Date(job.createdAt).toDateString();
      return jobDate === today && job.status === "completed";
    })
    .reduce((sum, job) => sum + job.records, 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-hero-bg">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/issuance" className="hover:text-foreground transition-colors">
            Issuance Center
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Issuance Jobs</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
            Issuance Jobs
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Track all Smart Doc issuance activity across CSV and Invisible Issuance
          </p>
        </div>

        {/* Filter Bar */}
        <Card className="bg-card border border-border rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-8">
          <CardContent className="py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Source Filter */}
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger className="h-10 w-full sm:w-[180px] rounded-lg border-border bg-background">
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border z-50">
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="csv">CSV Upload</SelectItem>
                    <SelectItem value="treap">Invisible Issuance</SelectItem>
                  </SelectContent>
                </Select>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-10 w-full sm:w-[160px] rounded-lg border-border bg-background">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border z-50">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search Job ID or Template..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-10 w-full sm:w-[240px] rounded-lg border-border bg-background"
                  />
                </div>
              </div>

              {/* Summary Text */}
              <div className="text-sm text-muted-foreground">
                Today:{" "}
                <span className="font-semibold text-foreground">
                  {todayIssuedCount.toLocaleString()}
                </span>{" "}
                Smart Docs issued
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Table */}
        <Card className="bg-card border border-border rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground">
              All Issuance Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredJobs.length > 0 ? (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground font-medium">Job ID</TableHead>
                        <TableHead className="text-muted-foreground font-medium">Source</TableHead>
                        <TableHead className="text-muted-foreground font-medium">Smart Doc Template</TableHead>
                        <TableHead className="text-muted-foreground font-medium">Data Source</TableHead>
                        <TableHead className="text-muted-foreground font-medium text-right">Records</TableHead>
                        <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                        <TableHead className="text-muted-foreground font-medium">Created At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJobs.map((job) => {
                        const SourceIcon = sourceConfig[job.source].icon;
                        return (
                          <TableRow
                            key={job.id}
                            className="border-border hover:bg-muted/50 transition-colors cursor-pointer"
                          >
                            <TableCell className="font-mono text-sm text-foreground">
                              {job.id}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <SourceIcon className="w-4 h-4" />
                                <span className="text-sm">{sourceConfig[job.source].label}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-foreground">{job.template}</TableCell>
                            <TableCell className="text-muted-foreground">{job.dataSource}</TableCell>
                            <TableCell className="text-right text-foreground">
                              {job.records.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge variant={statusConfig[job.status].variant}>
                                {statusConfig[job.status].label}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {formatDate(job.createdAt)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card Layout */}
                <div className="md:hidden space-y-3">
                  {filteredJobs.map((job) => {
                    const SourceIcon = sourceConfig[job.source].icon;
                    return (
                      <div
                        key={job.id}
                        className="p-4 rounded-xl border border-border bg-background hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="space-y-1">
                            <span className="font-mono text-sm text-foreground block">{job.id}</span>
                            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                              <SourceIcon className="w-3 h-3" />
                              <span>{sourceConfig[job.source].label}</span>
                            </div>
                          </div>
                          <Badge variant={statusConfig[job.status].variant}>
                            {statusConfig[job.status].label}
                          </Badge>
                        </div>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Template</span>
                            <span className="text-foreground">{job.template}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Data Source</span>
                            <span className="text-foreground">{job.dataSource}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Records</span>
                            <span className="text-foreground">{job.records.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Created</span>
                            <span className="text-foreground">{formatDate(job.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-6">
                  <Inbox className="w-10 h-10 text-muted-foreground/60" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No issuance jobs yet
                </h3>
                <p className="text-sm text-muted-foreground text-center max-w-sm">
                  When you issue Smart Docs via CSV Upload or Invisible Issuance, your jobs will appear here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IssuanceJobs;
