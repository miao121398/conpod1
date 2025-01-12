import { useState } from "react"
import { ExpandButton } from "./ExpandButton"

interface Section {
  id: number
  summary: string
  original: string
  timestamp: string
}

interface TranscriptDisplayProps {
  sections: Section[]
  currentTime: number
  onSectionClick: (id: number) => void
}

export function TranscriptDisplay({ sections, currentTime, onSectionClick }: TranscriptDisplayProps) {
  const [expandedSections, setExpandedSections] = useState<number[]>([])

  const toggleSection = (id: number) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((sectionId) => sectionId !== id) : [...prev, id]
    )
  }

  return (
    <div className="h-96 overflow-y-auto p-4 space-y-4">
      {sections.map((section) => (
        <div
          key={section.id}
          className={`p-3 rounded-lg border transition-colors ${
            section.timestamp === currentTime.toString()
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => onSectionClick(section.id)}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">{section.timestamp}</span>
            <ExpandButton
              isExpanded={expandedSections.includes(section.id)}
              onClick={() => toggleSection(section.id)}
            />
          </div>
          <p className="font-medium">{section.summary}</p>
          {expandedSections.includes(section.id) && (
            <p className="mt-2 text-sm text-gray-600">{section.original}</p>
          )}
        </div>
      ))}
    </div>
  )
}

