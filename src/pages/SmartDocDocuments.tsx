import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Copy, Download, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SegmentedControl } from "@/components/SegmentedControl";
import { EmptyState } from "@/components/EmptyState";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const statusVariant: Record<string, string> = {
  Issued: "bg-blue-100 text-blue-700 border-blue-200",
  Delivered: "bg-amber-100 text-amber-700 border-amber-200",
  Claimed: "bg-green-100 text-green-700 border-green-200",
  Expired: "bg-muted text-muted-foreground border-border",
  Revoked: "bg-red-100 text-red-700 border-red-200",
};

const templates = ["Employee Badge", "Course Certificate", "Membership Card", "Event Pass"];
const statuses = ["Issued", "Delivered", "Claimed", "Expired", "Revoked"] as const;
const dateRangeOptions = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
  { value: "all", label: "All time" },
];

const names = ["John Doe", "Jane Smith", "Alex Rivera", "Maria Garcia", "Sam Lee", "Chris Park", "Taylor Brown", "Jordan Kim", "Morgan Chen", "Casey Wu"];
const emails = names.map((n) => n.toLowerCase().replace(" ", ".") + "@example.com");

const mockData = Array.from({ length: 20 }, (_, i) => {
  const status = statuses[i % 5];
  const issuedDate = `2024-${String(11 - Math.floor(i / 5)).padStart(2, "0")}-${String(15 + (i % 5)).padStart(2, "0")}`;
  return {
    id: `cred_${String(i + 1).padStart(4, "0")}${Math.random().toString(36).slice(2, 6)}`,
    recipient: names[i % names.length],
    email: emails[i % emails.length],
    template: templates[i % templates.length],
    status,
    issuedDate,
    claimedDate: status === "Claimed" ? `2024-${String(11 - Math.floor(i / 5)).padStart(2, "0")}-${String(16 + (i % 5)).padStart(2, "0")}` : null,
  };
});

export default function SmartDocDocuments() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [templateFilter, setTemplateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 20;

  const filtered = useMemo(() => {
    return mockData.filter((c) => {
      const q = search.toLowerCase();
      if (q && !c.recipient.toLowerCase().includes(q) && !c.id.toLowerCase().includes(q)) return false;
      if (templateFilter !== "all" && c.template !== templateFilter) return false;
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      return true;
    });
  }, [search, templateFilter, statusFilter]);

  const totalCount = 156;
  const showFrom = (page - 1) * perPage + 1;
  const showTo = Math.min(page * perPage, totalCount);

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({ title: "Credential ID copied" });
  };

  return (
    <div className="container mx-auto py-6 md:py-8 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold">Issued credentials</h1>
          <Badge variant="secondary" className="text-xs">{totalCount}</Badge>
        </div>
        <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Export all</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or ID..." className="pl-10 h-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={templateFilter} onValueChange={setTemplateFilter}>
          <SelectTrigger className="w-[180px] h-10"><SelectValue placeholder="Template" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All templates</SelectItem>
            {templates.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px] h-10"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <SegmentedControl options={dateRangeOptions} value={dateRange} onChange={setDateRange} />
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState icon={FileText} title="No credentials found" description="Try adjusting your filters" actionLabel="Clear filters" actionHref="/smartdocs/documents" />
      ) : (
        <>
          <div className="rounded-xl border border-border bg-card overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="w-[200px]">Credential ID</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead>Claimed</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id} className="cursor-pointer hover:bg-muted/30" onClick={() => navigate(`/credentials/${c.id}`)}>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs truncate max-w-[140px]">{c.id}</span>
                        <button onClick={(e) => { e.stopPropagation(); copyId(c.id); }} className="text-muted-foreground hover:text-foreground"><Copy className="h-3.5 w-3.5" /></button>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{c.recipient}</TableCell>
                    <TableCell className="text-muted-foreground">{c.template}</TableCell>
                    <TableCell><Badge className={statusVariant[c.status]}>{c.status}</Badge></TableCell>
                    <TableCell className="text-muted-foreground text-sm">{c.issuedDate}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{c.claimedDate || "—"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/credentials/${c.id}`)}>View</Button>
                        {c.status !== "Revoked" && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Revoke</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Revoke credential?</AlertDialogTitle>
                                <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => toast({ title: "Credential revoked" })} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Revoke</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>{showFrom}–{showTo} of {totalCount} credentials</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
              <Button variant="outline" size="sm" onClick={() => setPage(page + 1)}>Next</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
