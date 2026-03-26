import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Send, CheckCircle2, XCircle, AlertTriangle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: "issuance" | "success" | "failure" | "warning" | "team";
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  href: string;
}

const iconMap = {
  issuance: { icon: Send, cls: "bg-blue-100 text-blue-600" },
  success: { icon: CheckCircle2, cls: "bg-green-100 text-green-600" },
  failure: { icon: XCircle, cls: "bg-red-100 text-red-600" },
  warning: { icon: AlertTriangle, cls: "bg-amber-100 text-amber-600" },
  team: { icon: UserPlus, cls: "bg-purple-100 text-purple-600" },
};

const now = Date.now();
const initialNotifications: Notification[] = [
  { id: "1", type: "success", title: "Batch issuance completed", description: "Job BATCH-2025-042 finished — 150 credentials issued.", timestamp: new Date(now - 2 * 60_000), read: false, href: "/issuance/jobs" },
  { id: "2", type: "team", title: "New team member joined", description: "Hassan Ali accepted the invitation.", timestamp: new Date(now - 35 * 60_000), read: false, href: "/organization" },
  { id: "3", type: "failure", title: "Credential revoked", description: "Employment Certificate for John Smith was revoked.", timestamp: new Date(now - 2 * 3600_000), read: false, href: "/activity" },
  { id: "4", type: "issuance", title: "CSV upload processed", description: "12 credentials queued for delivery.", timestamp: new Date(now - 5 * 3600_000), read: true, href: "/issuance/jobs" },
  { id: "5", type: "warning", title: "Template expiring soon", description: "Training Completion v1.0 expires in 7 days.", timestamp: new Date(now - 24 * 3600_000), read: true, href: "/templates" },
  { id: "6", type: "success", title: "Invisible issuance complete", description: "TREAP processed HR Onboarding Letters.", timestamp: new Date(now - 26 * 3600_000), read: true, href: "/issuance/treap" },
];

function relativeTime(date: Date) {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? "s" : ""} ago`;
  return "Yesterday";
}

export function NotificationCenter() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const handleClick = (n: Notification) => {
    setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
    setOpen(false);
    navigate(n.href);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9 hover:bg-accent/50 relative">
          <Bell className="h-4 w-4 md:h-[18px] md:w-[18px]" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 md:top-1.5 md:right-1.5 h-2 w-2 rounded-full bg-destructive animate-pulse" />
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[360px] p-0 rounded-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs text-primary hover:underline">Mark all read</button>
          )}
        </div>
        <ScrollArea className="max-h-[420px]">
          {notifications.length === 0 ? (
            <div className="py-12 flex flex-col items-center gap-2 text-muted-foreground">
              <Bell className="h-8 w-8" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div>
              {notifications.map((n) => {
                const { icon: Icon, cls } = iconMap[n.type];
                return (
                  <button
                    key={n.id}
                    onClick={() => handleClick(n)}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b border-border last:border-0 ${
                      !n.read ? "border-l-2 border-l-primary bg-primary/[0.03]" : ""
                    }`}
                  >
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${cls}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!n.read ? "font-semibold" : "font-medium"} text-foreground`}>{n.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{n.description}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{relativeTime(n.timestamp)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
