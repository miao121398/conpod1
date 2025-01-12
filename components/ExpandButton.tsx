import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface ExpandButtonProps {
  isExpanded: boolean
  onClick: () => void
}

export function ExpandButton({ isExpanded, onClick }: ExpandButtonProps) {
  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </Button>
  )
}

