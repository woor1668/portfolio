import { useEffect, useRef, useState } from 'react'
import { profile, projects, stats } from '../data'
import { useCountUp, useTyping } from '../hooks'

function Stat({ value, label, run }) {
  const v = useCountUp(value, run)
  return <div><b>{v}</b><span>{label}</span></div>
}

const LINES = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: `${profile.name} — ${profile.role}` },
  { type: 'cmd', text: 'cat motto.txt' },
  { type: 'out', text: `"${profile.tagline}"` },
  { type: 'cmd', text: 'ls projects/' },
  { type: 'ls', text: projects.map((p) => p.slug).join('  ') },
]

// ls 결과의 프로젝트 이름을 누르면 Projects 섹션의 해당 카드로 내려가 잠깐 강조한다
const goProject = (slug) => {
  const card = document.getElementById(`p-${slug}`)
  if (!card) return
  // 내려가는 동안 위쪽 섹션 높이가 바뀔 수 있어서, 멈출 때마다 위치를 확인해 다시 맞춘 뒤 강조한다
  let tries = 0
  const go = () => card.scrollIntoView({ behavior: 'smooth', block: 'center' })
  const flash = () => {
    card.classList.remove('is-flash')
    void card.offsetWidth
    card.classList.add('is-flash')
    setTimeout(() => card.classList.remove('is-flash'), 1800)
  }
  const check = () => {
    const off = Math.abs(card.getBoundingClientRect().top + card.offsetHeight / 2 - innerHeight / 2)
    if (off > 40 && tries++ < 3) { go(); setTimeout(check, 700) } else flash()
  }
  go()
  setTimeout(check, 900)
}

export default function Hero({ onPalette }) {
  const [out, done] = useTyping(LINES)
  const glow = useRef(null)

  // 커서를 따라다니는 은은한 빛 — transform 만 바꿔 GPU 에서 처리 (리페인트 없음)
  useEffect(() => {
    const el = glow.current
    if (!el || !matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let raf = 0, x = 0, y = 0
    const on = (e) => {
      x = e.clientX; y = e.clientY
      if (raf) return
      raf = requestAnimationFrame(() => { raf = 0; el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)` })
    }
    addEventListener('pointermove', on, { passive: true })
    return () => { removeEventListener('pointermove', on); cancelAnimationFrame(raf) }
  }, [])
  const [statsOn, setStatsOn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setStatsOn(true), 700); return () => clearTimeout(t) }, [])

  return (
    <section className="hero" id="top">
      <div className="hero__aura" aria-hidden="true" />
      <div className="hero__glow" ref={glow} aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__line"><span className="c-com">{'//'}</span> {profile.role}</span>
            <span className="hero__line hero__big">웹 개발자<br /><em>{profile.name}</em>입니다.</span>
          </h1>
          <p className="hero__sub">대학 정보시스템 운영부터 철도·제조 데이터 플랫폼까지,<br />사용자에게 꼭 필요한 기능부터 만듭니다.</p>
          <div className="hero__stats">
            {stats.map((s) => <Stat key={s.label} {...s} run={statsOn} />)}
          </div>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <span className="c-op">$</span> view projects
            </a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">github ↗</a>
            <button className="btn btn--ghost" onClick={onPalette}><kbd>⌘K</kbd> 바로가기</button>
          </div>
        </div>

        <div className="term" role="img" aria-label={`터미널: ${profile.name}, ${profile.tagline}`}>
          <div className="term__bar">
            <span className="nav__dots" aria-hidden="true"><i /><i /><i /></span>
            <span>zsh — {profile.handle}@portfolio</span>
          </div>
          <div className="term__body" aria-hidden="true">
            {LINES.map((l, i) => {
              if (i >= out.length) return null
              const text = out[i]
              const typing = i === out.length - 1 && !done && l.type === 'cmd'
              if (l.type === 'cmd') return <p key={i}><span className="c-ok">➜</span> <span className="c-dir">~</span> {text}{typing && <span className="caret" />}</p>
              if (l.type === 'ls') return <p key={i} className="term__ls">{text.split('  ').map((t) => projects.some((p) => p.slug === t) ? <button key={t} type="button" tabIndex={-1} onClick={() => goProject(t)}>{t}/</button> : <span key={t}>{t}/</span>)}</p>
              return <p key={i} className="term__out">{text}</p>
            })}
            {done && <p><span className="c-ok">➜</span> <span className="c-dir">~</span> <span className="caret" /></p>}
          </div>
        </div>
      </div>
      <a className="hero__scroll" href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}>
        <span>scroll</span><i />
      </a>
    </section>
  )
}
