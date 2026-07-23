import type { ButtonHTMLAttributes } from 'react'
import styles from './Chip.module.scss'

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

export function Chip({ active = false, className, ...props }: ChipProps) {
  const classNames = [styles.chip, active && styles.active, className].filter(Boolean).join(' ')
  return <button type="button" aria-pressed={active} className={classNames} {...props} />
}
