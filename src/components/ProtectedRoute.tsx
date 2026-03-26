import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("pruuf_auth_token");
  const onboardingDone = localStorage.getItem("onboarding_completed");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to onboarding if not completed (unless already on /onboarding)
  if (!onboardingDone && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}
