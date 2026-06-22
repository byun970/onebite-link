'use client'

import { createContext, useContext, useState } from 'react'
import { folders as initialFolders } from '@/lib/data'

interface FolderContextType {
  folders: string[]
  addFolder: (name: string) => void
  removeFolder: (name: string) => void
  renameFolder: (oldName: string, newName: string) => void
}

const FolderContext = createContext<FolderContextType>({
  folders: initialFolders,
  addFolder: () => {},
  removeFolder: () => {},
  renameFolder: () => {},
})

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState(initialFolders)

  const addFolder = (name: string) => {
    if (!folders.includes(name)) {
      setFolders((prev) => [...prev, name])
    }
  }

  const removeFolder = (name: string) => {
    setFolders((prev) => prev.filter((f) => f !== name))
  }

  const renameFolder = (oldName: string, newName: string) => {
    const trimmed = newName.trim()
    if (!trimmed || folders.includes(trimmed)) return
    setFolders((prev) => prev.map((f) => (f === oldName ? trimmed : f)))
  }

  return (
    <FolderContext.Provider value={{ folders, addFolder, removeFolder, renameFolder }}>
      {children}
    </FolderContext.Provider>
  )
}

export function useFolders() {
  return useContext(FolderContext)
}
