import { FC } from 'react'

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  value: number
  min?: number
  max?: number
  step?: number
  onChange: (value: number) => void
  showValue?: boolean
}

export const Slider: FC<SliderProps> = ({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  showValue = true,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-3">
          <label className="text-xs font-medium text-slate-400 tracking-widest uppercase">{label}</label>
          {showValue && (
            <span className="text-sm font-light text-teal-300 tabular-nums">{value}</span>
          )}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-white/[0.10] rounded-full appearance-none cursor-pointer accent-teal-400"
        {...props}
      />
    </div>
  )
}
