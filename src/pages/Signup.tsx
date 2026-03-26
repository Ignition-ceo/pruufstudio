import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/pruuf-studio-logo.png";

const categories = ["Education", "Government", "Healthcare", "Financial", "Enterprise", "Other"];

function generateShortCode(name: string) {
  return name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.slice(0, 3))
    .join("")
    .slice(0, 6);
}

export default function Signup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2
  const [orgName, setOrgName] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Passwords don't match", description: "Please make sure your passwords match.", variant: "destructive" });
      return;
    }
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("pruuf_auth_token", "mock-token");
      localStorage.setItem("pruuf_user", JSON.stringify({ name: fullName, email }));
      toast({ title: "Account created", description: "Welcome to PRUUF Studio!" });
      navigate("/dashboard");
    }, 500);
  };

  const handleOrgNameChange = (val: string) => {
    setOrgName(val);
    setShortCode(generateShortCode(val));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-8">
      <Card className="w-full max-w-md rounded-2xl shadow-lg border-border/50">
        <CardContent className="pt-8 pb-8 px-8">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="PRUUF Studio" className="h-10 object-contain" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${step === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              Step 1 of 2
            </span>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${step === 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              Step 2 of 2
            </span>
          </div>

          {step === 1 ? (
            <>
              <h1 className="text-xl font-semibold text-foreground text-center mb-1">Create your account</h1>
              <p className="text-sm text-muted-foreground text-center mb-6">Enter your admin details</p>
              <form onSubmit={handleStep1} className="space-y-4">
                <div className="space-y-2">
                  <Label>Full name</Label>
                  <Input placeholder="Jane Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
                </div>
                <div className="space-y-2">
                  <Label>Confirm password</Label>
                  <Input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={8} />
                </div>
                <Button type="submit" className="w-full rounded-full h-11 text-sm font-semibold">Continue</Button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-xl font-semibold text-foreground text-center mb-1">Set up your organization</h1>
              <p className="text-sm text-muted-foreground text-center mb-6">Tell us about your organization</p>
              <form onSubmit={handleStep2} className="space-y-4">
                <div className="space-y-2">
                  <Label>Organization name</Label>
                  <Input placeholder="Acme University" value={orgName} onChange={(e) => handleOrgNameChange(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Short code</Label>
                  <Input placeholder="ACMUNI" value={shortCode} onChange={(e) => setShortCode(e.target.value)} required maxLength={6} />
                  <p className="text-xs text-muted-foreground">Auto-generated. You can edit it.</p>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Brief description of your organization…" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-full h-11">Back</Button>
                  <Button type="submit" disabled={loading} className="flex-1 rounded-full h-11 text-sm font-semibold">
                    {loading ? "Creating…" : "Create account"}
                  </Button>
                </div>
              </form>
            </>
          )}

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
