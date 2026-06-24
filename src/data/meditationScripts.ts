export interface MeditationScript {
  id: string
  title: string
  description: string
  category: 'anxiety' | 'calming' | 'focus' | 'sleep' | 'energy' | 'mindfulness'
  duration: number // in minutes
  content: string // narration text
}

export const meditationScripts: MeditationScript[] = [
  {
    id: 'script-anxiety-01',
    title: 'Anxiety Relief - Breathing Focus',
    description: 'A guided meditation to reduce anxiety through controlled breathing techniques',
    category: 'anxiety',
    duration: 10,
    content: `Welcome to this anxiety relief meditation. Find a comfortable position and begin by taking a deep breath in through your nose for a count of four. Hold it for four counts. Now exhale slowly for four counts. Let's begin...`,
  },
  {
    id: 'script-anxiety-02',
    title: 'Anxiety Release - Body Scan',
    description: 'Release tension and anxiety through progressive body scanning',
    category: 'anxiety',
    duration: 15,
    content: `Start by bringing your awareness to the top of your head. Notice any tension you might be holding. As you breathe, imagine that tension melting away...`,
  },
  {
    id: 'script-calming-01',
    title: 'Calm Mind Meditation',
    description: 'A gentle meditation to soothe your mind and ease into relaxation',
    category: 'calming',
    duration: 10,
    content: `Close your eyes and let your shoulders relax. With each breath, feel yourself becoming more and more relaxed. Let go of any worries or concerns...`,
  },
  {
    id: 'script-calming-02',
    title: 'Inner Peace Journey',
    description: 'A visualization journey to find your inner peace',
    category: 'calming',
    duration: 20,
    content: `Imagine yourself in a peaceful place. Perhaps it's a beach, a forest, or mountains. Feel the warmth, the gentle breeze, the sounds around you...`,
  },
  {
    id: 'script-focus-01',
    title: 'Mental Clarity Focus',
    description: 'Enhance focus and mental clarity for work or study',
    category: 'focus',
    duration: 8,
    content: `Begin by clearing your mind of distractions. With each breath, feel your mind becoming clearer and sharper. Focus on the present moment...`,
  },
  {
    id: 'script-focus-02',
    title: 'Deep Concentration Builder',
    description: 'Build deep concentration and mindful awareness',
    category: 'focus',
    duration: 12,
    content: `Let your mind settle like still water. Each thought that arises, observe it without judgment and let it pass. Your focus strengthens with each moment...`,
  },
  {
    id: 'script-sleep-01',
    title: 'Gentle Sleep Meditation',
    description: 'Drift into peaceful sleep with this calming meditation',
    category: 'sleep',
    duration: 20,
    content: `As your body relaxes, your eyelids become heavy. With each breath, you drift deeper into relaxation. Let sleep come naturally...`,
  },
  {
    id: 'script-sleep-02',
    title: 'Deep Sleep Journey',
    description: 'A deeper meditation to guide you into restorative sleep',
    category: 'sleep',
    duration: 30,
    content: `Imagine yourself descending slowly down a comfortable staircase. With each step, you feel more relaxed, more peaceful, more ready for sleep...`,
  },
  {
    id: 'script-energy-01',
    title: 'Morning Energy Boost',
    description: 'Start your day with renewed energy and motivation',
    category: 'energy',
    duration: 8,
    content: `Feel the energy flowing through your body. With each breath, you become more awake and energized. The day is full of possibilities...`,
  },
  {
    id: 'script-mindfulness-01',
    title: 'Mindfulness Basics',
    description: 'Learn foundational mindfulness techniques',
    category: 'mindfulness',
    duration: 10,
    content: `Mindfulness is the practice of being present in this moment. Notice your breath, your surroundings, your thoughts without judgment...`,
  },
]

export const getScriptsByCategory = (category: MeditationScript['category']) => {
  return meditationScripts.filter(script => script.category === category)
}

export const getScriptById = (id: string) => {
  return meditationScripts.find(script => script.id === id)
}
