"use client"

import { useState } from "react"
import { Play, Pause, SkipBack, SkipForward, Save, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavigationHeader } from "./NavigationHeader"
import { TranscriptSection } from "./TranscriptSection"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface NewPlayerPageProps {
  onNavigate: (view: "main" | "player" | "playlist" | "settings" | "length-selector") => void
  onLogout: () => void
}

export default function NewPlayerPage({ onNavigate, onLogout }: NewPlayerPageProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(300) // 5 minutes in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [activeSection, setActiveSection] = useState(1)
  const { toast } = useToast()

  const handlePlayPause = () => setIsPlaying(!isPlaying)
  const handleSeek = (value: number[]) => setCurrentTime(value[0])
  const handleSpeedChange = (speed: number) => setPlaybackSpeed(speed)

  const handleSave = () => {
    console.log("Save podcast")
    toast({
      title: "Podcast Saved",
      description: "Your podcast has been successfully saved.",
      duration: 3000,
    })
    onNavigate("playlist")
  }

  const handleDiscard = () => {
    console.log("Discard podcast")
    onNavigate("main")
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const transcriptSections = [
    { id: 1, summary: "Introduction to AI in software development", original: "In this podcast, we'll explore how artificial intelligence is revolutionizing the field of software development." },
    { id: 2, summary: "Key benefits of AI in coding", original: "AI offers numerous benefits in coding, including improved efficiency, bug detection, and code optimization." },
    { id: 3, summary: "Challenges and limitations", original: "Despite its advantages, AI in software development faces challenges such as data privacy concerns and the need for human oversight." },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavigationHeader onNavigate={onNavigate} onLogout={onLogout} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="w-full max-w-3xl mx-auto">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentTime(Math.max(0, currentTime - 15))}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  className={cn(
                    "h-16 w-16 rounded-full",
                    isPlaying ? "bg-gray-200 hover:bg-gray-300" : "bg-blue-600 hover:bg-blue-700"
                  )}
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-gray-800" />
                  ) : (
                    <Play className="h-8 w-8 text-white" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentTime(Math.min(duration, currentTime + 15))}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={1}
                  onValueChange={handleSeek}
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      {playbackSpeed}x
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {[0.5, 1, 1.5, 2, 2.5, 3].map((speed) => (
                      <DropdownMenuItem key={speed} onSelect={() => handleSpeedChange(speed)}>
                        {speed}x
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="text-sm text-gray-500">
                  {formatTime(duration - currentTime)} remaining
                </div>
              </div>
            </div>

            <ScrollArea className="h-[400px] rounded-md border p-4">
              {transcriptSections.map((section) => (
                <TranscriptSection
                  key={section.id}
                  section={section}
                  isActive={activeSection === section.id}
                  onClick={() => setActiveSection(section.id)}
                />
              ))}
            </ScrollArea>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={handleSave}
                className="flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleDiscard}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                <span>Discard</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

