import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Download, Search, Eye, RotateCcw, ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { CredentialDetailDrawer } from "@/components/CredentialDetailDrawer";
import { useToast } from "@/hooks/use-toast";

const mockJobMeta = {
  id: "JOB-2024-001",
  template: "University Diploma",
  createdAt: "Dec 9, 2024, 2:30 PM",
  status: "completed",
};

const mockCredentials = [
  { id: "CRED-1001", recipient: "Alice Johnson", email: "alice@example.com", status: "claimed", issuedAt: "Dec 9, 2:31 PM", claimedAt: "Dec 9, 3:12 PM" },
  { id: "CRED-1002", recipient: "Bob Martinez", email: "bob@example.com", status: "delivered", issuedAt: "Dec 9, 2:31 PM", claimedAt: undefined },
  { id: "CRED-1003", recipient: "Charlie Kim", email: "charlie@example.com", status: "issued", issuedAt: "Dec 9, 2:32 PM", claimedAt: undefined },
  { id: "CRED-1004", recipient: "Diana Patel", email: "diana@example.com", status: "claimed", issuedAt: "Dec 9, 2:32 PM", claimedAt: "Dec 9, 4:01 PM" },
  { id: "CRED-1005", recipient: "Ethan Brown", email: "ethan@example.com", status: "failed", issuedAt: "Dec 9, 2:33 PM", claimedAt: undefined },
  { id: "CRED-1006", recipient: "Fiona Chen", email: "fiona@example.com", status: "claimed", issuedAt: "Dec 9, 2:33 PM", claimedAt: "Dec 9, 5:20 PM" },
  { id: "CRED-1007", recipient: "George Wilson", email: "george@example.com", status: "revoked", issuedAt: "Dec 9, 2:34 PM", claimedAt: "Dec 9, 3:45 PM" },
  { id: "CRED-1008", recipient: "Hannah Lee", email: "hannah@example.com", status: "delivered", issuedAt: "Dec 9, 2:34 PM", claimedAt: undefined },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  issued: "default", delivered: "secondary", claimed: "default", failed: "destructive", revoked: "outline",
};

const stats = [
  { label: "Total Credentials", value: 245 },
  { label: "Delivered", value: 230 },
  { label: "Claimed", value: 198 },
  { label: "Failed", value: 3 },
];

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [drawerCred, setDrawerCred] = useState<typeof mockCredentials[0] | null>(null);
  const [revokeTarget, setRevokeTarget] = useState<typeof mockCredentials[0] | null>(null);

  const filtered = mockCredentials.filter((c) => {
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchSearch = !search || c.recipient.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleExport = () => {
    const csv = "Credential ID,Recipient,Status,Issued At,Claimed At\n" +
      mockCredentials.map((c) => `${c.id},${c.recipient},${c.status},${c.issuedAt},${c.claimedAt || ""}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${id || mockJobMeta.id}-results.csv`; a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Export downloaded" });
  };

  const handleRevoke = (cred: typeof mockCredentials[0]) => {
    toast({ title: "Credential revoked", description: `${cred.id} has been invalidated.` });
    setRevokeTarget(null);
  };

  const handleReissue = (cred: typeof mockCredentials[0]) => {
    toast({ title: "Re-issue queued", description: `${cred.id} will be re-issued to ${cred.recipient}.` });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl space-y-6 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/issuance" className="hover:text-foreground transition-colors">Issuance Center</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/issuance/jobs" className="hover:text-foreground transition-colors">Issuance Jobs</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium">{id || mockJobMeta.id}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/issuance/jobs")} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight font-mono">{id || mockJobMeta.id}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-muted-foreground">{mockJobMeta.template}</span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">{mockJobMeta.createdAt}</span>
              <Badge variant="default" className="capitalize">{mockJobMeta.status}</Badge>
            </div>
          </div>
        </div>
        <Button variant="outline" onClick={handleExport} className="gap-2 rounded-full">
          <Download className="h-4 w-4" /> Export results
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={s.label} className="border-border">
            <CardContent className="p-5 text-center">
              <p className={`text-2xl font-bold ${i === 3 ? "text-destructive" : "text-foreground"}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="All Status" /></SelectTrigger>
          <SelectContent>
            {["all", "issued", "delivered", "claimed", "failed", "revoked"].map((s) => (
              <SelectItem key={s} value={s} className="capitalize">{s === "all" ? "All Status" : s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search recipient…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      {/* Table */}
      <Card className="border-border rounded-2xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Recipient</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Issued At</TableHead>
                  <TableHead>Claimed At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((cred) => (
                  <TableRow key={cred.id} className="hover:bg-muted/30 cursor-pointer" onClick={() => setDrawerCred(cred)}>
                    <TableCell className="font-medium">{cred.recipient}</TableCell>
                    <TableCell><Badge variant={statusVariant[cred.status]} className="capitalize">{cred.status}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{cred.issuedAt}</TableCell>
                    <TableCell className="text-muted-foreground">{cred.claimedAt || "—"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDrawerCred(cred)}><Eye className="h-4 w-4" /></Button>
                        {cred.status === "failed" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleReissue(cred)}><RotateCcw className="h-4 w-4" /></Button>
                        )}
                        {cred.status !== "revoked" && cred.status !== "failed" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setRevokeTarget(cred)}><ShieldX className="h-4 w-4" /></Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Credential drawer */}
      <CredentialDetailDrawer
        open={!!drawerCred}
        onOpenChange={(o) => !o && setDrawerCred(null)}
        credential={drawerCred ? {
          ...drawerCred,
          template: mockJobMeta.template,
          recipientDid: `did:pruuf:${drawerCred.id.toLowerCase()}`,
          deliveryMethod: "Claim link",
          fields: { "Full Name": drawerCred.recipient, "Degree": "Bachelor of Science", "Major": "Computer Science", "GPA": "3.8" },
        } : null}
      />

      {/* Revoke confirm */}
      <AlertDialog open={!!revokeTarget} onOpenChange={(o) => !o && setRevokeTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke credential?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently invalidate {revokeTarget?.id}. This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => revokeTarget && handleRevoke(revokeTarget)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Revoke</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
