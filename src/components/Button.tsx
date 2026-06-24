import { FC } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'font-medium rounded-full tracking-wide transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed'

  const variantClasses = {
    primary: 'bg-teal-600/70 hover:bg-teal-500/80 text-white border border-teal-400/30',
    secondary: 'bg-slate-700/60 hover:bg-slate-600/70 text-slate-100 border border-white/10',
    outline: 'border border-teal-400/40 text-teal-300 hover:bg-teal-900/30 bg-transparent',
  }

  const sizeClasses = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-5 py-2 text-sm',
    lg: 'px-8 py-3 text-base',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
