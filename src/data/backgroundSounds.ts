export interface BackgroundSound {
  id: string
  title: string
  description: string
  category: 'nature' | 'weather' | 'ambient' | 'white-noise'
  audioUrl?: string // Path to audio file
  duration?: number // in seconds
}

export const backgroundSounds: BackgroundSound[] = [
  {
    id: 'sound-rain-01',
    title: 'Rainfall',
    description: 'Gentle, continuous rainfall sound',
    category: 'weather',
  },
  {
    id: 'sound-rain-02',
    title: 'Heavy Rain',
    description: 'Intense rainfall with distant thunder',
    category: 'weather',
  },
  {
    id: 'sound-fire-01',
    title: 'Crackling Fireplace',
    description: 'Warm and cozy crackling fire sounds',
    category: 'ambient',
  },
  {
    id: 'sound-forest-01',
    title: 'Forest Ambience',
    description: 'Ambient forest sounds with birds chirping',
    category: 'nature',
  },
  {
    id: 'sound-ocean-01',
    title: 'Ocean Waves',
    description: 'Calming sound of waves hitting the shore',
    category: 'nature',
  },
  {
    id: 'sound-ocean-02',
    title: 'Ocean Storm',
    description: 'Powerful ocean waves during a storm',
    category: 'nature',
  },
  {
    id: 'sound-wind-01',
    title: 'Gentle Wind',
    description: 'Soft wind breeze through trees',
    category: 'nature',
  },
  {
    id: 'sound-river-01',
    title: 'Flowing River',
    description: 'Peaceful flowing river sounds',
    category: 'nature',
  },
  {
    id: 'sound-thunder-01',
    title: 'Distant Thunder',
    description: 'Calming distant thunder with light rain',
    category: 'weather',
  },
  {
    id: 'sound-white-01',
    title: 'White Noise',
    description: 'Clean white noise for focus',
    category: 'white-noise',
  },
  {
    id: 'sound-white-02',
    title: 'Brown Noise',
    description: 'Deep brown noise for relaxation',
    category: 'white-noise',
  },
  {
    id: 'sound-silence-01',
    title: 'Silence',
    description: 'Pure silence for meditation',
    category: 'ambient',
  },
]

export const getSoundsByCategory = (category: BackgroundSound['category']) => {
  return backgroundSounds.filter(sound => sound.category === category)
}

export const getSoundById = (id: string) => {
  return backgroundSounds.find(sound => sound.id === id)
}
