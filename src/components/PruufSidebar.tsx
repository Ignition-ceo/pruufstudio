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
  Code2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Briefcase,
  Printer,
  History,
  Server,
  Key,
  Webhook,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import pruufFavicon from "@/assets/pruuf-favicon.png";
import pruufStudioLogo from "@/assets/pruuf-studio-logo.png";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: { title: string; url: string; icon: React.ComponentType<{ className?: string }>; isModal?: boolean }[];
}

interface MenuSection {
  label: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    label: "MAIN",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { 
        title: "Smart Docs", 
        url: "/smartdocs/create", 
        icon: FileText,
        subItems: [
          { title: "SmartDoc Jobs", url: "/smartdocs/jobs", icon: Briefcase },
        ]
      },
      { title: "Templates", url: "/templates", icon: Layout },
      { 
        title: "Issuance Center", 
        url: "/issuance", 
        icon: Send,
        subItems: [
          { title: "Print Profiles", url: "/issuance/print-profiles", icon: Printer },
          { title: "Issuance Jobs", url: "/issuance/jobs", icon: History },
        ]
      },
      { title: "Activity", url: "/activity", icon: Activity },
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "ADMIN",
    items: [
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
  {
    label: "DEVELOPER",
    items: [
      { 
        title: "Dev Tools", 
        url: "/dev-tools", 
        icon: Code2,
        subItems: [
          { title: "Issuer Node Console", url: "/dev-tools/console", icon: Server },
          { title: "API Keys", url: "/dev-tools/api-keys", icon: Key },
          { title: "Webhooks", url: "/dev-tools/webhooks", icon: Webhook },
          { title: "Node Status", url: "/dev-tools/node-status", icon: Radio },
        ]
      },
    ],
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
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleSubmenu = (title: string) => {
    setExpandedMenus(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const isMenuExpanded = (item: MenuItem) => {
    if (!item.subItems) return false;
    // Auto-expand if current route matches any sub-item
    const isActive = item.subItems.some(sub => location.pathname.startsWith(sub.url));
    return expandedMenus.includes(item.title) || isActive;
  };

  const isItemActive = (url: string) => {
    if (url === "/dashboard") return location.pathname === "/" || location.pathname === "/dashboard";
    return location.pathname.startsWith(url);
  };

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
          {menuSections.map((section, sectionIdx) => (
            <div key={section.label} className={cn(sectionIdx > 0 && "mt-6")}>
              <h3 className={cn("text-xs font-semibold text-muted-foreground mb-2 px-3", "md:hidden lg:block", isCollapsed && "lg:hidden")}>
                {section.label}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <div key={item.url}>
                    {/* Main menu item */}
                    {item.subItems ? (
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative",
                          "hover:bg-blue-100/80 hover:text-pruuf-blue",
                          isItemActive(item.url)
                            ? "text-pruuf-blue bg-blue-100/60"
                            : "text-foreground",
                          "md:justify-center lg:justify-start",
                          isCollapsed && "lg:justify-center"
                        )}
                        title={item.title}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        <span className={cn("flex-1 text-left md:hidden lg:inline", isCollapsed && "lg:hidden")}>{item.title}</span>
                        <ChevronDown 
                          className={cn(
                            "h-4 w-4 transition-transform md:hidden lg:inline",
                            isCollapsed && "lg:hidden",
                            isMenuExpanded(item) && "rotate-180"
                          )} 
                        />
                      </button>
                    ) : (
                      <NavLink
                        to={item.url}
                        end={item.url === "/dashboard"}
                        onClick={onMobileMenuClose}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative",
                            "hover:bg-blue-100/80 hover:text-pruuf-blue",
                            (isActive || isItemActive(item.url))
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
                    )}

                    {/* Submenu items */}
                    {item.subItems && isMenuExpanded(item) && (
                      <div className={cn("ml-4 mt-1 space-y-1", "md:hidden lg:block", isCollapsed && "lg:hidden")}>
                        {item.subItems.map((subItem) => (
                          <NavLink
                            key={subItem.url}
                            to={subItem.url}
                            onClick={onMobileMenuClose}
                            className={({ isActive }) =>
                              cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                                "hover:bg-blue-100/80 hover:text-pruuf-blue",
                                isActive
                                  ? "text-pruuf-blue bg-blue-100/40"
                                  : "text-muted-foreground"
                              )
                            }
                          >
                            <subItem.icon className="h-4 w-4 flex-shrink-0" />
                            <span>{subItem.title}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
