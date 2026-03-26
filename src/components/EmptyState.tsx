import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="text-center px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Icon className="h-5 w-5 md:h-6 md:w-6 text-accent-foreground" />
          </div>
          <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
          <CardDescription className="text-sm md:text-base">{description}</CardDescription>
        </CardHeader>
        {actionLabel && actionHref && (
          <CardContent>
            <Button className="w-full h-10 md:h-11 rounded-full" asChild>
              <Link to={actionHref}>{actionLabel}</Link>
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
