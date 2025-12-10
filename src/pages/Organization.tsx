import { useState } from "react";
import {
  Building2,
  Copy,
  Upload,
  Plus,
  Pencil,
  Ban,
  FileText,
  Award,
  Users,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import { AddDepartmentModal } from "@/components/AddDepartmentModal";
import { toast } from "sonner";

interface Department {
  id: string;
  name: string;
  code?: string;
  type: string;
  description?: string;
  templateCount: number;
  issuedCount: number;
  active: boolean;
}

// Mock organization data
const mockOrganization = {
  id: "1",
  name: "Acme University",
  type: "University",
  logo: "",
  did: "DID:2b8f-c3a7-6e4d",
  createdAt: new Date("2024-01-15"),
  status: "Active" as const,
  shortCode: "ACME-U",
  category: "Education",
  description: "Leading institution providing world-class education and professional credentials.",
  departmentCount: 4,
  templateCount: 12,
  issuedCount: 1543,
};

const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Office of the Registrar",
    code: "REG-001",
    type: "Registrar",
    templateCount: 5,
    issuedCount: 892,
    active: true,
  },
  {
    id: "2",
    name: "Human Resources",
    code: "HR-001",
    type: "HR",
    templateCount: 3,
    issuedCount: 234,
    active: true,
  },
  {
    id: "3",
    name: "Admissions Office",
    code: "ADM-001",
    type: "Admissions",
    templateCount: 2,
    issuedCount: 312,
    active: true,
  },
  {
    id: "4",
    name: "Finance Department",
    code: "FIN-001",
    type: "Finance",
    templateCount: 2,
    issuedCount: 105,
    active: false,
  },
];

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Organization() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [copied, setCopied] = useState(false);

  // Branding state
  const [orgName, setOrgName] = useState(mockOrganization.name);
  const [shortCode, setShortCode] = useState(mockOrganization.shortCode);
  const [category, setCategory] = useState(mockOrganization.category);
  const [description, setDescription] = useState(mockOrganization.description);

  // Issuance capabilities
  const [csvIssuance, setCsvIssuance] = useState(true);
  const [invisibleIssuance, setInvisibleIssuance] = useState(true);
  const [apiAccess, setApiAccess] = useState(false);

  const copyDid = () => {
    navigator.clipboard.writeText(mockOrganization.did);
    setCopied(true);
    toast.success("DID copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddDepartment = (data: {
    name: string;
    code?: string;
    description?: string;
    type: string;
    active: boolean;
  }) => {
    const newDept: Department = {
      id: crypto.randomUUID(),
      name: data.name,
      code: data.code,
      type: data.type,
      description: data.description,
      templateCount: 0,
      issuedCount: 0,
      active: data.active,
    };
    setDepartments([...departments, newDept]);
    setIsAddModalOpen(false);
    toast.success("Department created successfully");
  };

  const handleEditDepartment = (data: {
    name: string;
    code?: string;
    description?: string;
    type: string;
    active: boolean;
  }) => {
    if (!editingDepartment) return;
    setDepartments(
      departments.map((d) =>
        d.id === editingDepartment.id
          ? { ...d, name: data.name, code: data.code, description: data.description, type: data.type, active: data.active }
          : d
      )
    );
    setEditingDepartment(null);
    toast.success("Department updated successfully");
  };

  const toggleDepartmentStatus = (id: string) => {
    setDepartments(
      departments.map((d) =>
        d.id === id ? { ...d, active: !d.active } : d
      )
    );
    toast.success("Department status updated");
  };

  const handleSaveBranding = () => {
    toast.success("Branding changes saved");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Organization
        </h1>
        <p className="text-muted-foreground">
          Manage your organization identity, departments, and branding
        </p>
      </div>

      {/* Summary Card */}
      <Card className="border border-border shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Left: Logo + Basic Info */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/10">
                {mockOrganization.logo ? (
                  <img
                    src={mockOrganization.logo}
                    alt={mockOrganization.name}
                    className="h-12 w-12 object-contain rounded-lg"
                  />
                ) : (
                  <span className="text-xl font-bold text-primary">
                    {getInitials(mockOrganization.name)}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {mockOrganization.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {mockOrganization.type} • Created on {formatDate(mockOrganization.createdAt)}
                </p>
              </div>
            </div>

            {/* Center: DID */}
            <div className="flex-1 flex flex-col items-start lg:items-center">
              <p className="text-xs text-muted-foreground mb-1.5">
                Organization Digital Identifier
              </p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={copyDid}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-muted/60 hover:bg-muted rounded-full transition-colors group"
                    >
                      <span className="font-mono text-sm text-foreground">
                        {mockOrganization.did}
                      </span>
                      {copied ? (
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Click to copy</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Right: Stats + Status */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{departments.length}</span>
                <span className="text-muted-foreground">Departments</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{mockOrganization.templateCount}</span>
                <span className="text-muted-foreground">Templates</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full text-sm">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{mockOrganization.issuedCount.toLocaleString()}</span>
                <span className="text-muted-foreground">Issued</span>
              </div>
              <Badge
                variant={mockOrganization.status === "Active" ? "default" : "secondary"}
                className={
                  mockOrganization.status === "Active"
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : ""
                }
              >
                {mockOrganization.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Departments Card */}
        <Card className="border border-border shadow-sm lg:order-1 order-1">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold">Departments</CardTitle>
            <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-1.5" />
              Add Department
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="font-medium">Department</TableHead>
                    <TableHead className="font-medium hidden sm:table-cell">Code</TableHead>
                    <TableHead className="font-medium hidden md:table-cell">Type</TableHead>
                    <TableHead className="font-medium text-center hidden sm:table-cell">Templates</TableHead>
                    <TableHead className="font-medium text-center hidden sm:table-cell">Issued</TableHead>
                    <TableHead className="font-medium text-center">Status</TableHead>
                    <TableHead className="font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.map((dept) => (
                    <TableRow key={dept.id} className="hover:bg-muted/20">
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell className="text-muted-foreground hidden sm:table-cell">
                        {dept.code || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground hidden md:table-cell">
                        {dept.type}
                      </TableCell>
                      <TableCell className="text-center hidden sm:table-cell">
                        {dept.templateCount}
                      </TableCell>
                      <TableCell className="text-center hidden sm:table-cell">
                        {dept.issuedCount}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={dept.active ? "default" : "secondary"}
                          className={
                            dept.active
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-muted text-muted-foreground"
                          }
                        >
                          {dept.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => setEditingDepartment(dept)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => toggleDepartmentStatus(dept.id)}
                                >
                                  <Ban className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {dept.active ? "Disable" : "Enable"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {departments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No departments yet. Add your first department to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Branding & Profile Card */}
        <Card className="border border-border shadow-sm lg:order-2 order-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Branding & Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label>Organization Logo</Label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-muted/50 border-2 border-dashed border-border flex items-center justify-center">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm">
                  Upload Logo
                </Button>
              </div>
            </div>

            {/* Organization Name */}
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input
                id="org-name"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>

            {/* Short Code */}
            <div className="space-y-2">
              <Label htmlFor="short-code">Short Code / Label</Label>
              <Input
                id="short-code"
                value={shortCode}
                onChange={(e) => setShortCode(e.target.value)}
                placeholder="e.g. ACME-U"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Organization Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="org-desc">Description</Label>
              <Textarea
                id="org-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Brief description of your organization..."
              />
            </div>

            <Button onClick={handleSaveBranding} className="w-full">
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Issuance Capabilities */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Issuance Capabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CSV Issuance */}
            <div className="flex items-start justify-between p-4 rounded-lg border border-border bg-muted/20">
              <div className="space-y-1 pr-4">
                <p className="font-medium text-foreground">Enable CSV Issuance</p>
                <p className="text-sm text-muted-foreground">
                  Issue credentials in bulk via CSV file upload
                </p>
              </div>
              <Switch
                checked={csvIssuance}
                onCheckedChange={setCsvIssuance}
              />
            </div>

            {/* Invisible Issuance */}
            <div className="flex items-start justify-between p-4 rounded-lg border border-border bg-muted/20">
              <div className="space-y-1 pr-4">
                <p className="font-medium text-foreground">Enable Invisible Issuance (TREAP)</p>
                <p className="text-sm text-muted-foreground">
                  Issue credentials without requiring recipient action
                </p>
              </div>
              <Switch
                checked={invisibleIssuance}
                onCheckedChange={setInvisibleIssuance}
              />
            </div>

            {/* API Access */}
            <div className="flex items-start justify-between p-4 rounded-lg border border-border bg-muted/20 opacity-60">
              <div className="space-y-1 pr-4">
                <p className="font-medium text-foreground">
                  Enable API Access{" "}
                  <Badge variant="outline" className="ml-2 text-xs">
                    Coming Soon
                  </Badge>
                </p>
                <p className="text-sm text-muted-foreground">
                  Integrate issuance via REST API
                </p>
              </div>
              <Switch checked={apiAccess} disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Department Modal */}
      <AddDepartmentModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddDepartment}
      />

      {/* Edit Department Modal */}
      <AddDepartmentModal
        open={!!editingDepartment}
        onOpenChange={(open) => !open && setEditingDepartment(null)}
        onSubmit={handleEditDepartment}
        editData={
          editingDepartment
            ? {
                name: editingDepartment.name,
                code: editingDepartment.code,
                description: editingDepartment.description,
                type: editingDepartment.type,
                active: editingDepartment.active,
              }
            : null
        }
      />
    </div>
  );
}
