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
      className="cursor-pointer hover:shadow-lg"
    >
      <div className="flex items-start gap-3">
        {icon && <div className="text-2xl">{icon}</div>}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </div>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(id)}
          className="mt-1 w-5 h-5 cursor-pointer"
        />
      </div>
    </Card>
  )
}
