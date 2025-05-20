"use client"

import {
  Bookmark,
  Share,
  Heart,
  Bell,
  Menu,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HibiscusHeader() {
  return (
    <>
      {/* Browser navigation */}
      <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-2">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <span className="h-4 w-4">↻</span>
          </Button>
        </div>
        <div className="flex w-full max-w-xl items-center space-x-2 px-2">
          <Bookmark className="h-4 w-4 text-gray-500" />
          <div className="flex w-full items-center rounded-md border bg-white px-3 py-1 text-sm">
            <span className="text-gray-500">hibiscus.co/agents</span>
          </div>
          <Share className="h-4 w-4 text-gray-500" />
          <Heart className="h-4 w-4 text-gray-500" />
          <Bell className="h-4 w-4 text-gray-500" />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <span className="h-4 w-4">⊕</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <span className="h-4 w-4">⊡</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main header */}
      <header className="border-b bg-white px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-pink-500 text-white">
                <span className="text-lg">🌺</span>
              </div>
              <span className="text-xl font-semibold">Hibiscus</span>
            </Link>
            <div className="relative ml-6 w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Search agents, datasets, users..." className="pl-8 text-sm" />
            </div>
          </div>
          <nav className="flex items-center space-x-6">
            {[
              "Agents",
              "Datasets",
              "Spaces",
              "Posts",
              "Docs",
              "Enterprise",
              "Pricing",
            ].map((item, idx) => (
              <Link
                key={idx}
                href={`/${item.toLowerCase()}`}
                className={`flex items-center space-x-1 font-medium ${
                  item === "Agents" ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <span>{item}</span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-sm font-medium">
              Log In
            </Button>
            <Button className="bg-pink-600 text-sm font-medium hover:bg-pink-700">Sign Up</Button>
          </div>
        </div>
      </header>
    </>
  )
}
