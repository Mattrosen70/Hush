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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-500">{totalSessions}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Total Sessions</p>
        </div>
      </Card>

      <Card>
        <div className="text-center">
          <p className="text-3xl font-bold text-purple-500">{totalMinutes}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Minutes Meditated</p>
        </div>
      </Card>

      <Card>
        <div className="text-center">
          <p className="text-3xl font-bold text-green-500">{currentStreak}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Day Streak</p>
        </div>
      </Card>

      <Card>
        <div className="text-center">
          <p className="text-sm font-semibold text-orange-500 truncate">
            {formatDate(lastSessionDate)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Last Session</p>
        </div>
      </Card>
    </div>
  )
}
