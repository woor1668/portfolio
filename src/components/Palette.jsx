import { useEffect, useMemo, useRef, useState } from 'react'
import { nav, profile, projects } from '../data'
import { useModal } from '../hooks'

export default function Palette({ open, onClose, onProject }) {
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)
  const [toast, setToast] = useState('')
  const input = useRef(null)
  useModal(open, onClose)

  const items = useMemo(() => [
    ...nav.map((n) => ({ group: '이동', label: n.label, hint: n.file, run: () => document.getElementById(n.id)?.scrollIntoView({ behavior: 'smooth' }) })),
    ...projects.map((p) => ({ group: '프로젝트', label: p.title, hint: p.stack.join(' · '), run: () => onProject(p.slug) })),
    { group: '연락', label: '이메일 주소 복사', hint: profile.email, run: async () => { try { await navigator.clipboard.writeText(profile.email); setToast('복사했습니다') } catch { location.href = `mailto:${profile.email}` } }, keep: true },
    { group: '연락', label: 'GitHub 열기', hint: profile.github.replace('https://', ''), run: () => window.open(profile.github, '_blank', 'noopener') },
    { group: '이동', label: '맨 위로', hint: 'top', run: () => scrollTo({ top: 0, behavior: 'smooth' }) },
  ], [onProject])

  const shown = items.filter((x) => (x.label + x.hint + x.group).toLowerCase().includes(q.toLowerCase()))

  useEffect(() => { if (open) { setQ(''); setI(0); setToast(''); setTimeout(() => input.current?.focus(), 10) } }, [open])
  useEffect(() => { setI(0) }, [q])

  if (!open) return null
  const run = (x) => { x.run(); if (!x.keep) onClose() }

  return (
    <div className="palette" role="dialog" aria-modal="true" aria-label="명령 팔레트" onClick={onClose}>
      <div className="palette__box" onClick={(e) => e.stopPropagation()}>
        <div className="palette__input">
          <span className="c-ok">›</span>
          <input
            ref={input}
            value={q}
            placeholder="섹션, 프로젝트, 연락처 검색…"
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setI((x) => Math.min(shown.length - 1, x + 1)) }
              if (e.key === 'ArrowUp') { e.preventDefault(); setI((x) => Math.max(0, x - 1)) }
              if (e.key === 'Enter' && shown[i]) run(shown[i])
            }}
          />
          <kbd>esc</kbd>
        </div>
        <ul className="palette__list">
          {shown.map((x, k) => (
            <li key={x.group + x.label}>
              {(k === 0 || shown[k - 1].group !== x.group) && <p className="palette__group">{x.group}</p>}
              <button className={k === i ? 'is-on' : ''} onMouseEnter={() => setI(k)} onClick={() => run(x)}>
                <span>{x.label}</span><small>{x.hint}</small>
              </button>
            </li>
          ))}
          {!shown.length && <li className="palette__empty">결과가 없습니다</li>}
        </ul>
        {toast && <p className="palette__toast">{toast}</p>}
      </div>
    </div>
  )
}
