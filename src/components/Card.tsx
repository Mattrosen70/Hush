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
        bg-white dark:bg-gray-800 rounded-lg shadow-md p-4
        transition-all duration-200 cursor-pointer
        hover:shadow-lg ${isSelected ? 'ring-2 ring-blue-500' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
