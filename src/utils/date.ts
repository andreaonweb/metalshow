const formatter = new Intl.DateTimeFormat('es-ES', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
})

/** Formatea una fecha ISO (YYYY-MM-DD) sin desplazamiento de zona horaria. */
export function formatConcertDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return formatter.format(date)
}

/** Fecha de hoy en la zona horaria local, como YYYY-MM-DD. */
export function todayISODate(): string {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}
