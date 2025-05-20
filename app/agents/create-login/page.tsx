"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Globe, Link as LinkIcon, Server, Tags, FileText, Bot, Code } from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    documentationUrl: "",
    capabilities: [{ name: "", description: "" }],
    domains: [] as string[],
    tags: [] as string[],
    metadata: {
      framework: "",
      programming_language: "",
      version: "",
      supported_languages: [] as string[]
    },
    deployment_type: "cloud",
    deployment_url: "",
    deployment_region: "global"
  });

  // ... existing login handler code ...

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData); // For debugging
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 sm:p-8">
      <div className="container max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Registry
        </Link>

        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">AI Agent Creation</CardTitle>
            <CardDescription>Configure your new AI assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateAgent} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Agent Name</Label>
                  <div className="relative">
                    <Bot className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input 
                      id="name"
                      placeholder="ChatGPT Assistant"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    className="w-full min-h-[100px] px-4 py-2 border rounded-md"
                    placeholder="AI assistant powered by OpenAI"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documentationUrl">Documentation URL</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input 
                      id="documentationUrl"
                      type="url"
                      placeholder="https://docs.youragent.com"
                      className="pl-10"
                      value={formData.documentationUrl}
                      onChange={(e) => setFormData({...formData, documentationUrl: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Technical Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="framework">Framework</Label>
                    <div className="relative">
                      <Code className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input 
                        id="framework"
                        placeholder="OpenAI GPT"
                        className="pl-10"
                        value={formData.metadata.framework}
                        onChange={(e) => setFormData({
                          ...formData, 
                          metadata: {...formData.metadata, framework: e.target.value}
                        })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="version">Version</Label>
                    <Input 
                      id="version"
                      placeholder="1.0.0"
                      value={formData.metadata.version}
                      onChange={(e) => setFormData({
                        ...formData, 
                        metadata: {...formData.metadata, version: e.target.value}
                      })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deployment_type">Deployment Type</Label>
                  <Select 
                    value={formData.deployment_type}
                    onValueChange={(value) => setFormData({...formData, deployment_type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select deployment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cloud">Cloud</SelectItem>
                      <SelectItem value="on-premise">On-Premise</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <div className="relative">
                    <Tags className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input 
                      id="tags"
                      placeholder="LLM, OpenAI, Assistant"
                      className="pl-10"
                      value={formData.tags.join(", ")}
                      onChange={(e) => setFormData({
                        ...formData, 
                        tags: e.target.value.split(",").map(tag => tag.trim())
                      })}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Agent..." : "Create Agent"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}