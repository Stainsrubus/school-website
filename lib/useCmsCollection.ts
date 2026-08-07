import { useEffect, useRef, useState } from 'react'

export interface CmsCollectionEntry {
  id: string
  data: Record<string, string>
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

/**
 * Reads a CMS collection (e.g. "gallery_items") from the SchoolPress content API
 * and returns its items mapped to the component's shape. Falls back to the
 * hardcoded data while the CMS is unreachable or returns no items.
 */
export function useCmsCollection<T>(
  name: string,
  fallback: T[],
  mapItem: (entry: CmsCollectionEntry) => T
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
        const entries = (data.collections ?? {})[name]?.items ?? []
        if (entries.length > 0 && !cancelled) {
          setItems(entries.map((entry) => mapRef.current(entry as CmsCollectionEntry)))
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
