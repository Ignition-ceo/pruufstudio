import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Upload, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { CSVUploadWizard } from "@/components/CSVUploadWizard";

// Mock data for templates
const mockTemplates = [
  { id: "1", name: "University Diploma" },
  { id: "2", name: "Professional Certificate" },
  { id: "3", name: "Training Completion" },
  { id: "4", name: "Course Credential" },
];

// Mock data for data sources
const mockDataSources = [
  { id: "1", name: "Spring 2024 Graduates" },
  { id: "2", name: "Q1 Training Cohort" },
  { id: "3", name: "Certification Batch A" },
];

// Mock data for recent jobs
const mockJobs = [
  {
    id: "JOB-2024-001",
    template: "University Diploma",
    dataSource: "Spring 2024 Graduates",
    records: 245,
    status: "completed",
    createdAt: "2024-12-08T14:30:00Z",
  },
  {
    id: "JOB-2024-002",
    template: "Professional Certificate",
    dataSource: "Q1 Training Cohort",
    records: 89,
    status: "processing",
    createdAt: "2024-12-08T10:15:00Z",
  },
  {
    id: "JOB-2024-003",
    template: "Training Completion",
    dataSource: "Certification Batch A",
    records: 156,
    status: "pending",
    createdAt: "2024-12-07T16:45:00Z",
  },
  {
    id: "JOB-2024-004",
    template: "Course Credential",
    dataSource: "Winter Workshop",
    records: 32,
    status: "failed",
    createdAt: "2024-12-06T09:20:00Z",
  },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  completed: { label: "Completed", variant: "default" },
  processing: { label: "Processing", variant: "secondary" },
  pending: { label: "Pending", variant: "outline" },
  failed: { label: "Failed", variant: "destructive" },
};

const CSVUploadIssuance = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedDataSource, setSelectedDataSource] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const filteredJobs = mockJobs.filter((job) => {
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.template.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.dataSource.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
          <span className="text-foreground font-medium">CSV Upload & Issue</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
            CSV Upload & Issue
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Use CSV datasets to issue Smart Doc credentials to cohorts, classes, or batches
          </p>
        </div>

        {/* New Issuance Card */}
        <Card className="bg-card border border-border rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground">
              Start a new CSV issuance job
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Template Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Select Smart Doc Template
                </label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="h-11 rounded-lg border-border bg-background hover:border-primary/50 focus:border-primary transition-colors">
                    <SelectValue placeholder="Choose a template..." />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border z-50">
                    {mockTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Data Source Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Existing Data Source{" "}
                  <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <Select value={selectedDataSource} onValueChange={setSelectedDataSource}>
                  <SelectTrigger className="h-11 rounded-lg border-border bg-background hover:border-primary/50 focus:border-primary transition-colors">
                    <SelectValue placeholder="Choose existing data source..." />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border z-50">
                    {mockDataSources.map((source) => (
                      <SelectItem key={source.id} value={source.id}>
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => setIsWizardOpen(true)}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-11 px-6"
              >
                <Upload className="w-4 h-4 mr-2" />
                New CSV Upload
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Jobs Table */}
        <Card className="bg-card border border-border rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-lg font-semibold text-foreground">
                Recent CSV Issuance Jobs
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-10 w-full sm:w-[200px] rounded-lg border-border bg-background"
                  />
                </div>
                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-10 w-full sm:w-[140px] rounded-lg border-border bg-background">
                    <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border z-50">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-medium">Job ID</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Smart Doc Template</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Data Source</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-right">Records</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow
                      key={job.id}
                      className="border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <TableCell className="font-mono text-sm text-foreground">
                        {job.id}
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
                  ))}
                  {filteredJobs.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No jobs found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-3">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-xl border border-border bg-background hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-mono text-sm text-foreground">{job.id}</span>
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
              ))}
              {filteredJobs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No jobs found matching your criteria
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CSV Upload Wizard Modal */}
      <CSVUploadWizard
        open={isWizardOpen}
        onOpenChange={setIsWizardOpen}
        selectedTemplate={selectedTemplate}
      />
    </div>
  );
};

export default CSVUploadIssuance;
