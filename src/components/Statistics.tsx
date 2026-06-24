import { FC } from 'react'
import { Card } from './Card'

export interface StatisticsProps {
  totalSessions: number
  totalMinutes: number
  currentStreak: number
  lastSessionDate?: Date
}

export const Statistics: FC<StatisticsProps> = ({
  totalSessions,
  totalMinutes,
  currentStreak,
  lastSessionDate,
}) => {
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Never'
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Card>
        <div className="text-center py-1">
          <p className="text-3xl font-light text-teal-300">{totalSessions}</p>
          <p className="text-xs text-slate-400 mt-2 tracking-wide uppercase">Sessions</p>
        </div>
      </Card>

      <Card>
        <div className="text-center py-1">
          <p className="text-3xl font-light text-teal-300">{totalMinutes}</p>
          <p className="text-xs text-slate-400 mt-2 tracking-wide uppercase">Minutes</p>
        </div>
      </Card>

      <Card>
        <div className="text-center py-1">
          <p className="text-3xl font-light text-teal-300">{currentStreak}</p>
          <p className="text-xs text-slate-400 mt-2 tracking-wide uppercase">Streak</p>
        </div>
      </Card>

      <Card>
        <div className="text-center py-1">
          <p className="text-sm font-light text-teal-300 truncate">
            {formatDate(lastSessionDate)}
          </p>
          <p className="text-xs text-slate-400 mt-2 tracking-wide uppercase">Last Session</p>
        </div>
      </Card>
    </div>
  )
}
