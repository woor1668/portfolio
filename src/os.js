import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

/** 화면 테마: 'mac' = 다크(macOS 터미널풍) | 'win' = 라이트(Windows 11풍). 상단 스위치로 바꾸고 이 기기에 기억 */
const KEY = 'jb-os'
export const OSContext = createContext({ os: 'mac', setOS: () => {} })
export const useOS = () => useContext(OSContext)

const initial = () => {
  try { const v = localStorage.getItem(KEY); if (v === 'mac' || v === 'win') return v } catch { /* 저장소 사용 불가 */ }
  return 'mac'
}

export function useOSState() {
  const [os, setRaw] = useState(initial)

  // 테마 전환: 요소마다 다른 transition 때문에 색이 따로따로 바뀌며 깜빡이지 않도록
  // 1) 전환 순간에는 모든 transition/animation 을 끄고
  // 2) 브라우저가 지원하면 화면 전체를 한 번에 부드럽게 교차 전환(View Transition)
  const setOS = useCallback((next) => {
    const d = document.documentElement
    if (d.dataset.os === next) return
    const apply = () => {
      d.classList.add('theme-switching')
      flushSync(() => setRaw(next))
      d.dataset.os = next // 같은 프레임에 바로 적용
      d.style.colorScheme = next === 'win' ? 'light' : 'dark'
    }
    const done = () => requestAnimationFrame(() => requestAnimationFrame(() => d.classList.remove('theme-switching')))
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (document.startViewTransition && !reduce) {
      const t = document.startViewTransition(apply)
      t.finished.finally(done)
    } else {
      apply()
      done()
    }
  }, [])

  useEffect(() => {
    const d = document.documentElement
    d.dataset.os = os
    d.style.colorScheme = os === 'win' ? 'light' : 'dark'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', os === 'win' ? '#F3F3F3' : '#0B0E14')
    try { localStorage.setItem(KEY, os) } catch { /* 무시 */ }
  }, [os])
  return { os, setOS }
}

/** OS별 표시 문자열 */
// 검색 단축키: 다크(macOS) ⌘K, 라이트(Windows) Ctrl+F — Windows에서 '찾기'의 기본 단축키
export const shortcut = (os) => (os === 'win' ? 'Ctrl+F' : '⌘K')
export const homePath = (os, handle) => (os === 'win' ? `C:\\Users\\${handle}\\portfolio` : `~/${handle}/portfolio`)
export const sep = (os) => (os === 'win' ? '\\' : '/')
