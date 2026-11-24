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
import { nav } from './data'
import { useActiveSection, useReveal } from './hooks'

const IDS = ['top', ...nav.map((n) => n.id)]

export default function App() {
  const active = useActiveSection(IDS)
  const [palette, setPalette] = useState(false)
  const [project, setProject] = useState(null)
  useReveal()

  // ⌘K / Ctrl+K 로 명령 팔레트
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette((v) => !v) }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  const openPalette = useCallback(() => setPalette(true), [])
  const closePalette = useCallback(() => setPalette(false), [])

  return (
    <>
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
    </>
  )
}
