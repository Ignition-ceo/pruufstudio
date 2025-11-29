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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import pruufFavicon from "@/assets/pruuf-favicon.png";
import pruufStudioLogo from "@/assets/pruuf-studio-logo.png";

const menuSections = [
  {
    label: "MAIN",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
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

export const PruufSidebar = ({ 
  isCollapsed, 
  onToggle 
}: { 
  isCollapsed: boolean; 
  onToggle: (collapsed: boolean) => void;
}) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-blue-50/30 border-r border-border flex flex-col transition-all duration-300",
        isCollapsed ? "w-20" : "w-60"
      )}
    >
      {/* Logo Section */}
      <div className={cn("p-4 border-b border-border flex items-center", isCollapsed ? "justify-center" : "justify-start")}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <img src={pruufFavicon} alt="PRUUF" className="w-8 h-8 rounded" />
            <img src={pruufStudioLogo} alt="PRUUF Studio" className="h-6" />
          </div>
        )}
        {isCollapsed && (
          <img src={pruufFavicon} alt="PRUUF" className="w-8 h-8 rounded" />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {menuSections.map((section, sectionIdx) => (
          <div key={section.label} className={cn(sectionIdx > 0 && "mt-6")}>
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-3">
                {section.label}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.url}
                  to={item.url}
                  end={item.url === "/"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative",
                      "hover:bg-blue-100/80 hover:text-pruuf-blue",
                      isActive
                        ? "text-pruuf-blue bg-blue-100/60 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-pruuf-blue before:rounded-r"
                        : "text-foreground",
                      isCollapsed && "justify-center"
                    )
                  }
                  title={isCollapsed ? item.title : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.title}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Toggle Button at Bottom */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          onClick={() => onToggle(!isCollapsed)}
          className={cn(
            "w-full hover:bg-blue-100 flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-pruuf-blue",
            isCollapsed ? "justify-center px-2" : "justify-start px-3"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
};
