import { useState, useMemo } from "react";
import {
  Search,
  Calendar,
  Filter,
  ChevronDown,
  Eye,
  FileText,
  Upload,
  UserX,
  Code,
  Building2,
  LayoutList,
  Clock,
  Award,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, isToday, isYesterday, subDays } from "date-fns";
import { ActivityDetailPanel } from "@/components/ActivityDetailPanel";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface ActivityEvent {
  id: string;
  timestamp: Date;
  event: string;
  source: string;
  department: string;
  actor: string;
  status: "success" | "failed" | "in_progress" | "warning";
  eventType: string;
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

// Mock activity data
const mockActivities: ActivityEvent[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    event: "50 Employee IDs issued via CSV",
    source: "Issuance Center",
    department: "Human Resources",
    actor: "Sarah Chen",
    status: "success",
    eventType: "CSV Batch",
    metadata: {
      job_id: "JOB-2024-001",
      template_id: "TPL-001",
      template_name: "Employee ID Card",
      channel: "csv",
      duration_ms: 12450,
      records_processed: 50,
    },
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    event: "TREAP processed 23 transcripts",
    source: "Invisible Issuance",
    department: "Office of the Registrar",
    actor: "System",
    status: "success",
    eventType: "Invisible Issuance",
    metadata: {
      treap_profile: "Academic Transcripts",
      channel: "treap",
      duration_ms: 45230,
      records_processed: 23,
    },
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    event: "New template 'Certificate of Enrollment' created",
    source: "Smart Docs",
    department: "Admissions Office",
    actor: "Michael Brown",
    status: "success",
    eventType: "Template",
    metadata: {
      template_id: "TPL-015",
      template_name: "Certificate of Enrollment",
      smartdoc_name: "Enrollment Certificate v2",
    },
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    event: "CSV batch failed: Invalid date format in row 15",
    source: "Issuance Center",
    department: "Finance Department",
    actor: "James Wilson",
    status: "failed",
    eventType: "CSV Batch",
    metadata: {
      job_id: "JOB-2024-002",
      template_id: "TPL-008",
      template_name: "Payment Receipt",
      channel: "csv",
      error_message: "Invalid date format in row 15: expected YYYY-MM-DD",
    },
  },
  {
    id: "5",
    timestamp: subDays(new Date(), 1).setHours(14, 30, 0, 0) as unknown as Date,
    event: "Organization settings updated",
    source: "Organization",
    department: "Administration",
    actor: "Admin User",
    status: "success",
    eventType: "Organization",
    metadata: {},
  },
  {
    id: "6",
    timestamp: new Date(subDays(new Date(), 1).setHours(10, 15, 0, 0)),
    event: "TREAP processing 150 degree certificates",
    source: "Invisible Issuance",
    department: "Office of the Registrar",
    actor: "System",
    status: "in_progress",
    eventType: "Invisible Issuance",
    metadata: {
      treap_profile: "Degree Certificates",
      channel: "treap",
      records_processed: 75,
    },
  },
  {
    id: "7",
    timestamp: new Date(subDays(new Date(), 2).setHours(16, 45, 0, 0)),
    event: "Template 'Student ID' archived",
    source: "Smart Docs",
    department: "Human Resources",
    actor: "Sarah Chen",
    status: "warning",
    eventType: "Template",
    metadata: {
      template_id: "TPL-003",
      template_name: "Student ID (Legacy)",
    },
  },
  {
    id: "8",
    timestamp: new Date(subDays(new Date(), 3).setHours(9, 0, 0, 0)),
    event: "API key regenerated for Dev Tools",
    source: "Dev Tools",
    department: "IT Department",
    actor: "Dev Team",
    status: "success",
    eventType: "Dev Tools",
    metadata: {},
  },
];

// Fix the Date type issue
const activities: ActivityEvent[] = mockActivities.map((a) => ({
  ...a,
  timestamp: a.timestamp instanceof Date ? a.timestamp : new Date(a.timestamp),
}));

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return format(date, "dd MMM yyyy");
}

