import { FC } from 'react'
import { Card } from './Card'
import { Button } from './Button'

interface SessionHistoryItem {
  id: string
  date: Date
  duration: number
  scriptTitle: string
  completed: boolean
}

interface SessionHistoryProps {
  sessions: SessionHistoryItem[]
  onRetry?: (sessionId: string) => void
}

export const SessionHistory: FC<SessionHistoryProps> = ({ sessions, onRetry }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  if (sessions.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No meditation sessions yet</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Start your first meditation to build your practice
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {sessions.map((session) => (
        <Card key={session.id}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">{session.scriptTitle}</h3>
                {session.completed && <span className="text-green-500">✓</span>}
              </div>
              <div className="flex gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                <span>{formatDate(session.date)}</span>
                <span>{session.duration} minutes</span>
              </div>
            </div>
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRetry(session.id)}
              >
                Repeat
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
