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
      <div className="text-center py-10">
        <p className="text-slate-500 text-sm">No sessions yet</p>
        <p className="text-slate-600 text-xs mt-2">
          Begin your practice to see your history here
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {sessions.map((session) => (
        <Card key={session.id}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-white text-sm truncate">{session.scriptTitle}</h3>
                {session.completed && (
                  <span className="text-teal-400 text-xs">✓</span>
                )}
              </div>
              <div className="flex gap-3 mt-1 text-xs text-slate-500">
                <span>{formatDate(session.date)}</span>
                <span>·</span>
                <span>{session.duration} min</span>
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
