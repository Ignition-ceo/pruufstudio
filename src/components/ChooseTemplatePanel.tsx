import { useState } from "react";
import { Search, SlidersHorizontal, ArrowRight, Shield, GraduationCap, Umbrella, Users, DollarSign, Plane, Heart, Truck, FileText, UserCheck, Briefcase, Building, Stethoscope, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const sectors = [
  { id: "all", label: "All", icon: FileText },
  { id: "kyc", label: "KYC", icon: Shield },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "insurance", label: "Insurance", icon: Umbrella },
  { id: "hr", label: "HR", icon: Users },
  { id: "financial", label: "Financial", icon: DollarSign },
  { id: "travel", label: "Travel", icon: Plane },
  { id: "health", label: "Health", icon: Heart },
  { id: "logistics", label: "Logistics", icon: Truck },
];

const templates = [
  { id: 1, name: "KYC Profile", sector: "kyc", icon: UserCheck, bgColor: "bg-gradient-to-br from-blue/20 to-blue/40" },
  { id: 2, name: "Proof of Address", sector: "kyc", icon: MapPin, bgColor: "bg-gradient-to-br from-purple/20 to-purple/40" },
  { id: 3, name: "Employment Letter", sector: "hr", icon: Briefcase, bgColor: "bg-gradient-to-br from-pink/20 to-pink/40" },
  { id: 4, name: "Student Enrollment", sector: "education", icon: GraduationCap, bgColor: "bg-gradient-to-br from-green/20 to-green/40" },
  { id: 5, name: "Insurance Policy", sector: "insurance", icon: Umbrella, bgColor: "bg-gradient-to-br from-blue/20 to-purple/40" },
  { id: 6, name: "Travel Clearance", sector: "travel", icon: Plane, bgColor: "bg-gradient-to-br from-pink/20 to-blue/40" },
  { id: 7, name: "Health Coverage", sector: "health", icon: Stethoscope, bgColor: "bg-gradient-to-br from-green/20 to-blue/40" },
  { id: 8, name: "Delivery Manifest", sector: "logistics", icon: Truck, bgColor: "bg-gradient-to-br from-purple/20 to-pink/40" },
];

export const ChooseTemplatePanel = () => {
  const [activeSector, setActiveSector] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter((template) => {
    const matchesSector = activeSector === "all" || template.sector === activeSector;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  const handleTemplateClick = (templateName: string) => {
    console.log(`Use template: ${templateName}`);
  };

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="w-full max-w-6xl flex flex-col gap-6">
      {/* Search bar */}
      <div className="bg-card rounded-2xl border-2 border-border hover:border-primary/50 transition-all shadow-card hover:shadow-card-hover p-6 flex items-center gap-4">
        <Search className="h-6 w-6 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          placeholder="Search SmartDoc templates"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-lg outline-none text-foreground placeholder:text-muted-foreground"
        />
        <SlidersHorizontal className="h-5 w-5 text-muted-foreground flex-shrink-0 cursor-pointer hover:text-primary transition-colors" />
        <Button size="lg" className="rounded-full gap-2" onClick={handleSearch}>
          Go
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Sector chips */}
      <div className="flex flex-wrap gap-3 justify-center">
        {sectors.map((sector) => (
          <button
            key={sector.id}
            onClick={() => setActiveSector(sector.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeSector === sector.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "border border-border hover:border-primary hover:bg-accent"
            }`}
          >
            <sector.icon className="h-4 w-4" />
            {sector.label}
          </button>
        ))}
      </div>

      {/* Explore templates section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Explore templates</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateClick(template.name)}
              className={`${template.bgColor} rounded-2xl p-6 flex flex-col items-start gap-4 hover:scale-105 transition-transform shadow-card hover:shadow-card-hover min-h-[160px]`}
            >
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-3">
                <template.icon className="h-8 w-8 text-primary" />
              </div>
              <span className="text-lg font-semibold text-foreground">{template.name}</span>
            </button>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No templates found. Try a different search or sector.
          </div>
        )}
      </div>
    </div>
  );
};
