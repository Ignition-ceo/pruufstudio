import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Layout,
  Send,
  Activity,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Code2,
  Terminal,
  Key,
  Webhook,
  Server,
  Building2,
  Users,
  HelpCircle,
  PlayCircle,
  FileSpreadsheet,
  Printer,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import pruufFavicon from "@/assets/pruuf-favicon.png";
import pruufStudioLogo from "@/assets/pruuf-studio-logo.png";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Smart Docs", url: "/smartdocs/create", icon: FileText },
  { title: "Templates", url: "/templates", icon: Layout },
  { title: "Activity", url: "/activity", icon: Activity },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const issuanceSubItems = [
  { title: "CSV Upload & Issue", url: "/issuance/csv", icon: FileSpreadsheet },
  { title: "Invisible Issuance (TREAP)", url: "/issuance/treap", icon: Printer },
  { title: "Issuance Jobs", url: "/issuance/jobs", icon: ClipboardList },
];

const adminItems = [
  { title: "Organization", url: "/organization", icon: Building2 },
  { title: "Team", url: "/team", icon: Users },
  { title: "Support", url: "/support", icon: HelpCircle },
  { title: "Settings", url: "/settings", icon: Settings },
];

const devToolsSubItems = [
  { title: "Issuer Node Console", url: "/dev/console", icon: Terminal },
  { title: "API Keys", url: "/dev/api-keys", icon: Key },
  { title: "Webhooks", url: "/dev/webhooks", icon: Webhook },
  { title: "Node Status", url: "/dev/node-status", icon: Server },
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
  const location = useLocation();
  const [issuanceOpen, setIssuanceOpen] = useState(
    location.pathname.startsWith("/issuance")
  );
  const [devToolsOpen, setDevToolsOpen] = useState(
    location.pathname.startsWith("/dev")
  );

  const isTextVisible = !isCollapsed || isMobileMenuOpen;

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
          "md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "w-60 md:w-20 lg:w-60",
          isCollapsed && "lg:w-20"
        )}
      >
        {/* Logo Section */}
        <div className={cn("p-4 border-b border-border flex items-center", (isCollapsed && "lg:justify-center") || "justify-start md:justify-center lg:justify-start")}>
          <div className={cn("flex items-center gap-3", "md:hidden lg:flex", isCollapsed && "lg:hidden")}>
            <img src={pruufFavicon} alt="PRUUF" className="w-8 h-8 rounded" />
            <img src={pruufStudioLogo} alt="PRUUF Studio" className="h-6" />
          </div>
          <img src={pruufFavicon} alt="PRUUF" className={cn("w-8 h-8 rounded hidden md:block lg:hidden", isCollapsed && "lg:block")} />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          {/* MAIN Section */}
          <div>
            <h3 className={cn("text-xs font-semibold text-muted-foreground mb-2 px-3", "md:hidden lg:block", isCollapsed && "lg:hidden")}>
              MAIN
            </h3>
            <div className="space-y-1">
              {mainItems.map((item) => (
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
                  <span className={cn("md:hidden lg:inline", isCollapsed && "lg:hidden")}>{item.title}</span>
                </NavLink>
              ))}

              {/* Issuance Center with sub-items */}
              <div className="flex items-center">
                <NavLink
                  to="/issuance"
                  end
                  onClick={onMobileMenuClose}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex-1",
                      "hover:bg-blue-100/80 hover:text-pruuf-blue",
                      isActive
                        ? "text-pruuf-blue bg-blue-100/60 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-pruuf-blue before:rounded-r relative"
                        : "text-foreground",
                      "md:justify-center lg:justify-start",
                      isCollapsed && "lg:justify-center"
                    )
                  }
                  title="Issuance Center"
                >
                  <Send className="h-5 w-5 flex-shrink-0" />
                  <span className={cn("md:hidden lg:inline", isCollapsed && "lg:hidden")}>Issuance Center</span>
                </NavLink>
                <button
                  onClick={() => setIssuanceOpen(!issuanceOpen)}
                  className={cn(
                    "p-2 rounded-lg hover:bg-blue-100/80 hover:text-pruuf-blue text-muted-foreground transition-all duration-150",
                    "md:hidden lg:flex",
                    isCollapsed && "lg:hidden"
                  )}
                  title="Toggle submenu"
                >
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    issuanceOpen && "rotate-180"
                  )} />
                </button>
              </div>
              {issuanceOpen && (
                <div className={cn("ml-4 space-y-1", "md:ml-0 lg:ml-4", isCollapsed && "lg:ml-0")}>
                  {issuanceSubItems.map((item) => (
                    <NavLink
                      key={item.url}
                      to={item.url}
                      end={item.url === "/issuance"}
                      onClick={onMobileMenuClose}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative",
                          "hover:bg-blue-100/80 hover:text-pruuf-blue",
                          isActive
                            ? "text-pruuf-blue bg-blue-100/60 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-pruuf-blue before:rounded-r"
                            : "text-muted-foreground",
                          "md:justify-center lg:justify-start",
                          isCollapsed && "lg:justify-center"
                        )
                      }
                      title={item.title}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className={cn("md:hidden lg:inline", isCollapsed && "lg:hidden")}>{item.title}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ADMIN Section */}
          <div className="mt-6">
            <h3 className={cn("text-xs font-semibold text-muted-foreground mb-2 px-3", "md:hidden lg:block", isCollapsed && "lg:hidden")}>
              ADMIN
            </h3>
            <div className="space-y-1">
              {adminItems.map((item) => (
                <NavLink
                  key={item.url}
                  to={item.url}
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
                  <span className={cn("md:hidden lg:inline", isCollapsed && "lg:hidden")}>{item.title}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* DEVELOPER Section */}
          <div className="mt-6">
            <h3 className={cn("text-xs font-semibold text-muted-foreground mb-2 px-3", "md:hidden lg:block", isCollapsed && "lg:hidden")}>
              DEVELOPER
            </h3>
            <div className="space-y-1">
              {/* Dev Tools with sub-items */}
              <button
                onClick={() => setDevToolsOpen(!devToolsOpen)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 w-full",
                  "hover:bg-blue-100/80 hover:text-pruuf-blue text-foreground",
                  "md:justify-center lg:justify-start",
                  isCollapsed && "lg:justify-center",
                  devToolsOpen && "text-pruuf-blue"
                )}
                title="Dev Tools"
              >
                <Code2 className="h-5 w-5 flex-shrink-0" />
                <span className={cn("flex-1 text-left md:hidden lg:inline", isCollapsed && "lg:hidden")}>Dev Tools</span>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform md:hidden lg:inline",
                  isCollapsed && "lg:hidden",
                  devToolsOpen && "rotate-180"
                )} />
              </button>
              {devToolsOpen && (
                <div className={cn("ml-4 space-y-1", "md:ml-0 lg:ml-4", isCollapsed && "lg:ml-0")}>
                  {devToolsSubItems.map((item) => (
                    <NavLink
                      key={item.url}
                      to={item.url}
                      onClick={onMobileMenuClose}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative",
                          "hover:bg-blue-100/80 hover:text-pruuf-blue",
                          isActive
                            ? "text-pruuf-blue bg-blue-100/60 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-pruuf-blue before:rounded-r"
                            : "text-muted-foreground",
                          "md:justify-center lg:justify-start",
                          isCollapsed && "lg:justify-center"
                        )
                      }
                      title={item.title}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className={cn("md:hidden lg:inline", isCollapsed && "lg:hidden")}>{item.title}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Toggle Button at Bottom */}
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
