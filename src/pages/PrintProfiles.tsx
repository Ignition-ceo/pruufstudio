import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Printer, Settings2, Trash2, Edit } from "lucide-react";

const mockProfiles = [
  { id: 1, name: "Standard ID Card", printer: "TREAP Pro 500", format: "CR80", status: "active", lastUsed: "2 hours ago" },
  { id: 2, name: "Employee Badge", printer: "TREAP Pro 500", format: "CR80", status: "active", lastUsed: "1 day ago" },
  { id: 3, name: "Visitor Pass", printer: "TREAP Mini", format: "CR80", status: "inactive", lastUsed: "1 week ago" },
  { id: 4, name: "Access Card", printer: "TREAP Pro 500", format: "CR80 + Chip", status: "active", lastUsed: "3 hours ago" },
];

export default function PrintProfiles() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Print Profiles</h1>
          <p className="text-muted-foreground">
            Configure TREAP printer profiles for credential printing
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Profile
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={2} />
          <Input placeholder="Search profiles..." className="pl-10" />
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockProfiles.map((profile) => (
          <Card key={profile.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Printer className="h-5 w-5 text-purple-600" />
                </div>
                <Badge variant={profile.status === "active" ? "default" : "secondary"}>
                  {profile.status}
                </Badge>
              </div>
              <CardTitle className="text-lg mt-3">{profile.name}</CardTitle>
              <CardDescription>{profile.printer}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Format</span>
                  <span className="font-medium">{profile.format}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Used</span>
                  <span className="font-medium">{profile.lastUsed}</span>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t">
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Settings2 className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
