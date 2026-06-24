import { FC, useEffect, useState } from 'react'
import { Button } from './Button'
import { ProgressBar } from './ProgressBar'
import { useAudioManager } from '../hooks/useAudioManager'
import useStore from '../store/meditationStore'
import { getScriptById } from '../data/meditationScripts'
import { getImageById } from '../data/backgroundImages'

interface MeditationSessionProps {
  onComplete: () => void
}

export const MeditationSession: FC<MeditationSessionProps> = ({ onComplete }) => {
  const currentSession = useStore((state) => state.currentSession)
  const endSession = useStore((state) => state.endSession)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [sessionCompleted, setSessionCompleted] = useState(false)

  const { play, pause, isPlaying, currentTime, duration } = useAudioManager({
    onTimeUpdate: (time) => setElapsedTime(time),
    onEnded: () => {
      setSessionCompleted(true)
    },
  })

  useEffect(() => {
    // Auto-play meditation session
    play()
  }, [play])

  if (!currentSession) {
    return <div className="text-white text-center">No active session</div>
  }

  const script = getScriptById(currentSession.scriptId)
  const image = getImageById(currentSession.backgroundImageId)
  const totalSeconds = currentSession.duration * 60
  const progressPercent = (elapsedTime / totalSeconds) * 100

  const handleComplete = () => {
    endSession(true)
    setSessionCompleted(false)
    onComplete()
  }

  const handleCancel = () => {
    endSession(false)
    setSessionCompleted(false)
    onComplete()
  }

  const backgroundStyle = image?.colorGradient
    ? { backgroundImage: image.colorGradient }
    : { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-500"
      style={backgroundStyle}
    >
      <div className="max-w-2xl w-full space-y-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">{script?.title}</h1>
          <p className="text-gray-100">{image?.title}</p>
        </div>

        {/* Progress Circle */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48 rounded-full bg-white bg-opacity-10 backdrop-blur-md flex items-center justify-center">
            <div className="text-center">
              <p className="text-5xl font-bold text-white">
                {Math.floor(elapsedTime / 60)}:{String(Math.floor(elapsedTime % 60)).padStart(2, '0')}
              </p>
              <p className="text-gray-200 text-sm mt-2">
                {currentSession.duration} minutes
              </p>
            </div>
            <svg
              className="absolute w-full h-full transform -rotate-90"
              style={{
                strokeDasharray: `${(progressPercent / 100) * (2 * Math.PI * 96)} ${2 * Math.PI * 96}`,
              }}
            >
              <circle
                cx="96"
                cy="96"
                r="96"
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="4"
              />
            </svg>
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar progress={progressPercent} animated={isPlaying} label="Session Progress" />

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => (isPlaying ? pause() : play())}
          >
            {isPlaying ? 'Pause' : 'Resume'}
          </Button>
          <Button variant="secondary" size="lg" onClick={handleCancel}>
            Exit
          </Button>
        </div>

        {/* Completion Message */}
        {sessionCompleted && (
          <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Great Job! 🎉</h2>
            <p className="text-gray-100 mb-6">
              You completed your {currentSession.duration}-minute meditation session.
            </p>
            <Button variant="primary" size="lg" onClick={handleComplete} fullWidth>
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
