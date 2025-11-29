import { ReactNode } from "react";
import { PruufSidebar } from "@/components/PruufSidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <PruufSidebar />
      <main className="flex-1 ml-60 overflow-x-hidden">
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
