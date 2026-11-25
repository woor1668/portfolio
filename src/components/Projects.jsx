import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { projects } from '../data'
import { useModal } from '../hooks'
import SectionHead from './SectionHead'

// 마우스 위치에 따라 카드가 살짝 기울고 빛이 따라다님 (호버한 카드만)
const tilt = (e) => {
  if (e.pointerType !== 'mouse') return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  el.style.setProperty('--mx', `${x * 100}%`)
  el.style.setProperty('--my', `${y * 100}%`)
  el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-6px)`
}
const untilt = (e) => { e.currentTarget.style.transform = '' }

// 화면 이미지가 없는 프로젝트: 대표 코드를 에디터 화면처럼 보여줌
function CodeShot({ p, big = false }) {
  return (
    <pre className={`codeshot ${big ? 'codeshot--big' : ''}`} aria-hidden="true">
      {p.code.map((l, i) => (
        <span key={i}><i>{i + 1}</i>{l}</span>
      ))}
    </pre>
  )
}

const team = (people) => {
  const n = parseInt(people, 10)
  return n === 1 ? '1인' : `${n}인 팀`
}

function Viewer({ p, onClose, onMove }) {
  const [i, setI] = useState(0)
  const prev = useRef(0)
  const dir = i >= prev.current ? 1 : -1 // 넘기는 방향에 맞춰 화면이 들어옴
  useEffect(() => { prev.current = i }, [i])
  const s = p.slides[i]
  let n = 0 // 항목 순서대로 등장
  const close = useCallback(() => onClose(), [onClose])
  useModal(true, close)
  useEffect(() => { setI(0) }, [p.slug])
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') setI((x) => Math.min(p.slides.length - 1, x + 1))
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') setI((x) => Math.max(0, x - 1))
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [p.slides.length])

  return createPortal(
    <div className="viewer" role="dialog" aria-modal="true" aria-label={p.title} onClick={close}>
      <div className="viewer__win" key={p.slug} onClick={(e) => e.stopPropagation()}>
        <div className="viewer__bar">
          <span className="viewer__progress" style={{ transform: `scaleX(${(i + 1) / p.slides.length})` }} aria-hidden="true" />
          <span className="nav__dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="viewer__path">projects/{p.slug}/<b>{s.header}</b></span>
          <div className="viewer__nav">
            <button onClick={() => onMove(-1)} aria-label="이전 프로젝트">←</button>
            <button onClick={() => onMove(1)} aria-label="다음 프로젝트">→</button>
            <button onClick={close} aria-label="닫기">✕</button>
          </div>
        </div>
        <div className="viewer__main">
          <aside className="viewer__side">
            <p className="viewer__title">{p.title}</p>
            <p className="viewer__meta">{p.date}<br />{p.people}</p>
            <div className="viewer__stack">{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
            <p className="viewer__label">EXPLORER</p>
            <ul className="viewer__files">
              {p.slides.map((x, k) => (
                <li key={x.header} style={{ '--i': k }}>
                  <button className={k === i ? 'is-on' : ''} onClick={() => setI(k)}>
                    <i className={`ext ext--${k === 0 ? 'md' : 'tsx'}`} />{k === 0 ? 'README.md' : x.header}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <div className="viewer__content" key={i} style={{ '--dir': dir }}>
            <div className={`viewer__shot ${s.image ? '' : 'is-code'}`}>
              {!s.image ? <CodeShot p={p} big /> : s.image.endsWith('.mp4')
                ? <video key={s.image} src={s.image} autoPlay muted loop playsInline onLoadedData={(e) => e.currentTarget.play().catch(() => {})} aria-label={`${p.title} ${s.header}`} />
                : <img key={s.image} src={s.image} alt={`${p.title} ${s.header}`} decoding="async" />}
            </div>
            <div className="viewer__text">
              <h3><span>{s.header}</span></h3>
              {s.groups.map((g, gi) => (
                <div key={gi} className="viewer__group">
                  {g.title && <p className="viewer__gt" style={{ '--i': n++ }}><span className="c-com">##</span> {g.title}</p>}
                  <ul>{g.items.map((t) => <li key={t} style={{ '--i': n++ }}>{t}</li>)}</ul>
                </div>
              ))}
              <div className="viewer__pager">
                <button disabled={i === 0} onClick={() => setI(i - 1)}>← prev</button>
                <span>{i + 1} / {p.slides.length}</span>
                <button disabled={i === p.slides.length - 1} onClick={() => setI(i + 1)}>next →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function Projects({ open, setOpen }) {
  const idx = projects.findIndex((p) => p.slug === open)
  const move = useCallback((d) => setOpen(projects[(idx + d + projects.length) % projects.length].slug), [idx, setOpen])
  const close = useCallback(() => setOpen(null), [setOpen])
  const list = [...projects].reverse() // 최신순

  return (
    <section className="section" id="projects">
      <SectionHead no="04" file="projects/" title="Projects" desc="카드를 누르면 기능별 화면과 설명을 볼 수 있습니다." />
      <div className="projects">
        {list.map((p, i) => (
          <article key={p.slug} className="pcard" data-reveal style={{ '--d': `${(i % 3) * 70}ms` }}>
            <button className="pcard__hit" onClick={() => setOpen(p.slug)} aria-label={`${p.title} 자세히 보기`} onPointerMove={tilt} onPointerLeave={untilt}>
              <span className="pcard__spot" aria-hidden="true" />
              <div className="pcard__bar">
                <span className="nav__dots" aria-hidden="true"><i /><i /><i /></span>
                <span>{p.slug}</span>
              </div>
              <div className="pcard__shot">{p.cover ? <img src={p.cover} alt="" loading="lazy" decoding="async" width="800" height="500" /> : <CodeShot p={p} />}</div>
              <div className="pcard__body">
                <p className="pcard__meta"><span>{p.date}</span><span>{team(p.people)}</span></p>
                <h3 className="pcard__title">{p.title}</h3>
                <ul className="pcard__hl">{p.highlights.slice(0, 3).map((h) => <li key={h}>{h}</li>)}</ul>
                <div className="pcard__stack">{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
                <span className="pcard__open">open <i>→</i></span>
              </div>
            </button>
          </article>
        ))}
      </div>
      {idx >= 0 && <Viewer p={projects[idx]} onClose={close} onMove={move} />}
    </section>
  )
}
