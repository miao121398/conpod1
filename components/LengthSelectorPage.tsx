import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileMenu } from "./ProfileMenu"
import { LengthSelector } from "./LengthSelector"

interface LengthSelectorPageProps {
  onNavigate: (view: "main" | "player" | "playlist" | "settings" | "length-selector" | "newplayer") => void;
  onLogout: () => void;
}

export function LengthSelectorPage({ onNavigate, onLogout }: LengthSelectorPageProps) {
  const [selectedLength, setSelectedLength] = useState("quick")

  const handleLengthSelect = (length: string) => {
    setSelectedLength(length)
  }

  const handleGeneratePodcast = () => {
    // Here you would typically start the podcast generation process
    // For now, we'll just navigate to the new player page
    onNavigate("newplayer")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <img src="/logo.svg" alt="Logo" className="h-8" />
          <nav className="space-x-4">
            <Button variant="link" onClick={() => onNavigate("main")}>Dashboard</Button>
            <Button variant="link" onClick={() => onNavigate("playlist")}>Playlist</Button>
          </nav>
          <ProfileMenu
            user={{ name: "John Doe", email: "john@example.com" }}
            onLogout={onLogout}
            onNavigate={onNavigate}
          />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Podcast Length</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <LengthSelector selectedLength={selectedLength} onSelect={handleLengthSelect} />
            <Button onClick={handleGeneratePodcast} className="w-full">
              Generate Podcast
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

