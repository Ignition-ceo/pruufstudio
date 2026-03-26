import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Plus, Trash2, ArrowRight, FileText, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import pruufStudioLogo from "@/assets/pruuf-studio-logo.png";

const stepLabels = ["Welcome", "Create template", "Issue test", "All set"];

const categories = ["Employment", "Education", "Membership", "Certification", "Event", "Identity"];
const fieldTypes = ["Text", "Date", "Number"];

interface Field {
  name: string;
  type: string;
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [templateName, setTemplateName] = useState("");
  const [category, setCategory] = useState("Employment");
  const [fields, setFields] = useState<Field[]>([
    { name: "Full name", type: "Text" },
    { name: "Issue date", type: "Date" },
    { name: "Expiry date", type: "Date" },
  ]);
  const [recipientEmail, setRecipientEmail] = useState("admin@yourcompany.com");
  const [issued, setIssued] = useState(false);

  const orgName = localStorage.getItem("pruuf_org_name") || "Your Organization";

  const addField = () => setFields([...fields, { name: "", type: "Text" }]);
  const removeField = (i: number) => setFields(fields.filter((_, idx) => idx !== i));
  const updateField = (i: number, key: keyof Field, val: string) => {
    const updated = [...fields];
    updated[i] = { ...updated[i], [key]: val };
    setFields(updated);
  };

  const handleIssueTest = () => {
    setIssued(true);
    setTimeout(() => setStep(4), 2000);
  };

  const completeOnboarding = () => {
    localStorage.setItem("onboarding_completed", "true");
    navigate("/dashboard");
  };

  const skip = () => {
    localStorage.setItem("onboarding_completed", "true");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <img src={pruufStudioLogo} alt="PRUUF Studio" className="h-7" />
        <button onClick={skip} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Skip onboarding
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-0 py-6">
        {stepLabels.map((label, i) => {
          const s = i + 1;
          const isActive = s === step;
          const isDone = s < step;
          return (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  isDone ? "bg-primary text-primary-foreground" :
                  isActive ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                )}>
                  {isDone ? <Check className="h-4 w-4" /> : s}
                </div>
                <span className={cn("text-xs mt-1.5", isActive ? "text-foreground font-medium" : "text-muted-foreground")}>{label}</span>
              </div>
              {i < stepLabels.length - 1 && (
                <div className={cn("w-16 h-px mx-2 mb-5", isDone ? "bg-primary" : "bg-border")} />
              )}
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-4 pb-12">
        <div className="w-full max-w-xl">

          {/* Step 1 */}
          {step === 1 && (
            <div className="text-center space-y-6">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">Welcome to PRUUF, {orgName}</h1>
                <p className="text-muted-foreground text-base max-w-md mx-auto">
                  PRUUF turns your existing documents into verifiable credentials. Let's set up your first template in 3 minutes.
                </p>
              </div>
              <Button size="lg" onClick={() => setStep(2)} className="rounded-full px-8">
                Get started <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <Card>
              <CardContent className="p-6 space-y-5">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Create your first template</h2>
                  <p className="text-sm text-muted-foreground">Templates define the structure of your credentials.</p>
                </div>

                <div className="space-y-2">
                  <Label>Template name</Label>
                  <Input value={templateName} onChange={(e) => setTemplateName(e.target.value)} placeholder="e.g. Employee Badge" />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Fields</Label>
                  {fields.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        className="flex-1"
                        value={f.name}
                        onChange={(e) => updateField(i, "name", e.target.value)}
                        placeholder="Field name"
                      />
                      <Select value={f.type} onValueChange={(v) => updateField(i, "type", v)}>
                        <SelectTrigger className="w-[110px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {fieldTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {fields.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => removeField(i)} className="shrink-0 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addField}>
                    <Plus className="h-4 w-4 mr-1" />Add field
                  </Button>
                </div>

                <div className="flex justify-end pt-2">
                  <Button onClick={() => setStep(3)} disabled={!templateName.trim()}>Continue</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3 */}
          {step === 3 && !issued && (
            <Card>
              <CardContent className="p-6 space-y-5">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Issue a test credential</h2>
                  <p className="text-sm text-muted-foreground">We'll send a test credential using your <strong>{templateName || "template"}</strong>.</p>
                </div>

                <div className="space-y-3">
                  {fields.map((f, i) => (
                    <div key={i} className="space-y-1">
                      <Label>{f.name}</Label>
                      <Input
                        defaultValue={
                          f.name.toLowerCase().includes("name") ? "Jane Doe" :
                          f.name.toLowerCase().includes("date") ? "2025-01-15" :
                          f.type === "Number" ? "12345" : "Sample value"
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-1">
                  <Label>Recipient email</Label>
                  <Input value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleIssueTest}>Issue test credential</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3 success */}
          {step === 3 && issued && (
            <div className="text-center space-y-4 py-8">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto animate-in zoom-in-50 duration-300">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">Your first credential has been issued!</h2>
              <p className="text-muted-foreground">Check {recipientEmail} for the claim link.</p>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">You're all set!</h2>
                <p className="text-muted-foreground">Your organization is ready. Here's what you can do next:</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: FileText, title: "Create more templates", desc: "Design credential schemas for your use cases", href: "/smartdocs/create" },
                  { icon: Send, title: "Issue credentials", desc: "Send credentials individually or in bulk", href: "/issuance" },
                  { icon: Users, title: "Invite your team", desc: "Add team members and assign roles", href: "/organization" },
                ].map((card) => (
                  <Card key={card.href} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => { localStorage.setItem("onboarding_completed", "true"); navigate(card.href); }}>
                    <CardContent className="p-5 text-center space-y-2">
                      <card.icon className="h-8 w-8 text-primary mx-auto" />
                      <h3 className="font-semibold text-sm">{card.title}</h3>
                      <p className="text-xs text-muted-foreground">{card.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button size="lg" className="rounded-full px-8" onClick={completeOnboarding}>
                  Go to dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
