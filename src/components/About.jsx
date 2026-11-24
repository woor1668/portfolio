import { profile } from '../data'
import SectionHead from './SectionHead'

const S = ({ c, children }) => <span className={`c-${c}`}>{children}</span>

export default function About() {
  const code = [
    [<><S c="key">const</S> <S c="var">developer</S> <S c="op">=</S> {'{'}</>],
    [<>  <S c="prop">name</S>: <S c="str">'{profile.name}'</S>,</>],
    [<>  <S c="prop">role</S>: <S c="str">'{profile.role}'</S>,</>],
    [<>  <S c="prop">focus</S>: [</>],
    ...profile.focus.map((f) => [<>    <S c="str">'{f}'</S>,</>]),
    [<>  ],</>],
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
          <div className="about__photo"><img src={profile.photo} alt={`${profile.name} 프로필`} /></div>
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
          <pre className="editor__code"><code>
            {code.map((line, i) => (
              <span key={i} className="editor__line"><span className="editor__ln">{i + 1}</span><span>{line}</span></span>
            ))}
          </code></pre>
        </div>
      </div>
    </section>
  )
}
