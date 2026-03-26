import { useState, useMemo } from "react";
import { Shield, Search, Download, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const actionTypes = [
  "Credential issued",
  "Credential revoked",
  "Template created",
  "Template modified",
  "User login",
  "User invited",
  "Settings changed",
  "API key created",
] as const;

const actors = [
  { name: "Sarah Chen", role: "Owner" },
  { name: "James Wilson", role: "Admin" },
  { name: "Maria Garcia", role: "Issuer" },
  { name: "Alex Rivera", role: "Admin" },
];

const roleColor: Record<string, string> = {
  Owner: "bg-purple-100 text-purple-700 border-purple-200",
  Admin: "bg-blue-100 text-blue-700 border-blue-200",
  Issuer: "bg-amber-100 text-amber-700 border-amber-200",
  Viewer: "bg-muted text-muted-foreground border-border",
};

const mockLogs = [
  { id: 1, timestamp: "2024-12-15T14:32:07+00:00", actor: actors[0], action: "Issued credential CRED-2024-0042 to john@acme.com using template Employment Certificate", ip: "192.168.1.42", status: "Success", type: "Credential issued" },
  { id: 2, timestamp: "2024-12-15T14:28:15+00:00", actor: actors[1], action: "Created API key 'Production key' with issue and read permissions", ip: "10.0.0.15", status: "Success", type: "API key created" },
  { id: 3, timestamp: "2024-12-15T13:55:22+00:00", actor: actors[2], action: "Revoked credential CRED-2024-0038 — reason: employee terminated", ip: "172.16.0.8", status: "Success", type: "Credential revoked" },
  { id: 4, timestamp: "2024-12-15T12:10:44+00:00", actor: actors[0], action: "Modified template 'Employee Badge' — added field 'Department'", ip: "192.168.1.42", status: "Success", type: "Template modified" },
  { id: 5, timestamp: "2024-12-15T11:45:09+00:00", actor: actors[3], action: "User login via email/password", ip: "203.0.113.5", status: "Success", type: "User login" },
  { id: 6, timestamp: "2024-12-15T11:30:55+00:00", actor: actors[1], action: "Invited taylor@example.com as Issuer", ip: "10.0.0.15", status: "Success", type: "User invited" },
  { id: 7, timestamp: "2024-12-15T10:22:33+00:00", actor: actors[0], action: "Changed organization name to 'Acme Corp International'", ip: "192.168.1.42", status: "Success", type: "Settings changed" },
  { id: 8, timestamp: "2024-12-14T16:48:12+00:00", actor: actors[2], action: "Issued credential CRED-2024-0041 to jane@example.com using template Course Certificate", ip: "172.16.0.8", status: "Success", type: "Credential issued" },
  { id: 9, timestamp: "2024-12-14T15:30:00+00:00", actor: actors[1], action: "User login via email/password", ip: "10.0.0.15", status: "Failed", type: "User login" },
  { id: 10, timestamp: "2024-12-14T14:15:27+00:00", actor: actors[0], action: "Created template 'Membership Card' with 6 fields", ip: "192.168.1.42", status: "Success", type: "Template created" },
  { id: 11, timestamp: "2024-12-14T12:05:18+00:00", actor: actors[3], action: "Issued credential CRED-2024-0040 to sam@corp.io using template Event Pass", ip: "203.0.113.5", status: "Success", type: "Credential issued" },
  { id: 12, timestamp: "2024-12-14T10:42:55+00:00", actor: actors[0], action: "Modified template 'Course Certificate' — changed expiry to 2 years", ip: "192.168.1.42", status: "Success", type: "Template modified" },
  { id: 13, timestamp: "2024-12-13T17:20:03+00:00", actor: actors[1], action: "Revoked credential CRED-2024-0035 — reason: issued in error", ip: "10.0.0.15", status: "Success", type: "Credential revoked" },
  { id: 14, timestamp: "2024-12-13T15:55:41+00:00", actor: actors[2], action: "User login via email/password", ip: "172.16.0.8", status: "Success", type: "User login" },
  { id: 15, timestamp: "2024-12-13T14:10:09+00:00", actor: actors[0], action: "Created API key 'Staging key' with read-only permissions", ip: "192.168.1.42", status: "Success", type: "API key created" },
  { id: 16, timestamp: "2024-12-13T11:30:22+00:00", actor: actors[1], action: "Issued credential CRED-2024-0039 to morgan@test.com using template Employee Badge", ip: "10.0.0.15", status: "Success", type: "Credential issued" },
  { id: 17, timestamp: "2024-12-12T16:45:33+00:00", actor: actors[0], action: "Changed two-factor authentication settings — enabled for all admins", ip: "192.168.1.42", status: "Success", type: "Settings changed" },
  { id: 18, timestamp: "2024-12-12T14:20:15+00:00", actor: actors[3], action: "Invited casey@example.com as Viewer", ip: "203.0.113.5", status: "Success", type: "User invited" },
];

export default function AuditLog() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [actorFilter, setActorFilter] = useState("all");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    return mockLogs.filter((l) => {
      const q = search.toLowerCase();
      if (q && !l.action.toLowerCase().includes(q)) return false;
      if (actionFilter !== "all" && l.type !== actionFilter) return false;
      if (actorFilter !== "all" && l.actor.name !== actorFilter) return false;
      if (startDate && new Date(l.timestamp) < startDate) return false;
      if (endDate && new Date(l.timestamp) > endDate) return false;
      return true;
    });
  }, [search, actionFilter, actorFilter, startDate, endDate]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="container mx-auto py-6 md:py-8 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold">Audit log</h1>
          </div>
          <p className="text-sm text-muted-foreground">Immutable record of all system actions for compliance and security review</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Export log<ChevronDown className="h-3.5 w-3.5 ml-1" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast({ title: "Exporting audit log as CSV..." })}>Export as CSV</DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast({ title: "Exporting audit log as PDF..." })}>Export as PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className={cn("w-[150px] justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
              {startDate ? format(startDate, "MMM d, yyyy") : "Start date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={startDate} onSelect={setStartDate} className="p-3 pointer-events-auto" /></PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className={cn("w-[150px] justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
              {endDate ? format(endDate, "MMM d, yyyy") : "End date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={endDate} onSelect={setEndDate} className="p-3 pointer-events-auto" /></PopoverContent>
        </Popover>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-[200px] h-9"><SelectValue placeholder="Action type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All actions</SelectItem>
            {actionTypes.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={actorFilter} onValueChange={setActorFilter}>
          <SelectTrigger className="w-[180px] h-9"><SelectValue placeholder="Actor" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All actors</SelectItem>
            {actors.map((a) => <SelectItem key={a.name} value={a.name}>{a.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search description..." className="pl-10 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-[200px]">Timestamp</TableHead>
              <TableHead className="w-[180px]">Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="w-[130px]">IP address</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                  {format(new Date(log.timestamp), "MMM d, yyyy HH:mm:ss")} UTC
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{log.actor.name}</span>
                    <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", roleColor[log.actor.role])}>{log.actor.role}</Badge>
                  </div>
                </TableCell>
                <TableCell className="text-sm max-w-[400px]">{log.action}</TableCell>
                <TableCell className="text-xs font-mono text-muted-foreground">{log.ip}</TableCell>
                <TableCell>
                  <Badge className={log.status === "Success" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}>
                    {log.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
        <span>{filtered.length} entries</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
          <span className="flex items-center px-2">Page {page} of {totalPages || 1}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
        </div>
      </div>
    </div>
  );
}
