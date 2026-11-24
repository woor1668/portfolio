import { nav } from '../data'
import { useScrollProgress } from '../hooks'

export default function StatusBar({ active }) {
  const p = useScrollProgress()
  const file = nav.find((n) => n.id === active)?.file ?? 'index.tsx'
  return (
    <footer className="status" aria-hidden="true">
      <span className="status__branch">⎇ main</span>
      <span className="status__ok">✓ 0 problems</span>
      <span className="status__file">{file}</span>
      <span className="status__sp" />
      <span>Ln {Math.round(p * 100)}%</span>
      <span className="status__hide">UTF-8</span>
      <span className="status__hide">React · Vite</span>
      <button className="status__top" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={-1}>↑ top</button>
      <i className="status__bar" style={{ transform: `scaleX(${p})` }} />
    </footer>
  )
}
