"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import { Agent } from '../lib/data/agents'; // Ensure .tsx is not in the path

interface AgentCardProps {
  agent: Agent;
  isHovered: boolean;
  onClick: (agent: Agent) => void;
  onMouseEnter: (agentId: string) => void;
  onMouseLeave: () => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Card
          className={`border cursor-pointer transition-all duration-300 hover:shadow-md hover:border-pulse-200 ${
            isHovered ? 'transform -translate-y-1 shadow-md' : ''
          }`}
          onClick={() => onClick(agent)}
          onMouseEnter={() => onMouseEnter(agent.id)}
          onMouseLeave={onMouseLeave}
        >
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              isHovered
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
            } ${isHovered && agent.status === "Active" ? "bg-green-200 text-green-900" : ""}`}>
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
                        isHovered
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
                asChild
                variant="ghost"
                className="w-full mt-2 text-xs h-8 hover:bg-pulse-50 hover:text-pulse-700"
              >
                <Link href={`/agents/${agent.id}`}>
                  View Details <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
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
  );
}; 