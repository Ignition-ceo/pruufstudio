import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { Shield, Download, Wallet, ExternalLink } from "lucide-react";

const mockClaims: Record<string, {
  orgName: string;
  orgInitials: string;
  orgColor: string;
  credentialType: string;
  issueDate: string;
  status: "ready" | "claimed" | "expired";
  fields: { label: string; value: string }[];
}> = {
  "abc-123": {
    orgName: "Acme University",
    orgInitials: "AU",
    orgColor: "hsl(var(--primary))",
    credentialType: "Bachelor of Science Diploma",
    issueDate: "2025-06-15",
    status: "ready",
    fields: [
      { label: "Recipient", value: "Jane M. Doe" },
      { label: "Program", value: "Computer Science" },
      { label: "Graduation Year", value: "2025" },
      { label: "Honours", value: "Summa Cum Laude" },
    ],
  },
  "def-456": {
    orgName: "GlobalBank Corp",
    orgInitials: "GB",
    orgColor: "hsl(220, 60%, 50%)",
    credentialType: "Employment Certificate",
    issueDate: "2024-11-01",
    status: "claimed",
    fields: [
      { label: "Employee", value: "John Smith" },
      { label: "Position", value: "Senior Analyst" },
      { label: "Department", value: "Risk Management" },
      { label: "Period", value: "2020 – 2024" },
    ],
  },
  "ghi-789": {
    orgName: "MedCert Authority",
    orgInitials: "MC",
    orgColor: "hsl(0, 60%, 50%)",
    credentialType: "Medical License",
    issueDate: "2023-03-10",
    status: "expired",
    fields: [
      { label: "Holder", value: "Dr. Emily Chen" },
      { label: "Specialty", value: "Cardiology" },
      { label: "License No.", value: "ML-20230310" },
      { label: "Valid Until", value: "2024-03-10" },
    ],
  },
};

const statusConfig = {
  ready: { label: "Ready to claim", className: "bg-green-100 text-green-700 border-green-200" },
  claimed: { label: "Already claimed", className: "bg-muted text-muted-foreground border-border" },
  expired: { label: "Expired", className: "bg-red-100 text-red-700 border-red-200" },
};

const ClaimCredential = () => {
  const { claimId } = useParams<{ claimId: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const claim = mockClaims[claimId || ""] || mockClaims["abc-123"];
  const disabled = claim.status !== "ready";
  const status = statusConfig[claim.status];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center pt-12 px-4">
        <Skeleton className="h-8 w-32 mb-10" />
        <Skeleton className="h-[500px] w-full max-w-lg rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-10 pb-16 px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <Shield className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold tracking-tight text-foreground">PRUUF</span>
      </div>

      {/* Issuer info */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ backgroundColor: claim.orgColor }}
        >
          {claim.orgInitials}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{claim.orgName}</p>
          <p className="text-xs text-muted-foreground">Issued on {new Date(claim.issueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </div>

      {/* Credential preview card */}
      <div className="w-full max-w-lg mb-4">
        <div className="rounded-2xl p-[1.5px] bg-gradient-to-br from-primary/40 via-primary/20 to-muted">
          <Card className="rounded-2xl border-0 shadow-none overflow-hidden">
            <CardContent className="p-6 space-y-5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{claim.orgName}</p>
              <h2 className="text-xl font-bold text-foreground leading-tight">{claim.credentialType}</h2>

              <div className="space-y-3">
                {claim.fields.map((f) => (
                  <div key={f.label} className="flex justify-between items-baseline">
                    <span className="text-sm text-muted-foreground">{f.label}</span>
                    <span className="text-sm font-medium text-foreground text-right">{f.value}</span>
                  </div>
                ))}
              </div>

              {/* QR placeholder */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <p className="text-[10px] text-muted-foreground">Issued via PRUUF</p>
                <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground font-mono">QR</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Status */}
      <Badge variant="outline" className={`mb-6 ${status.className}`}>{status.label}</Badge>

      {/* Actions */}
      <div className="w-full max-w-lg space-y-3">
        <Button
          className="w-full rounded-full h-12 text-base"
          disabled={disabled}
          onClick={() => toast({ title: "Opening wallet…", description: "Redirecting to your digital wallet." })}
        >
          <Wallet className="mr-2 h-5 w-5" /> Add to wallet
        </Button>
        <Button
          variant="outline"
          className="w-full rounded-full h-12 text-base"
          disabled={disabled}
          onClick={() => toast({ title: "PDF download started", description: "Your credential PDF is being generated." })}
        >
          <Download className="mr-2 h-5 w-5" /> Download as PDF
        </Button>
      </div>

      <p className="mt-8 text-xs text-muted-foreground text-center max-w-sm leading-relaxed">
        This credential is cryptographically signed and tamper-proof.{" "}
        <a href="/verify" className="text-primary hover:underline inline-flex items-center gap-0.5">
          Learn more about PRUUF <ExternalLink className="h-3 w-3" />
        </a>
      </p>
    </div>
  );
};

export default ClaimCredential;
