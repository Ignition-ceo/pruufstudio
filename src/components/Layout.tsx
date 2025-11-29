import { ReactNode, useState } from "react";
import { PruufSidebar } from "@/components/PruufSidebar";
import { TopBar } from "@/components/TopBar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <PruufSidebar isCollapsed={isSidebarCollapsed} onToggle={setIsSidebarCollapsed} />
      <main 
        className="flex-1 overflow-x-hidden transition-all duration-300 flex flex-col"
        style={{ marginLeft: isSidebarCollapsed ? '80px' : '240px' }}
      >
        <TopBar />
        <div className="flex-1 p-6 bg-muted/30 rounded-tl-3xl">
          {children}
        </div>
      </main>
    </div>
  );
}
