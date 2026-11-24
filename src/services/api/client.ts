import { site } from '@/config/site'

/** A typed error for failed requests; `status` is 0 for network-level failures. */
export class ApiError extends Error {
  readonly status: number
  readonly url: string

  constructor(message: string, status: number, url: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.url = url
  }
}

export interface RequestOptions {
  /** Query parameters merged into the URL; `undefined`/`''` values are dropped. */
  params?: Record<string, string | number | boolean | undefined>
  signal?: AbortSignal
}

/**
 * Fetch a JSON resource from the CheapShark API and return the parsed body.
 *
 * - Resolves `path` against the configured API base URL.
 * - Does NOT set a `User-Agent`: browsers own that header and may silently
 *   discard a manually supplied value.
 * - Throws a typed `ApiError` for network failures and non-2xx responses.
 */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const base = site.apiBaseUrl.endsWith('/') ? site.apiBaseUrl : `${site.apiBaseUrl}/`
  const url = new URL(path.replace(/^\//, ''), base)

  if (options.params) {
    for (const [key, value] of Object.entries(options.params)) {
      if (value !== undefined && value !== '') {
        url.searchParams.set(key, String(value))
      }
    }
  }

  let response: Response
  try {
    response = await fetch(url.toString(), {
      signal: options.signal,
      headers: { Accept: 'application/json' },
    })
  } catch (error) {
    throw new ApiError(
      error instanceof Error ? error.message : 'Network request failed',
      0,
      url.toString(),
    )
  }

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, response.status, url.toString())
  }

  return (await response.json()) as T
}
