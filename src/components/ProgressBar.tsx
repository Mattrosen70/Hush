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
      {label && (
        <p className="text-xs font-medium text-slate-400 tracking-widest uppercase mb-2">{label}</p>
      )}
      <div className="w-full bg-white/[0.08] rounded-full h-1 overflow-hidden">
        <div
          className={`
            h-full bg-gradient-to-r from-teal-500/80 to-teal-300/80
            transition-all duration-500 ease-out rounded-full
            ${striped ? 'bg-stripe' : ''}
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      <p className="text-xs text-slate-600 mt-1 text-right">
        {Math.round(clampedProgress)}%
      </p>
    </div>
  )
}
