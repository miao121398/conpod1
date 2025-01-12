interface TimeBadgeProps {
  duration: string
}

export function TimeBadge({ duration }: TimeBadgeProps) {
  return (
    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
      {duration}
    </span>
  )
}

