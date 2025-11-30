import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function IssuanceCenter() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("templateId");
  const isTest = searchParams.get("test") === "true";

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Issuance Center</h1>
        <p className="text-muted-foreground">
          {isTest ? "Issue a test credential" : "Issue credentials from your template"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ready to Issue</CardTitle>
          <CardDescription>
            {templateId && `Template ID: ${templateId}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Issuance workflow coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
