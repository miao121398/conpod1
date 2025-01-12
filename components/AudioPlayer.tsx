import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface AudioPlayerProps {
  isPlaying: boolean
  currentTime: number
  duration: number
  onPlay: () => void
  onPause: () => void
  onSeek: (time: number) => void
}

export function AudioPlayer({
  isPlaying,
  currentTime,
  duration,
  onPlay,
  onPause,
  onSeek,
}: AudioPlayerProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-blue-600 text-white hover:bg-blue-700"
          onClick={isPlaying ? onPause : onPlay}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
      </div>
      <div className="space-y-2">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={(value) => onSeek(value[0])}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <Button variant="outline" size="icon" onClick={() => onSeek(currentTime - 15)}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onSeek(currentTime + 15)}>
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

