import { useState } from "react";
import { Search, ArrowUpDown, Plus, FileText, Users, Building2, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateOrganizationModal } from "@/components/CreateOrganizationModal";
import { Link } from "react-router-dom";

interface Organization {
  id: string;
  name: string;
  logo?: string;
  createdAt: Date;
  did: string;
  templateCount: number;
  issuedCount: number;
  departmentCount: number;
}

// Mock data
const mockOrganizations: Organization[] = [
  {
    id: "1",
    name: "Acme Corporation",
    createdAt: new Date("2024-01-15"),
    did: "DID:8a4f-bc92-1d7e",
    templateCount: 12,
    issuedCount: 1543,
    departmentCount: 4,
  },
  {
    id: "2",
    name: "Global Industries",
    logo: "",
    createdAt: new Date("2024-02-20"),
    did: "DID:3c9d-e2f1-8b5a",
    templateCount: 8,
    issuedCount: 892,
    departmentCount: 3,
  },
  {
    id: "3",
    name: "TechStart Inc",
    createdAt: new Date("2024-03-10"),
    did: "DID:7e1a-4d6c-9f2b",
    templateCount: 5,
    issuedCount: 234,
    departmentCount: 2,
  },
  {
    id: "4",
    name: "Innovation Labs",
    createdAt: new Date("2024-04-05"),
    did: "DID:2b8f-c3a7-6e4d",
    templateCount: 15,
    issuedCount: 2100,
    departmentCount: 6,
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Organization() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizations);

  const filteredOrganizations = organizations
    .filter((org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const handleCreateOrganization = (data: {
    name: string;
    shortCode?: string;
    description?: string;
    departments: { name: string; code?: string }[];
  }) => {
    const newOrg: Organization = {
      id: crypto.randomUUID(),
      name: data.name,
      createdAt: new Date(),
      did: `DID:${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`,
      templateCount: 0,
      issuedCount: 0,
      departmentCount: data.departments.length,
    };
    setOrganizations([newOrg, ...organizations]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Organizations
        </h1>
        <p className="text-muted-foreground">
          View, create, and manage organizations to ensure seamless operation within your ecosystem
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search organizations…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-44">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="name-asc">Name A–Z</SelectItem>
              <SelectItem value="name-desc">Name Z–A</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsModalOpen(true)} className="whitespace-nowrap">
            <Plus className="h-4 w-4 mr-2" />
            Create Organization
          </Button>
        </div>
      </div>

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrganizations.map((org) => (
          <Card
            key={org.id}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-border"
          >
            <CardContent className="p-6 flex flex-col h-full">
              {/* Top section: Logo + Name */}
              <div className="flex items-start gap-4 mb-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/10">
                  {org.logo ? (
                    <img
                      src={org.logo}
                      alt={org.name}
                      className="h-10 w-10 object-contain rounded-lg"
                    />
                  ) : (
                    <span className="text-lg font-bold text-primary">
                      {getInitials(org.name)}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-foreground truncate">
                    {org.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Created on: {formatDate(org.createdAt)}
                  </p>
                </div>
              </div>

              {/* DID */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-1">
                  Organization Digital Identifier
                </p>
                <p className="text-sm font-mono text-foreground bg-muted/50 px-3 py-1.5 rounded-md inline-block">
                  {org.did}
                </p>
              </div>

              {/* View Details Link */}
              <div className="mb-4">
                <Link
                  to={`/organization/${org.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  View Details
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Footer Stats */}
              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  <span>{org.templateCount} Templates</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  <span>{org.issuedCount} Issued</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  <span>{org.departmentCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrganizations.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No organizations found
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery
              ? "Try adjusting your search terms"
              : "Get started by creating your first organization"}
          </p>
          {!searchQuery && (
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Organization
            </Button>
          )}
        </div>
      )}

      {/* Create Organization Modal */}
      <CreateOrganizationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleCreateOrganization}
      />
    </div>
  );
}
