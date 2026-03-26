import { useState } from "react";
import { useTheme } from "next-themes";
import {
  User,
  Shield,
  BellRing,
  Palette,
  Lock,
  Mail,
  Sun,
  Moon,
  Monitor,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: BellRing },
  { id: "appearance", label: "Appearance", icon: Palette },
] as const;

type Section = (typeof sections)[number]["id"];

function getUserData() {
  try {
    const u = JSON.parse(localStorage.getItem("pruuf_user") || "{}");
    return { name: u.name || "User", email: u.email || "user@pruuf.io" };
  } catch {
    return { name: "User", email: "user@pruuf.io" };
  }
}

export default function Settings() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const userData = getUserData();

  const [active, setActive] = useState<Section>("profile");
  const [name, setName] = useState(userData.name);
  const [twoFa, setTwoFa] = useState(false);

  const [notifs, setNotifs] = useState({
    issuanceCompleted: true,
    issuanceFailed: true,
    teamMember: true,
    credentialClaimed: false,
    weeklyDigest: true,
  });

  const toggleNotif = (key: keyof typeof notifs) =>
    setNotifs((p) => ({ ...p, [key]: !p[key] }));

  const save = (msg: string) => toast({ title: msg });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left nav */}
        <nav className="md:w-52 shrink-0 space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active === s.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <s.icon className="h-4 w-4" />
              {s.label}
            </button>
          ))}
        </nav>

        {/* Right content */}
        <div className="flex-1 max-w-2xl space-y-6">
          {/* ── Profile ── */}
          {active === "profile" && (
            <Card className="border border-border shadow-sm">
              <CardHeader><CardTitle className="text-lg">Profile</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                      {name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="rounded-full" disabled>Change avatar</Button>
                </div>
                <div className="space-y-2">
                  <Label>Full name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="max-w-sm" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative max-w-sm">
                    <Input value={userData.email} disabled className="pr-9" />
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Button className="rounded-full" onClick={() => save("Profile saved")}>
                  <Save className="h-4 w-4 mr-1.5" /> Save changes
                </Button>
              </CardContent>
            </Card>
          )}

          {/* ── Security ── */}
          {active === "security" && (
            <>
              <Card className="border border-border shadow-sm">
                <CardHeader><CardTitle className="text-lg">Change password</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2"><Label>Current password</Label><Input type="password" className="max-w-sm" /></div>
                  <div className="space-y-2"><Label>New password</Label><Input type="password" className="max-w-sm" /></div>
                  <div className="space-y-2"><Label>Confirm new password</Label><Input type="password" className="max-w-sm" /></div>
                  <Button className="rounded-full" onClick={() => save("Password updated")}>Update password</Button>
                </CardContent>
              </Card>

              <Card className="border border-border shadow-sm">
                <CardHeader><CardTitle className="text-lg">Two-factor authentication</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Enable 2FA</p>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch checked={twoFa} onCheckedChange={setTwoFa} />
                  </div>
                  {twoFa && (
                    <div className="pt-2 space-y-3">
                      <div className="h-40 w-40 rounded-xl bg-muted border border-border flex items-center justify-center text-sm text-muted-foreground font-mono">
                        QR Code
                      </div>
                      <p className="text-xs text-muted-foreground">Scan with your authenticator app</p>
                      <Button size="sm" className="rounded-full" onClick={() => save("2FA verified")}>Verify</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {/* ── Notifications ── */}
          {active === "notifications" && (
            <Card className="border border-border shadow-sm">
              <CardHeader><CardTitle className="text-lg">Notification preferences</CardTitle></CardHeader>
              <CardContent className="space-y-1">
                {[
                  { key: "issuanceCompleted" as const, label: "Issuance completed", desc: "Get notified when a batch or individual issuance finishes." },
                  { key: "issuanceFailed" as const, label: "Issuance failed", desc: "Alert when a credential issuance encounters an error." },
                  { key: "teamMember" as const, label: "New team member joined", desc: "Notification when someone accepts an invitation." },
                  { key: "credentialClaimed" as const, label: "Credential claimed", desc: "Alert when a recipient claims their credential." },
                  { key: "weeklyDigest" as const, label: "Weekly digest email", desc: "Summary of issuance activity sent every Monday." },
                ].map((n) => (
                  <div key={n.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{n.label}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                    <Switch checked={notifs[n.key]} onCheckedChange={() => toggleNotif(n.key)} />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* ── Appearance ── */}
          {active === "appearance" && (
            <>
              <Card className="border border-border shadow-sm">
                <CardHeader><CardTitle className="text-lg">Theme</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "light", label: "Light", icon: Sun },
                      { id: "dark", label: "Dark", icon: Moon },
                      { id: "system", label: "System", icon: Monitor },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                          theme === t.id
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:border-primary/40"
                        )}
                      >
                        <t.icon className={cn("h-6 w-6", theme === t.id ? "text-primary" : "text-muted-foreground")} />
                        <span className="text-sm font-medium">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border shadow-sm">
                <CardHeader><CardTitle className="text-lg">Language</CardTitle></CardHeader>
                <CardContent>
                  <Select defaultValue="en">
                    <SelectTrigger className="max-w-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-2">More languages coming soon.</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
