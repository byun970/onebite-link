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

interface LinkContextType {
  links: Link[]
  addLink: (link: Link) => void
}

const LinkContext = createContext<LinkContextType>({
  links: initialLinks,
  addLink: () => {},
})

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<Link[]>(initialLinks)

  const addLink = (link: Link) => {
    setLinks((prev) => [link, ...prev])
  }

  return (
    <LinkContext.Provider value={{ links, addLink }}>
      {children}
    </LinkContext.Provider>
  )
}

export function useLinks() {
  return useContext(LinkContext)
}
