import { useState } from "react";
import { Copy, Plus, Key, ShieldAlert, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  fullKey?: string;
  createdAt: string;
  lastUsed: string | null;
  status: "active" | "revoked";
  scopes: string[];
}

const scopes = [
  { id: "issue", label: "Issue credentials" },
  { id: "read_templates", label: "Read templates" },
  { id: "manage_templates", label: "Manage templates" },
  { id: "read_activity", label: "Read activity" },
];

export function ApiKeysTab() {
  const { toast } = useToast();
  const [keys, setKeys] = useState<ApiKey[]>([
    { id: "1", name: "Production key", prefix: "pruuf_sk_a1b2c3d4", createdAt: "2025-01-10", lastUsed: "2025-03-24", status: "active", scopes: ["issue", "read_templates"] },
    { id: "2", name: "Staging key", prefix: "pruuf_sk_e5f6g7h8", createdAt: "2024-11-05", lastUsed: null, status: "revoked", scopes: ["issue", "read_templates", "manage_templates", "read_activity"] },
  ]);
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newScopes, setNewScopes] = useState<string[]>(["issue"]);
  const [createdKey, setCreatedKey] = useState<ApiKey | null>(null);

  const toggleScope = (id: string) =>
    setNewScopes((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  const handleCreate = () => {
    if (!newName.trim()) return;
    const full = `pruuf_sk_${crypto.randomUUID().replace(/-/g, "").slice(0, 32)}`;
    const key: ApiKey = {
      id: crypto.randomUUID(),
      name: newName,
      prefix: full.slice(0, 16),
      fullKey: full,
      createdAt: new Date().toISOString().split("T")[0],
      lastUsed: null,
      status: "active",
      scopes: newScopes,
    };
    setKeys((prev) => [key, ...prev]);
    setCreatedKey(key);
    setNewName("");
    setNewScopes(["issue"]);
  };

  const revokeKey = (id: string) => {
    setKeys((prev) => prev.map((k) => k.id === id ? { ...k, status: "revoked" as const } : k));
    toast({ title: "API key revoked" });
  };

  const copyKey = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard" });
  };

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-semibold">API keys</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Use API keys to integrate PRUUF issuance into your own systems. Credentials issued via API count toward your plan limits.</p>
          </div>
          <Button size="sm" onClick={() => { setCreatedKey(null); setCreateOpen(true); }}>
            <Plus className="h-4 w-4 mr-1.5" /> Create API key
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-lg border border-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="font-medium">Name</TableHead>
                <TableHead className="font-medium">Key</TableHead>
                <TableHead className="font-medium">Created</TableHead>
                <TableHead className="font-medium">Last used</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((k) => (
                <TableRow key={k.id}>
                  <TableCell className="font-medium text-foreground">{k.name}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{k.prefix}…</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{k.createdAt}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{k.lastUsed || "Never"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={k.status === "active" ? "bg-green-100 text-green-700 border-green-200" : "bg-muted text-muted-foreground border-border"}>
                      {k.status === "active" ? "Active" : "Revoked"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {k.status === "active" && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Revoke</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-2xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Revoke API key?</AlertDialogTitle>
                            <AlertDialogDescription>This will immediately disable the key "{k.name}". Any integrations using it will stop working.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                            <AlertDialogAction className="rounded-full bg-destructive" onClick={() => revokeKey(k.id)}>Revoke</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {keys.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No API keys yet.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>{createdKey ? "API key created" : "Create API key"}</DialogTitle>
          </DialogHeader>

          {!createdKey ? (
            <div className="space-y-5 pt-2">
              <div className="space-y-2">
                <Label>Key name</Label>
                <Input placeholder="e.g. Production key" value={newName} onChange={(e) => setNewName(e.target.value)} />
              </div>
              <div className="space-y-3">
                <Label>Permission scopes</Label>
                {scopes.map((s) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <Checkbox id={s.id} checked={newScopes.includes(s.id)} onCheckedChange={() => toggleScope(s.id)} />
                    <label htmlFor={s.id} className="text-sm text-foreground cursor-pointer">{s.label}</label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" className="rounded-full" onClick={() => setCreateOpen(false)}>Cancel</Button>
                <Button className="rounded-full" disabled={!newName.trim()} onClick={handleCreate}>Create key</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-sm text-amber-800">Copy this key now. You won't be able to see it again.</p>
              </div>
              <div className="flex gap-2">
                <Input value={createdKey.fullKey || ""} readOnly className="font-mono text-xs bg-muted" />
                <Button variant="outline" size="icon" className="shrink-0" onClick={() => copyKey(createdKey.fullKey || "")}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-end">
                <Button className="rounded-full" onClick={() => { setCreatedKey(null); setCreateOpen(false); }}>Done</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
