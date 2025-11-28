import { Home, FolderOpen, Layout, Plus } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-20 border-r border-border bg-sidebar flex flex-col items-center py-6 gap-6">
      <Button 
        size="icon" 
        className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90"
      >
        <Plus className="h-6 w-6" />
      </Button>
      
      <nav className="flex flex-col gap-4">
        <NavLink 
          to="/" 
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg"
          activeClassName="text-primary bg-accent"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Home</span>
        </NavLink>
        
        <NavLink 
          to="/projects" 
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg"
          activeClassName="text-primary bg-accent"
        >
          <FolderOpen className="h-5 w-5" />
          <span className="text-xs font-medium">Projects</span>
        </NavLink>
        
        <NavLink 
          to="/templates" 
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg"
          activeClassName="text-primary bg-accent"
        >
          <Layout className="h-5 w-5" />
          <span className="text-xs font-medium">Templates</span>
        </NavLink>
      </nav>
    </aside>
  );
};
