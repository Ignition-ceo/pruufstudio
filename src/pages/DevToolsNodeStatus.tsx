import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Radio, Server, Cpu, HardDrive, Activity, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

const services = [
  { name: "Issuer Node", status: "healthy", uptime: "99.9%", lastCheck: "30 sec ago" },
  { name: "Polygon RPC", status: "healthy", uptime: "99.8%", lastCheck: "30 sec ago" },
  { name: "IPFS Gateway", status: "healthy", uptime: "99.5%", lastCheck: "30 sec ago" },
  { name: "Redis Cache", status: "degraded", uptime: "98.2%", lastCheck: "30 sec ago" },
];

export default function DevToolsNodeStatus() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Node Status</h1>
          <p className="text-muted-foreground">
            Monitor the health and performance of your infrastructure
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            All Systems Operational
          </Badge>
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">CPU Usage</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current</span>
                <span className="font-medium">32%</span>
              </div>
              <Progress value={32} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Memory</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">2.4 GB / 4 GB</span>
                <span className="font-medium">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Storage</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">45 GB / 100 GB</span>
                <span className="font-medium">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Status */}
      <Card>
        <CardHeader>
          <CardTitle>Service Health</CardTitle>
          <CardDescription>Status of connected services and dependencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {service.status === "healthy" ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  )}
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">Last check: {service.lastCheck}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Uptime</p>
                    <p className="font-medium">{service.uptime}</p>
                  </div>
                  <Badge variant={service.status === "healthy" ? "default" : "secondary"} className={service.status === "healthy" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"}>
                    {service.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Node Info */}
      <Card>
        <CardHeader>
          <CardTitle>Node Information</CardTitle>
          <CardDescription>Technical details about your issuer node</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Node ID</span>
                <code className="text-sm">node-prod-001</code>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Version</span>
                <code className="text-sm">v2.1.4</code>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Network</span>
                <code className="text-sm">Polygon Mainnet</code>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">DID</span>
                <code className="text-sm truncate max-w-[200px]">did:polygonid:polygon:main:2...</code>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Region</span>
                <code className="text-sm">us-east-1</code>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Uptime</span>
                <code className="text-sm">14d 6h 32m</code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
