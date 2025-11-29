export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-[1440px] space-y-6">
        
        {/* Section 1: Hero + Featured App (Two Column) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-8 min-h-[280px] flex items-center justify-center">
            <span className="text-muted-foreground font-medium">Hero Section</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-8 min-h-[280px] flex items-center justify-center">
            <span className="text-muted-foreground font-medium">Featured App Card</span>
          </div>
        </div>

        {/* Section 2: KPI Analytics Row (4-5 metric tiles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-card border border-border rounded-xl p-6 min-h-[140px] flex items-center justify-center">
            <span className="text-muted-foreground font-medium text-sm">KPI Metric 1</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 min-h-[140px] flex items-center justify-center">
            <span className="text-muted-foreground font-medium text-sm">KPI Metric 2</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 min-h-[140px] flex items-center justify-center">
            <span className="text-muted-foreground font-medium text-sm">KPI Metric 3</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 min-h-[140px] flex items-center justify-center">
            <span className="text-muted-foreground font-medium text-sm">KPI Metric 4</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 min-h-[140px] flex items-center justify-center">
            <span className="text-muted-foreground font-medium text-sm">KPI Metric 5</span>
          </div>
        </div>

        {/* Section 3: Analytics Row - Total Credentials + Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-8 min-h-[360px] flex items-center justify-center">
            <span className="text-muted-foreground font-medium">Total Credentials Card</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-8 min-h-[360px] flex items-center justify-center">
            <span className="text-muted-foreground font-medium">Issued & Verified Over Time Chart</span>
          </div>
        </div>

        {/* Section 4: Quick Actions Row (3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-6 min-h-[160px] flex items-center justify-center">
            <span className="text-muted-foreground font-medium text-sm">Quick Action 1</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 min-h-[160px] flex items-center justify-center">
            <span className="text-muted-foreground font-medium text-sm">Quick Action 2</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 min-h-[160px] flex items-center justify-center">
            <span className="text-muted-foreground font-medium text-sm">Quick Action 3</span>
          </div>
        </div>

        {/* Section 5: Bottom Row - Recent Activity + PRUUF AI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-8 min-h-[400px] flex items-center justify-center">
            <span className="text-muted-foreground font-medium">Recent Activity List</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-8 min-h-[400px] flex items-center justify-center">
            <span className="text-muted-foreground font-medium">PRUUF AI Introduction Panel</span>
          </div>
        </div>

      </div>
    </div>
  );
}
