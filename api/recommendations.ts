import type { VercelRequest, VercelResponse } from '@vercel/node'
import { google } from '@ai-sdk/google'
import { Output, generateText } from 'ai'
import { z } from 'zod'

const recommendationSchema = z.object({
  recommendations: z
    .array(
      z.object({
        name: z.string(),
        reason: z.string(),
        genres: z.array(z.string()),
      }),
    )
    .min(1)
    .max(8),
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' })
    return
  }

  const artists = Array.isArray(req.body?.artists)
    ? req.body.artists.filter((a: unknown): a is string => typeof a === 'string')
    : []

  if (artists.length === 0) {
    res.status(400).json({ error: 'Falta la lista de artistas' })
    return
  }

  try {
    const { output } = await generateText({
      model: google('gemini-3.6-flash'),
      output: Output.object({ schema: recommendationSchema }),
      prompt: `Eres un experto en metal, metalcore, deathcore, punk y rock, con especial atención a la escena de directos en España.

A un usuario le gustan estos grupos: ${artists.join(', ')}.

Recomienda entre 6 y 8 grupos DISTINTOS que no estén en esa lista y que probablemente le gusten, dando prioridad a bandas con proyección o actividad reciente en directo. Para cada uno da:
- name: el nombre exacto y oficial del grupo (tal y como aparecería en una entrada de concierto).
- reason: un motivo breve (una frase) de por qué encaja con sus gustos.
- genres: 1-3 géneros principales del grupo.`,
    })

    res.status(200).json(output)
  } catch (error) {
    console.error('Error generando recomendaciones:', error)
    res.status(500).json({ error: 'No se han podido generar recomendaciones' })
  }
}
