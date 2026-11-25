import { useEffect, useState } from 'react'
import { companies } from '../data'
import SectionHead from './SectionHead'

const BRANCHES = [
  { key: 'main', label: 'main', color: 'green' },
  { key: 'front', label: 'frontend', color: 'blue' },
  { key: 'back', label: 'backend', color: 'purple' },
  { key: 'server', label: 'server', color: 'orange' },
  { key: 'database', label: 'database', color: 'yellow' },
]

export default function Career() {
  const [branch, setBranch] = useState('all')
  const shown = branch === 'all' ? BRANCHES : BRANCHES.filter((b) => b.key === branch)
  // 처음에는 재직 중인 회사만 펼쳐 둔다. 나머지는 누르면 펼쳐지고, 펼칠 때 커밋이 차례로 나타난다
  const initial = companies.filter((c) => !c.end).map((c) => c.name)
  const [open, setOpen] = useState(() => new Set(initial))
  const [played, setPlayed] = useState(() => new Set())
  const toggle = (name) => setOpen((s) => {
    const n = new Set(s)
    n.has(name) ? n.delete(name) : n.add(name)
    return n
  })
  useEffect(() => {
    const todo = [...open].filter((n) => !initial.includes(n) && !played.has(n))
    if (!todo.length) return
    const id = requestAnimationFrame(() => setPlayed((s) => new Set([...s, ...todo])))
    return () => cancelAnimationFrame(id)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps
  const allOpen = companies.every((c) => open.has(c.name))
  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(companies.map((c) => c.name)))
  return (
    <section className="section" id="career">
      <SectionHead no="03" file="career.log" title="Career" desc="$ git log --all --oneline" />
      <div className="career__filter career__filter--top" role="tablist" aria-label="분야 필터" data-reveal>
        <button role="tab" aria-selected={branch === 'all'} className={branch === 'all' ? 'is-on' : ''} onClick={() => setBranch('all')}>all</button>
        {BRANCHES.map((b) => (
          <button key={b.key} role="tab" aria-selected={branch === b.key} className={`b-${b.color} ${branch === b.key ? 'is-on' : ''}`} onClick={() => setBranch(b.key)}>{b.label}</button>
        ))}
        <button className="career__all" onClick={toggleAll} aria-label={allOpen ? '모든 회사 접기' : '모든 회사 펼치기'}>{allOpen ? '모두 접기' : '모두 펼치기'}</button>
      </div>
      <div className="career__list">
        {companies.map((co, coi) => (
          <div key={co.name} className={`career ${co.end ? '' : 'is-now'}`} data-open={open.has(co.name) || undefined} data-reveal>
            <button
              type="button"
              className="career__head"
              aria-expanded={open.has(co.name)}
              aria-controls={`co-${coi}`}
              onClick={() => toggle(co.name)}
              disabled={!co.commits.length}
            >
              <div>
                <p className="career__co">{co.name}{!co.end && <span className="career__now"><span className="dot-live" /> 재직 중</span>}</p>
                <p className="career__meta">{co.period} <span>·</span> {co.duration}</p>
              </div>
              {co.commits.length > 0 && (
                <span className="career__toggle">
                  <span className="career__count">{co.commits.length} commits</span>
                  <svg className="career__chev" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              )}
            </button>
            {co.commits.length > 0 && (
              <div className="career__body" id={`co-${coi}`} inert={!open.has(co.name) || undefined}>
              <ol className="commits">
                {[...co.commits].reverse().map((c, ci) => {
                  const rows = shown.filter((b) => c[b.key]?.length)
                  return (
                    <li
                      key={c.year}
                      className={`commit ${coi === 0 && ci === 0 ? 'is-head' : ''} ${played.has(co.name) && open.has(co.name) ? 'is-in' : ''}`}
                      data-reveal={initial.includes(co.name) ? '' : undefined}
                      style={initial.includes(co.name) ? undefined : { '--d': `${ci * 80}ms` }}
                    >
                      <div className="commit__graph" aria-hidden="true"><b /><i /></div>
                      <div className="commit__body">
                        <p className="commit__top">
                          <span className="commit__tag">tag: {c.tag}</span>
                          <span className="commit__date">{c.year}</span>
                        </p>
                        <p className="commit__msg">{c.title}</p>
                        {rows.length > 0 && (
                          <div className="commit__grid">
                            {rows.map((b, bi) => (
                              <div key={b.key} className={`diff b-${b.color}`} style={{ '--i': bi }}>
                                <p className="diff__head">{b.label}</p>
                                <ul>{c[b.key].map((t, ti) => <li key={t} style={{ '--t': ti }}><span className="diff__plus">+</span>{t}</li>)}</ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
