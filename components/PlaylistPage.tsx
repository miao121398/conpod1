"use client"

import { useState } from "react"
import { Folder, MoreVertical, Play, Pause, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NavigationHeader } from "./NavigationHeader"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FolderDialog } from "./FolderDialog"

interface PlaylistPageProps {
  onNavigate: (view: "main" | "player" | "playlist" | "settings" | "length-selector") => void
  onLogout: () => void
}

interface PodcastItem {
  id: string
  title: string
  duration: string
  date: string
}

interface FolderType {
  id: string
  name: string
  podcastCount: number
}

export function PlaylistPage({ onNavigate, onLogout }: PlaylistPageProps) {
  const [showFolderDialog, setShowFolderDialog] = useState(false)
  const [folders, setFolders] = useState<FolderType[]>([
    { id: "1", name: "General", podcastCount: 3 },
    { id: "2", name: "Work", podcastCount: 2 },
  ])
  const [selectedFolder, setSelectedFolder] = useState<string | null>("1")
  const [podcasts, setPodcasts] = useState<PodcastItem[]>([
    { id: "1", title: "Introduction to AI", duration: "15:30", date: "2023-06-01" },
    { id: "2", title: "Machine Learning Basics", duration: "20:45", date: "2023-06-05" },
    { id: "3", title: "Deep Learning Applications", duration: "18:20", date: "2023-06-10" },
  ])
  const [playingPodcast, setPlayingPodcast] = useState<string | null>(null);

  const handleCreateFolder = (name: string) => {
    const newFolder: FolderType = {
      id: (folders.length + 1).toString(),
      name: name,
      podcastCount: 0
    }
    setFolders([...folders, newFolder])
    setShowFolderDialog(false)
  }

  const handleSelectFolder = (folderId: string) => {
    setSelectedFolder(folderId)
    // In a real app, you'd fetch podcasts for this folder here
  }

  const handlePlayPodcast = (podcastId: string) => {
    console.log(`Playing podcast ${podcastId}`)
    // In a real app, you'd start playback and navigate to the player page
    onNavigate("player")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavigationHeader onNavigate={onNavigate} onLogout={onLogout} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Playlists</h1>
          <Button onClick={() => setShowFolderDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Folder
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Folders</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {folders.map((folder) => (
                  <Button
                    key={folder.id}
                    variant={selectedFolder === folder.id ? "secondary" : "ghost"}
                    className="w-full justify-start mb-2"
                    onClick={() => handleSelectFolder(folder.id)}
                  >
                    <Folder className="mr-2 h-4 w-4" />
                    {folder.name}
                    <span className="ml-auto text-xs text-gray-500">{folder.podcastCount}</span>
                  </Button>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="col-span-1 md:col-span-3">
            <CardHeader>
              <CardTitle>Podcasts</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {podcasts.map((podcast) => (
                  <div 
                    key={podcast.id} 
                    className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => onNavigate("player")}
                  >
                    <div className="flex items-center">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (playingPodcast === podcast.id) {
                            setPlayingPodcast(null);
                          } else {
                            setPlayingPodcast(podcast.id);
                            handlePlayPodcast(podcast.id);
                          }
                        }}
                      >
                        {playingPodcast === podcast.id ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <div className="ml-2">
                        <p className="font-medium">{podcast.title}</p>
                        <p className="text-sm text-gray-500">{podcast.duration} • {podcast.date}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
      <FolderDialog
        isOpen={showFolderDialog}
        onClose={() => setShowFolderDialog(false)}
        onCreate={handleCreateFolder}
      />
    </div>
  )
}

