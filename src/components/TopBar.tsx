import { Moon, Sun, Bell, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function TopBar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mt-2 mx-4">
      <div 
        className="flex items-center justify-between px-4 py-2 rounded-[12px] shadow-sm"
        style={{
          background: 'linear-gradient(90deg, hsl(180 60% 50% / 0.03) 0%, hsl(200 60% 50% / 0.05) 100%)'
        }}
      >
        {/* Left side: User name and plan badge */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-[12px] bg-background/40 backdrop-blur-sm border border-border/50">
          <span className="text-sm font-semibold text-foreground">John Smith</span>
          <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-xs font-bold text-primary">PRO</span>
          </div>
        </div>

        {/* Right side: Toggle icons, notifications, and avatar */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-[12px] bg-background/40 backdrop-blur-sm border border-border/50">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 hover:bg-accent/50"
          >
            <Sun className="h-[18px] w-[18px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-accent/50 relative"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* User avatar */}
          <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              <User className="h-[18px] w-[18px]" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
