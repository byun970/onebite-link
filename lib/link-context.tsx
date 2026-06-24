'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

const COLORS = [
  'bg-sky-500', 'bg-indigo-600', 'bg-purple-500', 'bg-pink-500',
  'bg-orange-500', 'bg-teal-500', 'bg-green-500', 'bg-gray-700',
]

function pickColor(folder: string) {
  let hash = 0
  for (const c of folder) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff
  return COLORS[Math.abs(hash) % COLORS.length]
}

export interface Link {
  id: number
  url: string
  title: string
  description: string
  folder_id: number | null
  folder: string
  thumbnail_url: string | null
  created_at: string
  color: string
}

export interface LinkPatch {
  title: string
  description: string
  folder: string
  folder_id: number | null
}

interface LinkInsert {
  url: string
  title: string
  description: string
  thumbnail_url: string | null
  folder_id: number | null
  folder: string
}

interface LinkContextType {
  links: Link[]
  addLink: (link: LinkInsert) => Promise<void>
  removeLink: (id: number) => Promise<void>
  updateLink: (id: number, patch: LinkPatch) => Promise<void>
}

const LinkContext = createContext<LinkContextType>({
  links: [],
  addLink: async () => {},
  removeLink: async () => {},
  updateLink: async () => {},
})

function rowToLink(row: {
  id: number
  url: string
  title: string | null
  description: string | null
  thumbnail_url: string | null
  folder_id: number | null
  created_at: string
  folders: { name: string } | null
}): Link {
  const folderName = row.folders?.name ?? ''
  return {
    id: row.id,
    url: row.url,
    title: row.title ?? '',
    description: row.description ?? '',
    thumbnail_url: row.thumbnail_url,
    folder_id: row.folder_id,
    folder: folderName,
    created_at: row.created_at,
    color: pickColor(folderName),
  }
}

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('links')
      .select('*, folders(name)')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setLinks(data.map(rowToLink))
      })
  }, [])

  const addLink = async (link: LinkInsert) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('links')
      .insert({
        url: link.url,
        title: link.title,
        description: link.description,
        thumbnail_url: link.thumbnail_url,
        folder_id: link.folder_id,
      })
      .select('*, folders(name)')
      .single()
    if (!error && data) {
      setLinks((prev) => [rowToLink(data), ...prev])
    }
  }

  const removeLink = async (id: number) => {
    const supabase = createClient()
    const { error } = await supabase.from('links').delete().eq('id', id)
    if (!error) {
      setLinks((prev) => prev.filter((l) => l.id !== id))
    }
  }

  const updateLink = async (id: number, patch: LinkPatch) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('links')
      .update({
        title: patch.title,
        description: patch.description,
        folder_id: patch.folder_id,
      })
      .eq('id', id)
    if (!error) {
      setLinks((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, ...patch, color: pickColor(patch.folder) } : l
        )
      )
    }
  }

  return (
    <LinkContext.Provider value={{ links, addLink, removeLink, updateLink }}>
      {children}
    </LinkContext.Provider>
  )
}

export function useLinks() {
  return useContext(LinkContext)
}
