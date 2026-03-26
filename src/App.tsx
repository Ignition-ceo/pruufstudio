import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SmartDocCreate from "./pages/SmartDocCreate";
import SmartDocDocuments from "./pages/SmartDocDocuments";
import Templates from "./pages/Templates";
import TemplateDetail from "./pages/TemplateDetail";
import StartIssuance from "./pages/StartIssuance";
import CSVUploadIssuance from "./pages/CSVUploadIssuance";
import InvisibleIssuance from "./pages/InvisibleIssuance";
import IssuanceJobs from "./pages/IssuanceJobs";
import JobDetail from "./pages/JobDetail";
import Organization from "./pages/Organization";
import Activity from "./pages/Activity";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import ClaimCredential from "./pages/ClaimCredential";
import VerifyCredential from "./pages/VerifyCredential";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public auth routes — no Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Public credential pages — no Layout, no auth */}
            <Route path="/claim/:claimId" element={<ClaimCredential />} />
            <Route path="/verify" element={<VerifyCredential />} />
            <Route path="/verify/:credentialId" element={<VerifyCredential />} />

            {/* Protected routes — wrapped in Layout + ProtectedRoute */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
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
                      <Route path="/issuance/jobs" element={<IssuanceJobs />} />
                      <Route path="/issuance/jobs/:id" element={<JobDetail />} />
                      <Route path="/organization" element={<Organization />} />
                      <Route path="/organization/:id" element={<Organization />} />
                      <Route path="/activity" element={<Activity />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
