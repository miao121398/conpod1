import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface FolderDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (name: string) => void
}

export function FolderDialog({ isOpen, onClose, onCreate }: FolderDialogProps) {
  const [newFolderName, setNewFolderName] = useState("")

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onCreate(newFolderName.trim())
      setNewFolderName("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Enter folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <Button onClick={handleCreateFolder} className="w-full">Create Folder</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

