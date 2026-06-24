import { create } from 'zustand'

export interface MeditationSession {
  id: string
  scriptId: string
  backgroundSoundId: string
  voiceId: string
  duration: number // in minutes
  backgroundImageId: string
  startTime: Date
  endTime?: Date
  completed: boolean
}

export interface MeditationPreferences {
  favoriteScripts: string[]
  favoriteBackgroundSounds: string[]
  favoriteVoices: string[]
  favoriteBackgroundImages: string[]
  defaultDuration: number
}

export interface MeditationStore {
  // Session state
  currentSession: MeditationSession | null
  sessionHistory: MeditationSession[]
  
  // Configuration
  preferences: MeditationPreferences
  
  // Actions
  startSession: (session: Omit<MeditationSession, 'id' | 'startTime' | 'completed'>) => void
  endSession: (completed: boolean) => void
  pauseSession: () => void
  resumeSession: () => void
  savePreferences: (preferences: Partial<MeditationPreferences>) => void
  addFavoriteScript: (scriptId: string) => void
  addFavoriteSound: (soundId: string) => void
  addFavoriteVoice: (voiceId: string) => void
  addFavoriteImage: (imageId: string) => void
}

const useStore = create<MeditationStore>((set) => ({
  currentSession: null,
  sessionHistory: [],
  preferences: {
    favoriteScripts: [],
    favoriteBackgroundSounds: [],
    favoriteVoices: [],
    favoriteBackgroundImages: [],
    defaultDuration: 10,
  },

  startSession: (sessionData) =>
    set(() => ({
      currentSession: {
        ...sessionData,
        id: `session-${Date.now()}`,
        startTime: new Date(),
        completed: false,
      },
    })),

  endSession: (completed) =>
    set((state) => {
      if (!state.currentSession) return state
      const updatedSession = {
        ...state.currentSession,
        endTime: new Date(),
        completed,
      }
      return {
        currentSession: null,
        sessionHistory: [...state.sessionHistory, updatedSession],
      }
    }),

  pauseSession: () => {
    // Pause implementation will be handled by AudioManager
  },

  resumeSession: () => {
    // Resume implementation will be handled by AudioManager
  },

  savePreferences: (newPreferences) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        ...newPreferences,
      },
    })),

  addFavoriteScript: (scriptId) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        favoriteScripts: [...new Set([...state.preferences.favoriteScripts, scriptId])],
      },
    })),

  addFavoriteSound: (soundId) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        favoriteBackgroundSounds: [...new Set([...state.preferences.favoriteBackgroundSounds, soundId])],
      },
    })),

  addFavoriteVoice: (voiceId) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        favoriteVoices: [...new Set([...state.preferences.favoriteVoices, voiceId])],
      },
    })),

  addFavoriteImage: (imageId) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        favoriteBackgroundImages: [...new Set([...state.preferences.favoriteBackgroundImages, imageId])],
      },
    })),
}))

export default useStore
