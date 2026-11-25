import { createContext, useContext, useEffect, useState } from 'react'

/** 화면 테마: 'mac' = 다크(macOS 터미널풍) | 'win' = 라이트(Windows 11풍). 상단 스위치로 바꾸고 이 기기에 기억 */
const KEY = 'jb-os'
export const OSContext = createContext({ os: 'mac', setOS: () => {} })
export const useOS = () => useContext(OSContext)

const initial = () => {
  try { const v = localStorage.getItem(KEY); if (v === 'mac' || v === 'win') return v } catch { /* 저장소 사용 불가 */ }
  return 'mac'
}

export function useOSState() {
  const [os, setOS] = useState(initial)
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
