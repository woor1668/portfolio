import { useState } from 'react'
import { companies, experience, profile } from '../data'
import SectionHead from './SectionHead'

const S = ({ c, children }) => <span className={`c-${c}`}>{children}</span>

// README.md 한 줄 그리기용 (마크다운 문법 색만 입힘)
const H = ({ l, children }) => <><span className="c-com">{'#'.repeat(l)} </span><span className="md-h">{children}</span></>
const Li = ({ children }) => <><span className="c-key">- </span>{children}</>

export default function About() {
  const [tab, setTab] = useState('md')
  const readme = [
    [<H l={1}>{profile.name} ({profile.nameEn})</H>],
    [<><span className="c-com">&gt; </span><span className="md-q">{profile.tagline}</span></>],
    [''],
    [<H l={2}>About</H>],
    [<span className="md-b">{profile.lead}</span>],
    ...profile.body.map((l) => [<Li>{l}</Li>]),
  ]
  const code = [
    [<><S c="key">const</S> <S c="var">developer</S> <S c="op">=</S> {'{'}</>],
    [<>  <S c="prop">name</S>: <S c="str">'{profile.name}'</S>,</>],
    [<>  <S c="prop">role</S>: <S c="str">'{profile.role}'</S>,</>],
    [<>  <S c="prop">experience</S>: <S c="str">'{experience.short}'</S>,</>],
    [<>  <S c="prop">stack</S>: [{profile.stack.map((f, i) => <span key={f}><S c="str">'{f}'</S>{i < profile.stack.length - 1 ? ', ' : ''}</span>)}],</>],
    [<>  <S c="prop">contact</S>: {'{'}</>],
    [<>    <S c="prop">email</S>: <a className="c-str link" href={`mailto:${profile.email}`}>'{profile.email}'</a>,</>],
    [<>    <S c="prop">github</S>: <a className="c-str link" href={profile.github} target="_blank" rel="noreferrer">'{profile.github.replace('https://', '')}'</a>,</>],
    [<>  {'}'},</>],
    [<>{'}'} <S c="key">as const</S></>],
  ]
  const lines = tab === 'ts' ? code : readme
  return (
    <section className="section" id="about">
      <SectionHead no="01" file="about.ts" title="About Me" />
      <div className="about">
        <div className="about__card" data-reveal>
          <div className="about__photo"><span className="about__ring" aria-hidden="true" /><img src={profile.photo} alt={`${profile.name} 프로필`} width="104" height="104" loading="lazy" /></div>
          <p className="about__name">{profile.name} <span>{profile.nameEn}</span></p>
          <p className="about__role"><span className="dot-live" /> {profile.role}</p>
          <div className="about__sec">
            <p className="about__h">Career <span>{experience.ko}</span></p>
            <ul className="about__list">
              {companies.map((c) => (
                <li key={c.name}>
                  <b>{c.name}{!c.end && <i className="about__now">재직 중</i>}</b>
                  <span>{c.period} · {c.duration}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="about__sec">
            <p className="about__h">Contact</p>
            <ul className="about__list about__contact">
              <li><span>email</span><a className="link" href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li><span>github</span><a className="link" href={profile.github} target="_blank" rel="noreferrer">{profile.github.replace('https://', '')}</a></li>
            </ul>
          </div>
        </div>
        <div className="editor" data-reveal>
          <div className="editor__tabs" role="tablist" aria-label="파일">
            <button role="tab" aria-selected={tab === 'md'} className={tab === 'md' ? 'is-on' : ''} onClick={() => setTab('md')}><i className="ext ext--md" />README.md</button>
            <button role="tab" aria-selected={tab === 'ts'} className={tab === 'ts' ? 'is-on' : ''} onClick={() => setTab('ts')}><i className="ext ext--ts" />developer.ts</button>
          </div>
          <pre className={`editor__code ${tab === 'md' ? 'is-md' : ''}`} key={tab} style={{ '--lines': lines.length + 1 }}><span className="editor__hl" aria-hidden="true" /><code>
            {lines.map((line, i) => (
              <span key={i} className="editor__line" style={{ '--i': i }}><span className="editor__ln">{i + 1}</span><span>{line}</span></span>
            ))}
            <span className="editor__line" style={{ '--i': lines.length }}><span className="editor__ln">{lines.length + 1}</span><span><span className="caret caret--thin" /></span></span>
          </code></pre>
        </div>
      </div>
    </section>
  )
}
