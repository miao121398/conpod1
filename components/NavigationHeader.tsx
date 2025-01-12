import { Button } from "@/components/ui/button"
import { ProfileMenu } from "./ProfileMenu"

interface NavigationHeaderProps {
  onNavigate: (view: "main" | "player" | "playlist" | "settings" | "length-selector") => void;
  onLogout: () => void;
}

export function NavigationHeader({ onNavigate, onLogout }: NavigationHeaderProps) {
  return (
    <header className="sticky top-0 bg-white border-b z-50 h-16">
      <div className="container mx-auto h-full px-4 flex justify-between items-center">
        <img src="/logo.svg" alt="Logo" className="h-8" />
        <nav className="space-x-4">
          <Button variant="ghost" onClick={() => onNavigate("main")}>Dashboard</Button>
          <Button variant="ghost" onClick={() => onNavigate("playlist")}>Playlists</Button>
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

