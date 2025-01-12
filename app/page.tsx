"use client"

import { useState } from "react"
import { LoginPage } from "@/components/LoginPage"
import { MainPage } from "@/components/MainPage"
import PlayerPage from "@/components/PlayerPage"
import { PlaylistPage } from "@/components/PlaylistPage"
import { SettingsPage } from "@/components/SettingsPage"
import { LengthSelectorPage } from "@/components/LengthSelectorPage"
import NewPlayerPage from "@/components/NewPlayerPage"

export default function Home() {
  const [currentView, setCurrentView] = useState<"login" | "main" | "player" | "playlist" | "settings" | "length-selector" | "newplayer">("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleNavigate = (view: "main" | "player" | "playlist" | "settings" | "length-selector" | "newplayer") => {
    setCurrentView(view)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentView("login")
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => {
      setIsLoggedIn(true);
      setCurrentView("main");
    }} />
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {currentView === "main" && <MainPage onNavigate={handleNavigate} onLogout={handleLogout} />}
      {currentView === "player" && <PlayerPage onNavigate={handleNavigate} onLogout={handleLogout} />}
      {currentView === "playlist" && <PlaylistPage onNavigate={handleNavigate} onLogout={handleLogout} />}
      {currentView === "settings" && <SettingsPage onNavigate={handleNavigate} onLogout={handleLogout} />}
      {currentView === "length-selector" && <LengthSelectorPage onNavigate={handleNavigate} onLogout={handleLogout} />}
      {currentView === "newplayer" && <NewPlayerPage onNavigate={handleNavigate} onLogout={handleLogout} />}
    </main>
  )
}

