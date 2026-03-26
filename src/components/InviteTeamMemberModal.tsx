import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export type MemberRole = "admin" | "issuer" | "viewer";

const roleDescriptions: Record<MemberRole, string> = {
  admin: "Full access to all features and settings",
  issuer: "Can create templates and issue credentials",
  viewer: "Read-only access to dashboards and activity",
};

const mockDepartments = [
  "Office of the Registrar",
  "Human Resources",
  "Admissions Office",
  "Finance Department",
];

interface InviteTeamMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvite: (data: { emails: string[]; role: MemberRole; department: string }) => void;
}

export const InviteTeamMemberModal = ({ open, onOpenChange, onInvite }: InviteTeamMemberModalProps) => {
  const { toast } = useToast();
  const [emails, setEmails] = useState("");
  const [role, setRole] = useState<MemberRole>("viewer");
  const [department, setDepartment] = useState("");

  const handleSubmit = () => {
    const parsed = emails.split(",").map((e) => e.trim()).filter(Boolean);
    if (!parsed.length) {
      toast({ title: "Email required", description: "Enter at least one email address.", variant: "destructive" });
      return;
    }
    onInvite({ emails: parsed, role, department });
    toast({ title: "Invitation sent", description: `Invitation sent to ${parsed.join(", ")}` });
    setEmails("");
    setRole("viewer");
    setDepartment("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Invite team member</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label>Email addresses</Label>
            <Input
              placeholder="name@example.com, another@example.com"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Separate multiple emails with commas.</p>
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={(v) => setRole(v as MemberRole)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(roleDescriptions) as MemberRole[]).map((r) => (
                  <SelectItem key={r} value={r}>
                    <div>
                      <span className="capitalize font-medium">{r}</span>
                      <span className="text-muted-foreground ml-2 text-xs">— {roleDescriptions[r]}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Department <span className="text-muted-foreground font-normal">(optional)</span></Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Select department…" />
              </SelectTrigger>
              <SelectContent>
                {mockDepartments.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" className="rounded-full" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button className="rounded-full" onClick={handleSubmit}>Send invite</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
