import { skills } from '../data'
import { ICONS } from './icons'
import SectionHead from './SectionHead'

export default function Skills() {
  let n = 0 // 전체 칩 순서 (빛이 파도처럼 지나가게)
  return (
    <section className="section" id="skills">
      <SectionHead no="02" file="skills.json" title="Skills" desc="실무와 프로젝트에서 직접 사용한 기술입니다." />
      <div className="skills">
        {skills.map((g, gi) => (
          <div key={g.group} className={`skill ${g.items.length >= 4 ? 'is-wide' : ''}`} data-reveal style={{ '--d': `${gi * 60}ms` }}>
            <p className="skill__key"><span className="c-prop">"{g.group}"</span><span className="c-op">:</span> <span className="c-op">[</span><span className="skill__count">{g.items.length}</span><span className="c-op">]</span></p>
            <ul>
              {g.items.map(([name, icon, color], ci) => {
                const I = ICONS[icon]
                return (
                  <li key={name} style={{ '--c': color, '--i': ci, '--w': n++ }}>
                    {I && <I aria-hidden="true" />}
                    <span>{name}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
