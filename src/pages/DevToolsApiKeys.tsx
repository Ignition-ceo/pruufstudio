import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, Plus, Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";

const mockApiKeys = [
  { id: 1, name: "Production API Key", key: "pk_live_xxxxxxxxxxxxx", created: "Jan 10, 2024", lastUsed: "2 hours ago", status: "active" },
  { id: 2, name: "Development Key", key: "pk_test_xxxxxxxxxxxxx", created: "Jan 5, 2024", lastUsed: "1 day ago", status: "active" },
  { id: 3, name: "Legacy Integration", key: "pk_live_xxxxxxxxxxxxx", created: "Dec 15, 2023", lastUsed: "1 month ago", status: "inactive" },
];

export default function DevToolsApiKeys() {
  const [visibleKeys, setVisibleKeys] = useState<number[]>([]);

  const toggleKeyVisibility = (id: number) => {
    setVisibleKeys(prev => 
      prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground">
            Manage API keys for programmatic access
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create API Key
        </Button>
      </div>

      {/* API Keys List */}
      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>Use these keys to authenticate API requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockApiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Key className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{apiKey.name}</p>
                      <Badge variant={apiKey.status === "active" ? "default" : "secondary"}>
                        {apiKey.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                        {visibleKeys.includes(apiKey.id) ? apiKey.key : "••••••••••••••••"}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                      >
                        {visibleKeys.includes(apiKey.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">Created: {apiKey.created}</p>
                    <p className="text-muted-foreground">Last used: {apiKey.lastUsed}</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Info */}
      <Card>
        <CardHeader>
          <CardTitle>API Usage</CardTitle>
          <CardDescription>Monitor your API consumption</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold">12,458</p>
              <p className="text-sm text-muted-foreground">Requests this month</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold">98.7%</p>
              <p className="text-sm text-muted-foreground">Success rate</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold">45ms</p>
              <p className="text-sm text-muted-foreground">Avg. response time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
