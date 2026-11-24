import { useEffect, useRef, useState } from 'react'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** 화면에 들어오면 .is-in 클래스를 붙이는 스크롤 등장 효과 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-in)')
    if (reduced()) { els.forEach((e) => e.classList.add('is-in')); return }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
    }), { rootMargin: '0px 0px -10% 0px', threshold: 0.1 })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])
}

/** '2y 10m', '9' 같은 문자열 속 숫자를 0부터 올라가게 */
export function useCountUp(text, run, dur = 1200) {
  const [v, setV] = useState(() => (reduced() ? text : text.replace(/\d+/g, '0')))
  useEffect(() => {
    if (!run || reduced()) { if (reduced()) setV(text); return }
    let raf = 0
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur)
      const e = 1 - Math.pow(1 - p, 3)
      setV(text.replace(/\d+/g, (n) => String(Math.round(Number(n) * e))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, run, dur])
  return v
}

/** 지금 보고 있는 섹션 id */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [ids])
  return active
}

/** 스크롤 진행률 0~1 */
export function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const on = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const h = document.documentElement.scrollHeight - innerHeight
        setP(h > 0 ? scrollY / h : 0)
      })
    }
    on()
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on) }
  }, [])
  return p
}

/** 타자 치듯 줄을 하나씩 출력 */
export function useTyping(lines, { speed = 38, pause = 380, start = 500 } = {}) {
  const [out, setOut] = useState(() => (reduced() ? lines.map((l) => l.text) : []))
  const [done, setDone] = useState(reduced())
  const ref = useRef({ cancel: false })
  useEffect(() => {
    if (reduced()) return
    const st = { cancel: false }
    ref.current = st
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    ;(async () => {
      await sleep(start)
      const acc = []
      for (const l of lines) {
        if (st.cancel) return
        if (l.type === 'cmd') {
          for (let i = 1; i <= l.text.length; i++) {
            if (st.cancel) return
            setOut([...acc, l.text.slice(0, i)])
            await sleep(speed + Math.random() * 40)
          }
          acc.push(l.text)
          await sleep(pause)
        } else {
          acc.push(l.text)
          setOut([...acc])
          await sleep(120)
        }
      }
      setDone(true)
    })()
    return () => { st.cancel = true }
  }, [lines, speed, pause, start])
  return [out, done]
}

/** 모달 열림 동안 스크롤 잠금 + Esc */
export function useModal(open, onClose) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; removeEventListener('keydown', onKey) }
  }, [open, onClose])
}

const GLYPHS = '!<>-_\\/[]{}=+*^?#$%&01アイウカキ'
/** 글자가 무작위 기호에서 원래 글자로 풀리는 효과. run 이 true 가 되면 시작 */
export function useScramble(text, run, { speed = 28, delay = 0 } = {}) {
  const [out, setOut] = useState(() => (reduced() ? text : text.replace(/\S/g, ' ')))
  useEffect(() => {
    if (!run) return
    if (reduced()) { setOut(text); return }
    let frame = 0, raf = 0, t0 = 0
    const queue = [...text].map((ch, i) => ({ ch, start: i * 1.2 + Math.random() * 6, end: i * 1.2 + 8 + Math.random() * 10 }))
    const tick = (t) => {
      if (!t0) t0 = t
      if (t - t0 < delay) { raf = requestAnimationFrame(tick); return }
      frame += 1
      let done = 0
      const s = queue.map((q) => {
        if (q.ch === ' ' || q.ch === '\n') { done++; return q.ch }
        if (frame >= q.end) { done++; return q.ch }
        if (frame >= q.start) return GLYPHS[(Math.random() * GLYPHS.length) | 0]
        return ' '
      }).join('')
      setOut(s)
      if (done < queue.length) raf = setTimeout(() => requestAnimationFrame(tick), speed)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); clearTimeout(raf) }
  }, [text, run, speed, delay])
  return out
}

/** 요소가 화면에 들어왔는지 */
export function useInView(ref, margin = '0px 0px -10% 0px') {
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.disconnect() } }, { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, margin])
  return v
}
