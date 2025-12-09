import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Printer, FileCheck, Award, Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AddInvisibleProfileModal } from "@/components/AddInvisibleProfileModal";

// Mock data for profiles
const mockProfiles = [
  {
    id: "1",
    name: "HR Onboarding Letters",
    template: "Employment Certificate",
    status: "active",
    lastIssuance: "2024-12-08T14:30:00Z",
  },
  {
    id: "2",
    name: "Academic Transcripts",
    template: "University Diploma",
    status: "active",
    lastIssuance: "2024-12-07T10:15:00Z",
  },
  {
    id: "3",
    name: "Training Certificates",
    template: "Training Completion",
    status: "inactive",
    lastIssuance: "2024-11-28T16:45:00Z",
  },
];

// Mock data for recent jobs
const mockJobs = [
  {
    id: "TREAP-2024-001",
    profileName: "HR Onboarding Letters",
    template: "Employment Certificate",
    status: "completed",
    createdAt: "2024-12-08T14:30:00Z",
  },
  {
    id: "TREAP-2024-002",
    profileName: "Academic Transcripts",
    template: "University Diploma",
    status: "completed",
    createdAt: "2024-12-08T10:15:00Z",
  },
  {
    id: "TREAP-2024-003",
    profileName: "HR Onboarding Letters",
    template: "Employment Certificate",
    status: "processing",
    createdAt: "2024-12-07T16:45:00Z",
  },
  {
    id: "TREAP-2024-004",
    profileName: "Training Certificates",
    template: "Training Completion",
    status: "failed",
    createdAt: "2024-12-06T09:20:00Z",
  },
];

const profileStatusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  inactive: { label: "Inactive", className: "bg-muted text-muted-foreground border-border" },
};

const jobStatusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  completed: { label: "Completed", variant: "default" },
  processing: { label: "Processing", variant: "secondary" },
  pending: { label: "Pending", variant: "outline" },
  failed: { label: "Failed", variant: "destructive" },
};

const InvisibleIssuance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProfiles = mockProfiles.filter((profile) =>
    searchQuery === "" ||
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.template.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <span className="text-foreground font-medium">Invisible Issuance (TREAP)</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
            Invisible Issuance (TREAP)
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Issue Smart Docs automatically whenever you print via the PRUUF virtual printer
          </p>
        </div>

        {/* 3-Step Visual Flow Panel */}
        <Card className="bg-card border border-border rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-8">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              {/* Step 1 */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Printer className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Step 1</p>
                  <p className="text-sm font-medium text-foreground">Print from existing system</p>
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-5 h-5 text-muted-foreground hidden sm:block" />
              <div className="w-6 h-px bg-border sm:hidden" />

              {/* Step 2 */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Step 2</p>
                  <p className="text-sm font-medium text-foreground">TREAP captures & extracts</p>
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-5 h-5 text-muted-foreground hidden sm:block" />
              <div className="w-6 h-px bg-border sm:hidden" />

              {/* Step 3 */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Step 3</p>
                  <p className="text-sm font-medium text-foreground">Smart Doc issued</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configured Profiles Table */}
        <Card className="bg-card border border-border rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-8">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-lg font-semibold text-foreground">
                Configured Invisible Issuance Profiles
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search profiles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-10 w-full sm:w-[200px] rounded-lg border-border bg-background"
                  />
                </div>
                {/* Add Profile Button */}
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-10 px-5"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Invisible Issuance Profile
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-medium">Profile Name</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Smart Doc Template</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Last Issuance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfiles.map((profile) => (
                    <TableRow
                      key={profile.id}
                      className="border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <TableCell className="font-medium text-foreground">
                        {profile.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{profile.template}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={profileStatusConfig[profile.status].className}
                        >
                          {profileStatusConfig[profile.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(profile.lastIssuance)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredProfiles.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No profiles found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-3">
              {filteredProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="p-4 rounded-xl border border-border bg-background hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-medium text-foreground">{profile.name}</span>
                    <Badge 
                      variant="outline" 
                      className={profileStatusConfig[profile.status].className}
                    >
                      {profileStatusConfig[profile.status].label}
                    </Badge>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Template</span>
                      <span className="text-foreground">{profile.template}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Issuance</span>
                      <span className="text-foreground">{formatDate(profile.lastIssuance)}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProfiles.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No profiles found matching your criteria
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Invisible Issuance Jobs Table */}
        <Card className="bg-card border border-border rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground">
              Recent Invisible Issuance Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-medium">Job ID</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Profile Name</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Smart Doc Template</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockJobs.map((job) => (
                    <TableRow
                      key={job.id}
                      className="border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <TableCell className="font-mono text-sm text-foreground">
                        {job.id}
                      </TableCell>
                      <TableCell className="text-foreground">{job.profileName}</TableCell>
                      <TableCell className="text-muted-foreground">{job.template}</TableCell>
                      <TableCell>
                        <Badge variant={jobStatusConfig[job.status].variant}>
                          {jobStatusConfig[job.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(job.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-3">
              {mockJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-xl border border-border bg-background hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-mono text-sm text-foreground">{job.id}</span>
                    <Badge variant={jobStatusConfig[job.status].variant}>
                      {jobStatusConfig[job.status].label}
                    </Badge>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Profile</span>
                      <span className="text-foreground">{job.profileName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Template</span>
                      <span className="text-foreground">{job.template}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created</span>
                      <span className="text-foreground">{formatDate(job.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Profile Modal */}
      <AddInvisibleProfileModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};

export default InvisibleIssuance;
