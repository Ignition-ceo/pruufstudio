import { Check, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    name: "Starter",
    current: true,
    credentials: "1,000",
    team: "2 team members",
    templates: "5 templates",
    support: "Community support",
  },
  {
    name: "Professional",
    current: false,
    credentials: "10,000",
    team: "10 team members",
    templates: "Unlimited templates",
    support: "Priority support",
  },
  {
    name: "Enterprise",
    current: false,
    credentials: "Unlimited",
    team: "Unlimited",
    templates: "Custom schemas",
    support: "Dedicated support + SLA",
  },
];

export function BillingTab() {
  const { toast } = useToast();

  const upgrade = () => toast({ title: "Contact sales", description: "Email sales@pruuf.io to upgrade your plan." });

  return (
    <div className="space-y-6">
      {/* Current plan */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg font-semibold">Current plan</CardTitle>
            <Badge className="bg-primary/10 text-primary border-primary/20">Starter</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm text-foreground font-medium">Credentials issued this month</p>
              <p className="text-sm text-muted-foreground">245 / 1,000</p>
            </div>
            <Progress value={24.5} className="h-2" />
          </div>
          <Button className="rounded-full" onClick={upgrade}>Upgrade plan</Button>
        </CardContent>
      </Card>

      {/* Plan comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card key={plan.name} className={`border shadow-sm ${plan.current ? "border-primary ring-1 ring-primary" : "border-border"}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">{plan.name}</CardTitle>
                {plan.current && <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">Current</Badge>}
              </div>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {[
                `${plan.credentials} credentials/month`,
                plan.team,
                plan.templates,
                plan.support,
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600 shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
              {!plan.current && (
                <Button variant="outline" className="w-full rounded-full mt-3" onClick={upgrade}>Upgrade</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invoice history */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Invoice history</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-10 flex flex-col items-center gap-2 text-muted-foreground">
            <Receipt className="h-8 w-8" />
            <p className="text-sm">No invoices yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
