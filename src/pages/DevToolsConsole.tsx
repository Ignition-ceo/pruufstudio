import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Server, Terminal, Play, RefreshCw, Download } from "lucide-react";

const mockLogs = [
  { timestamp: "10:45:32.123", level: "info", message: "Node initialized successfully" },
  { timestamp: "10:45:33.456", level: "info", message: "Connected to Polygon network" },
  { timestamp: "10:45:34.789", level: "debug", message: "Fetching credential schema..." },
  { timestamp: "10:45:35.012", level: "info", message: "Schema loaded: EmploymentCredential" },
  { timestamp: "10:45:36.345", level: "warn", message: "Rate limit approaching: 85% utilized" },
  { timestamp: "10:45:37.678", level: "info", message: "Credential issued: 0x1234...5678" },
  { timestamp: "10:45:38.901", level: "error", message: "Failed to verify signature: Invalid format" },
  { timestamp: "10:45:39.234", level: "info", message: "Retry successful" },
];

const levelColors = {
  info: "text-blue-600",
  debug: "text-gray-500",
  warn: "text-yellow-600",
  error: "text-red-600",
};

export default function DevToolsConsole() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Issuer Node Console</h1>
          <p className="text-muted-foreground">
            Monitor and interact with your issuer node
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Connected
          </Badge>
        </div>
      </div>

      {/* Node Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Server className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Node Version</p>
                <p className="text-sm text-muted-foreground">v2.1.4</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Terminal className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Uptime</p>
                <p className="text-sm text-muted-foreground">14d 6h 32m</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Play className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Network</p>
                <p className="text-sm text-muted-foreground">Polygon Mainnet</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Console */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Console Output</CardTitle>
              <CardDescription>Real-time node logs and events</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <div className="space-y-1">
              {mockLogs.map((log, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="text-gray-500">{log.timestamp}</span>
                  <span className={levelColors[log.level as keyof typeof levelColors]}>
                    [{log.level.toUpperCase()}]
                  </span>
                  <span className="text-gray-300">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Command Input */}
      <Card>
        <CardHeader>
          <CardTitle>Execute Command</CardTitle>
          <CardDescription>Run commands on your issuer node</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input placeholder="Enter command..." className="font-mono" />
            <Button className="gap-2">
              <Play className="h-4 w-4" />
              Execute
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
