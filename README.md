# JB WORKS — 이재봉 포트폴리오

개발자 감성의 다크 테마 포트폴리오입니다. React 19 + Vite로 만들었습니다.

- 터미널 타이핑 히어로, 코드 에디터 형태의 About, `skills.json` 스킬 카드
- `git log` 형태의 경력 타임라인 (분야별 필터)
- 프로젝트 카드 → IDE 창 형태의 상세 뷰어 (기능별 화면 전환, ← → 키)
- `⌘K` / `Ctrl+K` 명령 팔레트, 하단 상태 표시줄

## 실행

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build/ 폴더 생성
npm run deploy     # 빌드 후 Firebase Hosting 배포 (firebase-tools 로그인 필요)
```

## 내용 수정

모든 텍스트·경력·프로젝트는 `src/data.js` 한 파일에 있습니다.
프로젝트 이미지는 `public/projects/` 에 넣고 `data.js` 의 `image` 경로를 맞춰 주세요.
