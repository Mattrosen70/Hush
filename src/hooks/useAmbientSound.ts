import { useCallback, useEffect, useRef, useState } from 'react'

export type SoundCategory = 'nature' | 'weather' | 'ambient' | 'white-noise'

/** Fill an AudioBuffer with brown noise (gentle, low-frequency) or white noise */
const fillNoiseBuffer = (buffer: AudioBuffer, category: SoundCategory): void => {
  const data = buffer.getChannelData(0)
  const size = data.length

  if (category === 'white-noise') {
    for (let i = 0; i < size; i++) {
      data[i] = Math.random() * 2 - 1
    }
  } else {
    // Brown noise – integrate white noise for a softer, more natural sound
    let last = 0.0
    for (let i = 0; i < size; i++) {
      const white = Math.random() * 2 - 1
      data[i] = (last + 0.02 * white) / 1.02
      last = data[i]
      data[i] *= 3.5
    }
  }
}

/**
 * useAmbientSound – generates procedural ambient sound via the Web Audio API.
 *
 * @param soundId  – the selected background-sound ID (used to detect "silence")
 * @param category – sound category from BackgroundSound data (drives noise type / filter)
 * @param volume   – master gain, 0–1 (default 0.25)
 */
export const useAmbientSound = (
  soundId: string,
  category: SoundCategory = 'ambient',
  volume = 0.25,
) => {
  const audioCtxRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const isSilence = soundId === 'sound-silence-01'

  /** Disconnect and stop the current source node, swallowing any already-stopped errors */
  const stopSource = useCallback(() => {
    const src = sourceRef.current
    if (src) {
      try {
        src.stop()
      } catch {
        // already stopped – fine
      }
      src.disconnect()
      sourceRef.current = null
    }
  }, [])

  const play = useCallback(() => {
    if (isSilence) {
      setIsPlaying(true)
      return
    }

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume().catch((err) => console.error('AudioContext resume error:', err))
      }

      stopSource()

      // 3-second looping noise buffer
      const bufferSize = ctx.sampleRate * 3
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      fillNoiseBuffer(buffer, category)

      const source = ctx.createBufferSource()
      source.buffer = buffer
      source.loop = true

      const gain = ctx.createGain()
      gain.gain.value = volume

      // Weather/nature sounds get a gentle low-pass filter for extra softness
      if (category === 'weather' || category === 'nature') {
        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.value = category === 'weather' ? 1200 : 2000
        source.connect(filter)
        filter.connect(gain)
      } else {
        source.connect(gain)
      }

      gain.connect(ctx.destination)
      source.start()
      sourceRef.current = source
      setIsPlaying(true)
    } catch (err) {
      console.error('Failed to start ambient sound:', err)
    }
  }, [isSilence, category, volume, stopSource])

  const pause = useCallback(() => {
    audioCtxRef.current
      ?.suspend()
      .then(() => setIsPlaying(false))
      .catch((err) => console.error('AudioContext suspend error:', err))
  }, [])

  const resume = useCallback(() => {
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current
        .resume()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('AudioContext resume error:', err))
    } else if (isSilence) {
      setIsPlaying(true)
    }
  }, [isSilence])

  const stop = useCallback(() => {
    stopSource()
    if (audioCtxRef.current) {
      audioCtxRef.current
        .close()
        .catch((err) => console.error('AudioContext close error:', err))
      audioCtxRef.current = null
    }
    setIsPlaying(false)
  }, [stopSource])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSource()
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
        audioCtxRef.current = null
      }
    }
  }, [stopSource])

  return { play, pause, resume, stop, isPlaying }
}
