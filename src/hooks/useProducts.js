import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchProducts, ApiError } from '../services/api'

/**
 * useProducts
 * ---------------------------------------------------------------------------
 * Owns all cursor-pagination state for the product list:
 *  - the accumulated list of loaded items
 *  - the opaque `next_cursor` token returned by the backend
 *  - whether more pages exist (`has_more`)
 *
 * Changing `category` resets pagination and refetches from the start
 * (cursor: null) — exactly as the API expects, since cursors are only
 * valid within the filter context they were issued for.
 * ---------------------------------------------------------------------------
 */
export function useProducts({ category, limit = 12 }) {
  const [items, setItems] = useState([])
  const [nextCursor, setNextCursor] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // initial load
  const [isLoadingMore, setIsLoadingMore] = useState(false) // "Load More" click
  const [error, setError] = useState(null)

  const abortRef = useRef(null)

  const loadInitial = useCallback(async () => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchProducts({
        limit,
        cursor: null,
        category,
        signal: controller.signal,
      })
      setItems(data.items)
      setNextCursor(data.next_cursor)
      setHasMore(data.has_more)
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(
        err instanceof ApiError
          ? err.message
          : 'Something went wrong while loading products.'
      )
      setItems([])
      setNextCursor(null)
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }, [category, limit])

  const loadMore = useCallback(async () => {
    if (!hasMore || !nextCursor || isLoadingMore) return

    setIsLoadingMore(true)
    setError(null)

    try {
      const data = await fetchProducts({
        limit,
        cursor: nextCursor,
        category,
      })
      // Append — never replace — on Load More.
      setItems((prev) => [...prev, ...data.items])
      setNextCursor(data.next_cursor)
      setHasMore(data.has_more)
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Could not load more products. Please try again.'
      )
    } finally {
      setIsLoadingMore(false)
    }
  }, [category, hasMore, isLoadingMore, limit, nextCursor])

  // Refetch from scratch whenever the category filter changes.
  useEffect(() => {
    loadInitial()
    return () => abortRef.current?.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, limit])

  return {
    items,
    nextCursor,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
    retry: loadInitial,
  }
}
