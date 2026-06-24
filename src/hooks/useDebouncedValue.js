import { useEffect, useState } from 'react'

/** Returns a debounced copy of `value`, updated `delay` ms after it stops changing. */
export function useDebouncedValue(value, delay = 200) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}
