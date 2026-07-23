import type { HTMLAttributes } from 'react'
import styles from './Card.module.scss'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const classNames = [styles.card, className].filter(Boolean).join(' ')
  return <div className={classNames} {...props} />
}
