/**
 * api.js
 * ---------------------------------------------------------------------------
 * Single source of truth for talking to the Product Catalog backend.
 * Every network call in the app goes through this module so request
 * shape, error handling, and base URL configuration live in one place.
 * ---------------------------------------------------------------------------
 */

const RAW_BASE_URL = import.meta.env.VITE_API_URL || ''

if (!RAW_BASE_URL) {
  // eslint-disable-next-line no-console
  console.warn(
    '[api] VITE_API_URL is not set. Requests will fail until it is configured in your .env file.'
  )
}

// Strip a trailing slash so we never produce "//products"
const BASE_URL = RAW_BASE_URL.replace(/\/+$/, '')

/**
 * Custom error type so calling code can distinguish network failures
 * from HTTP error responses and from unexpected payload shapes.
 */
export class ApiError extends Error {
  constructor(message, { status = null, cause = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.cause = cause
  }
}

/**
 * Low-level fetch wrapper with consistent error handling.
 */
async function request(path, { signal } = {}) {
  if (!BASE_URL) {
    throw new ApiError(
      'The API URL is not configured. Set VITE_API_URL in your environment.'
    )
  }

  const url = `${BASE_URL}${path}`
  let response

  try {
    response = await fetch(url, { signal })
  } catch (err) {
    if (err.name === 'AbortError') throw err
    throw new ApiError(
      'Could not reach the backend. It may be waking up from sleep (Render free tier) or your network is offline.',
      { cause: err }
    )
  }

  if (!response.ok) {
    let detail = ''
    try {
      const body = await response.json()
      detail = body?.detail || body?.message || ''
    } catch {
      // response wasn't JSON — ignore
    }
    throw new ApiError(
      detail || `Request failed with status ${response.status}`,
      { status: response.status }
    )
  }

  try {
    return await response.json()
  } catch (err) {
    throw new ApiError('The server returned an unreadable response.', {
      cause: err,
    })
  }
}

/**
 * GET /products
 *
 * @param {Object} params
 * @param {number} [params.limit] - page size
 * @param {string|null} [params.cursor] - opaque cursor from a previous response
 * @param {string|null} [params.category] - category filter
 * @param {AbortSignal} [params.signal]
 * @returns {Promise<{items: Array, next_cursor: string|null, has_more: boolean}>}
 */
export async function fetchProducts({
  limit = 12,
  cursor = null,
  category = null,
  signal,
} = {}) {
  const searchParams = new URLSearchParams()
  searchParams.set('limit', String(limit))
  if (cursor) searchParams.set('cursor', cursor)
  if (category && category !== 'All') searchParams.set('category', category)

  const data = await request(`/products?${searchParams.toString()}`, {
    signal,
  })

  // Defensive normalization — never let a malformed payload crash the UI.
  return {
    items: Array.isArray(data?.items) ? data.items : [],
    next_cursor: data?.next_cursor ?? null,
    has_more: Boolean(data?.has_more),
  }
}

/**
 * GET /health
 * @returns {Promise<{status: string, ok: boolean}>}
 */
export async function fetchHealth({ signal } = {}) {
  const data = await request('/health', { signal })
  const statusText =
    typeof data?.status === 'string' ? data.status : JSON.stringify(data)
  return {
    status: statusText,
    ok: /ok|healthy|up|ready/i.test(statusText) || data?.status === true,
  }
}

export const API_BASE_URL = BASE_URL
