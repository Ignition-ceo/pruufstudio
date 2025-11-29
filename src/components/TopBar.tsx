import { Moon, Sun, Bell, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function TopBar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full px-4 pt-2 sticky top-0 z-30 bg-background/80 backdrop-blur-sm md:relative md:bg-transparent">
      <div 
        className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-0 px-3 py-2 md:px-4 md:py-2 rounded-2xl md:rounded-full shadow-sm"
        style={{
          background: 'linear-gradient(90deg, hsl(180 60% 50% / 0.04) 0%, hsl(200 60% 55% / 0.04) 100%)'
        }}
      >
        {/* Left side: User name and plan badge */}
        <div className="flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200/50">
          <span className="text-xs md:text-sm font-semibold text-foreground truncate">John Smith</span>
          <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
            <span className="text-xs font-bold text-primary">PRO</span>
          </div>
        </div>

        {/* Right side: Light mode, dark mode, notifications, and avatar */}
        <div className="flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200/50">
          {/* Light mode toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme("light")}
            className={`h-8 w-8 md:h-9 md:w-9 hover:bg-accent/50 ${theme === "light" ? "bg-accent/30" : ""}`}
          >
            <Sun className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            <span className="sr-only">Light mode</span>
          </Button>

          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme("dark")}
            className={`h-8 w-8 md:h-9 md:w-9 hover:bg-accent/50 ${theme === "dark" ? "bg-accent/30" : ""}`}
          >
            <Moon className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            <span className="sr-only">Dark mode</span>
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:h-9 md:w-9 hover:bg-accent/50 relative"
          >
            <Bell className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            <span className="absolute top-1 right-1 md:top-1.5 md:right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* User avatar */}
          <Avatar className="h-7 w-7 md:h-8 md:w-8 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              <User className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
