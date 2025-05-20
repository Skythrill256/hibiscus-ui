"use client"

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { toast } from "sonner";
import { Search, User, Network, Database, Activity, Zap, Filter, Calendar, Tag, Check, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowLeft,ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import FilterBarUI from "@/components/FilterBarUI";
import { 
  Mail, 
  Lock, 
  LogIn, 
  UserPlus 
} from "lucide-react";
// Sample agents data
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

// Get unique values for filter categories
const getUniqueValues = (key: string) => {
  return [...new Set(agents.map(agent => agent[key as keyof typeof agent]))]
    .filter((value): value is string => typeof value === 'string');
};

const getUniqueTags = () => {
  const allTags = agents.flatMap(agent => agent.tags);
  return [...new Set(allTags)];
};

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<null | typeof agents[0]>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  // Add this function inside your page component, before the return statement
const getGradientForAgent = (type: string) => {
  const gradients = {
    'Analytics': 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
    'Security': 'linear-gradient(135deg, #004d40 0%, #00695c 100%)',
    'Monitoring': 'linear-gradient(135deg, #311b92 0%, #4527a0 100%)',
    'Support': 'linear-gradient(135deg, #b71c1c 0%, #c62828 100%)',
    'Utilities': 'linear-gradient(135deg, #006064 0%, #00838f 100%)',
    'Integration': 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
    // Add a default gradient for any other types
    'default': 'linear-gradient(135deg, #37474f 0%, #455a64 100%)'
  };
  
  return gradients[type as keyof typeof gradients] || gradients.default;
};

  const handleFilterClick = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.every(filter => agent.capabilities.includes(filter));
    return matchesSearch && matchesFilters;
  });
  // Filter states
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    category: true,
    tags: true,
    createdBy: false,
    dateCreated: false
  });
  const [filters, setFilters] = useState<Record<string, string[]>>({
    type: [],
    tags: [],
    createdBy: [],
    dateCreated: []
  });
  
  // Toggle a filter section
  const toggleFilterSection = (section: string) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Toggle a filter value
  const toggleFilter = (category: string, value: string) => {
    setFilters(prev => {
      const current = prev[category] || [];
      return {
        ...prev,
        [category]: current.includes(value)
          ? current.filter(item => item !== value)
          : [...current, value]
      };
    });
  };

  // Handle search and filters
 

  const handleAgentClick = (agent: typeof agents[0]) => {
    setSelectedAgent(agent);
    setDialogOpen(true);
  };

  const focusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <section className="w-full h-full py-8 relative animate-on-scroll bg-[#0D0620]">
        <header className="text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-10">
           
            
            <div className="w-full flex flex-col items-center text-center">
              <h1 className="text-white text-4xl font-bold bg-clip-text tracking-tight">
                Hibiscus Registry
              </h1>
              <p className="mt-2 text-white max-w-2xl">
                Discover and connect with powerful AI agents across the Pebble network ecosystem
              </p>
            </div>
            
            <div 
              className="w-fit flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                className="flex items-center justify-center group w-full sm:w-auto text-center border-white bg-transparent text-white font-semibold shadow-lg transition-all duration-200 px-20 rounded-full py-5"
               
                onClick={() => setShowLoginDialog(true)}
              >
                Create Agent
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
       

        <div className="w-full flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters */}
        

          <div className="w-full ">
            <div className="w-full relative mb-6 group" onClick={focusSearch}>
              <div className="w-full absolute inset-0 bg-pulse-200 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-pulse-500 transition-colors duration-300" 
              />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search by agent name, type, or capabilities..."
                className="text-white pl-10 py-6 text-base border-gray-200 hover:border-pulse-300 focus:border-pulse-400 focus:ring focus:ring-pulse-100 transition-all duration-300 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
                 <FilterBarUI selectedFilters={selectedFilters} onFilterClick={handleFilterClick} />
            {filteredAgents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                

{filteredAgents.map(agent => (
  <HoverCard key={agent.id} openDelay={200} closeDelay={100}>
    <HoverCardTrigger>
      <Card 
        className={`border cursor-pointer transition-all duration-300 hover:shadow-md hover:border-pulse-200 relative overflow-hidden
          ${hoveredAgent === agent.id ? 'transform -translate-y-1 shadow-md' : ''}
        `}
        style={{
          background: getGradientForAgent(agent.type),
          borderColor: 'rgba(255,255,255,0.1)'
        }}
        onClick={() => handleAgentClick(agent)}
        onMouseEnter={() => setHoveredAgent(agent.id)}
        onMouseLeave={() => setHoveredAgent(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"/>
        <CardHeader className="flex flex-row items-center gap-3 pb-2 relative z-10">
          <div className={`p-2 rounded-lg transition-all duration-300 backdrop-blur-sm bg-white/10`}>
            {agent.icon}
          </div>
          <div>
            <CardTitle className="text-base text-white">{agent.name}</CardTitle>
            <p className="text-xs text-gray-200">{agent.type}</p>
          </div>
          <div className={`ml-auto px-2 py-1 rounded-full text-xs font-medium transition-colors duration-300 
            ${agent.status === "Active" ? "bg-green-500/20 text-green-200" : 
              agent.status === "Idle" ? "bg-amber-500/20 text-amber-200" : 
              "bg-gray-500/20 text-gray-200"}
          `}>
            {agent.status}
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-2">
            <p className="text-xs text-gray-200 line-clamp-2">{agent.description}</p>
            <div>
              <p className="text-xs text-gray-300 mb-1">Capabilities:</p>
              <div className="flex flex-wrap gap-1">
                {agent.capabilities.map((capability, idx) => (
                  <span 
                    key={idx} 
                    className={`text-xs px-2 py-0.5 rounded-full transition-colors duration-300
                      backdrop-blur-sm bg-white/10 border border-white/20 text-white
                    `}
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full mt-2 text-xs h-8 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              View Details <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </HoverCardTrigger>
     <HoverCardContent 
      className="w-80 p-0 overflow-hidden border border-white/10"
      style={{
        background: getGradientForAgent(agent.type),
      }}
    >
      <div className="p-4 backdrop-blur-sm bg-black/10">
        <h4 className="font-medium text-sm mb-1 text-white">{agent.name}</h4>
        <p className="text-xs text-gray-200">{agent.description}</p>
      </div>
      <div className="backdrop-blur-sm bg-white/5 p-2 flex justify-between items-center border-t border-white/10">
        <span className="text-xs text-gray-200">
          Performance Score: 
          <span className="font-medium ml-1">{agent.performanceScore}%</span>
        </span>
        <span className="text-xs font-medium text-white hover:text-gray-200 transition-colors">
          View details
        </span>
      </div>
    </HoverCardContent>
  </HoverCard>
))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-100 shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  No agents found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  No agents match your search for "{searchTerm}"{Object.values(filters).some(arr => arr.length > 0) && " with the selected filters"}. Try adjusting your search terms or filters.
                </p>
              </div>
            )}
          </div>
        </div>

        
      </div>
      
      

{/* Login Required Dialog */}
<Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold text-center">Welcome to Hibiscus</DialogTitle>
      <DialogDescription className="text-center">
        Login to create and manage AI agents
      </DialogDescription>
    </DialogHeader>

    <Tabs defaultValue="login" className="w-full mt-4">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>

      <TabsContent value="login" className="space-y-4">
        <div className="space-y-4 p-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password"
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <Button variant="link" className="text-sm text-pulse-600">
              Forgot password?
            </Button>
          </div>

          <Button 
            className="w-full bg-black"
            onClick={() => {
              setShowLoginDialog(false);
              router.push("/agents/create");
            }}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="register" className="space-y-4">
        <div className="space-y-4 p-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input 
                id="name" 
                placeholder="Enter your full name"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input 
                id="register-email" 
                type="email" 
                placeholder="Enter your email"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input 
                id="register-password" 
                type="password" 
                placeholder="Create a password"
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          <Button 
            className="w-full bg-black"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Create Account
          </Button>
        </div>
      </TabsContent>
    </Tabs>

    <div className="mt-6 pt-6 border-t border-gray-100">
      <p className="text-center text-sm text-gray-500">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  </DialogContent>
</Dialog>
{/* Agent Details Dialog */}
{/* Agent Details Dialog */}
// Find and replace the Dialog component with this updated version

<Dialog open={selectedAgent !== null} onOpenChange={() => setSelectedAgent(null)}>
  <DialogContent 
    className="max-w-4xl border border-white/10 overflow-hidden"
    style={{
      background: selectedAgent ? getGradientForAgent(selectedAgent.type) : undefined,
    }}
  >
    {selectedAgent && (
      <>
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="p-3 backdrop-blur-sm bg-white/10 rounded-lg">
              {selectedAgent.icon}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-white">{selectedAgent.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={
                  `backdrop-blur-sm ${
                    selectedAgent.status === "Active" ? "bg-green-500/20 text-green-200" : 
                    selectedAgent.status === "Idle" ? "bg-amber-500/20 text-amber-200" : 
                    "bg-gray-500/20 text-gray-200"
                  }`
                }>
                  {selectedAgent.status}
                </Badge>
                <span className="text-sm text-gray-200">Version {selectedAgent.version}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="font-semibold mb-2 text-white">Description</h3>
              <p className="text-gray-200">{selectedAgent.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-white">Capabilities</h3>
              <div className="flex flex-wrap gap-2">
                {selectedAgent.capabilities.map((capability, idx) => (
                  <Badge 
                    key={idx} 
                    className="backdrop-blur-sm bg-white/10 border border-white/20 text-white"
                  >
                    {capability}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-white">Compatible Systems</h3>
              <div className="flex flex-wrap gap-2">
                {selectedAgent.compatibleSystems.map((system, idx) => (
                  <span 
                    key={idx} 
                    className="text-sm px-2 py-1 backdrop-blur-sm bg-white/10 rounded-md text-white"
                  >
                    {system}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-white">Performance</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-200">Score</span>
                  <span className="font-medium text-white">{selectedAgent.performanceScore}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-200">Usage Count</span>
                  <span className="font-medium text-white">{selectedAgent.usageCount}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-200">Created By</h4>
                <p className="text-white">{selectedAgent.createdBy}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-200">Date Created</h4>
                <p className="text-white">{selectedAgent.dateCreated}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-200">Last Updated</h4>
                <p className="text-white">{selectedAgent.lastUpdated}</p>
              </div>
            </div>
          </div>

          <div className="w-full flex gap-2">
            <Button 
              className="w-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20"
              asChild
            >
              <a href={selectedAgent.documentation} target="_blank" rel="noopener noreferrer">
                Connect Agent
              </a>
            </Button>
            <Button 
              variant="outline" 
              className="w-full backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white border-white/20"
              onClick={() => setSelectedAgent(null)}
            >
              Close
            </Button>
          </div>
        </div>
      </>
    )}
  </DialogContent>
</Dialog>
    </section>
  );
};

export default page;
