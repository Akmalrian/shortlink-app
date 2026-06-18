const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

async function request(method, path, body = null, token = null) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const options = { method, headers }
  if (body) options.body = JSON.stringify(body)

  const res = await fetch(`${BASE_URL}${path}`, options)
  const json = await res.json()

  if (!res.ok) throw new Error(json.message || 'Request failed')

  // backend selalu bungkus payload di field "data"
  return json.data
}

export const registerUser = (email, password) =>
  request('POST', '/api/register', { email, password })

export const loginUser = (email, password) =>
  request('POST', '/api/login', { email, password })

export const logoutUser = (token) =>
  request('DELETE', '/api/logout', null, token)

export const getLinks = (token) =>
  request('GET', '/api/links', null, token)

export const createLink = (token, originalUrl, customSlug) =>
  request('POST', '/api/links', {
    original_url: originalUrl,
    ...(customSlug ? { custom_slug: customSlug } : {}),
  }, token)

export const deleteLink = (token, id) =>
  request('DELETE', `/api/links/${id}`, null, token)