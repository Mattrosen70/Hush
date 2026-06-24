import { useCallback, useEffect, useRef, useState } from 'react'

interface AudioManagerOptions {
  onTimeUpdate?: (currentTime: number) => void
  onEnded?: () => void
  onError?: (error: Error) => void
}

export const useAudioManager = (options: AudioManagerOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Create audio element if it doesn't exist
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0)
        options.onTimeUpdate?.(audioRef.current?.currentTime || 0)
      })
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false)
        options.onEnded?.()
      })
      audioRef.current.addEventListener('loadstart', () => setIsLoading(true))
      audioRef.current.addEventListener('canplay', () => setIsLoading(false))
      audioRef.current.addEventListener('error', (e) => {
        options.onError?.(new Error('Audio playback error'))
      })
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0)
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [options])

  const loadAudio = useCallback((url: string) => {
    if (audioRef.current) {
      audioRef.current.src = url
      audioRef.current.load()
    }
  }, [])

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }, [])

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  const resume = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }, [])

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [])

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume))
    }
  }, [])

  return {
    loadAudio,
    play,
    pause,
    resume,
    stop,
    seek,
    setVolume,
    isPlaying,
    currentTime,
    duration,
    isLoading,
  }
}
