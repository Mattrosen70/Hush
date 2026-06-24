export interface Voice {
  id: string
  name: string
  gender: 'male' | 'female' | 'neutral'
  accent: 'american' | 'british' | 'australian' | 'indian' | 'neutral'
  description: string
  language?: string
}

export const voices: Voice[] = [
  {
    id: 'voice-male-us-01',
    name: 'James',
    gender: 'male',
    accent: 'american',
    description: 'Calm American male voice',
    language: 'en-US',
  },
  {
    id: 'voice-male-us-02',
    name: 'Marcus',
    gender: 'male',
    accent: 'american',
    description: 'Deep and soothing American male voice',
    language: 'en-US',
  },
  {
    id: 'voice-male-uk-01',
    name: 'Oliver',
    gender: 'male',
    accent: 'british',
    description: 'Gentle British male voice',
    language: 'en-GB',
  },
  {
    id: 'voice-male-au-01',
    name: 'Ethan',
    gender: 'male',
    accent: 'australian',
    description: 'Relaxing Australian male voice',
    language: 'en-AU',
  },
  {
    id: 'voice-male-in-01',
    name: 'Arjun',
    gender: 'male',
    accent: 'indian',
    description: 'Peaceful Indian male voice',
    language: 'en-IN',
  },
  {
    id: 'voice-female-us-01',
    name: 'Sarah',
    gender: 'female',
    accent: 'american',
    description: 'Warm American female voice',
    language: 'en-US',
  },
  {
    id: 'voice-female-us-02',
    name: 'Emma',
    gender: 'female',
    accent: 'american',
    description: 'Gentle and soothing American female voice',
    language: 'en-US',
  },
  {
    id: 'voice-female-uk-01',
    name: 'Charlotte',
    gender: 'female',
    accent: 'british',
    description: 'Serene British female voice',
    language: 'en-GB',
  },
  {
    id: 'voice-female-au-01',
    name: 'Sophie',
    gender: 'female',
    accent: 'australian',
    description: 'Calming Australian female voice',
    language: 'en-AU',
  },
  {
    id: 'voice-female-in-01',
    name: 'Priya',
    gender: 'female',
    accent: 'indian',
    description: 'Tranquil Indian female voice',
    language: 'en-IN',
  },
  {
    id: 'voice-neutral-01',
    name: 'Alex',
    gender: 'neutral',
    accent: 'neutral',
    description: 'Clear neutral voice',
    language: 'en-US',
  },
]

export const getVoicesByGender = (gender: Voice['gender']) => {
  return voices.filter(voice => voice.gender === gender)
}

export const getVoicesByAccent = (accent: Voice['accent']) => {
  return voices.filter(voice => voice.accent === accent)
}

export const getVoiceById = (id: string) => {
  return voices.find(voice => voice.id === id)
}
