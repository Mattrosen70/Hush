import { FC } from 'react'

interface ProgressBarProps {
  progress: number // 0-100
  animated?: boolean
  striped?: boolean
  label?: string
}

export const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  animated = false,
  striped = false,
  label,
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress))

  return (
    <div>
      {label && <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</p>}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className={`
            h-full bg-gradient-to-r from-blue-400 to-purple-500
            transition-all duration-300 ease-out
            ${striped ? 'bg-stripe' : ''}
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
        {clampedProgress}%
      </p>
    </div>
  )
}
