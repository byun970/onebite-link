'use client'

import { createContext, useContext, useState } from 'react'
import { links as initialLinks } from '@/lib/data'

export interface Link {
  title: string
  url: string
  description: string
  folder: string
  color: string
  thumbnail?: string | null
}

export interface LinkPatch {
  title: string
  description: string
  folder: string
}

interface LinkContextType {
  links: Link[]
  addLink: (link: Link) => void
  removeLink: (url: string) => void
  updateLink: (url: string, patch: LinkPatch) => void
}

const LinkContext = createContext<LinkContextType>({
  links: initialLinks,
  addLink: () => {},
  removeLink: () => {},
  updateLink: () => {},
})

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<Link[]>(initialLinks)

  const addLink = (link: Link) => {
    setLinks((prev) => [link, ...prev])
  }

  const removeLink = (url: string) => {
    setLinks((prev) => prev.filter((l) => l.url !== url))
  }

  const updateLink = (url: string, patch: LinkPatch) => {
    setLinks((prev) => prev.map((l) => l.url === url ? { ...l, ...patch } : l))
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
