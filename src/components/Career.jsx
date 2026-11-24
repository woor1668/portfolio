import { useState } from 'react'
import { career, company } from '../data'
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
  return (
    <section className="section" id="career">
      <SectionHead no="03" file="career.log" title="Career" desc={`$ git log --company="${company.name}"`} />
      <div className="career" data-reveal>
        <div className="career__head">
          <div>
            <p className="career__co">{company.name}</p>
            <p className="career__meta">{company.period} <span>·</span> {company.duration}</p>
          </div>
          <div className="career__filter" role="tablist" aria-label="분야 필터">
            <button role="tab" aria-selected={branch === 'all'} className={branch === 'all' ? 'is-on' : ''} onClick={() => setBranch('all')}>all</button>
            {BRANCHES.map((b) => (
              <button key={b.key} role="tab" aria-selected={branch === b.key} className={`b-${b.color} ${branch === b.key ? 'is-on' : ''}`} onClick={() => setBranch(b.key)}>{b.label}</button>
            ))}
          </div>
        </div>

        <ol className="commits">
          {[...career].reverse().map((c) => (
            <li key={c.year} className="commit" data-reveal>
              <div className="commit__graph" aria-hidden="true"><i /></div>
              <div className="commit__body">
                <p className="commit__top">
                  <span className="commit__tag">tag: {c.tag}</span>
                  <span className="commit__date">{c.year}</span>
                </p>
                <p className="commit__msg">{c.title}</p>
                <div className="commit__grid">
                  {shown.map((b, bi) => (
                    <div key={b.key} className={`diff b-${b.color}`} style={{ '--i': bi }}>
                      <p className="diff__head">{b.label}</p>
                      <ul>{c[b.key].map((t) => <li key={t}><span className="diff__plus">+</span>{t}</li>)}</ul>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
