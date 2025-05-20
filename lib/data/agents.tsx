import React from "react";
import { Database, Network, Activity, User, Zap } from "lucide-react";

export interface Agent {
  id: string;
  name: string;
  type: string;
  status: string;
  capabilities: string[];
  tags: string[];
  createdBy: string;
  dateCreated: string;
  icon: React.ReactElement;
  description: string;
  lastUpdated: string;
  version: string;
  usageCount: number;
  performanceScore: number;
  compatibleSystems: string[];
  documentation: string;
}

export const agents: Agent[] = [
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