import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  const classNames = [styles.button, styles[variant], className].filter(Boolean).join(' ')
  return <button className={classNames} {...props} />
}
