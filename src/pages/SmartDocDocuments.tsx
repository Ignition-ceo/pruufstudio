import { FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentsGrid } from "@/components/RecentsGrid";

export default function SmartDocDocuments() {
  return (
    <div className="container mx-auto py-6 md:py-8 px-4">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">My Documents</h1>
        <p className="text-sm md:text-base text-muted-foreground">Manage and organize your SmartDocs</p>
      </div>

      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row gap-3 md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search documents..." 
            className="pl-10 h-10 md:h-11 text-sm md:text-base focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-150"
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto h-10 md:h-11">Filter</Button>
      </div>

      <RecentsGrid />

      <div className="mt-8 md:mt-12 text-center px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
              <FileText className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg md:text-xl">No documents yet</CardTitle>
            <CardDescription className="text-sm md:text-base">
              Create your first SmartDoc to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full h-10 md:h-11" asChild>
              <a href="/smartdocs/create">Create SmartDoc</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
