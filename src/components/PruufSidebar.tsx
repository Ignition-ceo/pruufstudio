import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Layout,
  Send,
  Award,
  Activity,
  Zap,
  Workflow,
  Building2,
  Users,
  Settings,
  HelpCircle,
} from "lucide-react";

const menuSections = [
  {
    label: "MAIN",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "SmartDocs", url: "/smartdocs/create", icon: FileText },
      { title: "Templates", url: "/templates", icon: Layout },
      { title: "Issuance Center", url: "/issuance", icon: Send },
      { title: "Credentials", url: "/credentials", icon: Award },
      { title: "Activity", url: "/activity", icon: Activity },
    ],
  },
  {
    label: "AUTOMATION",
    items: [
      { title: "TREAP", url: "/treap", icon: Zap },
      { title: "Automation", url: "/automation", icon: Workflow },
    ],
  },
  {
    label: "ADMIN",
    items: [
      { title: "Organization", url: "/organization", icon: Building2 },
      { title: "Team", url: "/team", icon: Users },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
  {
    label: "HELP",
    items: [{ title: "Support", url: "/support", icon: HelpCircle }],
  },
];

export const PruufSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-background border-r border-border flex flex-col">
      {/* Logo Area */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-pruuf-blue flex items-center justify-center text-white font-bold text-sm">
            P
          </div>
          <span className="font-bold text-lg">PRUUF Studio</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {menuSections.map((section, sectionIdx) => (
          <div key={section.label} className={cn(sectionIdx > 0 && "mt-6")}>
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-3">
              {section.label}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.url}
                  to={item.url}
                  end={item.url === "/"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative",
                      "hover:bg-blue-50 hover:text-pruuf-blue",
                      isActive
                        ? "text-pruuf-blue bg-blue-50/50 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-pruuf-blue before:rounded-r"
                        : "text-foreground"
                    )
                  }
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};
