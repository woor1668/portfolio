import { useRef } from 'react'
import { useInView, useScramble } from '../hooks'

export default function SectionHead({ no, file, title, desc }) {
  const ref = useRef(null)
  const seen = useInView(ref)
  const t = useScramble(title, seen, { delay: 250 })
  return (
    <div className="shead" data-reveal ref={ref}>
      <p className="shead__file"><span className="shead__no">{no}</span> <span className="shead__type" style={{ '--n': file.length }}>{file}</span></p>
      <h2 className="shead__title" aria-label={title}><span aria-hidden="true">{t}</span><span className="shead__cursor" aria-hidden="true" /></h2>
      {desc && <p className="shead__desc">{desc}</p>}
    </div>
  )
}
