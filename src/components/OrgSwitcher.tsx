import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronsUpDown, Plus, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

const orgs = [
  { id: "1", name: "Acme University", initials: "AU", color: "hsl(var(--primary))" },
  { id: "2", name: "GlobalBank Corp", initials: "GB", color: "hsl(220, 60%, 50%)" },
  { id: "3", name: "MedCert Authority", initials: "MC", color: "hsl(0, 60%, 50%)" },
];

interface OrgSwitcherProps {
  isTextVisible: boolean;
}

export function OrgSwitcher({ isTextVisible }: OrgSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [currentOrg, setCurrentOrg] = useState(orgs[0]);
  const navigate = useNavigate();

  const switchOrg = (org: typeof orgs[0]) => {
    setCurrentOrg(org);
    setOpen(false);
    toast.success(`Switched to ${org.name}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 px-3 py-2 h-auto hover:bg-blue-100/80",
            !isTextVisible && "justify-center px-2"
          )}
        >
          <div
            className="h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
            style={{ backgroundColor: currentOrg.color }}
          >
            {currentOrg.initials}
          </div>
          {isTextVisible && (
            <>
              <span className="text-sm font-medium text-foreground truncate flex-1 text-left">{currentOrg.name}</span>
              <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[220px] p-1.5 rounded-xl" side="right">
        <div className="space-y-0.5">
          {orgs.map((org) => (
            <button
              key={org.id}
              onClick={() => switchOrg(org)}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-muted/60 transition-colors text-left"
            >
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                style={{ backgroundColor: org.color }}
              >
                {org.initials}
              </div>
              <span className="text-sm font-medium text-foreground truncate flex-1">{org.name}</span>
              {org.id === currentOrg.id && <Check className="h-4 w-4 text-primary shrink-0" />}
            </button>
          ))}
        </div>
        <div className="border-t border-border mt-1.5 pt-1.5">
          <button
            onClick={() => { setOpen(false); navigate("/signup"); }}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-muted/60 transition-colors text-left text-sm text-muted-foreground"
          >
            <Plus className="h-4 w-4" />
            Create new organization
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
