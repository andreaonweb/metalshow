export interface RecommendedArtist {
  name: string
  reason: string
  genres: string[]
}

export class RecommendationsError extends Error {}

export async function fetchRecommendations(artists: string[]): Promise<RecommendedArtist[]> {
  const response = await fetch('/api/recommendations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ artists }),
  })

  if (!response.ok) {
    throw new RecommendationsError('No se han podido generar recomendaciones. Inténtalo de nuevo.')
  }

  const data = await response.json()
  return data.recommendations
}
