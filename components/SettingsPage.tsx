import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileMenu } from "./ProfileMenu"

interface SettingsPageProps {
  onNavigate: (view: "main" | "player" | "library" | "settings" | "playlist") => void
  onLogout: () => void
}

export function SettingsPage({ onNavigate, onLogout }: SettingsPageProps) {
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john@example.com")
  const [password, setPassword] = useState("")

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement save logic here
    console.log("Saving settings:", { name, email, password })
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
            user={{ name, email }}
            onLogout={onLogout}
            onNavigate={onNavigate}
          />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

