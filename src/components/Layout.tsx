import { ReactNode, useState } from "react";
import { PruufSidebar } from "@/components/PruufSidebar";
import { TopBar } from "@/components/TopBar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Mobile hamburger menu */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm border border-border shadow-sm"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <PruufSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={setIsSidebarCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={() => setIsMobileMenuOpen(false)}
      />
      
      <main 
        className="flex-1 overflow-x-hidden transition-all duration-300 flex flex-col w-full md:ml-20 lg:ml-60"
        style={{ 
          marginLeft: isMobile ? 0 : (isSidebarCollapsed ? '80px' : '240px')
        }}
      >
        <TopBar />
        <div className="flex-1 px-4 py-6 md:px-6 lg:px-10 bg-muted/30 md:rounded-tl-3xl">
          {children}
        </div>
      </main>
    </div>
  );
}
