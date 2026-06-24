import { FC } from 'react'
import { Card } from './Card'

interface SelectionCardProps {
  id: string
  title: string
  description: string
  isSelected: boolean
  onSelect: (id: string) => void
  icon?: React.ReactNode
}

export const SelectionCard: FC<SelectionCardProps> = ({
  id,
  title,
  description,
  isSelected,
  onSelect,
  icon,
}) => {
  return (
    <Card
      isSelected={isSelected}
      onClick={() => onSelect(id)}
      className="cursor-pointer"
    >
      <div className="flex items-start gap-3">
        {icon && <div className="text-xl mt-0.5">{icon}</div>}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white text-sm">{title}</h3>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{description}</p>
        </div>
        <div className={`
          mt-0.5 w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-200
          ${isSelected
            ? 'bg-teal-400/80 border-teal-400'
            : 'border-white/25 bg-transparent'
          }
        `}>
          {isSelected && (
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
              <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </div>
    </Card>
  )
}
