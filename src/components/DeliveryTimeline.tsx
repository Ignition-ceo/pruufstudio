import { cn } from "@/lib/utils";

export interface TimelineEvent {
  timestamp: string;
  status: "info" | "success" | "pending" | "error";
  title: string;
  description?: string;
}

const statusColors: Record<TimelineEvent["status"], string> = {
  info: "bg-blue-500",
  success: "bg-green-500",
  pending: "bg-amber-500",
  error: "bg-red-500",
};

export const DeliveryTimeline = ({ events }: { events: TimelineEvent[] }) => {
  return (
    <div className="relative">
      {events.map((event, i) => (
        <div key={i} className="flex gap-4 pb-6 last:pb-0">
          {/* Timeline column */}
          <div className="flex flex-col items-center">
            <div className={cn("w-3 h-3 rounded-full shrink-0 mt-1", statusColors[event.status])} />
            {i < events.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
          </div>
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{event.title}</p>
            {event.description && (
              <p className="text-xs text-muted-foreground mt-0.5">{event.description}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">{event.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
