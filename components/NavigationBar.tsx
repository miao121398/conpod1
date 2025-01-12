import { Button } from "@/components/ui/button"
import { ProfileMenu } from "./ProfileMenu"

interface NavigationBarProps {
  onNavigate: (view: "main" | "player" | "playlist" | "settings" | "length-selector") => void;
  onLogout: () => void;
}

export function NavigationBar({ onNavigate, onLogout }: NavigationBarProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <img src="/logo.svg" alt="Logo" className="h-8" />
        <nav className="space-x-4">
          <Button variant="link" onClick={() => onNavigate("main")}>Dashboard</Button>
          <Button variant="link" onClick={() => onNavigate("playlist")}>Playlists</Button>
        </nav>
        <ProfileMenu
          user={{ name: "John Doe", email: "john@example.com" }}
          onLogout={onLogout}
          onNavigate={onNavigate}
        />
      </div>
    </header>
  )
}

