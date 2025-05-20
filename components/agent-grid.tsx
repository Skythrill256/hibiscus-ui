"use client";

import React from 'react';
import { Agent } from '../lib/data/agents';
import { AgentCard } from './agent-card';
import { Search } from 'lucide-react'; // For the 'No agents found' message

interface AgentGridProps {
  filteredAgents: Agent[];
  hoveredAgent: string | null;
  handleAgentClick: (agent: Agent) => void;
  setHoveredAgent: (agentId: string | null) => void; // Or individual handlers
  searchTerm: string;
  activeFilterCount: number;
}

export const AgentGrid: React.FC<AgentGridProps> = ({
  filteredAgents,
  hoveredAgent,
  handleAgentClick,
  setHoveredAgent,
  searchTerm,
  activeFilterCount
}) => {
  if (filteredAgents.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            isHovered={hoveredAgent === agent.id}
            onClick={handleAgentClick} // Pass handleAgentClick directly
            onMouseEnter={() => setHoveredAgent(agent.id)}
            onMouseLeave={() => setHoveredAgent(null)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-12 bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <Search className="h-6 w-6 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-700 mb-1">
        No agents found
      </h3>
      <p className="text-gray-500 max-w-md mx-auto">
        No agents match your search for "{searchTerm}"
        {activeFilterCount > 0 && " with the selected filters"}.
        Try adjusting your search terms or filters.
      </p>
    </div>
  );
}; 