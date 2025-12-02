import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SmartDocCreate from "./pages/SmartDocCreate";
import SmartDocDocuments from "./pages/SmartDocDocuments";
import SmartDocJobs from "./pages/SmartDocJobs";
import Templates from "./pages/Templates";
import TemplateDetail from "./pages/TemplateDetail";
import IssuanceCenter from "./pages/IssuanceCenter";
import PrintProfiles from "./pages/PrintProfiles";
import IssuanceJobs from "./pages/IssuanceJobs";
import Activity from "./pages/Activity";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import DevToolsConsole from "./pages/DevToolsConsole";
import DevToolsApiKeys from "./pages/DevToolsApiKeys";
import DevToolsWebhooks from "./pages/DevToolsWebhooks";
import DevToolsNodeStatus from "./pages/DevToolsNodeStatus";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/smartdocs/create" element={<SmartDocCreate />} />
              <Route path="/smartdocs/documents" element={<SmartDocDocuments />} />
              <Route path="/smartdocs/jobs" element={<SmartDocJobs />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/templates/:id" element={<TemplateDetail />} />
              <Route path="/issuance" element={<IssuanceCenter />} />
              <Route path="/issuance/print-profiles" element={<PrintProfiles />} />
              <Route path="/issuance/jobs" element={<IssuanceJobs />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/dev-tools" element={<DevToolsConsole />} />
              <Route path="/dev-tools/console" element={<DevToolsConsole />} />
              <Route path="/dev-tools/api-keys" element={<DevToolsApiKeys />} />
              <Route path="/dev-tools/webhooks" element={<DevToolsWebhooks />} />
              <Route path="/dev-tools/node-status" element={<DevToolsNodeStatus />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
