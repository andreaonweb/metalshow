import styles from './Skeleton.module.scss'

interface SkeletonProps {
  width?: string
  height?: string
  className?: string
}

export function Skeleton({ width = '100%', height = '1rem', className }: SkeletonProps) {
  const classNames = [styles.skeleton, className].filter(Boolean).join(' ')
  return <div className={classNames} style={{ width, height }} aria-hidden="true" />
}
