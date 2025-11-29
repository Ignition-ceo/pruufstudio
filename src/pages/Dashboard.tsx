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

        {/* Section 2: KPI Analytics Row (5 metric tiles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Templates */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-150">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                Templates
              </p>
              <p className="text-2xl font-bold text-foreground">42</p>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                <span className="text-xs font-semibold">+12%</span>
              </div>
            </div>
          </div>

          {/* SmartDocs */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-150">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                SmartDocs
              </p>
              <p className="text-2xl font-bold text-foreground">18</p>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                <span className="text-xs font-semibold">+8%</span>
              </div>
            </div>
          </div>

          {/* Issued Credentials */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-150">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                Issued Credentials
              </p>
              <p className="text-2xl font-bold text-foreground">124</p>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                <span className="text-xs font-semibold">+23%</span>
              </div>
            </div>
          </div>

          {/* Verified Credentials */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-150">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                Verified Credentials
              </p>
              <p className="text-2xl font-bold text-foreground">687</p>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                <span className="text-xs font-semibold">-5%</span>
              </div>
            </div>
          </div>

          {/* Wallet Holders */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-150">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                Wallet Holders
              </p>
              <p className="text-2xl font-bold text-foreground">0</p>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                <span className="text-xs font-semibold">—</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Analytics Row - Total Credentials + Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Card: Total Credentials */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[360px] space-y-4">
            <h3 className="text-base font-semibold text-muted-foreground uppercase tracking-wide">
              Total Credentials
            </h3>
            <p className="text-6xl font-bold text-foreground">124</p>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700">
              <span className="text-sm font-semibold">+26% vs last 30 days</span>
            </div>
          </div>

          {/* Right Card: Issued & Verified Over Time */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm min-h-[360px] space-y-6">
            {/* Header with title, legend, and dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Issued & Verified Over Time
                </h3>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    <div className="w-2 h-2 rounded-full bg-blue-700"></div>
                    <span className="text-xs font-semibold">Issued</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700">
                    <div className="w-2 h-2 rounded-full bg-green-700"></div>
                    <span className="text-xs font-semibold">Verified</span>
                  </div>
                </div>
              </div>

              {/* Time Range Dropdown */}
              <select className="h-10 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-[#0125cf] focus:border-transparent z-10 hover:bg-gray-50 transition-colors">
                <option value="30">Last 30 Days</option>
                <option value="60">Last 60 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="365">Last Year</option>
              </select>
            </div>

            {/* Chart Placeholder */}
            <div className="h-64 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-sm text-muted-foreground font-medium">Chart Area</span>
            </div>
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
