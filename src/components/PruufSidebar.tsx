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
  onToggle,
  isMobileMenuOpen = false,
  onMobileMenuClose
}: { 
  isCollapsed: boolean; 
  onToggle: (collapsed: boolean) => void;
  isMobileMenuOpen?: boolean;
  onMobileMenuClose?: () => void;
}) => {
  return (
    <>
      {/* Mobile backdrop overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onMobileMenuClose}
        />
      )}
      
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-blue-50/30 border-r border-border flex flex-col transition-all duration-300 z-40",
          // Mobile: slide in/out from left
          "md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          // Tablet: icon-only (w-20), Desktop: can toggle between w-20 and w-60
          "w-60 md:w-20 lg:w-60",
          isCollapsed && "lg:w-20"
        )}
      >
      {/* Logo Section */}
      <div className={cn("p-4 border-b border-border flex items-center", (isCollapsed && "lg:justify-center") || "justify-start md:justify-center lg:justify-start")}>
        {/* Full logo on mobile and desktop (when expanded) */}
        <div className={cn("flex items-center gap-3", "md:hidden lg:flex", isCollapsed && "lg:hidden")}>
          <img src={pruufFavicon} alt="PRUUF" className="w-8 h-8 rounded" />
          <img src={pruufStudioLogo} alt="PRUUF Studio" className="h-6" />
        </div>
        {/* Icon only on tablet and desktop (when collapsed) */}
        <img src={pruufFavicon} alt="PRUUF" className={cn("w-8 h-8 rounded hidden md:block lg:hidden", isCollapsed && "lg:block")} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {menuSections.map((section, sectionIdx) => (
          <div key={section.label} className={cn(sectionIdx > 0 && "mt-6")}>
            {/* Show labels on mobile and desktop (when expanded), hide on tablet and desktop (when collapsed) */}
            <h3 className={cn("text-xs font-semibold text-muted-foreground mb-2 px-3", "md:hidden lg:block", isCollapsed && "lg:hidden")}>
              {section.label}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.url}
                  to={item.url}
                  end={item.url === "/"}
                  onClick={onMobileMenuClose}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative",
                      "hover:bg-blue-100/80 hover:text-pruuf-blue",
                      isActive
                        ? "text-pruuf-blue bg-blue-100/60 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-pruuf-blue before:rounded-r"
                        : "text-foreground",
                      "md:justify-center lg:justify-start",
                      isCollapsed && "lg:justify-center"
                    )
                  }
                  title={item.title}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {/* Show text on mobile and desktop (when expanded) */}
                  <span className={cn("md:hidden lg:inline", isCollapsed && "lg:hidden")}>{item.title}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Toggle Button at Bottom - Hidden on mobile and tablet, visible on desktop only */}
      <div className="p-4 border-t border-border hidden lg:block">
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
    </>
  );
};
