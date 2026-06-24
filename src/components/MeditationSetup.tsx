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
    <div className="min-h-screen p-6 md:p-10 fade-in">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Page header */}
        <div className="text-center pt-8 pb-2">
          <p className="text-teal-400/60 text-xs tracking-[0.35em] uppercase mb-3">✦ prepare ✦</p>
          <h1 className="text-4xl font-light text-white tracking-wider">Your Session</h1>
        </div>

        {/* Script Selection */}
        <div>
          <h2 className="text-xs font-semibold text-slate-400 tracking-[0.3em] uppercase mb-4">
            Meditation Style
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          <h2 className="text-xs font-semibold text-slate-400 tracking-[0.3em] uppercase mb-4">
            Ambient Sound
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          <h2 className="text-xs font-semibold text-slate-400 tracking-[0.3em] uppercase mb-4">
            Voice Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {voices.map((voice) => (
              <SelectionCard
                key={voice.id}
                id={voice.id}
                title={voice.name}
                description={`${voice.gender.charAt(0).toUpperCase() + voice.gender.slice(1)} · ${voice.accent}`}
                isSelected={selectedVoice === voice.id}
                onSelect={setSelectedVoice}
              />
            ))}
          </div>
        </div>

        {/* Background Image Selection */}
        <div>
          <h2 className="text-xs font-semibold text-slate-400 tracking-[0.3em] uppercase mb-4">
            Visual Scene
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
        <div className="bg-white/[0.05] border border-white/10 backdrop-blur-sm rounded-2xl p-6">
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
        <div className="flex justify-center pb-10">
          <Button variant="primary" size="lg" onClick={handleStart} fullWidth>
            Begin Meditation
          </Button>
        </div>
      </div>
    </div>
  )
}
