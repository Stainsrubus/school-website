import { useEffect, useRef, useState } from 'react'

export interface CmsCollectionEntry {
  id: string
  data: Record<string, string>
}

export interface CmsAssetItem {
  id: string
  name: string
  type: string
  url: string
  description?: string
}

const DEFAULT_CMS_ORIGIN = 'https://schoolpress-cms.creoleaptech.workers.dev'

function cmsOrigin(): string {
  if (typeof document !== 'undefined') {
    const script = document.querySelector<HTMLScriptElement>('script[src*="/bridge.js"]')
    if (script?.src) {
      try {
        return new URL(script.src).origin
      } catch {
        // fall through to the default origin
      }
    }
  }
  return DEFAULT_CMS_ORIGIN
}

export function resolveCmsAssetUrl(url?: string): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url
  if (url.startsWith('/api/assets/')) return `${cmsOrigin()}${url}`
  if (url.startsWith('/')) return url
  return `${cmsOrigin()}/api/assets/${url}`
}

/**
 * Reads a CMS collection (e.g. "gallery_items") from the SchoolPress content API
 * and returns its items mapped to the component's shape. Falls back to the
 * hardcoded data while the CMS is unreachable or returns no items.
 */
export function useCmsCollection<T>(
  name: string,
  fallback: T[],
  mapItem: (entry: CmsCollectionEntry, index?: number) => T
): T[] {
  const [items, setItems] = useState<T[]>(fallback)
  const mapRef = useRef(mapItem)
  mapRef.current = mapItem

  useEffect(() => {
    const config = (window as { __SCHOOLPRESS__?: { slug?: string; key?: string } }).__SCHOOLPRESS__
    const slug = config?.slug
    const apiKey = config?.key
    if (!slug || !apiKey) return
    let cancelled = false
    let timer: ReturnType<typeof setInterval> | undefined

    const load = async () => {
      try {
        const res = await fetch(
          `${cmsOrigin()}/api/content?school=${encodeURIComponent(slug)}`,
          { headers: { 'X-Schoolpress-Key': apiKey }, cache: 'no-store' }
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = (await res.json()) as {
          collections?: Record<string, { items?: unknown[] }>
        }
        const collection = (data.collections ?? {})[name]
        if (!cancelled) {
          if (collection && Array.isArray(collection.items)) {
            setItems(collection.items.map((entry, idx) => mapRef.current(entry as CmsCollectionEntry, idx)))
          }
          // If collection doesn't exist in CMS response at all, keep the fallback
          // (CMS may not know about this collection yet)
        }
      } catch {
        // CMS unreachable — keep the hardcoded fallback
      }
    }

    load()
    timer = setInterval(load, 60000)
    const onFocus = () => load()
    window.addEventListener('focus', onFocus)
    return () => {
      cancelled = true
      if (timer) clearInterval(timer)
      window.removeEventListener('focus', onFocus)
    }
  }, [name])

  return items
}

/**
 * Returns a specific asset URL from the 'school_assets' collection matching by name or type.
 * Falls back to the provided fallback URL if not found.
 */
export function useCmsAsset(nameOrType: string, fallbackUrl: string = ''): string {
  const assets = useCmsCollection<CmsAssetItem>(
    'school_assets',
    [],
    (entry) => ({
      id: entry.id,
      name: entry.data.name || '',
      type: entry.data.type || '',
      url: entry.data.url || '',
      description: entry.data.description,
    })
  )

  const normalized = nameOrType.trim().toLowerCase()
  const found = assets.find((item) => {
    const n = (item.name || '').trim().toLowerCase()
    const t = (item.type || '').trim().toLowerCase()
    return n === normalized || t === normalized || n.includes(normalized) || normalized.includes(n)
  })

  if (found?.url) {
    return resolveCmsAssetUrl(found.url)
  }
  return fallbackUrl
}

/**
 * Returns all assets from the 'school_assets' collection as a name/type -> URL lookup dictionary.
 */
export function useCmsAssets(): Record<string, string> {
  const assets = useCmsCollection<CmsAssetItem>(
    'school_assets',
    [],
    (entry) => ({
      id: entry.id,
      name: entry.data.name || '',
      type: entry.data.type || '',
      url: entry.data.url || '',
      description: entry.data.description,
    })
  )

  const map: Record<string, string> = {}
  for (const item of assets) {
    if (item.name && item.url) {
      map[item.name] = resolveCmsAssetUrl(item.url)
    }
    if (item.type && item.url) {
      map[item.type] = resolveCmsAssetUrl(item.url)
    }
  }
  return map
}
