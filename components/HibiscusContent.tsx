"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Search,
  Filter,
  ArrowUpDown,
  Clock,
  Download,
} from "lucide-react"

export default function HibiscusContent() {
  const [showFilter, setShowFilter] = useState(false)

  return (
    <main className="flex min-h-[calc(100vh-140px)]">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-50 px-6 py-4">
        <nav className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500">Filters</h3>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-left text-sm">
              Category
            </Button>
            <Button variant="ghost" className="w-full justify-start text-left text-sm">
              Tags
            </Button>
            <Button variant="ghost" className="w-full justify-start text-left text-sm">
              Created By
            </Button>
            <Button variant="ghost" className="w-full justify-start text-left text-sm">
              Date Created
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 px-6 py-4">
        {/* Top Controls */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Tabs defaultValue="explore">
              <TabsList>
                <TabsTrigger value="explore">Explore</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search agents..."
                className="pl-8 pr-2 text-sm"
              />
            </div>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-lg font-semibold">Agent {i + 1}</h4>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>Category</span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>2 days ago</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
