import { Link } from "react-router-dom";
import { FileText, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentsGrid } from "@/components/RecentsGrid";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent">
          Welcome to SmartDocs
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create, manage, and organize your intelligent documents with AI-powered templates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-all duration-150 hover:-translate-y-1">
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>AI-Powered Creation</CardTitle>
            <CardDescription>
              Generate smart document templates using AI based on your descriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/smartdocs/create">
              <Button className="w-full" variant="default">
                Create SmartDoc
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-150 hover:-translate-y-1">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Template Library</CardTitle>
            <CardDescription>
              Choose from pre-built templates across various industries and use cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/smartdocs/create">
              <Button className="w-full" variant="outline">
                Browse Templates
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-150 hover:-translate-y-1">
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle>Quick Upload</CardTitle>
            <CardDescription>
              Upload existing documents and transform them into smart templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/smartdocs/create">
              <Button className="w-full" variant="outline">
                Upload Document
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recent Documents</h2>
        <RecentsGrid />
      </div>
    </div>
  );
}
