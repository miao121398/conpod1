import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "./FileUpload"
import { ProfileMenu } from "./ProfileMenu"

interface MainPageProps {
  onNavigate: (view: "main" | "player" | "library" | "settings" | "length-selector" | "playlist") => void;
  onLogout: () => void;
}

export function MainPage({ onNavigate, onLogout }: MainPageProps) {
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleUpload = (file: File) => {
    setUploadedFile(file)
    setSelectedText(null)
  }

  const handleSelectText = () => {
    // This is a placeholder. In a real implementation, you'd integrate with a text selection API
    const text = window.prompt("Enter your text here:")
    if (text) {
      setSelectedText(text)
      setUploadedFile(null)
    }
  }

  const handleGenerate = () => {
    onNavigate("length-selector")
  }

  const isGenerateDisabled = !selectedText && !uploadedFile

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Generate Podcast</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleSelectText} className="w-full">
                Select Text
              </Button>
              <FileUpload
                onUpload={handleUpload}
                maxSize={10 * 1024 * 1024} // 10MB
                acceptedTypes={[".txt", ".docx", ".pdf"]}
              />
              {selectedText && <p className="text-sm text-green-600">Text selected: {selectedText.slice(0, 50)}...</p>}
              {uploadedFile && <p className="text-sm text-green-600">File uploaded: {uploadedFile.name}</p>}
              <Button onClick={handleGenerate} disabled={isGenerateDisabled} className="w-full">
                Next Step
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Podcasts</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add recent podcasts preview here */}
              <p>No recent podcasts</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

