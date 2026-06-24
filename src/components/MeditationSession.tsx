import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Button } from './Button'
import { ProgressBar } from './ProgressBar'
import useStore from '../store/meditationStore'
import { getScriptById } from '../data/meditationScripts'
import { getImageById } from '../data/backgroundImages'
import { getSoundById } from '../data/backgroundSounds'
import { getVoiceById } from '../data/voices'
import { useAmbientSound, type SoundCategory } from '../hooks/useAmbientSound'

interface MeditationSessionProps {
  onComplete: () => void
}

export const MeditationSession: FC<MeditationSessionProps> = ({ onComplete }) => {
  const currentSession = useStore((state) => state.currentSession)
  const endSession = useStore((state) => state.endSession)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [sessionCompleted, setSessionCompleted] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const sound = getSoundById(currentSession?.backgroundSoundId ?? '')
  const voice = getVoiceById(currentSession?.voiceId ?? '')
  const script = getScriptById(currentSession?.scriptId ?? '')

  const { play: playAmbient, pause: pauseAmbient, resume: resumeAmbient, stop: stopAmbient, isPlaying: isAmbientPlaying } =
    useAmbientSound(
      currentSession?.backgroundSoundId ?? '',
      (sound?.category as SoundCategory) ?? 'ambient',
    )

  const totalSeconds = (currentSession?.duration ?? 0) * 60
  // Stable ref so the interval closure always reads the current value
  const totalSecondsRef = useRef(totalSeconds)
  totalSecondsRef.current = totalSeconds

  // ── Timer helpers ────────────────────────────────────────────────────────────

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    clearTimer()
    intervalRef.current = setInterval(() => {
      setElapsedTime((prev) => {
        const next = prev + 1
        if (next >= totalSecondsRef.current) {
          clearInterval(intervalRef.current!)
          intervalRef.current = null
          setSessionCompleted(true)
        }
        return next
      })
    }, 1000)
  }, [clearTimer])

  // ── Voice guidance ───────────────────────────────────────────────────────────

  const startVoiceGuidance = useCallback(() => {
    if (!script?.content || typeof window.speechSynthesis === 'undefined') return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(script.content)
    utterance.rate = 0.85
    utterance.pitch = 1.0
    // Slightly lower volume so it balances with ambient sound
    utterance.volume = 0.85

    // Match the selected voice by language code
    if (voice?.language) {
      const available = window.speechSynthesis.getVoices()
      const langPrefix = voice.language.split('-')[0]
      const matched =
        available.find((v) => v.lang === voice.language) ??
        available.find((v) => v.lang.startsWith(langPrefix))
      if (matched) utterance.voice = matched
    }

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e.error)
    }

    window.speechSynthesis.speak(utterance)
  }, [script, voice])

  // ── Session initialisation (runs once on mount) ──────────────────────────────

  useEffect(() => {
    playAmbient()
    startTimer()

    // Brief delay so ambient sound starts before the voice begins
    const voiceTimeout = window.setTimeout(startVoiceGuidance, 1500)

    return () => {
      window.clearTimeout(voiceTimeout)
      clearTimer()
      stopAmbient()
      if (typeof window.speechSynthesis !== 'undefined') {
        window.speechSynthesis.cancel()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentionally runs only once on mount

  // ── Guard ────────────────────────────────────────────────────────────────────

  if (!currentSession) {
    return <div className="text-slate-400 text-center">No active session</div>
  }

  const image = getImageById(currentSession.backgroundImageId)
  const remainingTime = Math.max(0, totalSeconds - elapsedTime)
  const progressPercent = totalSeconds > 0 ? (elapsedTime / totalSeconds) * 100 : 0

  const backgroundStyle = image?.colorGradient
    ? { backgroundImage: image.colorGradient }
    : { background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' }

  const circumference = 2 * Math.PI * 88

  // ── Controls ─────────────────────────────────────────────────────────────────

  const handlePause = () => {
    setIsPaused(true)
    clearTimer()
    pauseAmbient()
    window.speechSynthesis?.pause()
  }

  const handleResume = () => {
    setIsPaused(false)
    startTimer()
    resumeAmbient()
    window.speechSynthesis?.resume()
  }

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

  // ── Render ───────────────────────────────────────────────────────────────────

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

        {/* Breathing Circle with countdown timer */}
        <div className="flex justify-center">
          <div
            className={`relative w-52 h-52 rounded-full flex items-center justify-center ${!isPaused && isAmbientPlaying ? 'breathe' : ''}`}
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <div className="text-center z-10">
              <p className="text-5xl font-light text-white tabular-nums">
                {Math.floor(remainingTime / 60)}:{String(remainingTime % 60).padStart(2, '0')}
              </p>
              <p className="text-white/50 text-xs tracking-widest uppercase mt-2">remaining</p>
            </div>
            <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 208 208">
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
        <ProgressBar progress={progressPercent} animated={!isPaused} label="Session Progress" />

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          <Button variant="outline" size="lg" onClick={isPaused ? handleResume : handlePause}>
            {isPaused ? 'Resume' : 'Pause'}
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
              You completed your {currentSession.duration}-minute session. Take a moment to rest in
              stillness.
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
