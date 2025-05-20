"use client";

import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface AgentSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  focusSearch: () => void;
}

export const AgentSearch: React.FC<AgentSearchProps> = ({
  searchTerm,
  setSearchTerm,
  searchInputRef,
  focusSearch,
}) => {
  return (
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
  );
}; 