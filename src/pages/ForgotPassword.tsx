import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MailCheck } from "lucide-react";
import logo from "@/assets/pruuf-studio-logo.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg border-border/50">
        <CardContent className="pt-8 pb-8 px-8">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="PRUUF Studio" className="h-10 object-contain" />
          </div>

          {!sent ? (
            <>
              <h1 className="text-xl font-semibold text-foreground text-center mb-1">Reset your password</h1>
              <p className="text-sm text-muted-foreground text-center mb-6">Enter your email and we'll send you a reset link</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full rounded-full h-11 text-sm font-semibold">Send reset link</Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <MailCheck className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h1 className="text-xl font-semibold text-foreground">Check your email</h1>
              <p className="text-sm text-muted-foreground">
                We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>
              </p>
            </div>
          )}

          <div className="text-center mt-6">
            <Link to="/login" className="text-sm text-primary hover:underline">← Back to sign in</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
