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
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
          {showValue && <span className="text-sm font-semibold text-blue-500">{value}</span>}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        {...props}
      />
    </div>
  )
}
