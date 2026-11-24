import { profile } from '../data'
import SectionHead from './SectionHead'

const S = ({ c, children }) => <span className={`c-${c}`}>{children}</span>

export default function About() {
  const code = [
    [<><S c="key">const</S> <S c="var">developer</S> <S c="op">=</S> {'{'}</>],
    [<>  <S c="prop">name</S>: <S c="str">'{profile.name}'</S>,</>],
    [<>  <S c="prop">role</S>: <S c="str">'{profile.role}'</S>,</>],
    [<>  <S c="prop">experience</S>: <S c="str">'2y 10m'</S>,</>],
    [<>  <S c="prop">stack</S>: [{profile.stack.map((f, i) => <span key={f}><S c="str">'{f}'</S>{i < profile.stack.length - 1 ? ', ' : ''}</span>)}],</>],
    [<>  <S c="prop">contact</S>: {'{'}</>],
    [<>    <S c="prop">email</S>: <a className="c-str link" href={`mailto:${profile.email}`}>'{profile.email}'</a>,</>],
    [<>    <S c="prop">github</S>: <a className="c-str link" href={profile.github} target="_blank" rel="noreferrer">'{profile.github.replace('https://', '')}'</a>,</>],
    [<>  {'}'},</>],
    [<>{'}'} <S c="key">as const</S></>],
  ]
  return (
    <section className="section" id="about">
      <SectionHead no="01" file="about.ts" title="About Me" />
      <div className="about">
        <div className="about__card" data-reveal>
          <div className="about__photo"><span className="about__ring" aria-hidden="true" /><img src={profile.photo} alt={`${profile.name} 프로필`} width="104" height="104" loading="lazy" /></div>
          <p className="about__name">{profile.name} <span>{profile.nameEn}</span></p>
          <p className="about__role"><span className="dot-live" /> {profile.role}</p>
          <p className="about__lead">{profile.lead}</p>
          <p className="about__body">{profile.body.map((l) => <span key={l}>{l}</span>)}</p>
        </div>
        <div className="editor" data-reveal>
          <div className="editor__tabs">
            <span className="is-on"><i className="ext ext--ts" />developer.ts</span>
            <span><i className="ext ext--md" />README.md</span>
          </div>
          <pre className="editor__code" style={{ '--lines': code.length + 1 }}><span className="editor__hl" aria-hidden="true" /><code>
            {code.map((line, i) => (
              <span key={i} className="editor__line" style={{ '--i': i }}><span className="editor__ln">{i + 1}</span><span>{line}</span></span>
            ))}
            <span className="editor__line" style={{ '--i': code.length }}><span className="editor__ln">{code.length + 1}</span><span><span className="caret caret--thin" /></span></span>
          </code></pre>
        </div>
      </div>
    </section>
  )
}
