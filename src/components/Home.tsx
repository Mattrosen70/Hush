import { FC, useState } from 'react'
import useStore from '../store/meditationStore'
import { Statistics } from './Statistics'
import { SessionHistory } from './SessionHistory'
import { Button } from './Button'

interface HomeProps {
  onStartMeditation: () => void
}

export const Home: FC<HomeProps> = ({ onStartMeditation }) => {
  const sessionHistory = useStore((state) => state.sessionHistory)
  const preferences = useStore((state) => state.preferences)

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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">Hush</h1>
          <p className="text-gray-100 text-lg">Your personal meditation companion</p>
        </div>

        {/* Statistics */}
        <div className="mb-12">
          <Statistics
            totalSessions={totalSessions}
            totalMinutes={totalMinutes}
            currentStreak={currentStreak}
            lastSessionDate={lastSession?.startTime}
          />
        </div>

        {/* Start Button */}
        <div className="mb-12">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onStartMeditation}
            className="text-lg py-4"
          >
            Start Meditation
          </Button>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Sessions</h2>
          <SessionHistory sessions={recentSessions} />
        </div>

        {/* Quick Stats Info */}
        {totalSessions === 0 && (
          <div className="mt-8 bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 text-white text-center">
            <p className="text-lg mb-4">Welcome to Hush! 🧘</p>
            <p className="text-gray-100">
              Begin your meditation journey today. Every session brings you closer to peace and mindfulness.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
