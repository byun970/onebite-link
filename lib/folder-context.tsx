'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export interface Folder {
  id: number
  name: string
  created_at: string
}

interface FolderContextType {
  folders: Folder[]
  addFolder: (name: string) => Promise<void>
  removeFolder: (id: number) => Promise<void>
  renameFolder: (id: number, newName: string) => Promise<void>
}

const FolderContext = createContext<FolderContextType>({
  folders: [],
  addFolder: async () => {},
  removeFolder: async () => {},
  renameFolder: async () => {},
})

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([])

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('folders')
      .select('*')
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data) setFolders(data)
      })
  }, [])

  const addFolder = async (name: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('folders')
      .insert({ name })
      .select()
      .single()
    if (!error && data) {
      setFolders((prev) => [...prev, data])
    }
  }

  const removeFolder = async (id: number) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('folders')
      .delete()
      .eq('id', id)
    if (!error) {
      setFolders((prev) => prev.filter((f) => f.id !== id))
    }
  }

  const renameFolder = async (id: number, newName: string) => {
    const trimmed = newName.trim()
    if (!trimmed) return
    const supabase = createClient()
    const { error } = await supabase
      .from('folders')
      .update({ name: trimmed })
      .eq('id', id)
    if (!error) {
      setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name: trimmed } : f)))
    }
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
