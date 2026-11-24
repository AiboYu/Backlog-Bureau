import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * `useState` synced to `localStorage`.
 *
 * - Reads the initial value lazily (once), falling back to `initialValue`
 *   when the key is absent or the stored JSON is invalid.
 * - Writes to storage on every change.
 * - Degrades gracefully when storage is unavailable (private mode, quota).
 */
export function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readStoredValue(key, initialValue))
  const initialRef = useRef(initialValue)

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage unavailable — keep the value in memory only.
    }
  }, [key, value])

  const reset = useCallback(() => setValue(initialRef.current), [])

  return [value, setValue, reset] as const
}

function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}
