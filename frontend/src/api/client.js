const BASE = '/api'

export async function get(url) {
  const r = await fetch(BASE + url)
  if (!r.ok) throw new Error(r.statusText)
  return r.json()
}

export async function post(url, body) {
  const r = await fetch(BASE + url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!r.ok) throw new Error(r.statusText)
  return r.json()
}

export async function put(url, body) {
  const r = await fetch(BASE + url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!r.ok) throw new Error(r.statusText)
  return r.json()
}

export async function del(url) {
  const r = await fetch(BASE + url, { method: 'DELETE' })
  if (!r.ok && r.status !== 204) throw new Error(r.statusText)
}
