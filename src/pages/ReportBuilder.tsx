import { useState } from "react";
import { FileBarChart, Download, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const metricOptions = [
  { id: "total", label: "Total credentials issued" },
  { id: "byTemplate", label: "Credentials by template" },
  { id: "byStatus", label: "Credentials by status" },
  { id: "successRate", label: "Issuance success rate" },
  { id: "avgClaim", label: "Average time to claim" },
  { id: "byDept", label: "Credentials by department" },
  { id: "topIssuers", label: "Top issuers" },
];

const mockChart = [
  { name: "Week 1", credentials: 42 },
  { name: "Week 2", credentials: 67 },
  { name: "Week 3", credentials: 55 },
  { name: "Week 4", credentials: 89 },
  { name: "Week 5", credentials: 73 },
  { name: "Week 6", credentials: 95 },
];

const mockSummary = [
  { metric: "Total credentials issued", value: "421" },
  { metric: "Issuance success rate", value: "97.4%" },
  { metric: "Average time to claim", value: "2.3 hours" },
  { metric: "Most used template", value: "Employee Badge (156)" },
  { metric: "Top issuer", value: "Sarah Chen (187)" },
];

const pastReports = [
  { id: 1, date: "Dec 10, 2024", metrics: ["Total issued", "By template", "Success rate"], format: "PDF" },
  { id: 2, date: "Dec 3, 2024", metrics: ["By status", "By department"], format: "CSV" },
  { id: 3, date: "Nov 26, 2024", metrics: ["Total issued", "Top issuers", "Avg claim time"], format: "PDF" },
];

export default function ReportBuilder() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["total", "successRate"]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [grouping, setGrouping] = useState("weekly");
  const [reportFormat, setReportFormat] = useState("pdf");

  const toggleMetric = (id: string) => {
    setSelectedMetrics((prev) => prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]);
  };

  return (
    <div className="container mx-auto py-6 md:py-8 px-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <FileBarChart className="h-6 w-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold">Report builder</h1>
        </div>
        <p className="text-sm text-muted-foreground">Create custom analytics reports with the metrics you need</p>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <button key={s} onClick={() => setStep(s)} className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            step === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
          )}>
            <span className="w-5 h-5 rounded-full bg-background/20 flex items-center justify-center text-xs">{s}</span>
            {s === 1 ? "Choose metrics" : s === 2 ? "Configure" : "Preview"}
          </button>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Select metrics to include</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {metricOptions.map((m) => (
                <label key={m.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer transition-colors">
                  <Checkbox checked={selectedMetrics.includes(m.id)} onCheckedChange={() => toggleMetric(m.id)} />
                  <span className="text-sm font-medium">{m.label}</span>
                </label>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setStep(2)} disabled={selectedMetrics.length === 0}>Next: Configure</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Report configuration</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Start date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start", !startDate && "text-muted-foreground")}>
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {startDate ? format(startDate, "PPP") : "Pick start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={startDate} onSelect={setStartDate} className="p-3 pointer-events-auto" /></PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start", !endDate && "text-muted-foreground")}>
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {endDate ? format(endDate, "PPP") : "Pick end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={endDate} onSelect={setEndDate} className="p-3 pointer-events-auto" /></PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Grouping</Label>
                <Select value={grouping} onValueChange={setGrouping}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Format</Label>
                <Select value={reportFormat} onValueChange={setReportFormat}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)}>Next: Preview</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Report preview</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[250px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockChart}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                    <Bar dataKey="credentials" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead>Metric</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSummary.map((row) => (
                    <TableRow key={row.metric}>
                      <TableCell className="font-medium">{row.metric}</TableCell>
                      <TableCell className="text-right">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={() => toast({ title: "Report generated. Downloading..." })}>
                  <Download className="h-4 w-4 mr-2" />Generate report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Past reports */}
          <Card>
            <CardHeader><CardTitle className="text-base">Report history</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead>Date</TableHead>
                    <TableHead>Metrics included</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastReports.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="text-sm">{r.date}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {r.metrics.map((m) => <Badge key={m} variant="secondary" className="text-xs">{m}</Badge>)}
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{r.format}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => toast({ title: "Downloading report..." })}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
