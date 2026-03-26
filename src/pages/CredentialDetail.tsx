import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, ExternalLink, Send, Download, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeliveryTimeline, TimelineEvent } from "@/components/DeliveryTimeline";
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

const mockCredential = {
  id: "cred_a1b2c3d4e5f6",
  status: "Claimed",
  issuedDate: "2024-11-15 09:32",
  claimedDate: "2024-11-15 14:07",
  template: "Employee Badge",
  templateId: "tpl_001",
  organization: "Acme Corp",
  issuedBy: "Sarah Chen",
  jobId: "job_20241115_001",
  schemaVersion: "1.2",
  recipient: { name: "John Doe", identifier: "john@example.com", delivery: "Email" },
  fields: [
    { key: "Employee Name", value: "John Doe" },
    { key: "Position", value: "Senior Engineer" },
    { key: "Department", value: "Engineering" },
    { key: "Start Date", value: "2024-01-15" },
    { key: "Employee ID", value: "EMP-4821" },
    { key: "Office Location", value: "San Francisco, CA" },
  ],
};

const mockEvents: TimelineEvent[] = [
  { timestamp: "Nov 15, 2024 09:32 AM", status: "info", title: "Credential issued", description: "Issued as part of batch job #job_20241115_001" },
  { timestamp: "Nov 15, 2024 09:33 AM", status: "info", title: "Claim link sent via email", description: "Sent to john@example.com" },
  { timestamp: "Nov 15, 2024 14:07 PM", status: "success", title: "Recipient claimed credential", description: "Claimed from 192.168.1.42" },
  { timestamp: "Nov 18, 2024 11:20 AM", status: "success", title: "Credential verified by Acme Corp", description: "Verification request from partner portal" },
];

export default function CredentialDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const cred = mockCredential;

  const copyId = () => {
    navigator.clipboard.writeText(cred.id);
    toast({ title: "Credential ID copied" });
  };

  return (
    <div className="container mx-auto py-6 md:py-8 px-4 max-w-6xl">
      {/* Back */}
      <Link to="/smartdocs/documents" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to issued credentials
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold font-mono">{cred.id}</h1>
          <button onClick={copyId} className="text-muted-foreground hover:text-foreground"><Copy className="h-4 w-4" /></button>
          <Badge className={statusVariant[cred.status]}>{cred.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Issued {cred.issuedDate}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* LEFT */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Credential fields</CardTitle></CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                {cred.fields.map((f) => (
                  <div key={f.key} className="flex justify-between py-2.5 text-sm">
                    <span className="text-muted-foreground">{f.key}</span>
                    <span className="font-medium text-foreground">{f.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Delivery history</CardTitle></CardHeader>
            <CardContent>
              <DeliveryTimeline events={mockEvents} />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Details</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Template</span><Link to={`/templates/${cred.templateId}`} className="text-primary hover:underline flex items-center gap-1">{cred.template}<ExternalLink className="h-3 w-3" /></Link></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Organization</span><span>{cred.organization}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Issued by</span><span>{cred.issuedBy}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Issuance job</span><Link to={`/issuance/jobs/${cred.jobId}`} className="text-primary hover:underline flex items-center gap-1">{cred.jobId}<ExternalLink className="h-3 w-3" /></Link></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Schema version</span><span>{cred.schemaVersion}</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Recipient</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span>{cred.recipient.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Identifier</span><span>{cred.recipient.identifier}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{cred.recipient.delivery}</span></div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button className="w-full" variant="outline"><Send className="h-4 w-4 mr-2" />Re-send claim link</Button>
            <Button className="w-full" variant="outline"><Download className="h-4 w-4 mr-2" />Download as PDF</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full" variant="destructive"><Ban className="h-4 w-4 mr-2" />Revoke credential</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Revoke this credential?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone. The credential will be permanently invalidated.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => toast({ title: "Credential revoked" })} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Revoke</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
