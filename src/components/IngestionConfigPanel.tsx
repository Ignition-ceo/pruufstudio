import { useState } from "react";
import { Copy, RefreshCw, Mail, Globe, FolderOpen, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const methods = [
  { id: "manual", label: "Manual upload", icon: Upload, description: "Upload documents one at a time through the dashboard." },
  { id: "email", label: "Email inbox", icon: Mail, description: "Forward documents to a dedicated email for automatic processing." },
  { id: "webhook", label: "Webhook", icon: Globe, description: "Send documents via HTTP POST to a secure endpoint." },
  { id: "folder", label: "Watched folder", icon: FolderOpen, description: "Monitor a shared folder for new documents." },
] as const;

type Method = (typeof methods)[number]["id"];

export const IngestionConfigPanel = () => {
  const { toast } = useToast();
  const [method, setMethod] = useState<Method>("manual");
  const [webhookUrl, setWebhookUrl] = useState("https://ingest.pruuf.io/hooks/abc123-def456");

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} copied`, description: text });
  };

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-sm font-medium text-foreground">Document ingestion method</Label>
        <p className="text-xs text-muted-foreground mt-0.5">Choose how documents are submitted for extraction.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {methods.map((m) => {
          const Icon = m.icon;
          const active = method === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                active ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/40 bg-background"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-sm font-medium text-foreground">{m.label}</span>
              </div>
              <p className="text-xs text-muted-foreground">{m.description}</p>
            </button>
          );
        })}
      </div>

      {/* Method-specific config */}
      {method === "email" && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Ingestion email address</Label>
          <div className="flex gap-2">
            <Input value="hr-letters@ingest.pruuf.io" readOnly className="h-10 rounded-lg bg-muted font-mono text-sm" />
            <Button variant="outline" size="icon" className="shrink-0 h-10 w-10" onClick={() => copyText("hr-letters@ingest.pruuf.io", "Email address")}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Forward documents to this address for automatic extraction.</p>
        </div>
      )}

      {method === "webhook" && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Webhook URL</Label>
          <div className="flex gap-2">
            <Input value={webhookUrl} readOnly className="h-10 rounded-lg bg-muted font-mono text-sm flex-1" />
            <Button variant="outline" size="icon" className="shrink-0 h-10 w-10" onClick={() => copyText(webhookUrl, "Webhook URL")}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 h-10 w-10"
              onClick={() => {
                setWebhookUrl(`https://ingest.pruuf.io/hooks/${crypto.randomUUID().slice(0, 12)}`);
                toast({ title: "Webhook regenerated", description: "A new webhook URL has been created." });
              }}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Send a POST request with the document as a multipart upload.</p>
        </div>
      )}

      {method === "folder" && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Watched folder path</Label>
          <Input placeholder="/shared/hr/certificates" className="h-10 rounded-lg border-border" />
          <p className="text-xs text-muted-foreground">New files in this folder will be automatically processed.</p>
        </div>
      )}
    </div>
  );
};
