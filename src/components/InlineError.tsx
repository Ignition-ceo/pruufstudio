import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InlineErrorProps {
  message: string;
  onDismiss?: () => void;
}

export function InlineError({ message, onDismiss }: InlineErrorProps) {
  return (
    <Alert variant="destructive" className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 flex-shrink-0" />
        <AlertDescription>{message}</AlertDescription>
      </div>
      {onDismiss && (
        <Button variant="ghost" size="icon" onClick={onDismiss} className="h-6 w-6 -mr-1 hover:bg-destructive/10">
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </Alert>
  );
}
