'use client'

import { createContext, useContext, useState } from 'react'
import { folders as initialFolders } from '@/lib/data'

interface FolderContextType {
  folders: string[]
  addFolder: (name: string) => void
}

const FolderContext = createContext<FolderContextType>({
  folders: initialFolders,
  addFolder: () => {},
})

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState(initialFolders)

  const addFolder = (name: string) => {
    if (!folders.includes(name)) {
      setFolders((prev) => [...prev, name])
    }
  }

  return (
    <FolderContext.Provider value={{ folders, addFolder }}>
      {children}
    </FolderContext.Provider>
  )
}

export function useFolders() {
  return useContext(FolderContext)
}
