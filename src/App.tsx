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
import Templates from "./pages/Templates";
import TemplateDetail from "./pages/TemplateDetail";
import StartIssuance from "./pages/StartIssuance";
import CSVUploadIssuance from "./pages/CSVUploadIssuance";
import InvisibleIssuance from "./pages/InvisibleIssuance";
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
              <Route path="/templates" element={<Templates />} />
              <Route path="/templates/:id" element={<TemplateDetail />} />
              <Route path="/issuance" element={<StartIssuance />} />
              <Route path="/issuance/csv" element={<CSVUploadIssuance />} />
              <Route path="/issuance/treap" element={<InvisibleIssuance />} />
              <Route path="/issuance/jobs" element={<NotFound />} />
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
