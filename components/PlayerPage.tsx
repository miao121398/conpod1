"use client"

import { useState } from "react"
import { Play, Pause, SkipBack, SkipForward, Edit, Trash, FolderOpen, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { NavigationHeader } from "./NavigationHeader"
import { TranscriptSection } from "./TranscriptSection"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PlayerPageProps {
  onNavigate: (view: "main" | "player" | "playlist" | "settings" | "length-selector") => void
  onLogout: () => void
}

export default function PlayerPage({ onNavigate, onLogout }: PlayerPageProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(300) // 5 minutes in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [activeSection, setActiveSection] = useState(1)
  const [podcastName, setPodcastName] = useState("Introduction to AI")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editedName, setEditedName] = useState(podcastName)
  const [selectedFolder, setSelectedFolder] = useState("General")
  const { toast } = useToast()

  const handlePlayPause = () => setIsPlaying(!isPlaying)
  const handleSeek = (value: number[]) => setCurrentTime(value[0])
  const handleSpeedChange = (speed: number) => setPlaybackSpeed(speed)

  const handleEditClick = () => {
    setEditedName(podcastName)
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    setPodcastName(editedName)
    setIsEditDialogOpen(false)
    toast({
      title: "Podcast Updated",
      description: "Your changes have been saved.",
      duration: 3000,
    })
  }

  const handleExtend = () => {
    onNavigate("length-selector")
  }

  const handleDelete = () => {
    // In a real app, you'd want to show a confirmation dialog here
    toast({
      title: "Podcast Deleted",
      description: "The podcast has been removed.",
      duration: 3000,
    })
    onNavigate("playlist")
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
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{podcastName}</h2>
              <Button variant="ghost" size="icon" onClick={handleEditClick}>
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Audio Controls */}
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

            {/* Transcript */}
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
          </CardContent>
        </Card>
      </main>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Podcast</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="podcastName">Podcast Name</Label>
              <Input
                id="podcastName"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="folder">Folder</Label>
              <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                <SelectTrigger id="folder">
                  <SelectValue placeholder="Select a folder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleExtend} className="w-full">
              <ChevronRight className="mr-2 h-4 w-4" /> Extend Podcast
            </Button>
            <Button onClick={handleDelete} variant="destructive" className="w-full">
              <Trash className="mr-2 h-4 w-4" /> Delete Podcast
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsEditDialogOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

