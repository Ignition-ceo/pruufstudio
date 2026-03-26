import { FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RecentsGrid } from "@/components/RecentsGrid";
import { EmptyState } from "@/components/EmptyState";

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

      <div className="mt-8 md:mt-12">
        <EmptyState
          icon={FileText}
          title="No documents yet"
          description="Create your first SmartDoc to get started"
          actionLabel="Create SmartDoc"
          actionHref="/smartdocs/create"
        />
      </div>
    </div>
  );
}
