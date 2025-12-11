import { useState } from "react";
import { Search, Filter, TrendingUp, TrendingDown, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import GeometricGlobe from "@/components/GeometricGlobe";

// Mock data for charts
const issuanceOverTimeData = [
  { date: "Nov 1", count: 45 },
  { date: "Nov 5", count: 72 },
  { date: "Nov 10", count: 58 },
  { date: "Nov 15", count: 95 },
  { date: "Nov 20", count: 110 },
  { date: "Nov 25", count: 85 },
  { date: "Nov 30", count: 128 },
  { date: "Dec 5", count: 142 },
  { date: "Dec 10", count: 115 },
];

const issuanceByDepartmentData = [
  { department: "Registrar", count: 245 },
  { department: "HR", count: 180 },
  { department: "Finance", count: 120 },
  { department: "Admissions", count: 95 },
  { department: "Alumni", count: 75 },
];

const issuanceByMethodData = [
  { name: "Individual", value: 35, color: "hsl(217, 91%, 60%)" },
  { name: "CSV Batch", value: 45, color: "hsl(262, 83%, 58%)" },
  { name: "TREAP", value: 20, color: "hsl(142, 71%, 45%)" },
];

const topTemplatesData = [
  { name: "Employee ID", count: 320 },
  { name: "Student Transcript", count: 245 },
  { name: "Diploma", count: 180 },
  { name: "Certificate", count: 145 },
  { name: "Badge", count: 98 },
];

const templatePerformanceData = [
  { name: "Employee ID Card", category: "Identity", department: "HR", issued: 320, treapJobs: 12, csvBatches: 8, lastUsed: "2 hours ago" },
  { name: "Student Transcript", category: "Academic", department: "Registrar", issued: 245, treapJobs: 8, csvBatches: 15, lastUsed: "1 day ago" },
  { name: "Graduation Diploma", category: "Academic", department: "Registrar", issued: 180, treapJobs: 3, csvBatches: 6, lastUsed: "3 days ago" },
  { name: "Course Certificate", category: "Certificate", department: "Training", issued: 145, treapJobs: 5, csvBatches: 4, lastUsed: "5 hours ago" },
  { name: "Achievement Badge", category: "Recognition", department: "HR", issued: 98, treapJobs: 2, csvBatches: 2, lastUsed: "1 week ago" },
  { name: "Work Authorization", category: "Compliance", department: "Legal", issued: 76, treapJobs: 1, csvBatches: 3, lastUsed: "2 days ago" },
  { name: "Training Completion", category: "Certificate", department: "Training", issued: 65, treapJobs: 4, csvBatches: 2, lastUsed: "4 hours ago" },
  { name: "Membership Card", category: "Identity", department: "Alumni", issued: 52, treapJobs: 1, csvBatches: 1, lastUsed: "1 week ago" },
];

const departments = ["All Departments", "Registrar", "HR", "Finance", "Admissions", "Alumni", "Training", "Legal"];
const credentialTypes = ["All Types", "Employee ID", "Student Transcript", "Diploma", "Certificate", "Badge"];

export default function Analytics() {
  const [dateRange, setDateRange] = useState("last30");
  const [department, setDepartment] = useState("all");
  const [credentialType, setCredentialType] = useState("all");
  const [issuanceMethod, setIssuanceMethod] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(templatePerformanceData.length / itemsPerPage);
  const paginatedData = templatePerformanceData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const FilterContent = () => (
    <div className="flex flex-col md:flex-row flex-wrap gap-3">
      {/* Date Range */}
      <Select value={dateRange} onValueChange={setDateRange}>
        <SelectTrigger className="w-full md:w-[160px] bg-white border-border">
          <SelectValue placeholder="Date Range" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border z-50">
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="last7">Last 7 Days</SelectItem>
          <SelectItem value="last30">Last 30 Days</SelectItem>
          <SelectItem value="last90">Last 90 Days</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>

      {/* Department */}
      <Select value={department} onValueChange={setDepartment}>
        <SelectTrigger className="w-full md:w-[160px] bg-white border-border">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border z-50">
          {departments.map((dept) => (
            <SelectItem key={dept} value={dept === "All Departments" ? "all" : dept.toLowerCase()}>
              {dept}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Credential Type */}
      <Select value={credentialType} onValueChange={setCredentialType}>
        <SelectTrigger className="w-full md:w-[180px] bg-white border-border">
          <SelectValue placeholder="Credential Type" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border z-50">
          {credentialTypes.map((type) => (
            <SelectItem key={type} value={type === "All Types" ? "all" : type.toLowerCase()}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Issuance Method */}
      <Select value={issuanceMethod} onValueChange={setIssuanceMethod}>
        <SelectTrigger className="w-full md:w-[200px] bg-white border-border">
          <SelectValue placeholder="Issuance Method" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border z-50">
          <SelectItem value="all">All Methods</SelectItem>
          <SelectItem value="individual">Individual</SelectItem>
          <SelectItem value="csv">CSV Batch</SelectItem>
          <SelectItem value="treap">Invisible Issuance (TREAP)</SelectItem>
        </SelectContent>
      </Select>

      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search analytics…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white border-border"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Organization-wide insights across Smart Docs, Issuance activity, and Invisible Issuance.
          </p>
        </div>

        {/* Filter Bar - Desktop */}
        <div className="hidden md:block bg-white border border-border rounded-xl p-4 mb-6 shadow-sm">
          <FilterContent />
        </div>

        {/* Filter Bar - Mobile */}
        <div className="md:hidden mb-6">
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full gap-2">
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown className="h-4 w-4 ml-auto" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <FilterContent />
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={() => setMobileFiltersOpen(false)}
              >
                Apply Filters
              </Button>
            </SheetContent>
          </Sheet>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-6">
          {/* Total Active Credentials */}
          <div className="relative bg-gradient-to-br from-[hsl(var(--kpi-indigo-from))] to-[hsl(var(--kpi-indigo-to))] rounded-xl px-4 py-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
            <GeometricGlobe color="#ffffff" />
            <div className="relative z-10 space-y-2">
              <p className="text-xs uppercase tracking-wide text-white/80 font-semibold">
                Total Active Credentials
              </p>
              <p className="text-2xl font-bold text-white">1,284</p>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs font-semibold">+12%</span>
              </div>
            </div>
          </div>

          {/* Credentials Issued */}
          <div className="relative bg-gradient-to-br from-[hsl(var(--kpi-pink-from))] to-[hsl(var(--kpi-pink-to))] rounded-xl px-4 py-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
            <GeometricGlobe color="#ffffff" />
            <div className="relative z-10 space-y-2">
              <p className="text-xs uppercase tracking-wide text-white/80 font-semibold">
                Issued (Selected Period)
              </p>
              <p className="text-2xl font-bold text-white">428</p>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs font-semibold">+23%</span>
              </div>
            </div>
          </div>

          {/* Smart Docs Created */}
          <div className="relative bg-gradient-to-br from-[hsl(var(--kpi-blue-from))] to-[hsl(var(--kpi-blue-to))] rounded-xl px-4 py-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
            <GeometricGlobe color="#ffffff" />
            <div className="relative z-10 space-y-2">
              <p className="text-xs uppercase tracking-wide text-white/80 font-semibold">
                Smart Docs Created
              </p>
              <p className="text-2xl font-bold text-white">56</p>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs font-semibold">+8%</span>
              </div>
            </div>
          </div>

          {/* TREAP Jobs */}
          <div className="relative bg-gradient-to-br from-[hsl(var(--kpi-violet-from))] to-[hsl(var(--kpi-violet-to))] rounded-xl px-4 py-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
            <GeometricGlobe color="#ffffff" />
            <div className="relative z-10 space-y-2">
              <p className="text-xs uppercase tracking-wide text-white/80 font-semibold">
                Invisible Issuance Jobs
              </p>
              <p className="text-2xl font-bold text-white">36</p>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs font-semibold">+15%</span>
              </div>
            </div>
          </div>

          {/* CSV Batch Success Rate */}
          <div className="relative bg-gradient-to-br from-[hsl(var(--kpi-amber-from))] to-[hsl(var(--kpi-amber-to))] rounded-xl px-4 py-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
            <GeometricGlobe color="#ffffff" />
            <div className="relative z-10 space-y-2">
              <p className="text-xs uppercase tracking-wide text-white/80 font-semibold">
                CSV Batch Success Rate
              </p>
              <p className="text-2xl font-bold text-white">98.5%</p>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs font-semibold">+2.1%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
          {/* Credentials Issued Over Time - Line Chart */}
          <div className="bg-white border border-border rounded-xl p-4 md:p-6 shadow-sm">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
              Credentials Issued Over Time
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={issuanceOverTimeData}>
                  <defs>
                    <linearGradient id="issuanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }} 
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(217, 91%, 60%)"
                    strokeWidth={2}
                    fill="url(#issuanceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Issuance by Department - Horizontal Bar Chart */}
          <div className="bg-white border border-border rounded-xl p-4 md:p-6 shadow-sm">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
              Issuance by Department
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={issuanceByDepartmentData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    type="number" 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="department" 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    width={80}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }} 
                  />
                  <Bar dataKey="count" fill="hsl(262, 83%, 58%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Issuance by Method - Donut Chart */}
          <div className="bg-white border border-border rounded-xl p-4 md:p-6 shadow-sm">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
              Issuance by Method
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issuanceByMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  >
                    {issuanceByMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }} 
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Templates by Usage - Bar Chart */}
          <div className="bg-white border border-border rounded-xl p-4 md:p-6 shadow-sm">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
              Top Templates by Usage
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topTemplatesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }} 
                  />
                  <Bar dataKey="count" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Template Performance Table */}
        <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border">
            <h3 className="text-base md:text-lg font-semibold text-foreground">
              Template Performance
            </h3>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Template Name</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Department</TableHead>
                  <TableHead className="font-semibold text-right">Issued</TableHead>
                  <TableHead className="font-semibold text-right">TREAP Jobs</TableHead>
                  <TableHead className="font-semibold text-right">CSV Batches</TableHead>
                  <TableHead className="font-semibold">Last Used</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((template, index) => (
                  <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        {template.category}
                      </span>
                    </TableCell>
                    <TableCell>{template.department}</TableCell>
                    <TableCell className="text-right font-semibold">{template.issued}</TableCell>
                    <TableCell className="text-right">{template.treapJobs}</TableCell>
                    <TableCell className="text-right">{template.csvBatches}</TableCell>
                    <TableCell className="text-muted-foreground">{template.lastUsed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-border">
            {paginatedData.map((template, index) => (
              <div key={index} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">{template.name}</h4>
                    <p className="text-sm text-muted-foreground">{template.department}</p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    {template.category}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Issued</p>
                    <p className="font-semibold">{template.issued}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">TREAP</p>
                    <p className="font-semibold">{template.treapJobs}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">CSV</p>
                    <p className="font-semibold">{template.csvBatches}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Last used: {template.lastUsed}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, templatePerformanceData.length)} of {templatePerformanceData.length} templates
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
