import { FC } from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  isSelected?: boolean
}

export const Card: FC<CardProps> = ({ children, className = '', onClick, isSelected = false }) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white/[0.06] border border-white/[0.12] backdrop-blur-sm rounded-2xl p-4
        transition-all duration-300
        ${onClick ? 'cursor-pointer hover:bg-white/[0.10] hover:border-white/20' : ''}
        ${isSelected ? 'bg-teal-400/[0.12] border-teal-400/40' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
