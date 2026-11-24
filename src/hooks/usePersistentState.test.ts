import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { usePersistentState } from './usePersistentState'

describe('usePersistentState', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => usePersistentState('key', ['a']))
    expect(result.current[0]).toEqual(['a'])
  })

  it('reads an existing stored value', () => {
    window.localStorage.setItem('key', JSON.stringify(['stored']))
    const { result } = renderHook(() => usePersistentState('key', []))
    expect(result.current[0]).toEqual(['stored'])
  })

  it('falls back to the initial value on corrupt JSON', () => {
    window.localStorage.setItem('key', '{not-json')
    const { result } = renderHook(() => usePersistentState('key', 'fallback'))
    expect(result.current[0]).toBe('fallback')
  })

  it('persists updates to localStorage', () => {
    const { result } = renderHook(() => usePersistentState('key', 0))
    act(() => result.current[1](5))
    expect(window.localStorage.getItem('key')).toBe('5')
  })

  it('reset restores the initial value', () => {
    const { result } = renderHook(() => usePersistentState('key', 'initial'))
    act(() => result.current[1]('changed'))
    act(() => result.current[2]())
    expect(result.current[0]).toBe('initial')
  })
})
