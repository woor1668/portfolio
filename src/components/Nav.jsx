import { useState } from 'react'
import { nav, profile } from '../data'

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

export default function Nav({ active, onPalette }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav">
      <div className="nav__bar">
        <button className="nav__brand" onClick={() => go('top')} aria-label="맨 위로">
          <span className="nav__dots" aria-hidden="true"><i /><i /><i /></span>
          <b>JB WORKS</b>
          <span className="nav__path">~/{profile.handle}/portfolio</span>
        </button>
        <nav className={`nav__tabs ${open ? 'is-open' : ''}`} aria-label="섹션">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={active === n.id ? 'is-on' : ''}
              onClick={(e) => { e.preventDefault(); go(n.id); setOpen(false) }}
            >
              <span className={`ext ext--${n.file.split('.').pop().replace('/', 'dir')}`} aria-hidden="true" />
              {n.file}
            </a>
          ))}
        </nav>
        <button className="nav__cmd" onClick={onPalette} aria-label="명령 팔레트 열기">
          <span>검색</span><kbd>⌘K</kbd>
        </button>
        <button className="nav__burger" onClick={() => setOpen((v) => !v)} aria-label="메뉴" aria-expanded={open}>
          <i /><i />
        </button>
      </div>
    </header>
  )
}
