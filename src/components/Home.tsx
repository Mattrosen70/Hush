import { FC } from 'react'
import useStore from '../store/meditationStore'
import { Statistics } from './Statistics'
import { SessionHistory } from './SessionHistory'
import { Button } from './Button'

interface HomeProps {
  onStartMeditation: () => void
}

export const Home: FC<HomeProps> = ({ onStartMeditation }) => {
  const sessionHistory = useStore((state) => state.sessionHistory)

  // Calculate statistics
  const totalSessions = sessionHistory.length
  const totalMinutes = sessionHistory.reduce((sum, session) => sum + session.duration, 0)
  const lastSession = sessionHistory[sessionHistory.length - 1]
  
  // Calculate streak (simplified - counts consecutive completed sessions)
  let currentStreak = 0
  for (let i = sessionHistory.length - 1; i >= 0; i--) {
    if (sessionHistory[i].completed) {
      currentStreak++
    } else {
      break
    }
  }

  const recentSessions = sessionHistory.slice(-5).reverse().map((session) => ({
    id: session.id,
    date: session.startTime,
    duration: session.duration,
    scriptTitle: 'Meditation Session',
    completed: session.completed,
  }))

  return (
    <div className="min-h-screen p-6 md:p-10 fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 pt-10">
          <p className="text-teal-400/60 text-xs tracking-[0.35em] uppercase mb-4">✦ mindfulness ✦</p>
          <h1 className="text-6xl font-light text-white mb-3 tracking-wider">Hush</h1>
          <p className="text-slate-400 text-base tracking-wide">your personal meditation companion</p>
        </div>

        {/* Statistics */}
        <div className="mb-10">
          <Statistics
            totalSessions={totalSessions}
            totalMinutes={totalMinutes}
            currentStreak={currentStreak}
            lastSessionDate={lastSession?.startTime}
          />
        </div>

        {/* Start Button */}
        <div className="mb-10">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onStartMeditation}
            className="text-base py-4 tracking-wide"
          >
            Begin Session
          </Button>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white/[0.05] border border-white/10 backdrop-blur-sm rounded-2xl p-6">
          <h2 className="text-lg font-light text-slate-300 tracking-widest uppercase mb-6">
            Recent Sessions
          </h2>
          <SessionHistory sessions={recentSessions} />
        </div>

        {/* Welcome message for new users */}
        {totalSessions === 0 && (
          <div className="mt-8 bg-teal-900/20 border border-teal-400/20 rounded-2xl p-6 text-center slide-up">
            <p className="text-teal-300 text-lg font-light mb-3">Welcome to Hush 🌿</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Begin your meditation journey today. Every session brings you closer to peace and stillness.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
