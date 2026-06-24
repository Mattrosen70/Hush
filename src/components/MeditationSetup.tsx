import { FC, useState } from 'react'
import { Button } from './Button'
import { Slider } from './Slider'
import { SelectionCard } from './SelectionCard'
import { meditationScripts } from '../data/meditationScripts'
import { backgroundSounds } from '../data/backgroundSounds'
import { voices } from '../data/voices'
import { backgroundImages } from '../data/backgroundImages'
import useStore from '../store/meditationStore'

interface MeditationSetupProps {
  onStart: () => void
}

export const MeditationSetup: FC<MeditationSetupProps> = ({ onStart }) => {
  const [selectedScript, setSelectedScript] = useState<string>('')
  const [selectedSound, setSelectedSound] = useState<string>('')
  const [selectedVoice, setSelectedVoice] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [duration, setDuration] = useState<number>(10)
  const startSession = useStore((state) => state.startSession)

  const handleStart = () => {
    if (!selectedScript || !selectedSound || !selectedVoice || !selectedImage) {
      alert('Please select all options')
      return
    }

    startSession({
      scriptId: selectedScript,
      backgroundSoundId: selectedSound,
      voiceId: selectedVoice,
      backgroundImageId: selectedImage,
      duration,
    })

    onStart()
  }

  return (
    <div className="space-y-8">
      {/* Script Selection */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Choose Your Meditation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meditationScripts.map((script) => (
            <SelectionCard
              key={script.id}
              id={script.id}
              title={script.title}
              description={script.description}
              isSelected={selectedScript === script.id}
              onSelect={setSelectedScript}
            />
          ))}
        </div>
      </div>

      {/* Background Sound Selection */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Ambient Sound</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {backgroundSounds.map((sound) => (
            <SelectionCard
              key={sound.id}
              id={sound.id}
              title={sound.title}
              description={sound.description}
              isSelected={selectedSound === sound.id}
              onSelect={setSelectedSound}
            />
          ))}
        </div>
      </div>

      {/* Voice Selection */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Voice Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {voices.map((voice) => (
            <SelectionCard
              key={voice.id}
              id={voice.id}
              title={voice.name}
              description={`${voice.gender.charAt(0).toUpperCase() + voice.gender.slice(1)} - ${voice.accent}`}
              isSelected={selectedVoice === voice.id}
              onSelect={setSelectedVoice}
            />
          ))}
        </div>
      </div>

      {/* Background Image Selection */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Visual Background</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {backgroundImages.map((image) => (
            <SelectionCard
              key={image.id}
              id={image.id}
              title={image.title}
              description={image.description}
              isSelected={selectedImage === image.id}
              onSelect={setSelectedImage}
            />
          ))}
        </div>
      </div>

      {/* Duration Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <Slider
          label="Session Duration (minutes)"
          value={duration}
          min={5}
          max={60}
          step={5}
          onChange={setDuration}
          showValue={true}
        />
      </div>

      {/* Start Button */}
      <div className="flex justify-center">
        <Button variant="primary" size="lg" onClick={handleStart} fullWidth>
          Start Meditation
        </Button>
      </div>
    </div>
  )
}
