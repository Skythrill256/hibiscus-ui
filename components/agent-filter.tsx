"use client";

import React from 'react';
import { Agent } from '../lib/data/agents'; // Ensure .tsx is not in the path
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Filter, User, Calendar, Tag, ChevronDown, ChevronUp, Check } from "lucide-react";

interface AgentFilterProps {
  agents: Agent[];
  filters: Record<string, string[]>;
  expandedFilters: Record<string, boolean>;
  onToggleFilterSection: (section: string) => void;
  onToggleFilter: (category: string, value: string) => void;
  onClearAllFilters: () => void;
}

// Helper function to get unique string values for a given key from agents
const getUniqueValues = (agentsList: Agent[], key: keyof Agent): string[] => {
  const values = new Set<string>();
  for (const agent of agentsList) {
    const value = agent[key];
    if (typeof value === 'string') {
      values.add(value);
    }
    // Add other type handling if necessary, e.g., for arrays of strings if a key could be string[]
  }
  return Array.from(values);
};

// Helper function to get all unique tags from agents
const getUniqueTags = (agentsList: Agent[]): string[] => {
  const allTags = new Set<string>();
  for (const agent of agentsList) {
    if (Array.isArray(agent.tags)) {
      agent.tags.forEach(tag => allTags.add(tag));
    }
  }
  return Array.from(allTags);
};

export const AgentFilter: React.FC<AgentFilterProps> = ({
  agents,
  filters,
  expandedFilters,
  onToggleFilterSection,
  onToggleFilter,
  onClearAllFilters,
}) => {
  const uniqueTypes = getUniqueValues(agents, 'type');
  const uniqueCreators = getUniqueValues(agents, 'createdBy');
  const uniqueDates = getUniqueValues(agents, 'dateCreated');
  const allTags = getUniqueTags(agents);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-24 w-[300px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-7"
          onClick={onClearAllFilters}
        >
          Clear all
        </Button>
      </div>

      {/* Category filter */}
      <div className="mb-3 border-b border-gray-100 pb-3">
        <div
          className="flex items-center justify-between cursor-pointer py-1"
          onClick={() => onToggleFilterSection('category')}
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
            {uniqueTypes.map(type => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${type}`}
                  checked={filters.type?.includes(type) ?? false}
                  onCheckedChange={() => onToggleFilter('type', type)}
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
          onClick={() => onToggleFilterSection('tags')}
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
            {allTags.map(tag => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={`tag-${tag}`}
                  checked={filters.tags?.includes(tag) ?? false}
                  onCheckedChange={() => onToggleFilter('tags', tag)}
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
          onClick={() => onToggleFilterSection('createdBy')}
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
            {uniqueCreators.map(creator => (
              <div key={creator} className="flex items-center space-x-2">
                <Checkbox
                  id={`creator-${creator}`}
                  checked={filters.createdBy?.includes(creator) ?? false}
                  onCheckedChange={() => onToggleFilter('createdBy', creator)}
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
          onClick={() => onToggleFilterSection('dateCreated')}
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
            {uniqueDates.map(date => (
              <div key={date} className="flex items-center space-x-2">
                <Checkbox
                  id={`date-${date}`}
                  checked={filters.dateCreated?.includes(date) ?? false}
                  onCheckedChange={() => onToggleFilter('dateCreated', date)}
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
            {Object.values(filters).reduce((acc, arr) => acc + (arr?.length || 0), 0)}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {Object.entries(filters).flatMap(([category, values]) =>
            (values || []).map(value => (
              <Badge
                key={`${category}-${value}`}
                variant="outline"
                className="flex items-center gap-1 bg-gray-50"
              >
                {value}
                <button
                  onClick={() => onToggleFilter(category, value)}
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
  );
}; 