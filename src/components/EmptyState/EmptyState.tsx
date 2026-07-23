import type { ReactNode } from 'react'
import styles from './EmptyState.module.scss'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  )
}
