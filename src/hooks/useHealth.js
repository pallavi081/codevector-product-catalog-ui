import { useCallback, useEffect, useState } from 'react'
import { fetchHealth } from '../services/api'

const POLL_INTERVAL_MS = 30_000

/**
 * useHealth — polls GET /health periodically and exposes a simple
 * status enum the UI can render directly: 'checking' | 'online' | 'offline'.
 */
export function useHealth() {
  const [status, setStatus] = useState('checking')
  const [rawStatus, setRawStatus] = useState(null)

  const check = useCallback(async () => {
    try {
      const data = await fetchHealth()
      setRawStatus(data.status)
      setStatus(data.ok ? 'online' : 'offline')
    } catch {
      setStatus('offline')
      setRawStatus(null)
    }
  }, [])

  useEffect(() => {
    check()
    const id = setInterval(check, POLL_INTERVAL_MS)
    return () => clearInterval(id)
  }, [check])

  return { status, rawStatus, recheck: check }
}