function getStatusBadge(status: ActivityEvent["status"]) {
  const config = {
    success: { label: "Success", className: "bg-green-100 text-green-700 hover:bg-green-100", icon: CheckCircle2 },
    failed: { label: "Failed", className: "bg-red-100 text-red-700 hover:bg-red-100", icon: AlertCircle },
    in_progress: { label: "In Progress", className: "bg-blue-100 text-blue-700 hover:bg-blue-100", icon: Loader2 },
    warning: { label: "Warning", className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100", icon: AlertCircle },
  };
  return config[status];
}

function getSourceIcon(source: string) {
  switch (source) {
    case "Smart Docs":
      return FileText;
    case "Issuance Center":
      return Award;
    case "Invisible Issuance":
      return UserX;
    case "Dev Tools":
      return Code;
    case "Organization":
      return Building2;
    default:
      return FileText;
  }
}

function groupByDate(events: ActivityEvent[]) {
  const groups: { label: string; events: ActivityEvent[] }[] = [];
  const today: ActivityEvent[] = [];
  const yesterday: ActivityEvent[] = [];
  const older: ActivityEvent[] = [];

  events.forEach((event) => {
    if (isToday(event.timestamp)) {
      today.push(event);
    } else if (isYesterday(event.timestamp)) {
      yesterday.push(event);
    } else {
      older.push(event);
    }
  });

  if (today.length > 0) groups.push({ label: "Today", events: today });
  if (yesterday.length > 0) groups.push({ label: "Yesterday", events: yesterday });
  if (older.length > 0) groups.push({ label: "Older", events: older });

  return groups;
}

const departments = [
  "All Departments",
  "Human Resources",
  "Office of the Registrar",
  "Admissions Office",
  "Finance Department",
  "IT Department",
  "Administration",
];

const eventTypes = [
  "All",
  "Smart Doc",
  "Template",
  "Issuance",
  "CSV Batch",
  "Invisible Issuance",
  "Dev Tools",
  "Organization",
];

const statusOptions = ["All", "Success", "Warning", "Failed", "In Progress"];

const dateRanges = [
  { label: "Today", value: "today" },
  { label: "Last 7 days", value: "7days" },
  { label: "Last 30 days", value: "30days" },
  { label: "Custom", value: "custom" },
];

export default function Activity() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("7days");
  const [eventTypeFilter, setEventTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [viewMode, setViewMode] = useState<"table" | "timeline">("table");
  const [selectedEvent, setSelectedEvent] = useState<ActivityEvent | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      // Search filter
      if (searchQuery && !activity.event.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Event type filter
      if (eventTypeFilter !== "All" && activity.eventType !== eventTypeFilter) {
        return false;
      }
      // Status filter
      if (statusFilter !== "All" && activity.status !== statusFilter.toLowerCase().replace(" ", "_")) {
        return false;
      }
      // Department filter
      if (departmentFilter !== "All Departments" && activity.department !== departmentFilter) {
        return false;
      }
      return true;
    });
  }, [searchQuery, eventTypeFilter, statusFilter, departmentFilter]);

  const groupedActivities = useMemo(() => groupByDate(filteredActivities), [filteredActivities]);

  const handleEventClick = (event: ActivityEvent) => {
    setSelectedEvent(event);
    setDetailPanelOpen(true);
  };

  const FilterControls = () => (
    <>
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search activity…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Date Range */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="min-w-[140px] justify-between">
            <Calendar className="h-4 w-4 mr-2" />
            {dateRanges.find((r) => r.value === dateRange)?.label}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-2 space-y-1">
            {dateRanges.map((range) => (
              <Button
                key={range.value}
                variant={dateRange === range.value ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setDateRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
          {dateRange === "custom" && (
            <div className="border-t p-3">
              <CalendarComponent
                mode="range"
                selected={{ from: customDateRange.from, to: customDateRange.to }}
                onSelect={(range) => setCustomDateRange({ from: range?.from, to: range?.to })}
                className="pointer-events-auto"
              />
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* Event Type */}
      <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
        <SelectTrigger className="min-w-[160px]">
          <SelectValue placeholder="Event Type" />
        </SelectTrigger>
        <SelectContent>
          {eventTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status */}
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="min-w-[130px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Department */}
      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
        <SelectTrigger className="min-w-[180px]">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          {departments.map((dept) => (
            <SelectItem key={dept} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Activity</h1>
        <p className="text-muted-foreground">
          Audit trail of key actions across Smart Docs, Issuance Center, and Invisible Issuance
        </p>
      </div>

      {/* Filter Bar */}
      <Card className="border border-border shadow-sm">
        <CardContent className="p-4">
          {/* Desktop Filters */}
          <div className="hidden lg:flex items-center gap-3 flex-wrap">
            <FilterControls />
            {/* View Toggle */}
            <div className="ml-auto flex items-center gap-1 p-1 bg-muted rounded-lg">
              <Button
                variant={viewMode === "table" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="h-8"
              >
                <LayoutList className="h-4 w-4 mr-1.5" />
                Table
              </Button>
              <Button
                variant={viewMode === "timeline" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("timeline")}
                className="h-8"
              >
                <Clock className="h-4 w-4 mr-1.5" />
                Timeline
              </Button>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="lg:hidden space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activity…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[70vh]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date Range</label>
                      <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {dateRanges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Type</label>
                      <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" onClick={() => setMobileFiltersOpen(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            {/* View Toggle Mobile */}
            <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit">
              <Button
                variant={viewMode === "table" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="h-8"
              >
                <LayoutList className="h-4 w-4 mr-1.5" />
                Table
              </Button>
              <Button
                variant={viewMode === "timeline" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("timeline")}
                className="h-8"
              >
                <Clock className="h-4 w-4 mr-1.5" />
                Timeline
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Content */}
      {viewMode === "table" ? (
        <Card className="border border-border shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="font-medium">Time</TableHead>
                    <TableHead className="font-medium">Event</TableHead>
                    <TableHead className="font-medium hidden md:table-cell">Source</TableHead>
                    <TableHead className="font-medium hidden lg:table-cell">Department</TableHead>
                    <TableHead className="font-medium hidden sm:table-cell">Actor</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupedActivities.map((group) => (
                    <>
                      {/* Date Group Header */}
                      <TableRow key={group.label} className="bg-muted/10 hover:bg-muted/10">
                        <TableCell colSpan={7} className="py-2">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {group.label}
                          </span>
                        </TableCell>
                      </TableRow>
                      {group.events.map((activity) => {
                        const statusConfig = getStatusBadge(activity.status);
                        return (
                          <TableRow
                            key={activity.id}
                            className="hover:bg-muted/20 cursor-pointer"
                            onClick={() => handleEventClick(activity)}
                          >
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                                      {getRelativeTime(activity.timestamp)}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {format(activity.timestamp, "dd MMM yyyy, HH:mm:ss")}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell className="font-medium max-w-[300px] truncate">
                              {activity.event}
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-muted-foreground">
                              {activity.source}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell text-muted-foreground">
                              {activity.department}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-muted-foreground">
                              {activity.actor}
                            </TableCell>
                            <TableCell>
                              <Badge className={statusConfig.className}>{statusConfig.label}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEventClick(activity);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </>
                  ))}
                  {filteredActivities.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                        No activity found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Timeline View */
        <Card className="border border-border shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              {groupedActivities.map((group) => (
                <div key={group.label} className="space-y-4">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {group.label}
                  </h3>
                  <div className="space-y-3">
                    {group.events.map((activity) => {
                      const SourceIcon = getSourceIcon(activity.source);
                      const statusConfig = getStatusBadge(activity.status);
                      return (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/20 cursor-pointer transition-colors"
                          onClick={() => handleEventClick(activity)}
                        >
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <SourceIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground">{activity.event}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <span>{activity.source}</span>
                              <span>•</span>
                              <span>{activity.department}</span>
                              <span>•</span>
                              <span>{activity.actor}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                              {getRelativeTime(activity.timestamp)}
                            </span>
                            <Badge className={cn("text-xs", statusConfig.className)}>
                              {statusConfig.label}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              {filteredActivities.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No activity found matching your filters.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detail Panel */}
      <ActivityDetailPanel
        event={selectedEvent}
        open={detailPanelOpen}
        onOpenChange={setDetailPanelOpen}
      />
    </div>
  );
}
