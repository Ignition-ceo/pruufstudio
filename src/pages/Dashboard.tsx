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
          {/* Smart Doc Creator */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-150 flex flex-col h-full">
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0125cf] to-[#0125cf]/70 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-foreground">Smart Doc Creator</h4>
                <p className="text-sm text-muted-foreground">Transform documents into verifiable credentials with AI.</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <a 
                href="/smartdocs/create" 
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#0125cf] hover:text-[#0125cf]/80 transition-colors group"
              >
                Get Started
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Template Library */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-150 flex flex-col h-full">
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-foreground">Template Library</h4>
                <p className="text-sm text-muted-foreground">Browse pre-built templates for quick credential creation.</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <a 
                href="/templates" 
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#0125cf] hover:text-[#0125cf]/80 transition-colors group"
              >
                Get Started
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Issue Credentials */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-150 flex flex-col h-full">
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-foreground">Issue Credentials</h4>
                <p className="text-sm text-muted-foreground">Start issuing and establishing digital trust instantly.</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <a 
                href="/issuance" 
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#0125cf] hover:text-[#0125cf]/80 transition-colors group"
              >
                Get Started
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Section 5: Bottom Row - Recent Activity + PRUUF AI */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity - 2/3 width */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-8 shadow-sm min-h-[400px]">
            <h3 className="text-xl font-bold text-foreground mb-6">Recent Activity</h3>
            
            <div className="space-y-6">
              {/* Activity Item 1 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 border-l-2 border-gray-200 pl-4 pb-6 group-hover:border-[#0125cf] transition-colors">
                  <p className="text-sm font-medium text-foreground">
                    University Diploma Template created via SmartDoc parsing
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">2h ago</p>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="flex-1 border-l-2 border-gray-200 pl-4 pb-6 group-hover:border-[#0125cf] transition-colors">
                  <p className="text-sm font-medium text-foreground">
                    50 Employee IDs issued
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">5h ago</p>
                </div>
              </div>

              {/* Activity Item 3 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1 border-l-2 border-gray-200 pl-4 pb-6 group-hover:border-[#0125cf] transition-colors">
                  <p className="text-sm font-medium text-foreground">
                    AI extracted 8 fields from uploaded PDF
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                </div>
              </div>

              {/* Activity Item 4 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="flex-1 border-l-2 border-gray-200 pl-4 group-hover:border-[#0125cf] transition-colors">
                  <p className="text-sm font-medium text-foreground">
                    TREAP processed 23 transcripts
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* PRUUF AI Panel - 1/3 width */}
          <div className="bg-gradient-to-br from-[#0125cf] to-[#0125cf]/80 rounded-xl p-8 shadow-xl min-h-[400px] flex flex-col justify-between relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-white">Meet PRUUF AI</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Your credential assistant for templates, workflows, and explanations.
                </p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-white/90 text-sm">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Create templates from descriptions</span>
                </li>
                <li className="flex items-start gap-3 text-white/90 text-sm">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Explain PRUUF features</span>
                </li>
                <li className="flex items-start gap-3 text-white/90 text-sm">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Suggest credential designs</span>
                </li>
              </ul>
            </div>

            <button className="relative z-10 w-full mt-6 px-6 py-3 rounded-lg font-semibold text-[#0125cf] bg-white hover:bg-white/95 transition-all duration-150 shadow-lg hover:shadow-xl hover:scale-105">
              Open AI Assistant
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
