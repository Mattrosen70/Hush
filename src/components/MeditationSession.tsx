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
    return <div className="text-slate-400 text-center">No active session</div>
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
    : { background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' }

  const circumference = 2 * Math.PI * 88

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-700"
      style={backgroundStyle}
    >
      <div className="max-w-lg w-full space-y-10 fade-in">
        {/* Title */}
        <div className="text-center">
          <p className="text-white/50 text-xs tracking-[0.35em] uppercase mb-3">✦ in session ✦</p>
          <h1 className="text-3xl font-light text-white tracking-wide mb-1">{script?.title}</h1>
          <p className="text-white/50 text-sm tracking-wide">{image?.title}</p>
        </div>

        {/* Breathing Circle */}
        <div className="flex justify-center">
          <div className={`relative w-52 h-52 rounded-full flex items-center justify-center breathe ${isPlaying ? 'breathe' : ''}`}
            style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <div className="text-center z-10">
              <p className="text-5xl font-light text-white tabular-nums">
                {Math.floor(elapsedTime / 60)}:{String(Math.floor(elapsedTime % 60)).padStart(2, '0')}
              </p>
              <p className="text-white/50 text-xs tracking-widest uppercase mt-2">
                {currentSession.duration} min
              </p>
            </div>
            <svg
              className="absolute w-full h-full transform -rotate-90"
              viewBox="0 0 208 208"
            >
              <circle
                cx="104"
                cy="104"
                r="88"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              <circle
                cx="104"
                cy="104"
                r="88"
                fill="none"
                stroke="rgba(94,234,212,0.6)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (progressPercent / 100) * circumference}
                className="transition-all duration-300"
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
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center slide-up">
            <p className="text-white/60 text-xs tracking-[0.35em] uppercase mb-3">✦ complete ✦</p>
            <h2 className="text-2xl font-light text-white mb-3">Well done</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              You completed your {currentSession.duration}-minute session. Take a moment to rest in stillness.
            </p>
            <Button variant="primary" size="lg" onClick={handleComplete} fullWidth>
              Return Home
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
