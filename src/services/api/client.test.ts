import { afterEach, describe, expect, it, vi } from 'vitest'
import { jsonResponse } from '@/test/utils'
import { ApiError, request } from './client'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('request', () => {
  it('parses JSON on a 200 response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ ok: true })))
    const data = await request<{ ok: boolean }>('/games')
    expect(data).toEqual({ ok: true })
  })

  it('resolves paths against the API base URL and serializes params', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse([]))
    vi.stubGlobal('fetch', fetchMock)
    await request('/deals', { params: { pageSize: 2, title: 'cyberpunk 2077', skip: undefined } })
    const url = fetchMock.mock.calls[0][0] as string
    expect(url).toContain('https://www.cheapshark.com/api/1.0/deals?')
    expect(url).toContain('pageSize=2')
    expect(url).toContain('title=cyberpunk+2077')
    expect(url).not.toContain('skip')
  })

  it('does not set a User-Agent header', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse([]))
    vi.stubGlobal('fetch', fetchMock)
    await request('/deals')
    const init = fetchMock.mock.calls[0][1] as RequestInit
    const headers = init?.headers as Record<string, string>
    expect(Object.keys(headers).map((key) => key.toLowerCase())).not.toContain('user-agent')
  })

  it('throws ApiError on a non-2xx response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({}, 404)))
    const error = await request('/games').catch((e: unknown) => e)
    expect(error).toBeInstanceOf(ApiError)
    expect((error as ApiError).status).toBe(404)
  })

  it('throws ApiError with status 0 on network failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    const error = await request('/games').catch((e: unknown) => e)
    expect(error).toBeInstanceOf(ApiError)
    expect((error as ApiError).status).toBe(0)
  })
})
