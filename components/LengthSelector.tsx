import { Clock, Coffee, Book, Glasses } from 'lucide-react'
import { TimeBadge } from "./TimeBadge"

const options = [
  { id: "quick", label: "Quick Bite", duration: "5 mins", icon: Clock },
  { id: "essential", label: "Essential", duration: "10 mins", icon: Coffee },
  { id: "standard", label: "Standard", duration: "15 mins", icon: Book },
  { id: "deep", label: "Deep Dive", duration: "20 mins", icon: Glasses },
]

interface LengthSelectorProps {
  selectedLength: string
  onSelect: (length: string) => void
}

export function LengthSelector({ selectedLength, onSelect }: LengthSelectorProps) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <button
          key={option.id}
          className={`flex items-center justify-between w-full p-3 rounded-lg border transition-colors ${
            selectedLength === option.id
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => onSelect(option.id)}
        >
          <div className="flex items-center space-x-3">
            <option.icon className="w-5 h-5 text-gray-500" />
            <span className="font-medium">{option.label}</span>
          </div>
          <TimeBadge duration={option.duration} />
        </button>
      ))}
    </div>
  )
}

