import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Activity,
  LayoutDashboard,
  Award,
  Building2,
  BarChart3,
  ClipboardList,
  Plus,
  UserPlus,
  Search,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const templates = [
  { name: "University Diploma", id: "1" },
  { name: "Employment Certificate", id: "2" },
  { name: "Training Completion", id: "3" },
  { name: "Professional License", id: "4" },
];

const jobs = [
  { id: "BATCH-2025-042", route: "/issuance/jobs/1" },
  { id: "BATCH-2025-041", route: "/issuance/jobs/2" },
  { id: "TREAP-2024-001", route: "/issuance/jobs/3" },
];

const pages = [
  { name: "Dashboard", icon: LayoutDashboard, route: "/dashboard" },
  { name: "Templates", icon: FileText, route: "/templates" },
  { name: "Issuance Center", icon: Award, route: "/issuance" },
  { name: "Organization", icon: Building2, route: "/organization" },
  { name: "Activity", icon: ClipboardList, route: "/activity" },
  { name: "Analytics", icon: BarChart3, route: "/analytics" },
];

const actions = [
  { name: "Create new template", icon: Plus, route: "/smartdocs/create" },
  { name: "Issue credential", icon: Award, route: "/issuance" },
  { name: "Invite team member", icon: UserPlus, route: "/organization" },
];

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const go = (route: string) => {
    setOpen(false);
    navigate(route);
  };

  return (
    <>
      {/* TopBar trigger */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 h-8 px-3 rounded-lg border border-border bg-background/60 hover:bg-muted/50 transition-colors text-sm text-muted-foreground"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search…</span>
        <kbd className="ml-2 px-1.5 py-0.5 rounded bg-muted border border-border text-[10px] font-mono">⌘K</kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search templates, pages, actions…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Pages">
            {pages.map((p) => (
              <CommandItem key={p.route} onSelect={() => go(p.route)}>
                <p.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                {p.name}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Templates">
            {templates.map((t) => (
              <CommandItem key={t.id} onSelect={() => go(`/templates/${t.id}`)}>
                <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                {t.name}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Issuance jobs">
            {jobs.map((j) => (
              <CommandItem key={j.id} onSelect={() => go(j.route)}>
                <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                {j.id}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Actions">
            {actions.map((a) => (
              <CommandItem key={a.name} onSelect={() => go(a.route)}>
                <a.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                {a.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
