import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCheck, Users, Printer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IndividualIssuanceModal } from "@/components/IndividualIssuanceModal";

const issuanceOptions = [
  {
    id: "individual",
    title: "Issue to Individuals (Quick)",
    description: "Issue a Smart Doc to a single recipient using a fast guided modal.",
    icon: UserCheck,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    buttonText: "Issue Now",
    action: "modal",
  },
  {
    id: "group",
    title: "Issue to a Group (CSV Upload)",
    description: "Best for cohorts, batches, or annual graduating classes.",
    icon: Users,
    iconColor: "text-primary",
    iconBg: "bg-accent",
    buttonText: "Go to CSV Upload",
    action: "navigate",
    route: "/issuance/csv",
  },
  {
    id: "treap",
    title: "Invisible Issuance (TREAP)",
    description: "Bind your printing workflow to automatic Smart Doc issuance.",
    icon: Printer,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    buttonText: "Go to Invisible Issuance",
    action: "navigate",
    route: "/issuance/print-profiles",
  },
];

const StartIssuance = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardAction = (option: typeof issuanceOptions[0]) => {
    if (option.action === "modal") {
      setIsModalOpen(true);
    } else if (option.action === "navigate" && option.route) {
      navigate(option.route);
    }
  };

  return (
    <div className="min-h-screen bg-hero-bg">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
            Start Issuance
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Choose how you want to issue Smart Docs
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {issuanceOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.id}
                className="bg-card border border-border rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow duration-200"
              >
                <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${option.iconBg} flex items-center justify-center mb-5`}
                  >
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${option.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                    {option.title}
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                    {option.description}
                  </p>

                  {/* Button */}
                  <Button
                    onClick={() => handleCardAction(option)}
                    className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-11"
                  >
                    {option.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Individual Issuance Modal */}
      <IndividualIssuanceModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};

export default StartIssuance;
