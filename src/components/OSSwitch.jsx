import { FiMoon, FiSun } from 'react-icons/fi'
import { useOS } from '../os'

/** 상단 다크 / 라이트 화면 전환 스위치 (다크 = macOS 터미널풍, 라이트 = Windows 11풍) */
export default function OSSwitch() {
  const { os, setOS } = useOS()
  return (
    <div className="os-switch" role="radiogroup" aria-label="화면 테마">
      <button role="radio" aria-checked={os === 'mac'} className={os === 'mac' ? 'is-on' : ''} onClick={() => setOS('mac')} title="다크 모드">
        <FiMoon aria-hidden="true" /><span>다크</span>
      </button>
      <button role="radio" aria-checked={os === 'win'} className={os === 'win' ? 'is-on' : ''} onClick={() => setOS('win')} title="라이트 모드">
        <FiSun aria-hidden="true" /><span>라이트</span>
      </button>
    </div>
  )
}
