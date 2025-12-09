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
    description: "Issue a credential to a single user using a fast guided modal.",
    icon: UserCheck,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    buttonText: "Issue Now",
    action: "modal",
  },
  {
    id: "group",
    title: "Issue to a Group (CSV Upload)",
    description: "Best for cohorts, batches, or annual graduating classes.",
    icon: Users,
    iconColor: "text-brand",
    iconBg: "bg-blue-50",
    buttonText: "Go to CSV Upload",
    action: "navigate",
    route: "/issuance/csv",
  },
  {
    id: "treap",
    title: "Invisible Issuance (TREAP)",
    description: "Bind your printing workflow to automatic credential issuance.",
    icon: Printer,
    iconColor: "text-violet-500",
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
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Start Issuance
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose how you want to issue credentials
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {issuanceOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.id}
                className="bg-card border border-brand-grey rounded-3xl shadow-hero-card hover:shadow-lg transition-shadow duration-200"
              >
                <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl ${option.iconBg} flex items-center justify-center mb-6`}
                  >
                    <Icon className={`w-8 h-8 ${option.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    {option.title}
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">
                    {option.description}
                  </p>

                  {/* Button */}
                  <Button
                    onClick={() => handleCardAction(option)}
                    className="w-full rounded-full bg-brand hover:bg-brand/90 text-white font-medium py-3"
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
