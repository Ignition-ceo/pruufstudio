import { useState } from "react";
import {
  Copy,
  Plus,
  Pencil,
  Ban,
  FileText,
  Award,
  Users,
  Check,
  Settings,
  MoreVertical,
  Search,
  CheckCircle2,
  Minus,
  UserPlus,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AddDepartmentModal } from "@/components/AddDepartmentModal";
import { EditOrganizationModal } from "@/components/EditOrganizationModal";
import { InviteTeamMemberModal, type MemberRole } from "@/components/InviteTeamMemberModal";
import { EditMemberRoleModal } from "@/components/EditMemberRoleModal";
import { ApiKeysTab } from "@/components/ApiKeysTab";
import { BillingTab } from "@/components/BillingTab";
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

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "invited" | "deactivated";
}


export default function Organization() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [isEditOrgModalOpen, setIsEditOrgModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Organization branding state
  const [orgName, setOrgName] = useState(mockOrganization.name);
  const [shortCode, setShortCode] = useState(mockOrganization.shortCode);
  const [category, setCategory] = useState(mockOrganization.category);
  const [description, setDescription] = useState(mockOrganization.description);

  // Team members
  const [members, setMembers] = useState<TeamMember[]>([
    { id: "1", name: "Alice Nguyen", email: "alice@acme.edu", role: "owner", department: "Office of the Registrar", status: "active" },
    { id: "2", name: "Brian Chowdhury", email: "brian@acme.edu", role: "admin", department: "Human Resources", status: "active" },
    { id: "3", name: "Clara Rodriguez", email: "clara@acme.edu", role: "issuer", department: "Office of the Registrar", status: "active" },
    { id: "4", name: "David Kim", email: "david@acme.edu", role: "issuer", department: "Admissions Office", status: "active" },
    { id: "5", name: "Emma Fischer", email: "emma@acme.edu", role: "viewer", department: "Finance Department", status: "active" },
    { id: "6", name: "Faisal Qureshi", email: "faisal@acme.edu", role: "issuer", department: "", status: "invited" },
    { id: "7", name: "Grace Tanaka", email: "grace@acme.edu", role: "viewer", department: "Human Resources", status: "deactivated" },
    { id: "8", name: "Hassan Ali", email: "hassan@acme.edu", role: "admin", department: "", status: "invited" },
  ]);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<{ id: string; name: string; role: MemberRole } | null>(null);
  const [teamSearch, setTeamSearch] = useState("");
  const [teamRoleFilter, setTeamRoleFilter] = useState("all");
  const [teamDeptFilter, setTeamDeptFilter] = useState("all");
  const [permissionsOpen, setPermissionsOpen] = useState(false);

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

  const handleSaveOrganization = (data: {
    name: string;
    shortCode: string;
    category: string;
    description: string;
  }) => {
    setOrgName(data.name);
    setShortCode(data.shortCode);
    setCategory(data.category);
    setDescription(data.description);
    toast.success("Organization profile updated");
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
                    alt={orgName}
                    className="h-12 w-12 object-contain rounded-lg"
                  />
                ) : (
                  <span className="text-xl font-bold text-primary">
                    {getInitials(orgName)}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {orgName}
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

            {/* Right: Stats + Status + Edit Button */}
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditOrgModalOpen(true)}
                className="ml-2"
              >
                <Settings className="h-4 w-4 mr-1.5" />
                Edit Branding & Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs: Departments / Team */}
      <Tabs defaultValue="departments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="billing">Billing & Plan</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* ───── Departments Tab ───── */}
        <TabsContent value="departments" className="space-y-6">
          <Card className="border border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold">Departments</CardTitle>
              <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
                <Plus className="h-4 w-4 mr-1.5" />
                Add Department
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="rounded-lg border border-border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="font-medium">Department</TableHead>
                      <TableHead className="font-medium">Code</TableHead>
                      <TableHead className="font-medium">Type</TableHead>
                      <TableHead className="font-medium text-center">Templates</TableHead>
                      <TableHead className="font-medium text-center">Issued</TableHead>
                      <TableHead className="font-medium text-center">Status</TableHead>
                      <TableHead className="font-medium text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departments.map((dept) => (
                      <TableRow key={dept.id} className="hover:bg-muted/20">
                        <TableCell className="font-medium">{dept.name}</TableCell>
                        <TableCell className="text-muted-foreground">{dept.code || "—"}</TableCell>
                        <TableCell className="text-muted-foreground">{dept.type}</TableCell>
                        <TableCell className="text-center">{dept.templateCount}</TableCell>
                        <TableCell className="text-center">{dept.issuedCount}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={dept.active ? "default" : "secondary"} className={dept.active ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-muted text-muted-foreground"}>
                            {dept.active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingDepartment(dept)}>
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Edit</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleDepartmentStatus(dept.id)}>
                                    <Ban className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>{dept.active ? "Disable" : "Enable"}</TooltipContent>
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
        </TabsContent>

        {/* ───── Team Tab ───── */}
        <TabsContent value="team" className="space-y-6">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-semibold">Team members</CardTitle>
                  <p className="text-sm text-muted-foreground mt-0.5">{members.length} members</p>
                </div>
                <Button size="sm" onClick={() => setIsInviteOpen(true)}>
                  <UserPlus className="h-4 w-4 mr-1.5" />
                  Invite member
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search by name or email…" value={teamSearch} onChange={(e) => setTeamSearch(e.target.value)} className="pl-9 h-9" />
                </div>
                <Select value={teamRoleFilter} onValueChange={setTeamRoleFilter}>
                  <SelectTrigger className="w-[140px] h-9"><SelectValue placeholder="Role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All roles</SelectItem>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="issuer">Issuer</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={teamDeptFilter} onValueChange={setTeamDeptFilter}>
                  <SelectTrigger className="w-[180px] h-9"><SelectValue placeholder="Department" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All departments</SelectItem>
                    {departments.map((d) => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {(() => {
                const filtered = members.filter((m) => {
                  const q = teamSearch.toLowerCase();
                  if (q && !m.name.toLowerCase().includes(q) && !m.email.toLowerCase().includes(q)) return false;
                  if (teamRoleFilter !== "all" && m.role !== teamRoleFilter) return false;
                  if (teamDeptFilter !== "all" && m.department !== teamDeptFilter) return false;
                  return true;
                });

                const roleBadgeCls: Record<string, string> = {
                  owner: "bg-purple-100 text-purple-700 border-purple-200",
                  admin: "bg-blue-100 text-blue-700 border-blue-200",
                  issuer: "bg-primary/10 text-primary border-primary/20",
                  viewer: "bg-muted text-muted-foreground border-border",
                };
                const statusBadgeCls: Record<string, string> = {
                  active: "bg-green-100 text-green-700 border-green-200",
                  invited: "bg-amber-100 text-amber-700 border-amber-200",
                  deactivated: "bg-muted text-muted-foreground border-border",
                };

                return (
                  <>
                    {/* Desktop */}
                    <div className="hidden md:block rounded-lg border border-border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/30">
                            <TableHead className="font-medium">Member</TableHead>
                            <TableHead className="font-medium">Role</TableHead>
                            <TableHead className="font-medium">Department</TableHead>
                            <TableHead className="font-medium">Status</TableHead>
                            <TableHead className="font-medium text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filtered.map((m) => (
                            <TableRow key={m.id} className="hover:bg-muted/20">
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                                    {getInitials(m.name)}
                                  </div>
                                  <div>
                                    <p className="font-medium text-foreground text-sm">{m.name}</p>
                                    <p className="text-xs text-muted-foreground">{m.email}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className={`capitalize ${roleBadgeCls[m.role]}`}>{m.role}</Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm">{m.department || "—"}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className={`capitalize ${statusBadgeCls[m.status]}`}>{m.status}</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                {m.role !== "owner" && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => setEditingMember({ id: m.id, name: m.name, role: m.role as MemberRole })}>Edit role</DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => {
                                        setMembers((prev) => prev.map((x) => x.id === m.id ? { ...x, department: "" } : x));
                                        toast.success("Department cleared");
                                      }}>Change department</DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => {
                                        const next = m.status === "deactivated" ? "active" : "deactivated";
                                        setMembers((prev) => prev.map((x) => x.id === m.id ? { ...x, status: next as any } : x));
                                        toast.success(next === "active" ? "Member reactivated" : "Member deactivated");
                                      }}>{m.status === "deactivated" ? "Reactivate" : "Deactivate"}</DropdownMenuItem>
                                      <DropdownMenuItem className="text-destructive" onClick={() => {
                                        setMembers((prev) => prev.filter((x) => x.id !== m.id));
                                        toast.success("Member removed");
                                      }}>Remove</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                          {filtered.length === 0 && (
                            <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No members match your filters.</TableCell></TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden space-y-3">
                      {filtered.map((m) => (
                        <div key={m.id} className="p-4 rounded-xl border border-border bg-background">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{getInitials(m.name)}</div>
                              <div>
                                <p className="font-medium text-sm text-foreground">{m.name}</p>
                                <p className="text-xs text-muted-foreground">{m.email}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className={`capitalize ${statusBadgeCls[m.status]}`}>{m.status}</Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className={`capitalize ${roleBadgeCls[m.role]}`}>{m.role}</Badge>
                            <span className="text-xs text-muted-foreground">{m.department || "Unassigned"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </CardContent>
          </Card>

          {/* Role Permissions */}
          <Collapsible open={permissionsOpen} onOpenChange={setPermissionsOpen}>
            <Card className="border border-border shadow-sm">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-lg font-semibold">Role permissions</CardTitle>
                  {permissionsOpen ? <ChevronDown className="h-5 w-5 text-muted-foreground" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="rounded-lg border border-border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30">
                          <TableHead className="font-medium">Permission</TableHead>
                          <TableHead className="font-medium text-center">Owner</TableHead>
                          <TableHead className="font-medium text-center">Admin</TableHead>
                          <TableHead className="font-medium text-center">Issuer</TableHead>
                          <TableHead className="font-medium text-center">Viewer</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          ["View dashboard", true, true, true, true],
                          ["Create templates", true, true, true, false],
                          ["Issue credentials", true, true, true, false],
                          ["Manage team", true, true, false, false],
                          ["Organization settings", true, true, false, false],
                          ["API access", true, true, false, false],
                          ["Billing", true, false, false, false],
                        ].map(([perm, ...vals]) => (
                          <TableRow key={perm as string}>
                            <TableCell className="font-medium text-sm">{perm as string}</TableCell>
                            {(vals as boolean[]).map((v, i) => (
                              <TableCell key={i} className="text-center">
                                {v ? <CheckCircle2 className="h-4 w-4 text-green-600 mx-auto" /> : <Minus className="h-4 w-4 text-muted-foreground/40 mx-auto" />}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </TabsContent>

        {/* ───── Settings Tab ───── */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Issuance Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start justify-between p-4 rounded-lg border border-border bg-muted/20">
                  <div className="space-y-1 pr-4">
                    <p className="font-medium text-foreground">Enable CSV Issuance</p>
                    <p className="text-sm text-muted-foreground">Issue credentials in bulk via CSV file upload</p>
                  </div>
                  <Switch checked={csvIssuance} onCheckedChange={setCsvIssuance} />
                </div>
                <div className="flex items-start justify-between p-4 rounded-lg border border-border bg-muted/20">
                  <div className="space-y-1 pr-4">
                    <p className="font-medium text-foreground">Enable Invisible Issuance (TREAP)</p>
                    <p className="text-sm text-muted-foreground">Issue credentials without requiring recipient action</p>
                  </div>
                  <Switch checked={invisibleIssuance} onCheckedChange={setInvisibleIssuance} />
                </div>
                <div className="flex items-start justify-between p-4 rounded-lg border border-border bg-muted/20 opacity-60">
                  <div className="space-y-1 pr-4">
                    <p className="font-medium text-foreground">
                      Enable API Access <Badge variant="outline" className="ml-2 text-xs">Coming Soon</Badge>
                    </p>
                    <p className="text-sm text-muted-foreground">Integrate issuance via REST API</p>
                  </div>
                  <Switch checked={apiAccess} disabled />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AddDepartmentModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onSubmit={handleAddDepartment} />
      <AddDepartmentModal
        open={!!editingDepartment}
        onOpenChange={(open) => !open && setEditingDepartment(null)}
        onSubmit={handleEditDepartment}
        editData={editingDepartment ? { name: editingDepartment.name, code: editingDepartment.code, description: editingDepartment.description, type: editingDepartment.type, active: editingDepartment.active } : null}
      />
      <EditOrganizationModal
        open={isEditOrgModalOpen}
        onOpenChange={setIsEditOrgModalOpen}
        onSubmit={handleSaveOrganization}
        initialData={{ name: orgName, shortCode, category, description }}
      />
      <InviteTeamMemberModal
        open={isInviteOpen}
        onOpenChange={setIsInviteOpen}
        onInvite={(data) => {
          data.emails.forEach((email, i) => {
            setMembers((prev) => [...prev, {
              id: crypto.randomUUID(),
              name: email.split("@")[0],
              email,
              role: data.role,
              department: data.department,
              status: "invited" as const,
            }]);
          });
        }}
      />
      {editingMember && (
        <EditMemberRoleModal
          open={!!editingMember}
          onOpenChange={(open) => !open && setEditingMember(null)}
          memberName={editingMember.name}
          currentRole={editingMember.role}
          onSave={(role) => {
            setMembers((prev) => prev.map((m) => m.id === editingMember.id ? { ...m, role } : m));
            setEditingMember(null);
          }}
        />
      )}
    </div>
  );
}
