export interface BackgroundImage {
  id: string
  title: string
  description: string
  category: 'nature' | 'water' | 'sky' | 'urban'
  imageUrl?: string // Path to image file
  colorGradient?: string // CSS gradient as fallback
}

export const backgroundImages: BackgroundImage[] = [
  {
    id: 'bg-waterfall-01',
    title: 'Tropical Waterfall',
    description: 'Cascading waterfall in lush forest',
    category: 'water',
    colorGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'bg-ocean-01',
    title: 'Peaceful Ocean',
    description: 'Calm blue ocean at sunset',
    category: 'water',
    colorGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'bg-ocean-02',
    title: 'Ocean Horizon',
    description: 'Serene ocean meeting the horizon',
    category: 'water',
    colorGradient: 'linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%)',
  },
  {
    id: 'bg-forest-01',
    title: 'Green Forest',
    description: 'Peaceful forest with tall trees',
    category: 'nature',
    colorGradient: 'linear-gradient(135deg, #134E5E 0%, #71B280 100%)',
  },
  {
    id: 'bg-forest-02',
    title: 'Misty Forest',
    description: 'Foggy forest morning',
    category: 'nature',
    colorGradient: 'linear-gradient(135deg, #667eea 0%, #9fb1bc 100%)',
  },
  {
    id: 'bg-mountain-01',
    title: 'Snow Mountains',
    description: 'Majestic snow-capped mountains',
    category: 'nature',
    colorGradient: 'linear-gradient(180deg, #E0E0E0 0%, #FFFFFF 100%)',
  },
  {
    id: 'bg-mountain-02',
    title: 'Mountain Sunrise',
    description: 'Sunrise over mountain peaks',
    category: 'sky',
    colorGradient: 'linear-gradient(180deg, #FF6B6B 0%, #FFE66D 50%, #4ECDC4 100%)',
  },
  {
    id: 'bg-sunset-01',
    title: 'Tropical Sunset',
    description: 'Vibrant tropical sunset',
    category: 'sky',
    colorGradient: 'linear-gradient(180deg, #FF7E5F 0%, #FEB47B 100%)',
  },
  {
    id: 'bg-sunset-02',
    title: 'Ocean Sunset',
    description: 'Golden sunset over the ocean',
    category: 'water',
    colorGradient: 'linear-gradient(180deg, #FF6B35 0%, #FFA500 50%, #87CEEB 100%)',
  },
  {
    id: 'bg-night-01',
    title: 'Starry Night',
    description: 'Clear night sky with stars',
    category: 'sky',
    colorGradient: 'linear-gradient(180deg, #0a0e27 0%, #16213e 100%)',
  },
  {
    id: 'bg-night-02',
    title: 'Northern Lights',
    description: 'Aurora borealis in night sky',
    category: 'sky',
    colorGradient: 'linear-gradient(180deg, #0a0e27 0%, #1a472a 50%, #16a085 100%)',
  },
  {
    id: 'bg-beach-01',
    title: 'Sandy Beach',
    description: 'Quiet beach with golden sand',
    category: 'water',
    colorGradient: 'linear-gradient(180deg, #FFD89B 0%, #87CEEB 100%)',
  },
  {
    id: 'bg-lake-01',
    title: 'Mountain Lake',
    description: 'Crystal clear mountain lake',
    category: 'water',
    colorGradient: 'linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)',
  },
  {
    id: 'bg-zen-01',
    title: 'Zen Garden',
    description: 'Peaceful zen garden',
    category: 'nature',
    colorGradient: 'linear-gradient(135deg, #8B7E74 0%, #D4C5B9 100%)',
  },
]

export const getImagesByCategory = (category: BackgroundImage['category']) => {
  return backgroundImages.filter(image => image.category === category)
}

export const getImageById = (id: string) => {
  return backgroundImages.find(image => image.id === id)
}
