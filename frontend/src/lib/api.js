// Tiny fetch wrapper for the admin API. Reads the JWT from localStorage and
// throws ApiError on non-2xx responses so callers can pattern-match on it.

const TOKEN_KEY = 'mvd_admin_token'

export class ApiError extends Error {
  constructor(status, message, body) {
    super(message)
    this.status = status
    this.body = body
  }
}

export const auth = {
  get token() {
    return localStorage.getItem(TOKEN_KEY)
  },
  set token(value) {
    if (value) localStorage.setItem(TOKEN_KEY, value)
    else localStorage.removeItem(TOKEN_KEY)
  },
  signOut() {
    localStorage.removeItem(TOKEN_KEY)
  },
}

async function request(method, path, { body, isForm = false } = {}) {
  const headers = {}
  if (!isForm && body !== undefined) headers['Content-Type'] = 'application/json'
  const token = auth.token
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(path, {
    method,
    headers,
    body: isForm ? body : body !== undefined ? JSON.stringify(body) : undefined,
  })

  const ctype = res.headers.get('content-type') || ''
  const payload = ctype.includes('application/json') ? await res.json().catch(() => null) : await res.text()

  if (!res.ok) {
    const msg = (payload && payload.error) || res.statusText || `HTTP ${res.status}`
    throw new ApiError(res.status, msg, payload)
  }
  return payload
}

export const api = {
  // auth
  login:  (password) => request('POST', '/api/auth/login', { body: { password } }),
  me:     ()         => request('GET',  '/api/auth/me'),
  // products
  list:   ()         => request('GET',  '/api/products'),
  get:    (slug)     => request('GET',  `/api/products/${encodeURIComponent(slug)}`),
  create: (data)     => request('POST', '/api/products', { body: data }),
  update: (slug, d)  => request('PUT',  `/api/products/${encodeURIComponent(slug)}`, { body: d }),
  remove: (slug)     => request('DELETE', `/api/products/${encodeURIComponent(slug)}`),
  // upload
  upload: (file) => {
    const fd = new FormData()
    fd.append('file', file)
    return request('POST', '/api/upload', { body: fd, isForm: true })
  },
}
