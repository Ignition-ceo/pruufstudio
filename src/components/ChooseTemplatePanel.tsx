import { useState, useRef } from "react";
import { Search, SlidersHorizontal, ArrowRight, Shield, GraduationCap, Umbrella, Users, DollarSign, Plane, Heart, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const sectors = [
  { id: "all", label: "All", icon: FileText },
  { id: "kyc", label: "KYC", icon: Shield },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "insurance", label: "Insurance", icon: Umbrella },
  { id: "hr", label: "HR", icon: Users },
  { id: "financial", label: "Financial", icon: DollarSign },
  { id: "travel", label: "Travel", icon: Plane },
  { id: "health", label: "Health", icon: Heart },
];

const templates = [
  { id: 1, name: "KYC Profile", sector: "kyc", bgColor: "bg-gradient-to-br from-blue/20 to-blue/40", imageUrl: "" },
  { id: 2, name: "Proof of Address", sector: "kyc", bgColor: "bg-gradient-to-br from-purple/20 to-purple/40", imageUrl: "" },
  { id: 3, name: "Employment Letter", sector: "hr", bgColor: "bg-gradient-to-br from-pink/20 to-pink/40", imageUrl: "" },
  { id: 4, name: "Student Enrollment", sector: "education", bgColor: "bg-gradient-to-br from-green/20 to-green/40", imageUrl: "" },
  { id: 5, name: "Academic Transcript", sector: "education", bgColor: "bg-gradient-to-br from-blue/20 to-green/40", imageUrl: "" },
  { id: 6, name: "Degree", sector: "education", bgColor: "bg-gradient-to-br from-purple/20 to-green/40", imageUrl: "" },
  { id: 7, name: "Insurance Policy", sector: "insurance", bgColor: "bg-gradient-to-br from-blue/20 to-purple/40", imageUrl: "" },
  { id: 8, name: "Travel Clearance", sector: "travel", bgColor: "bg-gradient-to-br from-pink/20 to-blue/40", imageUrl: "" },
  { id: 9, name: "Health Coverage", sector: "health", bgColor: "bg-gradient-to-br from-green/20 to-blue/40", imageUrl: "" },
  { id: 10, name: "Proof of Life", sector: "kyc", bgColor: "bg-gradient-to-br from-pink/20 to-purple/40", imageUrl: "" },
];

export const ChooseTemplatePanel = () => {
  const [activeSector, setActiveSector] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [templateImages, setTemplateImages] = useState<{ [key: number]: string }>({});
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

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

  const handleImageUpload = (templateId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTemplateImages(prev => ({
          ...prev,
          [templateId]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
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
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">Explore templates</h2>
        
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No templates found. Try a different search or sector.
          </div>
        ) : (
          <Carousel className="w-full" opts={{ align: "start", loop: false }}>
            <CarouselContent className="-ml-3">
              {Array.from({ length: Math.ceil(filteredTemplates.length / 8) }).map((_, pageIndex) => (
                <CarouselItem key={pageIndex} className="pl-3">
                  <div className="grid grid-cols-4 gap-3">
                    {filteredTemplates
                      .slice(pageIndex * 8, (pageIndex + 1) * 8)
                      .map((template) => (
                        <button
                          key={template.id}
                          onClick={() => fileInputRefs.current[template.id]?.click()}
                          className={`${template.bgColor} rounded-xl p-3 flex items-center justify-between hover:scale-105 transition-transform shadow-card hover:shadow-card-hover min-h-[80px] relative overflow-hidden group`}
                        >
                          {/* Text on left */}
                          <span className="text-sm font-semibold text-foreground z-10">
                            {template.name}
                          </span>
                          
                          {/* Image preview on right */}
                          <div className="relative w-20 h-16 flex-shrink-0">
                            {templateImages[template.id] ? (
                              <div 
                                className="absolute inset-0 bg-cover bg-center rounded-lg shadow-md transform rotate-3 group-hover:rotate-6 transition-transform"
                                style={{ backgroundImage: `url(${templateImages[template.id]})` }}
                              />
                            ) : (
                              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg shadow-md transform rotate-3 group-hover:rotate-6 transition-transform flex items-center justify-center border-2 border-dashed border-primary/30">
                                <Upload className="h-6 w-6 text-primary/40" />
                              </div>
                            )}
                          </div>
                          
                          <input
                            ref={(el) => fileInputRefs.current[template.id] = el}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(template.id, e)}
                            className="hidden"
                          />
                        </button>
                      ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12" />
            <CarouselNext className="-right-12" />
          </Carousel>
        )}
      </div>
    </div>
  );
};
