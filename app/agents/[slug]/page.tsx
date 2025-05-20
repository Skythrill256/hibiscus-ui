"use client"
import React from "react";
import Link  from "next/link";
import { useParams } from "next/navigation";
import { 
  Check, ChevronRight, ChevronLeft, 
  Database, Network, Activity, User, Zap 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

// Sample agents data - this would typically come from a central data store or API
const agents = [
  {
    id: "agent-1",
    name: "DataAnalyst-01",
    type: "Analytics",
    status: "Active",
    capabilities: ["Data processing", "Statistical analysis", "Visualization"],
    tags: ["Data", "Analytics", "AI"],
    createdBy: "System Admin",
    dateCreated: "2023-01-15",
    icon: <Database className="h-6 w-6 text-blue-500" />,
    description: "Specialized in processing large datasets and extracting valuable insights through advanced statistical methods.",
    lastUpdated: "2023-05-10",
    version: "1.2.5",
    usageCount: 1245,
    performanceScore: 92,
    compatibleSystems: ["Cloud Storage", "Database Systems", "Visualization Tools"],
    documentation: "https://docs.hibiscus.ai/agents/data-analyst-01"
  },
  {
    id: "agent-2",
    name: "NetworkGuard-42",
    type: "Security",
    status: "Active",
    capabilities: ["Threat detection", "Traffic analysis", "Authentication"],
    tags: ["Security", "Network", "Protection"],
    createdBy: "Security Team",
    dateCreated: "2023-02-28",
    icon: <Network className="h-6 w-6 text-green-500" />,
    description: "Monitors network traffic in real-time to identify and neutralize potential security threats before they cause damage.",
    lastUpdated: "2023-06-18",
    version: "2.0.1",
    usageCount: 3567,
    performanceScore: 97,
    compatibleSystems: ["Firewalls", "Network Appliances", "Security Scanners"],
    documentation: "https://docs.hibiscus.ai/agents/networkguard-42"
  },
  {
    id: "agent-3",
    name: "ProcessMonitor-7",
    type: "Monitoring",
    status: "Idle",
    capabilities: ["Resource tracking", "Performance optimization", "Anomaly detection"],
    tags: ["Monitoring", "Performance", "System"],
    createdBy: "DevOps Team",
    dateCreated: "2023-03-10",
    icon: <Activity className="h-6 w-6 text-pulse-500" />,
    description: "Tracks system resources and performance metrics to identify bottlenecks and optimize overall system performance.",
    lastUpdated: "2023-04-25",
    version: "1.7.3",
    usageCount: 2189,
    performanceScore: 88,
    compatibleSystems: ["Kubernetes", "Docker", "VM Environments"],
    documentation: "https://docs.hibiscus.ai/agents/process-monitor-7"
  },
  {
    id: "agent-4",
    name: "UserAssistant-23",
    type: "Support",
    status: "Active",
    capabilities: ["Query response", "Knowledge retrieval", "Task automation"],
    tags: ["Support", "Customer Service", "Automation"],
    createdBy: "Support Team",
    dateCreated: "2023-04-05",
    icon: <User className="h-6 w-6 text-amber-500" />,
    description: "Assists users by providing instant responses to queries, retrieving relevant information, and automating routine tasks.",
    lastUpdated: "2023-07-01",
    version: "3.1.0",
    usageCount: 7834,
    performanceScore: 94,
    compatibleSystems: ["CRM Systems", "Help Desk Solutions", "Chat Applications"],
    documentation: "https://docs.hibiscus.ai/agents/user-assistant-23"
  },
  {
    id: "agent-5",
    name: "PowerOptimizer-9",
    type: "Utilities",
    status: "Standby",
    capabilities: ["Energy management", "Load balancing", "Consumption analysis"],
    tags: ["Power", "Optimization", "Green"],
    createdBy: "Infrastructure Team",
    dateCreated: "2023-05-20",
    icon: <Zap className="h-6 w-6 text-purple-500" />,
    description: "Optimizes energy usage through intelligent load balancing and in-depth consumption analysis to reduce costs.",
    lastUpdated: "2023-06-15",
    version: "1.0.4",
    usageCount: 956,
    performanceScore: 91,
    compatibleSystems: ["Power Management Systems", "Cloud Infrastructure", "Data Centers"],
    documentation: "https://docs.hibiscus.ai/agents/power-optimizer-9"
  },
  {
    id: "agent-6",
    name: "DataSync-15",
    type: "Integration",
    status: "Active",
    capabilities: ["Data synchronization", "Format conversion", "Schema mapping"],
    tags: ["Integration", "Data", "Sync"],
    createdBy: "Integration Team",
    dateCreated: "2023-06-10",
    icon: <Database className="h-6 w-6 text-indigo-500" />,
    description: "Manages data synchronization between different systems, handling format conversions and schema mappings automatically.",
    lastUpdated: "2023-07-05",
    version: "2.3.1",
    usageCount: 4321,
    performanceScore: 95,
    compatibleSystems: ["CRM", "ERP", "Data Warehouses", "Legacy Systems"],
    documentation: "https://docs.hibiscus.ai/agents/data-sync-15"
  }
];

const AgentDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const agent = agents.find(a => a.id === slug);
  
  const handleIntegrationClick = () => {
    toast("Feature Coming Soon", {
      description: "The Hibiscus agent integration feature will be available soon!",
      duration: 5000,
    });
  };

  if (!agent) {
    return (
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Agent not found</h2>
          <p className="mb-6 text-gray-600">The agent you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link href="/">
              <ChevronLeft className="h-4 w-4 mr-2" /> Back to Registry
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link href="/">
              <ChevronLeft className="h-4 w-4 mr-2" /> Back to Registry
            </Link>
          </Button>
          
          <div className="flex items-start gap-4 mb-6">
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              {agent.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{agent.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <Badge className={`px-2 ${
                  agent.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                  agent.status === "Idle" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : 
                  "bg-gray-100 text-gray-800 hover:bg-gray-100"
                }`}>
                  {agent.status}
                </Badge>
                <span className="text-sm text-gray-500">Version {agent.version}</span>
              </div>
              <p className="text-gray-600 mt-2 max-w-2xl">{agent.description}</p>
            </div>
            <Button onClick={handleIntegrationClick} className="bg-pulse-600 hover:bg-pulse-700">
              Integrate Agent
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-pulse-500 data-[state=active]:bg-transparent rounded-none py-3 px-6 text-sm">
                Details
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:border-b-2 data-[state=active]:border-pulse-500 data-[state=active]:bg-transparent rounded-none py-3 px-6 text-sm">
                Performance
              </TabsTrigger>
              <TabsTrigger value="compatibility" className="data-[state=active]:border-b-2 data-[state=active]:border-pulse-500 data-[state=active]:bg-transparent rounded-none py-3 px-6 text-sm">
                Compatibility
              </TabsTrigger>
              <TabsTrigger value="documentation" className="data-[state=active]:border-b-2 data-[state=active]:border-pulse-500 data-[state=active]:bg-transparent rounded-none py-3 px-6 text-sm">
                Documentation
              </TabsTrigger>
            </TabsList>
            
            <div className="p-6">
              <TabsContent value="details" className="mt-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-sm mb-3">Agent Information</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Type:</span>
                          <span className="font-medium">{agent.type}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Created by:</span>
                          <span className="font-medium">{agent.createdBy}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Date created:</span>
                          <span className="font-medium">{agent.dateCreated}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Last updated:</span>
                          <span className="font-medium">{agent.lastUpdated}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Usage count:</span>
                          <span className="font-medium">{agent.usageCount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-sm mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {agent.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="bg-white">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-sm mb-3">Capabilities</h3>
                      <ul className="space-y-2">
                        {agent.capabilities.map((capability, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{capability}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 mt-2 bg-gradient-to-r from-pulse-50 to-pulse-100 border border-pulse-200 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white bg-opacity-70 rounded-lg">
                      <Zap className="h-5 w-5 text-pulse-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-pulse-800 mb-1">Coming Soon: Direct Integration</h3>
                      <p className="text-sm text-pulse-700">
                        Hibiscus will enable direct agent integration, letting you deploy and manage agents across your network with full mTLS security and comprehensive monitoring.
                      </p>
                      <Button className="mt-3 bg-white text-pulse-700 border border-pulse-300 hover:bg-pulse-50" 
                        onClick={handleIntegrationClick}>
                        Join Early Access
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="mt-0 space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Performance Score</h3>
                    <Badge className={`px-3 py-1 ${
                      agent.performanceScore >= 90 ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                      agent.performanceScore >= 70 ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : 
                      "bg-red-100 text-red-800 hover:bg-red-100"
                    }`}>
                      {agent.performanceScore}%
                    </Badge>
                  </div>
                  
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        agent.performanceScore >= 90 ? "bg-green-500" : 
                        agent.performanceScore >= 70 ? "bg-amber-500" : 
                        "bg-red-500"
                      }`}
                      style={{ width: `${agent.performanceScore}%` }}
                    />
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600">
                    <p>This agent is performing well with excellent response times and high accuracy rates across all operations.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-center">
                      <h4 className="text-sm font-medium text-gray-500">Response Time</h4>
                      <p className="text-2xl font-bold mt-2">45ms</p>
                      <p className="text-xs text-green-600 mt-1">12% faster than average</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-center">
                      <h4 className="text-sm font-medium text-gray-500">Success Rate</h4>
                      <p className="text-2xl font-bold mt-2">99.7%</p>
                      <p className="text-xs text-green-600 mt-1">2.3% above SLA</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-center">
                      <h4 className="text-sm font-medium text-gray-500">Error Rate</h4>
                      <p className="text-2xl font-bold mt-2">0.3%</p>
                      <p className="text-xs text-green-600 mt-1">1.7% below threshold</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="compatibility" className="mt-0 space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-sm mb-3">Compatible Systems</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {agent.compatibleSystems.map((system, idx) => (
                      <div key={idx} className="bg-white p-3 rounded border border-gray-200 flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">{system}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-sm mb-3">Integration Options</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="text-sm font-medium">API Integration</p>
                      <p className="text-xs text-gray-600 mt-1">Integrate via REST API for maximum flexibility</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="text-sm font-medium">SDK Integration</p>
                      <p className="text-xs text-gray-600 mt-1">Use our client libraries for quick implementation</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="text-sm font-medium">Container Deployment</p>
                      <p className="text-xs text-gray-600 mt-1">Deploy as a container for isolated execution</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="documentation" className="mt-0">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-sm mb-3">Documentation</h3>
                  <div className="text-sm">
                    <p className="mb-3 text-gray-600">
                      Access comprehensive documentation to learn more about this agent's capabilities and integration options.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card className="p-4">
                        <h4 className="text-sm font-medium mb-2">API Reference</h4>
                        <p className="text-xs text-gray-600 mb-3">Complete API documentation for all endpoints</p>
                        <Button size="sm" variant="outline" className="w-full" asChild>
                          <a href={agent.documentation} target="_blank" rel="noopener noreferrer">
                            View API Docs
                          </a>
                        </Button>
                      </Card>
                      
                      <Card className="p-4">
                        <h4 className="text-sm font-medium mb-2">Integration Guide</h4>
                        <p className="text-xs text-gray-600 mb-3">Step-by-step guide to integrate this agent</p>
                        <Button size="sm" variant="outline" className="w-full" asChild>
                          <a href={agent.documentation} target="_blank" rel="noopener noreferrer">
                            View Guide
                          </a>
                        </Button>
                      </Card>
                      
                      <Card className="p-4">
                        <h4 className="text-sm font-medium mb-2">Code Samples</h4>
                        <p className="text-xs text-gray-600 mb-3">Example code for common use cases</p>
                        <Button size="sm" variant="outline" className="w-full" asChild>
                          <a href={agent.documentation} target="_blank" rel="noopener noreferrer">
                            View Samples
                          </a>
                        </Button>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AgentDetailsPage;
