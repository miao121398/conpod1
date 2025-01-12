import { useState } from "react"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TranscriptSectionProps {
  section: {
    id: number;
    summary: string;
    original: string;
  };
  isActive: boolean;
  onClick: () => void;
}

export function TranscriptSection({ section, isActive, onClick }: TranscriptSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        "border rounded-lg p-4 mb-2 hover:bg-gray-50 transition-colors",
        isActive && "border-blue-400 bg-blue-50"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-gray-500">Section {section.id}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            setIsExpanded(!isExpanded)
          }}
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      <p className="font-medium">{section.summary}</p>
      {isExpanded && (
        <div className="mt-3 space-y-2 bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-600">{section.original}</p>
        </div>
      )}
    </div>
  )
}

