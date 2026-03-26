import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import type { MemberRole } from "./InviteTeamMemberModal";

const roleDescriptions: Record<MemberRole, string> = {
  admin: "Full access to all features and settings",
  issuer: "Can create templates and issue credentials",
  viewer: "Read-only access to dashboards and activity",
};

interface EditMemberRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberName: string;
  currentRole: MemberRole;
  onSave: (role: MemberRole) => void;
}

export const EditMemberRoleModal = ({ open, onOpenChange, memberName, currentRole, onSave }: EditMemberRoleModalProps) => {
  const { toast } = useToast();
  const [role, setRole] = useState<MemberRole>(currentRole);

  const handleSave = () => {
    onSave(role);
    toast({ title: "Role updated", description: `${memberName} is now ${role}.` });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle>Edit role — {memberName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={(v) => setRole(v as MemberRole)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(roleDescriptions) as MemberRole[]).map((r) => (
                  <SelectItem key={r} value={r}>
                    <span className="capitalize font-medium">{r}</span>
                    <span className="text-muted-foreground ml-2 text-xs">— {roleDescriptions[r]}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" className="rounded-full" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button className="rounded-full" onClick={handleSave}>Update role</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
