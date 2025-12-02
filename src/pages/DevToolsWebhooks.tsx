import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Webhook, Plus, Trash2, Edit, TestTube, CheckCircle2, XCircle } from "lucide-react";

const mockWebhooks = [
  { id: 1, name: "Credential Issued", url: "https://api.example.com/webhooks/issued", events: ["credential.issued"], status: "active", lastTriggered: "5 min ago" },
  { id: 2, name: "Verification Complete", url: "https://api.example.com/webhooks/verify", events: ["verification.complete"], status: "active", lastTriggered: "1 hour ago" },
  { id: 3, name: "Error Handler", url: "https://api.example.com/webhooks/errors", events: ["*.error"], status: "failing", lastTriggered: "2 hours ago" },
];

const recentDeliveries = [
  { id: 1, event: "credential.issued", status: "success", timestamp: "10:45:32", duration: "234ms" },
  { id: 2, event: "credential.issued", status: "success", timestamp: "10:42:18", duration: "189ms" },
  { id: 3, event: "verification.complete", status: "success", timestamp: "10:38:45", duration: "312ms" },
  { id: 4, event: "credential.error", status: "failed", timestamp: "10:35:12", duration: "timeout" },
  { id: 5, event: "credential.issued", status: "success", timestamp: "10:30:00", duration: "156ms" },
];

export default function DevToolsWebhooks() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Webhooks</h1>
          <p className="text-muted-foreground">
            Configure webhooks to receive real-time event notifications
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Webhook
        </Button>
      </div>

      {/* Webhooks List */}
      <Card>
        <CardHeader>
          <CardTitle>Configured Webhooks</CardTitle>
          <CardDescription>Endpoints receiving event notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockWebhooks.map((webhook) => (
              <div
                key={webhook.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${webhook.status === "active" ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}>
                    <Webhook className={`h-5 w-5 ${webhook.status === "active" ? "text-green-600" : "text-red-600"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{webhook.name}</p>
                      <Badge variant={webhook.status === "active" ? "default" : "destructive"}>
                        {webhook.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono">{webhook.url}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {webhook.events.map((event) => (
                        <Badge key={event} variant="outline" className="text-xs">
                          {event}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">Last triggered</p>
                    <p className="font-medium">{webhook.lastTriggered}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" className="gap-1">
                      <TestTube className="h-4 w-4" />
                      Test
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Deliveries</CardTitle>
          <CardDescription>Latest webhook delivery attempts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {delivery.status === "success" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <code className="text-sm bg-muted px-2 py-1 rounded">{delivery.event}</code>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">{delivery.timestamp}</span>
                  <span className={delivery.status === "success" ? "text-green-600" : "text-red-600"}>
                    {delivery.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
