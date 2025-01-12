import { useState } from "react"
import { Header } from "./Header"
import { LengthSelector } from "./LengthSelector"
import { AudioPlayer } from "./AudioPlayer"
import { TranscriptDisplay } from "./TranscriptDisplay"
import { Button } from "@/components/ui/button"

const dummyUser = {
  name: "John Doe",
  avatar: "https://github.com/shadcn.png",
}

const dummySections = [
  {
    id: 1,
    summary: "Introduction to the topic",
    original: "In this podcast, we'll be discussing the importance of AI in modern technology.",
    timestamp: "0:00",
  },
  {
    id: 2,
    summary: "Key benefits of AI",
    original: "AI offers numerous benefits, including improved efficiency and decision-making capabilities.",
    timestamp: "1:30",
  },
  // Add more dummy sections as needed
]

export function ExtensionPopup() {
  const [view, setView] = useState<"selection" | "player">("selection")
  const [selectedLength, setSelectedLength] = useState("quick")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(300) // 5 minutes in seconds

  const handleLengthSelect = (length: string) => {
    setSelectedLength(length)
  }

  const handleGeneratePodcast = () => {
    // In a real implementation, this would trigger the podcast generation
    // For now, we'll just switch to the player view
    setView("player")
  }

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)
  const handleSeek = (time: number) => setCurrentTime(time)

  const handleSectionClick = (id: number) => {
    // In a real implementation, this would seek to the specific section
    console.log(`Clicked section ${id}`)
  }

  return (
    <div className="w-96 bg-white shadow-lg rounded-lg flex flex-col">
      <Header title="Content-to-Podcast" user={dummyUser} />
      {view === "selection" ? (
        <div className="p-4 space-y-4">
          <LengthSelector selectedLength={selectedLength} onSelect={handleLengthSelect} />
          <Button className="w-full" onClick={handleGeneratePodcast}>
            Generate Podcast
          </Button>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          <AudioPlayer
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            onPlay={handlePlay}
            onPause={handlePause}
            onSeek={handleSeek}
          />
          <TranscriptDisplay
            sections={dummySections}
            currentTime={currentTime}
            onSectionClick={handleSectionClick}
          />
        </div>
      )}
    </div>
  )
}

