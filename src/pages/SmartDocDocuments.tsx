import { FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentsGrid } from "@/components/RecentsGrid";

export default function SmartDocDocuments() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Documents</h1>
        <p className="text-muted-foreground">Manage and organize your SmartDocs</p>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search documents..." 
            className="pl-10 focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-150"
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <RecentsGrid />

      <div className="mt-12 text-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>No documents yet</CardTitle>
            <CardDescription>
              Create your first SmartDoc to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <a href="/smartdocs/create">Create SmartDoc</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
