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
  const filteredAgents = agents.filter(agent => {
    // Search filter
    const matchesSearch = 
      searchTerm === "" ||
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      agent.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.capabilities.some(cap => cap.toLowerCase().includes(searchTerm.toLowerCase()));
      
    // Category filter
    const matchesType = 
      filters.type.length === 0 || 
      filters.type.includes(agent.type);
      
    // Tags filter
    const matchesTags = 
      filters.tags.length === 0 || 
      filters.tags.some(tag => agent.tags.includes(tag));
      
    // Created by filter
    const matchesCreatedBy = 
      filters.createdBy.length === 0 || 
      filters.createdBy.includes(agent.createdBy);
      
    // Date created filter (simplified for demo)
    const matchesDateCreated = 
      filters.dateCreated.length === 0 || 
      filters.dateCreated.includes(agent.dateCreated);
      
    return matchesSearch && matchesType && matchesTags && matchesCreatedBy && matchesDateCreated;
  });

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
    <section className="w-full py-8 relative animate-on-scroll ">
       <div className="w-full text-center mb-6">
          <h1 className="section-title font-bold mb-2 text-black text-5xl">Hibiscus Registry</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Search and discover AI agents across the Pebble network ecosystem.
          </p>
        </div>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
       

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters */}
         <div className="flex flex-col lg:flex-row gap-6 min-h-[70vh] lg:items-center lg:justify-center">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-24 w-[300px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-7"
                  onClick={() => setFilters({type: [], tags: [], createdBy: [], dateCreated: []})}
                >
                  Clear all
                </Button>
              </div>
              
              {/* Category filter */}
              <div className="mb-3 border-b border-gray-100 pb-3">
                <div 
                  className="flex items-center justify-between cursor-pointer py-1" 
                  onClick={() => toggleFilterSection('category')}
                >
                  <span className="font-medium text-sm flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Categories
                  </span>
                  {expandedFilters.category ? 
                    <ChevronUp className="h-4 w-4" /> : 
                    <ChevronDown className="h-4 w-4" />
                  }
                </div>
                
                {expandedFilters.category && (
                  <div className="mt-2 space-y-1">
                    {getUniqueValues('type').map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${type}`} 
                          checked={filters.type.includes(type)}
                          onCheckedChange={() => toggleFilter('type', type)}
                        />
                        <label 
                          htmlFor={`category-${type}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Tags filter */}
              <div className="mb-3 border-b border-gray-100 pb-3">
                <div 
                  className="flex items-center justify-between cursor-pointer py-1" 
                  onClick={() => toggleFilterSection('tags')}
                >
                  <span className="font-medium text-sm flex items-center gap-2">
                    <Tag className="h-4 w-4" /> Tags
                  </span>
                  {expandedFilters.tags ? 
                    <ChevronUp className="h-4 w-4" /> : 
                    <ChevronDown className="h-4 w-4" />
                  }
                </div>
                
                {expandedFilters.tags && (
                  <div className="mt-2 space-y-1">
                    {getUniqueTags().map(tag => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`tag-${tag}`} 
                          checked={filters.tags.includes(tag)}
                          onCheckedChange={() => toggleFilter('tags', tag)}
                        />
                        <label 
                          htmlFor={`tag-${tag}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Created by filter */}
              <div className="mb-3 border-b border-gray-100 pb-3">
                <div 
                  className="flex items-center justify-between cursor-pointer py-1" 
                  onClick={() => toggleFilterSection('createdBy')}
                >
                  <span className="font-medium text-sm flex items-center gap-2">
                    <User className="h-4 w-4" /> Created By
                  </span>
                  {expandedFilters.createdBy ? 
                    <ChevronUp className="h-4 w-4" /> : 
                    <ChevronDown className="h-4 w-4" />
                  }
                </div>
                
                {expandedFilters.createdBy && (
                  <div className="mt-2 space-y-1">
                    {getUniqueValues('createdBy').map(creator => (
                      <div key={creator} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`creator-${creator}`} 
                          checked={filters.createdBy.includes(creator)}
                          onCheckedChange={() => toggleFilter('createdBy', creator)}
                        />
                        <label 
                          htmlFor={`creator-${creator}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {creator}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Date created filter */}
              <div className="mb-3">
                <div 
                  className="flex items-center justify-between cursor-pointer py-1" 
                  onClick={() => toggleFilterSection('dateCreated')}
                >
                  <span className="font-medium text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Date Created
                  </span>
                  {expandedFilters.dateCreated ? 
                    <ChevronUp className="h-4 w-4" /> : 
                    <ChevronDown className="h-4 w-4" />
                  }
                </div>
                
                {expandedFilters.dateCreated && (
                  <div className="mt-2 space-y-1">
                    {getUniqueValues('dateCreated').map(date => (
                      <div key={date} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`date-${date}`} 
                          checked={filters.dateCreated.includes(date)}
                          onCheckedChange={() => toggleFilter('dateCreated', date)}
                        />
                        <label 
                          htmlFor={`date-${date}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {date}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Active filters:</span>
                  <span className="text-sm font-medium">
                    {Object.values(filters).reduce((acc, arr) => acc + arr.length, 0)}
                  </span>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-1">
                  {Object.entries(filters).flatMap(([category, values]) =>
                    values.map(value => (
                      <Badge 
                        key={`${category}-${value}`} 
                        variant="outline"
                        className="flex items-center gap-1 bg-gray-50"
                      >
                        {value}
                        <button 
                          onClick={() => toggleFilter(category, value)}
                          className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                        >
                          <span className="sr-only">Remove</span>
                          <Check className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex-1">
            <div className="w-full relative max-w-6xl mb-6 group" onClick={focusSearch}>
              <div className="w-full absolute inset-0 bg-pulse-200 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-pulse-500 transition-colors duration-300" 
              />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search by agent name, type, or capabilities..."
                className="pl-10 py-6 text-base border-gray-200 hover:border-pulse-300 focus:border-pulse-400 focus:ring focus:ring-pulse-100 transition-all duration-300 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {filteredAgents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAgents.map(agent => (
                  <HoverCard key={agent.id} openDelay={200} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <Card 
                        className={`border cursor-pointer transition-all duration-300 hover:shadow-md hover:border-pulse-200 ${
                          hoveredAgent === agent.id ? 'transform -translate-y-1 shadow-md' : ''
                        }`}
                        onClick={() => handleAgentClick(agent)}
                        onMouseEnter={() => setHoveredAgent(agent.id)}
                        onMouseLeave={() => setHoveredAgent(null)}
                      >
                        <CardHeader className="flex flex-row items-center gap-3 pb-2">
                          <div className={`p-2 rounded-lg transition-all duration-300 ${
                            hoveredAgent === agent.id 
                            ? 'bg-pulse-100 animate-pulse' 
                            : 'bg-gray-100'
                          }`}>
                            {agent.icon}
                          </div>
                          <div>
                            <CardTitle className="text-base">{agent.name}</CardTitle>
                            <p className="text-xs text-gray-500">{agent.type}</p>
                          </div>
                          <div className={`ml-auto px-2 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
                            agent.status === "Active" ? "bg-green-100 text-green-800" : 
                            agent.status === "Idle" ? "bg-amber-100 text-amber-800" : 
                            "bg-gray-100 text-gray-800"
                          } ${hoveredAgent === agent.id && agent.status === "Active" ? "bg-green-200 text-green-900" : ""}`}>
                            {agent.status}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-xs text-gray-600 line-clamp-2">{agent.description}</p>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Capabilities:</p>
                              <div className="flex flex-wrap gap-1">
                                {agent.capabilities.map((capability, idx) => (
                                  <span 
                                    key={idx} 
                                    className={`text-xs px-2 py-0.5 rounded-full transition-colors duration-300 ${
                                      hoveredAgent === agent.id 
                                        ? 'bg-pulse-50 text-pulse-700 border border-pulse-200' 
                                        : 'bg-gray-100 border border-gray-200'
                                    }`}
                                  >
                                    {capability}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              className="w-full mt-2 text-xs h-8 hover:bg-pulse-50 hover:text-pulse-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAgentClick(agent);
                              }}
                            >
                              View Details <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 p-0 overflow-hidden">
                      <div className="p-4 bg-gradient-to-r from-gray-50 to-white">
                        <h4 className="font-medium text-sm mb-1">{agent.name}</h4>
                        <p className="text-xs text-gray-600">{agent.description}</p>
                      </div>
                      <div className="bg-gray-50 p-2 flex justify-between items-center">
                        <span className="text-xs text-gray-500">Performance Score: {agent.performanceScore}%</span>
                        <span className="text-xs font-medium text-pulse-600">View details</span>
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

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedAgent && (
              <>
                <DialogHeader className="space-y-2 border-b pb-4">
                  <DialogTitle className="flex items-center gap-3">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      {selectedAgent.icon}
                    </div>
                    <div>
                      {selectedAgent.name}
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`px-2 ${
                          selectedAgent.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                          selectedAgent.status === "Idle" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : 
                          "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }`}>
                          {selectedAgent.status}
                        </Badge>
                        <span className="text-xs text-gray-500">Version {selectedAgent.version}</span>
                      </div>
                    </div>
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-600">
                    {selectedAgent.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="py-2">
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="w-full justify-start mb-4 border-b rounded-none h-auto p-0 bg-transparent">
                      <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-pulse-500 data-[state=active]:bg-transparent rounded-none py-2 px-4 text-sm">
                        Details
                      </TabsTrigger>
                      <TabsTrigger value="performance" className="data-[state=active]:border-b-2 data-[state=active]:border-pulse-500 data-[state=active]:bg-transparent rounded-none py-2 px-4 text-sm">
                        Performance
                      </TabsTrigger>
                      <TabsTrigger value="compatibility" className="data-[state=active]:border-b-2 data-[state=active]:border-pulse-500 data-[state=active]:bg-transparent rounded-none py-2 px-4 text-sm">
                        Compatibility
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium text-sm mb-3">Agent Information</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Type:</span>
                                <span className="font-medium">{selectedAgent.type}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Created by:</span>
                                <span className="font-medium">{selectedAgent.createdBy}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Date created:</span>
                                <span className="font-medium">{selectedAgent.dateCreated}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Last updated:</span>
                                <span className="font-medium">{selectedAgent.lastUpdated}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Usage count:</span>
                                <span className="font-medium">{selectedAgent.usageCount.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium text-sm mb-3">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedAgent.tags.map((tag, idx) => (
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
                              {selectedAgent.capabilities.map((capability, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{capability}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium text-sm mb-3">Documentation</h3>
                            <div className="text-sm">
                              <p className="mb-3 text-gray-600">
                                Access comprehensive documentation to learn more about this agent's capabilities and integration options.
                              </p>
                              <Button variant="outline" size="sm" className="w-full">
                                <a href={selectedAgent.documentation} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full">
                                  View Documentation
                                  <ChevronRight className="ml-2 h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="performance" className="mt-0">
                      <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium">Performance Score</h3>
                            <Badge className={`px-3 py-1 ${
                              selectedAgent.performanceScore >= 90 ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                              selectedAgent.performanceScore >= 70 ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : 
                              "bg-red-100 text-red-800 hover:bg-red-100"
                            }`}>
                              {selectedAgent.performanceScore}%
                            </Badge>
                          </div>
                          
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                selectedAgent.performanceScore >= 90 ? "bg-green-500" : 
                                selectedAgent.performanceScore >= 70 ? "bg-amber-500" : 
                                "bg-red-500"
                              }`}
                              style={{ width: `${selectedAgent.performanceScore}%` }}
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
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="compatibility" className="mt-0">
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium text-sm mb-3">Compatible Systems</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {selectedAgent.compatibleSystems.map((system, idx) => (
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
                      </div>
                    </TabsContent>
                  </Tabs>
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
                      <Button className="mt-3 bg-white text-pulse-700 border border-pulse-300 hover:bg-pulse-50">
                        Join Early Access
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default page;
