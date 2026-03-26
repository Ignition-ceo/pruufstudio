import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import logo from "@/assets/pruuf-studio-logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("pruuf_auth_token", "mock-token");
      localStorage.setItem("pruuf_user", JSON.stringify({ name: "John Smith", email }));
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg border-border/50">
        <CardContent className="pt-8 pb-8 px-8">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="PRUUF Studio" className="h-10 object-contain" />
          </div>

          <h1 className="text-xl font-semibold text-foreground text-center mb-1">Welcome back</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Sign in to your PRUUF Studio account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full h-11 text-sm font-semibold"
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
