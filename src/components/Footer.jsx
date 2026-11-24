import { profile } from '../data'

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__big" data-reveal>
        <span className="c-com">{'/* '}</span>함께 만들 이야기가 있다면<span className="c-com">{' */'}</span><br />
        <a href={`mailto:${profile.email}`} className="footer__mail">{profile.email}<i>↗</i></a>
      </p>
      <div className="footer__row">
        <span>Copyright ⓒ 2025–{new Date().getFullYear()}. Jb.Lee All rights reserved.</span>
        <a href={profile.github} target="_blank" rel="noreferrer">github.com/woor1668 ↗</a>
      </div>
    </footer>
  )
}
