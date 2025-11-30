import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, Upload, Grid3x3, List, Calendar, Users, Search,
  Activity, Home, Scale, GraduationCap, UserCheck, DollarSign, 
  Plane, Umbrella, LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const sectorIcons: Record<string, LucideIcon> = {
  Healthcare: Activity,
  "Real Estate": Home,
  Legal: Scale,
  Education: GraduationCap,
  KYC: UserCheck,
  Financial: DollarSign,
  Travel: Plane,
  Insurance: Umbrella,
};

const templates = [
  {
    id: 1,
    name: "Medical Consent Form",
    sector: "Healthcare",
    date: "Nov 20, 2024",
    uses: 234,
    method: "AI",
    status: "active"
  },
  {
    id: 2,
    name: "Property Lease Agreement",
    sector: "Real Estate",
    date: "Nov 20, 2024",
    uses: 189,
    method: "Vision",
    status: "active"
  },
  {
    id: 3,
    name: "Non-Disclosure Agreement",
    sector: "Legal",
    date: "Nov 20, 2024",
    uses: 412,
    method: "Manual",
    status: "active"
  },
  {
    id: 4,
    name: "Student ID Credential",
    sector: "Education",
    date: "Nov 19, 2024",
    uses: 567,
    method: "AI",
    status: "active"
  },
  {
    id: 5,
    name: "Identity Verification",
    sector: "KYC",
    date: "Nov 19, 2024",
    uses: 892,
    method: "Vision",
    status: "active"
  },
  {
    id: 6,
    name: "Bank Account Verification",
    sector: "Financial",
    date: "Nov 18, 2024",
    uses: 1203,
    method: "AI",
    status: "active"
  },
  {
    id: 7,
    name: "Visa Application",
    sector: "Travel",
    date: "Nov 18, 2024",
    uses: 345,
    method: "Manual",
    status: "active"
  },
  {
    id: 8,
    name: "Health Insurance Policy",
    sector: "Insurance",
    date: "Nov 17, 2024",
    uses: 678,
    method: "Vision",
    status: "active"
  },
  {
    id: 9,
    name: "Employment Contract",
    sector: "Legal",
    date: "Nov 17, 2024",
    uses: 456,
    method: "AI",
    status: "active"
  },
  {
    id: 10,
    name: "Degree Certificate",
    sector: "Education",
    date: "Nov 16, 2024",
    uses: 789,
    method: "Vision",
    status: "active"
  },
  {
    id: 11,
    name: "Credit Score Report",
    sector: "Financial",
    date: "Nov 16, 2024",
    uses: 234,
    method: "Manual",
    status: "active"
  },
  {
    id: 12,
    name: "Travel Insurance Certificate",
    sector: "Insurance",
    date: "Nov 15, 2024",
    uses: 178,
    method: "AI",
    status: "active"
  },
  {
    id: 13,
    name: "Property Title Deed",
    sector: "Real Estate",
    date: "Nov 15, 2024",
    uses: 92,
    method: "Vision",
    status: "active"
  },
  {
    id: 14,
    name: "Vaccination Record",
    sector: "Healthcare",
    date: "Nov 14, 2024",
    uses: 1456,
    method: "AI",
    status: "active"
  },
  {
    id: 15,
    name: "Background Check Certificate",
    sector: "KYC",
    date: "Nov 14, 2024",
    uses: 623,
    method: "Manual",
    status: "active"
  }
];

const methodColors = {
  AI: "bg-[#3B82F6] text-white hover:bg-[#3B82F6]",
  Vision: "bg-[#8B5CF6] text-white hover:bg-[#8B5CF6]",
  Manual: "bg-[#6B7280] text-white hover:bg-[#6B7280]"
};

const sectorColors: Record<string, string> = {
  Healthcare: "bg-sector-healthcare",
  "Real Estate": "bg-sector-real-estate",
  Legal: "bg-sector-legal",
  Education: "bg-sector-education",
  Financial: "bg-sector-financial",
  KYC: "bg-sector-kyc",
  Insurance: "bg-sector-insurance",
  Travel: "bg-sector-travel",
};

export default function Templates() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="container mx-auto py-6 md:py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">Templates</h1>
        <p className="text-muted-foreground">Browse, create, and manage your credential templates</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        <Button className="gap-2 bg-[#2563EB] hover:bg-[#1e40af] text-white" asChild>
          <a href="/smartdocs/create">
            <Sparkles className="w-4 h-4" />
            Create with AI
          </a>
        </Button>
        <Button variant="outline" className="gap-2 bg-white dark:bg-background border-gray-300 text-[#2563EB] hover:bg-gray-50 dark:hover:bg-accent" asChild>
          <a href="/smartdocs/create">
            <Upload className="w-4 h-4" />
            Upload Document
          </a>
        </Button>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={2} />
          <Input 
            placeholder="Search templates..." 
            className="pl-10 border-[#E5E7EB] bg-gray-50 dark:bg-background"
          />
        </div>
        
        <Select defaultValue="all-sectors">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Sectors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-sectors">All Sectors</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="real-estate">Real Estate</SelectItem>
            <SelectItem value="legal">Legal</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-types">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-types">All Types</SelectItem>
            <SelectItem value="ai">AI</SelectItem>
            <SelectItem value="vision">Vision</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-status">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        {/* View Toggle */}
        <div className="flex border border-gray-300 rounded-md bg-white dark:bg-background overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-none text-[#374151] hover:bg-gray-50 dark:hover:bg-accent",
              viewMode === "grid" && "bg-[#F3F4F6] dark:bg-accent"
            )}
            onClick={() => setViewMode("grid")}
          >
            <Grid3x3 className="w-4 h-4" strokeWidth={2} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-none border-l border-gray-300 text-[#374151] hover:bg-gray-50 dark:hover:bg-accent",
              viewMode === "list" && "bg-[#F3F4F6] dark:bg-accent"
            )}
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" strokeWidth={2} />
          </Button>
        </div>
      </div>

      {/* Template Grid */}
      <div className={cn(
        "grid gap-4",
        viewMode === "grid" 
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
          : "grid-cols-1"
      )}>
        {templates.map((template) => {
          const SectorIcon = sectorIcons[template.sector] || Activity;
          
          return (
            <Card 
              key={template.id} 
              onClick={() => navigate(`/templates/${template.id}`)}
              className="p-6 hover:shadow-[0_2px_6px_rgba(0,0,0,0.04)] transition-shadow cursor-pointer"
            >
              {/* Icon */}
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                sectorColors[template.sector] || "bg-gray-100 dark:bg-gray-900"
              )}>
                <SectorIcon className="w-6 h-6 text-foreground" strokeWidth={2} />
              </div>

              {/* Template Info */}
              <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{template.sector}</p>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" strokeWidth={2} />
                  <span>{template.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" strokeWidth={2} />
                  <span>{template.uses} users</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2">
                <Badge className={cn("text-xs font-medium border-0", methodColors[template.method as keyof typeof methodColors])}>
                  {template.method}
                </Badge>
                <Badge className={cn(
                  "text-xs font-medium border-0",
                  template.status === "active" 
                    ? "bg-[#16A34A] text-white hover:bg-[#16A34A]" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                )}>
                  {template.status}
                </Badge>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
