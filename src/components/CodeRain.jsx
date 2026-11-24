import { useEffect, useRef } from 'react'

// 배경에 흐르는 코드 — 이 사이트를 만든 실제 코드 조각들
const SNIPPETS = [
  'const developer = { name: "이재봉", role: "Web Developer" }',
  'export default function App() {',
  '  const [open, setOpen] = useState(false)',
  '  useEffect(() => { observe(sections) }, [])',
  'git commit -m "feat: QR 출석 체크"',
  '@GetMapping("/api/attendance/{date}")',
  'public ResponseEntity<List<Student>> findAll()',
  'SELECT * FROM attendance WHERE att_date = ?',
  'socket.on("message", (msg) => broadcast(room, msg))',
  'const { data } = await supabase.from("reports").select()',
  'i18n.changeLanguage(navigator.language)',
  'new IntersectionObserver(onIntersect, { threshold: 0.1 })',
  'npm run build && firebase deploy',
  'UPDATE student SET class_id = :id WHERE uid = :uid',
  'onSnapshot(query(posts, orderBy("createdAt")), render)',
  'docker compose up -d',
  'ssh deploy@ncs-server "systemctl restart tomcat"',
  'return <Projects open={project} setOpen={setProject} />',
  'if (!user) throw new UnauthorizedException()',
  'model.predict(text) > 0.8 ? suggest(clean) : send(text)',
  'git push origin main',
  'transform: translate3d(0, 0, 0);',
  'requestAnimationFrame(tick)',
  'const ok = await navigator.clipboard.writeText(email)',
]
const KEYWORDS = /\b(const|let|return|export|default|function|await|async|new|if|throw|public|SELECT|FROM|WHERE|UPDATE|SET|import)\b/g

/** 배경 코드 비 — 캔버스 1장, 초당 30프레임, 화면이 숨겨지면 멈춤 */
export default function CodeRain({ color = '#7EE787' }) {
  const ref = useRef(null)
  const colorRef = useRef(color)
  useEffect(() => { colorRef.current = color }, [color])

  useEffect(() => {
    const cv = ref.current
    const ctx = cv.getContext('2d')
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = matchMedia('(max-width: 760px)').matches
    const dpr = Math.min(devicePixelRatio || 1, 1.5)
    const LH = small ? 18 : 22
    const FONT = `${small ? 11 : 12.5}px "JetBrains Mono", ui-monospace, monospace`
    let W = 0, H = 0, cols = [], raf = 0, last = 0, boost = 0, lastY = scrollY

    const pick = () => SNIPPETS[(Math.random() * SNIPPETS.length) | 0]
    const setup = () => {
      W = innerWidth; H = innerHeight
      cv.width = W * dpr; cv.height = H * dpr
      cv.style.width = `${W}px`; cv.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const cw = small ? 230 : 330
      const n = Math.ceil(W / cw) + 1
      cols = Array.from({ length: n }, (_, i) => ({
        x: i * cw + Math.random() * 40 - 20,
        y: Math.random() * LH,
        speed: 0.25 + Math.random() * 0.35,
        lines: Array.from({ length: Math.ceil(H / LH) + 2 }, () => ({ t: pick(), hot: Math.random() < 0.06 })),
      }))
    }
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      ctx.font = FONT
      ctx.textBaseline = 'top'
      const hot = colorRef.current
      for (const c of cols) {
        for (let k = 0; k < c.lines.length; k++) {
          const l = c.lines[k]
          const y = H - (k * LH + c.y) // 아래에서 위로 흐름
          if (y < -LH || y > H) continue
          if (l.hot) {
            ctx.fillStyle = hot
            ctx.globalAlpha = 0.55
            ctx.fillText(l.t, c.x, y)
          } else {
            ctx.globalAlpha = 0.22
            ctx.fillStyle = '#8B98A9'
            ctx.fillText(l.t, c.x, y)
            // 키워드만 살짝 강조 (위치는 한 번만 계산해 둠)
            if (!l.kw) {
              l.kw = []
              KEYWORDS.lastIndex = 0
              let m
              while ((m = KEYWORDS.exec(l.t))) l.kw.push([m[0], ctx.measureText(l.t.slice(0, m.index)).width])
            }
            if (l.kw.length) {
              ctx.fillStyle = '#FF7B72'
              ctx.globalAlpha = 0.32
              for (const [w, dx] of l.kw) ctx.fillText(w, c.x + dx, y)
            }
          }
        }
      }
      ctx.globalAlpha = 1
    }
    const step = (dt) => {
      for (const c of cols) {
        c.y += (c.speed + boost) * dt * 0.06
        while (c.y >= LH) {
          c.y -= LH
          c.lines.unshift({ t: pick(), hot: Math.random() < 0.06 })
          c.lines.pop()
        }
      }
      boost *= 0.92
    }
    const loop = (t) => {
      raf = requestAnimationFrame(loop)
      if (document.hidden) return
      const dt = t - last
      if (dt < 33) return // 30fps
      last = t
      step(Math.min(dt, 80))
      draw()
    }
    const onScroll = () => {
      const d = Math.abs(scrollY - lastY)
      lastY = scrollY
      boost = Math.min(4, boost + d * 0.02) // 스크롤 속도만큼 빨라짐
    }
    const onResize = () => { setup(); draw() }

    setup()
    draw()
    if (!reduce) {
      raf = requestAnimationFrame(loop)
      addEventListener('scroll', onScroll, { passive: true })
    }
    addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); removeEventListener('scroll', onScroll); removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={ref} className="rain" aria-hidden="true" />
}
