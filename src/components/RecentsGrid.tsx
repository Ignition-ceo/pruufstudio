import { FileText, Clock } from "lucide-react";

const recentDocs = [
  { id: 1, title: "Product Requirements", date: "2 hours ago", type: "Document" },
  { id: 2, title: "Q4 Sales Report", date: "5 hours ago", type: "Report" },
  { id: 3, title: "Client Contract", date: "Yesterday", type: "Contract" },
  { id: 4, title: "Marketing Proposal", date: "2 days ago", type: "Proposal" },
  { id: 5, title: "User Research Notes", date: "3 days ago", type: "Document" },
  { id: 6, title: "Budget Overview", date: "1 week ago", type: "Report" },
];

export const RecentsGrid = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Recents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {recentDocs.map((doc) => (
          <button
            key={doc.id}
            className="group bg-card rounded-xl border border-border p-4 md:p-6 text-left hover:shadow-card-hover transition-all duration-200 hover:border-primary/20"
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                <FileText className="h-5 w-5 md:h-6 md:w-6 text-accent-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm md:text-base text-foreground mb-1 truncate">
                  {doc.title}
                </h3>
                <div className="flex items-center gap-1.5 md:gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{doc.date}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline truncate">{doc.type}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
