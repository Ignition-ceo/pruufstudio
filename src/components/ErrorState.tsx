import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  showDashboardLink?: boolean;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this data. Please try again.",
  onRetry,
  showDashboardLink = true,
}: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center py-16 px-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
          <CardDescription className="text-sm md:text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {onRetry && (
            <Button onClick={onRetry} className="w-full rounded-full h-11">
              Try again
            </Button>
          )}
          {showDashboardLink && (
            <Button variant="ghost" asChild className="w-full">
              <Link to="/dashboard">Go to dashboard</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
