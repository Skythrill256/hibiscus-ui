"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Star, Info, LineChart, FileText, Users, Clock, ExternalLink } from "lucide-react"

interface Props {
  slug: string
}

export default function AgentDetails({ slug }: Props) {
  const [starred, setStarred] = useState(false)
  const formattedName = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  
  // Format date to match the screenshot
  const lastUpdated = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with model name and star/fork buttons */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center text-sm">
            <span className="text-primary font-medium">{slug.split("-")[0]}</span>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="font-medium">{formattedName}</span>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Main content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">{formattedName}</h1>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setStarred(!starred)}
                  className="flex items-center gap-1"
                >
                  <Star className={`h-4 w-4 ${starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  <span>{starred ? "Starred" : "Star"}</span>
                </Button>
                <Button variant="outline" size="sm">Fork</Button>
                <Button variant="default" size="sm" className="bg-primary text-primary-foreground">
                  <Download className="mr-2 h-4 w-4" />
                  Use this agent
                </Button>
              </div>
            </div>
            
            {/* Model card tabs */}
            <div className="mb-6">
              <Tabs defaultValue="description" className="w-full">
                <div className="border-b border-border">
                  <TabsList className="bg-transparent h-10">
                    <TabsTrigger 
                      value="description" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10"
                    >
                      Description
                    </TabsTrigger>
                    <TabsTrigger 
                      value="performance" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10"
                    >
                      Performance
                    </TabsTrigger>
                    <TabsTrigger 
                      value="usage" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10"
                    >
                      Usage
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="description" className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Description:</h2>
                      <p className="text-foreground leading-relaxed">
                        {formattedName} is a 600-million-parameter automatic speech recognition (ASR) model 
                        designed for high-quality English transcription, featuring support for punctuation, capitalization, 
                        and accurate timestamp prediction. Try Demo here: <a href="#" className="text-primary hover:underline">https://hibiscus.ai/spaces/{slug}</a>
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-foreground leading-relaxed">
                        This <Badge variant="outline" className="font-normal">XL</Badge> variant of the FastConformer architecture integrates the TDT decoder and is trained 
                        with full attention, enabling efficient transcription of audio segments up to 24 minutes in a single 
                        pass. The model achieves an RTF of 3.80 on the HF-Open-ASR leaderboard with a batch size of 128.
                      </p>
                      <p className="text-muted-foreground text-sm mt-2">
                        Note: RTFs Performance may vary depending on dataset audio duration and batch size.
                      </p>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Key Features</h2>
                      <ul className="list-disc list-inside space-y-1 pl-2">
                        <li>Accurate word-level timestamp predictions</li>
                        <li>Automatic punctuation and capitalization</li>
                        <li>Robust performance on spoken numbers, and song lyrics transcription</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-foreground">
                        For more information, refer to the <a href="#" className="text-primary hover:underline">Model Architecture</a> section and the <a href="#" className="text-primary hover:underline">Hibiscus documentation</a>
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-foreground">
                        This model is ready for commercial/non-commercial use.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="performance" className="pt-6">
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold">Performance Metrics</h2>
                    <div className="border border-border rounded-lg p-4">
                      <h3 className="text-md font-medium mb-3">ASR Benchmark Results</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Word Error Rate (WER)</p>
                          <p className="text-xl font-semibold">3.8%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Real-Time Factor (RTF)</p>
                          <p className="text-xl font-semibold">0.12x</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="usage" className="pt-6">
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold">Usage Examples</h2>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm overflow-x-auto">
                        <code>
{`import hibiscus

# Load the model
model = hibiscus.load_model("${slug}")

# Transcribe audio
result = model.transcribe("audio.wav")
print(result.text)`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Right column - Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Downloads stats */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Downloads last month</h3>
              <p className="text-2xl font-bold">56,581</p>
              <div className="mt-2 h-16 w-full bg-accent rounded-md overflow-hidden relative">
                <div className="absolute inset-0 flex items-end">
                  {/* Simplified activity graph */}
                  <div className="flex items-end w-full h-full px-1">
                    {[0.2, 0.5, 0.3, 0.7, 0.6, 0.8, 0.9, 0.7, 0.6, 0.8, 0.9, 0.7].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 mx-px bg-primary" 
                        style={{ height: `${height * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Inference providers */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <Info className="h-4 w-4 mr-1" /> Inference Providers
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">API</Badge>
                  <span className="text-sm">Automatic Speech Recognition</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This model isn't deployed by any Inference Provider.
                </p>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Ask for provider support
                </Button>
              </div>
            </div>
            
            {/* Model type info */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <FileText className="h-4 w-4 mr-1" /> Model type for <span className="font-mono ml-1">{slug}</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs text-muted-foreground">Adapters</h4>
                  <p className="text-sm">2 models</p>
                </div>
                <div>
                  <h4 className="text-xs text-muted-foreground">Finetunes</h4>
                  <p className="text-sm">3 models</p>
                </div>
                <div>
                  <h4 className="text-xs text-muted-foreground">Quantizations</h4>
                  <p className="text-sm">1 model</p>
                </div>
              </div>
            </div>
            
            {/* Dataset info */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <LineChart className="h-4 w-4 mr-1" /> Dataset used to train <span className="font-mono ml-1 text-xs">{slug}</span>
              </h3>
              <div className="space-y-2">
                <a href="#" className="text-primary hover:underline flex items-center text-sm">
                  <span>openai/librispeech_asr</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
                <p className="text-xs text-muted-foreground">Updated {lastUpdated}</p>
              </div>
            </div>
            
            {/* Spaces using model */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <Users className="h-4 w-4 mr-1" /> Spaces using <span className="font-mono ml-1 text-xs">{slug}</span>
              </h3>
              <Button variant="outline" size="sm" className="w-full">
                View spaces
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
