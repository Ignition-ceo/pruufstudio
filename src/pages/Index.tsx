import { Sidebar } from "@/components/Sidebar";
import { SmartDocHero } from "@/components/SmartDocHero";
import { RecentsGrid } from "@/components/RecentsGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-20">
        <SmartDocHero />
        <RecentsGrid />
      </main>
    </div>
  );
};

export default Index;
