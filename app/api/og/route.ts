function extractOg(html: string, property: string): string | null {
  const re1 = new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i')
  const re2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i')
  return (html.match(re1) || html.match(re2))?.[1]?.trim() ?? null
}

function extractNameMeta(html: string, name: string): string | null {
  const re1 = new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i')
  const re2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, 'i')
  return (html.match(re1) || html.match(re2))?.[1]?.trim() ?? null
}

function extractTitle(html: string): string | null {
  return html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? null
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return Response.json({ error: 'url is required' }, { status: 400 })
  }

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LinkBot/1.0)' },
      signal: AbortSignal.timeout(6000),
    })

    if (!res.ok) {
      return Response.json({ error: 'Failed to fetch URL' }, { status: 502 })
    }

    const html = await res.text()

    const title = extractOg(html, 'og:title') || extractTitle(html) || url
    const description = extractOg(html, 'og:description') || extractNameMeta(html, 'description') || ''
    const image = extractOg(html, 'og:image') || null

    return Response.json({ title, description, image, url })
  } catch {
    return Response.json({ error: 'Failed to fetch URL' }, { status: 502 })
  }
}
