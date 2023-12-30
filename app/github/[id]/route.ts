import { NextResponse } from 'next/server'

const cache = new Map<string, string>()
let hits = 0
let misses = 0

function logCache() {
  const ratio = hits / (hits + misses)

  console.log(`[github] cache hit ratio: ${hits}/${hits + misses} = ${Math.round(ratio * 100)}%`)
}

export async function GET(req: Request, { params }: { params: { id: string } }): Promise<Response> {
  const { id } = params

  if (cache.has(id)) {
    hits++
    logCache()
    return NextResponse.redirect(cache.get(id)!)
  } else {
    misses++
  }

  const res = await fetch(`https://api.github.com/user/${id}`)
  if (!res.ok) return NextResponse.error()

  const data = await res.json()
  if (!data.html_url) return NextResponse.error()

  cache.set(id, data.html_url)

  logCache()
  return NextResponse.redirect(data.html_url)
}
