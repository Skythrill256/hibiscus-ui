"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface Props {
  slug: string
}

export default function AgentDetails({ slug }: Props) {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Agent {slug.split("-").join(" ")}</h1>
          <p className="text-gray-500 text-sm">Automatic agent for high-quality transcription and tagging.</p>
        </div>
        <Button variant="default">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="metrics">Performance</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Body Content */}
      <div className="mt-6 space-y-6">
        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="mt-2 text-gray-700 leading-relaxed">
            Agent <strong>{slug}</strong> is a 600-million-parameter transcription model optimized for audio parsing, punctuation, and timestamp alignment. Built using FastConformer and TDT architecture, it supports up to 24-minute single-pass audio chunks.
          </p>
        </div>

        {/* Metrics */}
        <div>
          <h2 className="text-xl font-semibold">Performance</h2>
          <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
            <li>Accurate word-level timestamp predictions</li>
            <li>Automatic punctuation and capitalization</li>
            <li>Optimized for spoken numbers and long audio</li>
          </ul>
        </div>

        {/* Usage */}
        <div>
          <h2 className="text-xl font-semibold">Usage</h2>
          <p className="mt-2 text-gray-700">
            You can integrate this agent with any ASR-compatible service. For programmatic access, use our API or SDK.
          </p>
        </div>
      </div>
    </div>
  )
}
