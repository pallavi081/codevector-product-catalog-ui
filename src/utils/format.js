/**
 * format.js — small, pure display-formatting helpers.
 */

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export function formatPrice(value) {
  const num = Number(value)
  if (Number.isNaN(num)) return '—'
  return currencyFormatter.format(num)
}

export function formatDate(value) {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return dateFormatter.format(d)
}

export function formatDateTime(value) {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return dateTimeFormatter.format(d)
}

/** Truncates a long opaque cursor token for display in the UI. */
export function truncateCursor(cursor, visible = 10) {
  if (!cursor) return null
  if (cursor.length <= visible * 2) return cursor
  return `${cursor.slice(0, visible)}…${cursor.slice(-visible)}`
}
