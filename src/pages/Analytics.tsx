import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, FileText, Send, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  { title: "Total Documents", value: "12,458", change: "+12.5%", trend: "up", icon: FileText },
  { title: "Credentials Issued", value: "8,234", change: "+8.2%", trend: "up", icon: Send },
  { title: "Active Users", value: "1,456", change: "-2.1%", trend: "down", icon: Users },
  { title: "Success Rate", value: "98.7%", change: "+0.5%", trend: "up", icon: TrendingUp },
];

const monthlyData = [
  { month: "Jan", documents: 1200, credentials: 890 },
  { month: "Feb", documents: 1450, credentials: 1020 },
  { month: "Mar", documents: 1320, credentials: 950 },
  { month: "Apr", documents: 1680, credentials: 1200 },
  { month: "May", documents: 1890, credentials: 1450 },
  { month: "Jun", documents: 2100, credentials: 1680 },
];

export default function Analytics() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Insights and metrics across your credential operations
          </p>
        </div>
        <Select defaultValue="30d">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Document Processing</CardTitle>
            <CardDescription>Monthly document processing volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end justify-between gap-2">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-primary/20 rounded-t relative" style={{ height: `${(data.documents / 2100) * 250}px` }}>
                    <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t" style={{ height: `${(data.credentials / data.documents) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary/20 rounded" />
                <span className="text-sm text-muted-foreground">Documents</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded" />
                <span className="text-sm text-muted-foreground">Credentials</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Templates</CardTitle>
            <CardDescription>Most used templates this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Employment Certificate", count: 2450, percentage: 85 },
                { name: "Academic Transcript", count: 1890, percentage: 72 },
                { name: "Professional License", count: 1234, percentage: 58 },
                { name: "Training Certificate", count: 987, percentage: 45 },
                { name: "ID Badge", count: 654, percentage: 32 },
              ].map((template) => (
                <div key={template.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{template.name}</span>
                    <span className="text-sm text-muted-foreground">{template.count.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${template.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity by Type */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Breakdown</CardTitle>
          <CardDescription>Distribution of operations by type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <BarChart3 className="h-8 w-8 mx-auto text-blue-600 mb-3" />
              <p className="text-3xl font-bold text-blue-600">4,521</p>
              <p className="text-sm text-muted-foreground">SmartDoc Jobs</p>
            </div>
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <Send className="h-8 w-8 mx-auto text-green-600 mb-3" />
              <p className="text-3xl font-bold text-green-600">8,234</p>
              <p className="text-sm text-muted-foreground">Credentials Issued</p>
            </div>
            <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <FileText className="h-8 w-8 mx-auto text-purple-600 mb-3" />
              <p className="text-3xl font-bold text-purple-600">2,156</p>
              <p className="text-sm text-muted-foreground">TREAP Operations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
