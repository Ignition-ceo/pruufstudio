import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface CredentialDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  credential: {
    id: string;
    recipient: string;
    recipientDid?: string;
    email?: string;
    template: string;
    status: string;
    issuedAt: string;
    claimedAt?: string;
    deliveryMethod?: string;
    fields?: Record<string, string>;
  } | null;
}

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  issued: "default",
  delivered: "secondary",
  claimed: "default",
  failed: "destructive",
  revoked: "outline",
};

export function CredentialDetailDrawer({ open, onOpenChange, credential }: CredentialDetailDrawerProps) {
  const { toast } = useToast();

  if (!credential) return null;

  const handleRevoke = () => {
    toast({ title: "Credential revoked", description: `Credential ${credential.id} has been permanently invalidated.` });
    onOpenChange(false);
  };

  const handleResend = () => {
    toast({ title: "Claim link re-sent", description: `A new claim link has been sent to ${credential.recipient}.` });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-lg">Credential Detail</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Header info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant={statusVariant[credential.status] || "secondary"} className="capitalize">{credential.status}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Credential ID</span>
              <span className="text-sm font-mono text-foreground">{credential.id}</span>
            </div>
          </div>

          {/* Recipient */}
          <div className="rounded-xl border border-border p-4 space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Recipient</h4>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span>{credential.recipient}</span></div>
              {credential.recipientDid && <div className="flex justify-between"><span className="text-muted-foreground">DID</span><span className="font-mono text-xs truncate max-w-[200px]">{credential.recipientDid}</span></div>}
              {credential.email && <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>{credential.email}</span></div>}
            </div>
          </div>

          {/* Credential info */}
          <div className="rounded-xl border border-border p-4 space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Credential Info</h4>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Template</span><span>{credential.template}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Issued at</span><span>{credential.issuedAt}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Claimed at</span><span>{credential.claimedAt || "—"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{credential.deliveryMethod || "Claim link"}</span></div>
            </div>
          </div>

          {/* Fields */}
          {credential.fields && Object.keys(credential.fields).length > 0 && (
            <div className="rounded-xl border border-border p-4 space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Credential Fields</h4>
              <div className="space-y-1.5 text-sm">
                {Object.entries(credential.fields).map(([key, val]) => (
                  <div key={key} className="flex justify-between"><span className="text-muted-foreground">{key}</span><span>{val}</span></div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-2">
            <Button variant="outline" onClick={handleResend} className="rounded-full">Re-send claim link</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="rounded-full">Revoke credential</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Revoke credential?</AlertDialogTitle>
                  <AlertDialogDescription>This will permanently invalidate this credential. This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRevoke} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Revoke</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
