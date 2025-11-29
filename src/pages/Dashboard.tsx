export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-[1440px] space-y-6">
        
        {/* Section 1: Hero + Featured App (Two Column) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-background to-blue-50/30 border border-border rounded-xl p-10 min-h-[280px] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold text-foreground leading-tight">
                  Welcome to PRUUF Studio
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                  Turn your existing documents into portable, verifiable credentials — powered by AI.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <a
                  href="/smartdocs/create"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white bg-[#0125cf] hover:bg-[#0125cf]/90 transition-all duration-150 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Create SmartDoc
                </a>
                <a
                  href="/templates"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-foreground bg-background border-2 border-border hover:bg-accent hover:border-[#0125cf]/30 transition-all duration-150"
                >
                  Browse Templates
                </a>
              </div>
            </div>

            {/* Illustration Placeholder */}
            <div className="mt-6 lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2 w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-inner flex items-center justify-center">
              <span className="text-xs text-muted-foreground font-medium">Illustration</span>
            </div>
          </div>

          {/* Featured App Card */}
          <div className="bg-gradient-to-br from-[#0125cf] to-[#0125cf]/80 rounded-xl p-10 min-h-[280px] flex flex-col justify-between shadow-2xl shadow-blue-500/20 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  <span className="text-xs font-semibold text-white">Featured</span>
                </div>
                
                <h2 className="text-3xl font-bold text-white leading-tight">
                  Issue your first credential
                </h2>
                <p className="text-lg text-white/90 leading-relaxed">
                  Start issuing verifiable credentials and establish digital trust instantly.
                </p>
              </div>
              
              <a
                href="/issuance"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-[#0125cf] bg-white hover:bg-white/95 transition-all duration-150 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto"
              >
                Open Issuance Center
              </a>
            </div>
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
