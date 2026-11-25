import { useCallback, useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Career from './components/Career'
import Projects from './components/Projects'
import Palette from './components/Palette'
import StatusBar from './components/StatusBar'
import Footer from './components/Footer'
import CodeRain from './components/CodeRain'
import { nav } from './data'
import { useActiveSection, useReveal } from './hooks'
import { OSContext, useOSState } from './os'

const IDS = ['top', ...nav.map((n) => n.id)]
// 섹션마다 배경 분위기 색
const TONE = { top: '#7EE787', about: '#79C0FF', skills: '#D2A8FF', career: '#FFA657', projects: '#56D4DD' }
// Windows(화이트) 화면에서는 흰 배경에 보이도록 진한 색
const TONE_WIN = { top: '#1A7F37', about: '#0067C0', skills: '#8250DF', career: '#BC4C00', projects: '#0E7490' }

export default function App() {
  const osState = useOSState()
  const active = useActiveSection(IDS)
  const [palette, setPalette] = useState(false)
  const [project, setProject] = useState(null)
  useReveal()
  useEffect(() => { document.documentElement.dataset.sec = active }, [active])

  // ⌘K / Ctrl+K 로 명령 팔레트 (라이트=Windows 화면에서는 Ctrl+F 도)
  const isWin = osState.os === 'win'
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase()
      if ((e.metaKey || e.ctrlKey) && (k === 'k' || (isWin && e.ctrlKey && !e.shiftKey && !e.altKey && k === 'f'))) { e.preventDefault(); setPalette((v) => !v) }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [isWin])

  const openPalette = useCallback(() => setPalette(true), [])
  const closePalette = useCallback(() => setPalette(false), [])

  const tones = osState.os === 'win' ? TONE_WIN : TONE

  return (
    <OSContext.Provider value={osState}>
      <div className="bg-tones" aria-hidden="true">{IDS.map((id) => <i key={id} data-k={id} />)}</div>
      <CodeRain color={tones[active] ?? tones.top} dim={osState.os === 'win' ? '#9AA4B2' : undefined} />
      <div className="bg-grid" aria-hidden="true" />
      <Nav active={active} onPalette={openPalette} />
      <main>
        <Hero onPalette={openPalette} />
        <About />
        <Skills />
        <Career />
        <Projects open={project} setOpen={setProject} />
      </main>
      <Footer />
      <StatusBar active={active} />
      <Palette open={palette} onClose={closePalette} onProject={setProject} />
    </OSContext.Provider>
  )
}
