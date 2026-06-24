import { useState } from 'react'
import { Home } from './components/Home'
import { MeditationSetup } from './components/MeditationSetup'
import { MeditationSession } from './components/MeditationSession'
import useStore from './store/meditationStore'
import './styles/App.css'

type AppView = 'home' | 'setup' | 'session'

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home')
  const currentSession = useStore((state) => state.currentSession)

  const handleStartMeditation = () => {
    setCurrentView('setup')
  }

  const handleSetupComplete = () => {
    setCurrentView('session')
  }

  const handleSessionComplete = () => {
    setCurrentView('home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900">
      {currentView === 'home' && <Home onStartMeditation={handleStartMeditation} />}
      {currentView === 'setup' && <MeditationSetup onStart={handleSetupComplete} />}
      {currentView === 'session' && currentSession && (
        <MeditationSession onComplete={handleSessionComplete} />
      )}
    </div>
  )
}

export default App
