import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, ShieldCheck, ShieldX, ShieldAlert, Loader2 } from "lucide-react";

type VerifyStatus = "valid" | "invalid" | "revoked";

interface VerifyResult {
  status: VerifyStatus;
  credentialType: string;
  issuer: string;
  issueDate: string;
  expiry: string;
}

const mockResults: Record<string, VerifyResult> = {
  "cred-001": { status: "valid", credentialType: "Bachelor of Science Diploma", issuer: "Acme University", issueDate: "2025-06-15", expiry: "No expiry" },
  "cred-002": { status: "revoked", credentialType: "Employment Certificate", issuer: "GlobalBank Corp", issueDate: "2024-11-01", expiry: "2025-11-01" },
  "cred-003": { status: "invalid", credentialType: "Unknown", issuer: "Unknown", issueDate: "—", expiry: "—" },
};

const statusUi: Record<VerifyStatus, { icon: typeof ShieldCheck; heading: string; color: string; badgeCls: string }> = {
  valid: { icon: ShieldCheck, heading: "Credential is valid", color: "text-green-600", badgeCls: "bg-green-100 text-green-700 border-green-200" },
  invalid: { icon: ShieldX, heading: "Credential is invalid", color: "text-red-600", badgeCls: "bg-red-100 text-red-700 border-red-200" },
  revoked: { icon: ShieldAlert, heading: "Credential has been revoked", color: "text-amber-600", badgeCls: "bg-amber-100 text-amber-700 border-amber-200" },
};

const VerifyCredential = () => {
  const { credentialId } = useParams<{ credentialId: string }>();
  const [inputId, setInputId] = useState(credentialId || "");
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);

  const runVerify = (id: string) => {
    if (!id.trim()) return;
    setResult(null);
    setVerifying(true);
    setTimeout(() => {
      setResult(mockResults[id.trim()] || { status: "invalid", credentialType: "Unknown", issuer: "Unknown", issueDate: "—", expiry: "—" });
      setVerifying(false);
    }, 1500);
  };

  useEffect(() => {
    if (credentialId) runVerify(credentialId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentialId]);

  const ui = result ? statusUi[result.status] : null;
  const StatusIcon = ui?.icon || ShieldCheck;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-10 pb-16 px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <Shield className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold tracking-tight text-foreground">PRUUF</span>
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-1">Verify a credential</h1>
      <p className="text-sm text-muted-foreground mb-8 text-center max-w-md">
        Enter a credential ID or scan a QR code to check its authenticity.
      </p>

      {/* Input */}
      <div className="w-full max-w-md flex gap-2 mb-10">
        <Input
          placeholder="e.g. cred-001"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runVerify(inputId)}
          className="flex-1"
        />
        <Button onClick={() => runVerify(inputId)} disabled={verifying || !inputId.trim()}>
          {verifying ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
        </Button>
      </div>

      {/* Verifying state */}
      {verifying && (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Verifying credential…</p>
        </div>
      )}

      {/* Result */}
      {result && !verifying && (
        <Card className="w-full max-w-md rounded-2xl">
          <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
            <StatusIcon className={`h-16 w-16 ${ui!.color}`} />
            <h2 className={`text-xl font-bold ${ui!.color}`}>{ui!.heading}</h2>

            <div className="w-full space-y-3 pt-2 text-left">
              {([
                ["Credential type", result.credentialType],
                ["Issuing organization", result.issuer],
                ["Issue date", result.issueDate],
                ["Expiry", result.expiry],
              ] as const).map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>

            <Badge variant="outline" className={`mt-4 ${ui!.badgeCls}`}>
              <Shield className="h-3 w-3 mr-1" /> Verified by PRUUF network
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VerifyCredential;
