import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock data - in real app this would come from API/state
const templateData = {
  id: "1",
  name: "Healthcare Professional License",
  sector: "Healthcare",
  lastUpdated: "2024-03-15",
  fields: [
    { id: "1", name: "Full Name", type: "text", required: true },
    { id: "2", name: "License Number", type: "text", required: true },
    { id: "3", name: "Issue Date", type: "date", required: true },
    { id: "4", name: "Expiry Date", type: "date", required: true },
    { id: "5", name: "Specialization", type: "enum", required: false, options: ["General Practice", "Surgery", "Pediatrics"] },
    { id: "6", name: "Years of Experience", type: "number", required: false },
  ],
  rules: {
    expiryEnabled: true,
    expiryDays: 365,
    requirePhoto: true,
    allowRevocation: true,
  },
  cardDesign: {
    backgroundStyle: "gradient",
    primaryColor: "#22C55E",
    accentColor: "#16A34A",
    showIssuerLogo: true,
    showQRCode: true,
  },
};

export default function TemplateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("fields");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/templates")}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{templateData.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="secondary" className="font-medium">
                  {templateData.sector}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Last updated: {new Date(templateData.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Button size="lg" className="shadow-sm">
          Use this Template
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger value="fields" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
            Fields
          </TabsTrigger>
          <TabsTrigger value="rules" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
            Rules
          </TabsTrigger>
          <TabsTrigger value="card-design" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
            Card Design
          </TabsTrigger>
          <TabsTrigger value="preview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
            Preview
          </TabsTrigger>
        </TabsList>

        {/* Fields Tab */}
        <TabsContent value="fields" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Define the data fields that will be included in this credential
            </p>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-muted/50 text-sm font-medium text-muted-foreground">
                  <div className="col-span-4">Field Name</div>
                  <div className="col-span-3">Type</div>
                  <div className="col-span-3">Required</div>
                  <div className="col-span-2">Actions</div>
                </div>
                
                {/* Data Rows */}
                {templateData.fields.map((field) => (
                  <div key={field.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-muted/30 transition-colors">
                    <div className="col-span-4 font-medium">{field.name}</div>
                    <div className="col-span-3">
                      <Badge variant="outline" className="capitalize">
                        {field.type}
                      </Badge>
                    </div>
                    <div className="col-span-3">
                      <Switch checked={field.required} />
                    </div>
                    <div className="col-span-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rules Tab */}
        <TabsContent value="rules" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Issuance Rules</CardTitle>
              <CardDescription>Configure validation and expiry rules for this credential</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="expiry-enabled">Enable Expiry</Label>
                  <p className="text-sm text-muted-foreground">Credentials will expire after a set period</p>
                </div>
                <Switch id="expiry-enabled" checked={templateData.rules.expiryEnabled} />
              </div>

              {templateData.rules.expiryEnabled && (
                <div className="flex items-center justify-between">
                  <Label htmlFor="expiry-days" className="min-w-[200px]">Expiry Period (days)</Label>
                  <Input
                    id="expiry-days"
                    type="number"
                    defaultValue={templateData.rules.expiryDays}
                    className="max-w-[200px]"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="require-photo">Require Photo</Label>
                  <p className="text-sm text-muted-foreground">Holder must provide a photo ID</p>
                </div>
                <Switch id="require-photo" checked={templateData.rules.requirePhoto} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allow-revocation">Allow Revocation</Label>
                  <p className="text-sm text-muted-foreground">Issuer can revoke credentials after issuance</p>
                </div>
                <Switch id="allow-revocation" checked={templateData.rules.allowRevocation} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Card Design Tab */}
        <TabsContent value="card-design" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Design Controls</CardTitle>
                <CardDescription>Customize the visual appearance of the credential card</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="background-style">Background Style</Label>
                  <Select defaultValue={templateData.cardDesign.backgroundStyle}>
                    <SelectTrigger id="background-style">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">Solid Color</SelectItem>
                      <SelectItem value="gradient">Gradient</SelectItem>
                      <SelectItem value="pattern">Pattern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary-color"
                      type="color"
                      defaultValue={templateData.cardDesign.primaryColor}
                      className="w-20 h-10"
                    />
                    <Input
                      type="text"
                      defaultValue={templateData.cardDesign.primaryColor}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accent-color"
                      type="color"
                      defaultValue={templateData.cardDesign.accentColor}
                      className="w-20 h-10"
                    />
                    <Input
                      type="text"
                      defaultValue={templateData.cardDesign.accentColor}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-logo">Show Issuer Logo</Label>
                  <Switch id="show-logo" checked={templateData.cardDesign.showIssuerLogo} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-qr">Show QR Code</Label>
                  <Switch id="show-qr" checked={templateData.cardDesign.showQRCode} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo-upload">Logo Upload</Label>
                  <Input id="logo-upload" type="file" accept="image/*" />
                </div>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <div className="space-y-4">
              <Label>Live Preview</Label>
              <div className="aspect-[1.586/1] bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-2xl p-6 shadow-xl text-white">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="text-sm opacity-80 mb-1">Healthcare Professional</div>
                    <h3 className="text-2xl font-bold mb-4">{templateData.name}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm">
                      <div className="opacity-70">License Number</div>
                      <div className="font-mono font-semibold">HP-2024-12345</div>
                    </div>
                    <div className="text-sm">
                      <div className="opacity-70">Valid Until</div>
                      <div className="font-semibold">March 15, 2025</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="text-xs opacity-70">Issued by PRUUF</div>
                    {templateData.cardDesign.showQRCode && (
                      <div className="w-16 h-16 bg-white rounded"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-6 mt-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">Credential Preview</h3>
              <p className="text-sm text-muted-foreground">
                This is how the credential will appear to the holder
              </p>
            </div>

            {/* Full Card Preview */}
            <div className="aspect-[1.586/1] bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-2xl p-8 shadow-2xl text-white">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="text-base opacity-90 mb-2">Healthcare Professional</div>
                  <h3 className="text-3xl font-bold mb-6">{templateData.name}</h3>
                  
                  <div className="space-y-4 mt-8">
                    {templateData.fields.slice(0, 4).map((field) => (
                      <div key={field.id}>
                        <div className="text-sm opacity-70">{field.name}</div>
                        <div className="font-semibold mt-1">Sample Data</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-end mt-6">
                  <div className="space-y-1">
                    <div className="text-xs opacity-70">Issued by</div>
                    <div className="font-semibold">PRUUF Studio</div>
                  </div>
                  {templateData.cardDesign.showQRCode && (
                    <div className="w-20 h-20 bg-white rounded flex items-center justify-center">
                      <div className="text-black text-xs">QR</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button size="lg" variant="outline">
                Issue Test Credential
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
