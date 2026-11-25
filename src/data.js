/** 사이트 내용 — 여기만 고치면 화면 전체에 반영됩니다 */

// 'YYYY.MM' 두 개 사이 개월 수 (양 끝 달 포함). end 가 없으면 이번 달까지
const months = (start, end) => {
  const [sy, sm] = start.split('.').map(Number)
  const now = new Date()
  const [ey, em] = end ? end.split('.').map(Number) : [now.getFullYear(), now.getMonth() + 1]
  return (ey - sy) * 12 + (em - sm) + 1
}
const ko = (m) => [Math.floor(m / 12) && `${Math.floor(m / 12)}년`, m % 12 && `${m % 12}개월`].filter(Boolean).join(' ')
const short = (m) => `${Math.floor(m / 12)}y ${m % 12}m`

export const profile = {
  name: '이재봉',
  nameEn: 'Jaebong Lee',
  handle: 'jb',
  role: 'Web Developer',
  tagline: '사람과 사람을 연결하는 개발자',
  email: 'woor16645@gmail.com',
  github: 'https://github.com/woor1668',
  photo: '/profile.webp',
  lead: '사용자가 실제로 겪는 불편에서 출발해 기능을 만듭니다.',
  body: [
    '2025년 11월부터 메타노빅스에서 철도·제조 현장 데이터를 다루는 모니터링 시스템과 AI 학습 플랫폼을 만들고 있습니다.',
    '신나는플랫폼에서 2년 10개월 동안 9개 대학의 NCS·포털·SSO 시스템을 운영하며 프론트엔드, 백엔드, 서버, DB를 함께 다뤘습니다.',
    '개인 프로젝트로 스타리그 육성 게임, 사주로 고르는 부적 앱, AI 캐릭터 채팅, 로또 예측 서비스 등을 직접 설계하고 만들고 있습니다.',
  ],
  stack: ['React', 'Svelte', 'TypeScript', 'Java · Spring'],
}

export const nav = [
  { id: 'about', file: 'about.ts', label: 'About' },
  { id: 'skills', file: 'skills.json', label: 'Skills' },
  { id: 'career', file: 'career.log', label: 'Career' },
  { id: 'projects', file: 'projects/', label: 'Projects' },
]

/** icon: react-icons 이름 (components/icons.js 에 등록) */
export const skills = [
  { group: 'frontend', items: [['React', 'FaReact', '#61DAFB'], ['Svelte', 'SiSvelte', '#FF3E00'], ['Angular', 'FaAngular', '#DD0031'], ['jQuery', 'SiJquery', '#0769AD']] },
  { group: 'basic', items: [['HTML5', 'FaHtml5', '#E34F26'], ['CSS3', 'FaCss3Alt', '#1572B6'], ['JavaScript', 'FaJs', '#F7DF1E'], ['TypeScript', 'BiLogoTypescript', '#3178C6']] },
  { group: 'backend', items: [['Java', 'FaJava', '#ED8B00'], ['Spring Boot', 'SiSpringboot', '#6DB33F'], ['Node.js', 'FaNodeJs', '#68A063'], ['Python', 'SiPython', '#3776AB'], ['FastAPI', 'SiFastapi', '#009688'], ['Django', 'SiDjango', '#44B78B']] },
  { group: 'database', items: [['PostgreSQL', 'SiPostgresql', '#4169E1'], ['Oracle', 'GrOracle', '#F80000'], ['MariaDB', 'SiMariadb', '#C0765A'], ['MSSQL', 'DiMsqlServer', '#CC2927']] },
  { group: 'vcs', items: [['Git', 'FaGitAlt', '#F05032'], ['GitHub', 'FaGithub', '#E6EDF3'], ['GitLab', 'FaGitlab', '#FC6D26']] },
  { group: 'cloud', items: [['AWS', 'FaAws', '#FF9900'], ['Firebase', 'SiFirebase', '#FFCA28']] },
  { group: 'tools', items: [['Figma', 'FaFigma', '#F24E1E'], ['Notion', 'SiNotion', '#E6EDF3']] },
  { group: 'ci/cd', items: [['Jenkins', 'SiJenkins', '#D24939']] },
]

/** 회사별 경력 — 위에서부터 최신순. end 를 비우면 '현재'로 표시되고 기간이 자동 계산됩니다 */
export const companies = [
  {
    name: '메타노빅스',
    start: '2025.11',
    end: null,
    // 사내 프로젝트라 화면·이미지 없이 맡은 작업만 적습니다
    commits: [
      {
        year: '2025.11 — 2026.10',
        tag: 'hyperx',
        title: '제조 품질 검사 데이터 분석 시스템',
        main: ['수입·출하 검사 종합현황, Trend, 공급사·검사항목 비교 화면 개발', '히스토그램·CPK·규격 한계(USL/LSL) 기반 통계 분석', '검사 가이드 PDF 뷰어'],
        front: ['SvelteKit·ECharts 차트: 줌 구간 재조회, 전체화면, 이미지 저장', 'Tabulator 그리드 필터·정렬, 진행률 표시와 CSV 다운로드'],
        back: ['Spring·MyBatis 통계 쿼리 성능 개선, 0 나누기·데이터 없음 예외 처리', '엑셀 다운로드를 offset에서 cursor 방식으로 전환'],
        server: ['LTTB 샘플링으로 모니터링 데이터량 축소', 'SSE 타임아웃 조정, 연결·차트 리소스 정리'],
      },
      {
        year: '2026.04 — 2026.09',
        tag: 'ai-ops',
        title: '철도 차량 시계열 데이터 AI 학습·운영 플랫폼',
        main: ['노선 → 편성 → 호차 → 장치 → 센서 자산 계층 기반 데이터 수집·전처리·학습 흐름 구현', 'MoE 전문가 모델 라우팅 채팅, LLM 모델 추가'],
        front: ['Svelte 5로 데이터 업로드·미리보기, 로그인·초기 설정 화면 개발'],
        back: ['FastAPI로 자산·데이터셋·학습·스케줄 API 개발', '로컬 ML 모델 학습·추론, 주기 학습 스케줄러'],
      },
      {
        year: '2026.06 — 2026.11',
        tag: 'scm',
        title: '철도 차량 상태 모니터링 시스템',
        main: ['운전실·편성 운행상태 실시간 모니터링 화면', '고장검지·고장이력·편성고장통계·고장통계분석·운행통계 화면', '실시간 고장 알림'],
        front: ['SSE 편성별 동적 구독, 실시간 OFF 시 마지막 데이터 유지', '차트 dispose·리사이즈 리스너 정리로 중복 렌더와 메모리 누수 방지'],
        back: ['TCMS 데이터 다운로드, 실시간 이벤트 로그 연동', '로그인 속도 개선, 조회 로직·인덱스 개선'],
        server: ['GitHub Actions 배포 구성, 백엔드·프론트 분리 배포와 압축 전송'],
      },
      {
        year: '2026.07 — 2026.08',
        tag: 'cbm',
        title: '상태기반정비(CBM) 데이터 화면',
        main: ['CBM 데이터 수집현황, 고장발생통계, 이벤트발생이력 화면 개발'],
        back: ['대용량 CSV 스트리밍 다운로드와 병렬 처리로 다운로드 성능 개선', 'CSV·Parquet 다운로드 분리'],
      },
    ],
  },
  {
    name: '신나는플랫폼',
    start: '2021.10',
    end: '2024.07',
    commits: [
      {
        year: '2021.10 — 2022.09',
        tag: 'v1.0',
        title: '대학 NCS 유지보수 · 동국대 SSO · 유한대 학생이력시스템',
        main: ['9개 대학 NCS 시스템 오류 수정 및 개발', 'OZ report 유지보수'],
        front: ['jQuery로 동국대 SSO 로그인 화면 개발', 'Nexacro로 유한대 학생이력시스템 개발'],
        back: ['Java로 NCS·SSO·학생이력시스템 개발'],
        server: ['7개 대학 Linux 서버 운영, 사내 서버 관리'],
        database: ['Oracle(7개 대학)·MySQL(2개 대학) NCS DB 관리'],
      },
      {
        year: '2022.10 — 2023.09',
        tag: 'v2.0',
        title: '신안산대 NCS PL · 중앙대 포털 · 서버 복구',
        main: ['신안산대 NCS 개발 PL 수행'],
        front: ['Angular로 중앙대 포털 관리', '동국대 포털·미래융합교육원 SSO 유지보수'],
        back: ['Java로 중앙대 포털·SSO 유지보수 및 개발'],
        server: ['동국대 포털·SSO·미래융합교육원 서버 복구'],
      },
      {
        year: '2023.10 — 2024.07',
        tag: 'v3.0',
        title: '신성대 종합정보시스템 · AWS 이관',
        front: ['WebSquare로 신성대 종합정보시스템 유지보수 및 개발'],
        back: ['Spring으로 신성대 종합정보시스템 개발'],
        server: ['사옥 이전에 따른 사내 시스템 AWS 이관'],
      },
    ],
  },
].map((c) => {
  const m = months(c.start, c.end)
  return { ...c, months: m, period: `${c.start} — ${c.end ?? '현재'}`, duration: ko(m) }
})

export const totalMonths = companies.reduce((a, c) => a + c.months, 0)
export const experience = { short: short(totalMonths), ko: ko(totalMonths) }

/** 프로젝트 — 오래된 것부터. image/cover 가 없으면 code 줄이 코드 화면처럼 표시됩니다 */
export const projects = [
  {
    "slug": "aibom",
    "title": "AIBOM",
    "date": "2025-03-14 ~ 04-11",
    "people": "5명 - 기여도 100%(설계 및 개발)",
    "stack": [
      "React",
      "TypeScript",
      "supabase",
      "MariaDB"
    ],
    "cover": "/opt/aibom1-card.webp",
    "highlights": [
      "K-DST / KICCE 기반 영·유아 행동발달 AI 측정",
      "OpenAI API 연동 자동 리포트 생성",
      "보호자 커뮤니티 (게시글, 댓글, 좋아요)",
      "소셜 로그인 및 다자녀 프로필 관리"
    ],
    "slides": [
      {
        "header": "주요 기능",
        "image": "/opt/aibom1.webp",
        "groups": [
          {
            "title": "",
            "items": [
              "K-DST / KICCE 기반 영·유아 행동발달 AI 측정",
              "OpenAI API 연동 자동 리포트 생성",
              "보호자 커뮤니티 (게시글, 댓글, 좋아요)",
              "소셜 로그인 및 다자녀 프로필 관리",
              "Supabase 기반 실시간 데이터 동기화"
            ]
          }
        ]
      },
      {
        "header": "메인페이지",
        "image": "/opt/aibom2.webp",
        "groups": [
          {
            "title": "발달 측정 대시보드",
            "items": [
              "영·유아 행동발달 측정 AI 플랫폼의 메인 허브",
              "K-DST(행동발달), KICCE(유아관찰) 기반 표준화 측정 제공",
              "미측정 항목 잠금 처리, 해당 월 미측정 시 측정 버튼 활성화",
              "월 1회 측정 결과 저장 및 월별 성장곡선 차트 시각화"
            ]
          }
        ]
      },
      {
        "header": "커뮤니티",
        "image": "/opt/aibom3.webp",
        "groups": [
          {
            "title": "보호자 커뮤니티",
            "items": [
              "보호자 간 소통 공간으로 서비스 체류 시간 및 재방문율 증가 목적",
              "최신순/인기순 정렬 전환 및 키워드 검색 기능",
              "게시글 CRUD, 댓글·답글 계층 구조, 좋아요 기능 구현",
              "이미지 다중 첨부 및 게시글 카테고리(육아/정보/자유) 분류"
            ]
          }
        ]
      },
      {
        "header": "마이페이지",
        "image": "/opt/aibom4.webp",
        "groups": [
          {
            "title": "프로필 및 자녀 관리",
            "items": [
              "Google/Kakao 소셜 로그인으로 간편 가입 및 자동 프로필 연동",
              "프로필 이미지 업로드 및 자기소개 수정 기능",
              "아이 추가 버튼으로 다자녀 등록 (이름, 생년월일, 성별 입력)",
              "자녀 목록을 나이·이름·성별 기준 자동 정렬"
            ]
          }
        ]
      },
      {
        "header": "리포트",
        "image": "/opt/aibom5.webp",
        "groups": [
          {
            "title": "AI 자동 리포트",
            "items": [
              "측정 결과 데이터 기반 종합 발달 리포트 자동 생성",
              "OpenAI GPT API 활용, 육아 전문가 에이전트 프롬프트 적용",
              "영역별(대근육, 소근육, 인지, 언어, 사회성) 점수 분석",
              "각 영역별 강점/약점 분석 및 맞춤 양육 가이드 제공"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "kkam-catch",
    "title": "깜빡Catch",
    "date": "2025-04-14 ~ 05-09",
    "people": "4명 - 기여도 100%(PM, 웹개발)",
    "stack": [
      "React",
      "TypeScript",
      "supabase"
    ],
    "cover": "/opt/Kkam1-card.webp",
    "highlights": [
      "AI 기반 무인매장 이상현상 실시간 탐지",
      "i18n 다국어 지원 (한/영/일/중)",
      "관리자 대시보드 및 승인 시스템",
      "React Native 모바일 앱 실시간 알림 연동"
    ],
    "slides": [
      {
        "header": "주요 기능",
        "image": "/opt/Kkam1.webp",
        "groups": [
          {
            "title": "",
            "items": [
              "AI 기반 무인매장 이상현상 실시간 탐지",
              "i18n 다국어 지원 (한/영/일/중)",
              "관리자 대시보드 및 승인 시스템",
              "React Native 모바일 앱 실시간 알림 연동",
              "Supabase 인증 및 실시간 데이터 구독"
            ]
          }
        ]
      },
      {
        "header": "메인페이지",
        "image": "/opt/Kkam2.webp",
        "groups": [
          {
            "title": "서비스 소개 랜딩",
            "items": [
              "무인매장 이상현상 AI 탐지 서비스의 핵심 가치 소개",
              "서비스 이용 흐름 및 주요 기능 시각적 인포그래픽 안내",
              "신규 가입과 기존 가입자 로그인 동선 분리 설계",
              "반응형 디자인으로 모바일/태블릿/데스크톱 대응"
            ]
          }
        ]
      },
      {
        "header": "다국어 지원",
        "image": "/opt/Kkam3.webp",
        "groups": [
          {
            "title": "i18n 다국어 시스템",
            "items": [
              "react-i18next 라이브러리 기반 4개 언어 지원 (한/영/일/중)",
              "헤더 언어 선택기로 전체 UI 텍스트 동적 실시간 전환",
              "회원가입, 로그인, 메인, 관리자 등 전 페이지 다국어 처리",
              "언어별 JSON 번역 파일 분리 관리로 유지보수 용이"
            ]
          }
        ]
      },
      {
        "header": "관리자 페이지",
        "image": "/opt/Kkam4.webp",
        "groups": [
          {
            "title": "매장 관리 대시보드",
            "items": [
              "신규 가입자 및 매장 변경 요청을 실시간 알림으로 수신",
              "관리자 승인/반려 후 즉시 앱 이용 권한 부여 또는 차단",
              "승인/미승인 버튼 클릭으로 Supabase 상태값 즉시 변경",
              "가입자 현황 테이블 (이름, 매장, 가입일, 상태) 필터링 조회"
            ]
          }
        ]
      },
      {
        "header": "모바일 앱",
        "image": "/opt/Kkam5.webp",
        "groups": [
          {
            "title": "실시간 모니터링 앱",
            "items": [
              "React Native 기반 크로스플랫폼 모바일 앱 (iOS/Android)",
              "CCTV 영상 실시간 스트리밍 송출 및 다중 카메라 전환",
              "AI 얼굴 인식 기반 고객 얼굴 실시간 블라인드(모자이크) 처리",
              "고객 체류 시간, 이동 동선 등 행동 데이터 분석 대시보드"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "ai-cube",
    "title": "AI Cube — 미니 AI 에이전트 만들기",
    "date": "2025-11-28 ~ 2026-03-11",
    "people": "1명 - 기여도 100%(설계 및 개발)",
    "stack": [
      "SvelteKit",
      "TypeScript",
      "Tailwind CSS",
      "IndexedDB"
    ],
    "highlights": [
      "백엔드 없이 브라우저에서만 동작하는 AI 에이전트 생성 도구",
      "역할·말투·규칙·지식·출력 형식으로 에이전트(큐브) 구성",
      "OpenAI·Claude·Gemini 다중 제공자와 생성 파라미터 조절",
      "IndexedDB 저장, JSON 내보내기·가져오기, URL 공유"
    ],
    "slides": [
      {
        "header": "홈",
        "image": "/opt/aicube1.webp",
        "groups": [
          {
            "title": "내 큐브와 템플릿",
            "items": [
              "템플릿 하나로 바로 큐브를 만들고 목록에서 관리",
              "백엔드 없이 100% 클라이언트에서 동작, IndexedDB(Dexie) 저장",
              "JSON 내보내기·가져오기, URL로 큐브 공유"
            ]
          }
        ]
      },
      {
        "header": "큐브 상세",
        "image": "/opt/aicube2.webp",
        "groups": [
          {
            "title": "큐브 구성",
            "items": [
              "역할·말투·규칙·배경 지식·시작 메시지·출력 형식",
              "실행·편집·JSON 내보내기·삭제"
            ]
          }
        ]
      },
      {
        "header": "실행",
        "image": "/opt/aicube3.webp",
        "groups": [
          {
            "title": "대화하며 확인",
            "items": [
              "구성한 프롬프트를 옆에 띄워 두고 대화",
              "OpenAI·Anthropic·Google·xAI 응답을 스트리밍으로 표시",
              "Max Tokens, Temperature, Top P 등 생성 파라미터 조절"
            ]
          }
        ]
      },
      {
        "header": "만들기",
        "image": "/opt/aicube4.webp",
        "groups": [
          {
            "title": "4단계 위저드",
            "items": [
              "기본 정보 → 역할과 말투 → 규칙·지식 → 출력 형식",
              "단계마다 도움말, AI로 자동 채우기"
            ]
          }
        ]
      }
    ],
    "cover": "/opt/aicube-card.webp"
  },
  {
    "slug": "lotto-analyzer",
    "title": "로또 분석기",
    "date": "2025-12-05 ~ ing",
    "people": "1명 - 기여도 100%(설계 및 개발)",
    "stack": [
      "SvelteKit",
      "TypeScript",
      "Python",
      "PyTorch",
      "Vercel",
      "GitHub Actions"
    ],
    "cover": "/opt/lotto-card.webp",
    "highlights": [
      "통계·딥러닝 예측 모델 3종(v4·v5·v6)을 골라 보는 추천 번호",
      "GitHub Actions로 매주 당첨번호 수집 → 예측 → 배포 자동화",
      "회차별 예측 기록을 쌓아 무작위 대비 성능 공개",
      "바람에 섞이는 공을 직접 뽑는 캔버스 추첨기"
    ],
    "slides": [
      {
        "header": "주요 기능",
        "image": "/opt/lotto1.webp",
        "groups": [
          {
            "title": "",
            "items": [
              "역대 당첨 데이터 기반 통계와 추천 번호 5세트",
              "예측 모델 3종(통계·흐름 v6, PyTorch v5·v4) 선택",
              "지난 회차 추천과 실제 당첨 번호 적중 비교",
              "로또 용지를 닮은 화면, 모바일 대응"
            ]
          }
        ]
      },
      {
        "header": "추천과 적중",
        "image": "/opt/lotto2.webp",
        "groups": [
          {
            "title": "같은 높이의 두 카드",
            "items": [
              "모델 탭을 바꾸면 추천 번호와 지난 회차 적중이 함께 바뀜",
              "화면 너비에 맞춰 줄어드는 번호 공 컴포넌트"
            ]
          }
        ]
      },
      {
        "header": "예측 기록",
        "image": "/opt/lotto3.webp",
        "groups": [
          {
            "title": "정직한 성능 측정",
            "items": [
              "git 기록에서 지난 예측을 복원해 회차×모델별로 저장",
              "추첨 뒤에 만든 예측은 집계에서 제외",
              "세트당 평균 일치, 5등 이상 비율을 무작위 이론값과 비교"
            ]
          }
        ]
      },
      {
        "header": "추첨기",
        "image": "/opt/lotto4.webp",
        "groups": [
          {
            "title": "Canvas 물리 시뮬레이션",
            "items": [
              "송풍구 바람·소용돌이·충돌로 공 45개가 섞임",
              "공마다 회전값이 있어 번호판이 굴러가며 보였다 숨음",
              "출구 관에 처음 들어간 공이 뽑히는 실제 추첨 방식"
            ]
          }
        ]
      },
      {
        "header": "자동화",
        "groups": [
          {
            "title": "GitHub Actions 주간 파이프라인",
            "items": [
              "일요일마다 당첨번호 수집 → 데이터셋 재생성 → 모델 3종 예측",
              "예측 결과와 기록을 커밋하면 Vercel이 자동 배포",
              "학습한 모델 가중치는 캐시로 재사용"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "jmg",
    "title": "JMG — 셀프 호스팅 이미지 서버",
    "date": "2026-02-24 ~ 03-06",
    "people": "1명 - 기여도 100%(설계 및 개발)",
    "stack": [
      "Go",
      "SQLite",
      "Docker",
      "JavaScript"
    ],
    "highlights": [
      "업로드 즉시 고유 URL 생성, 클립보드 자동 복사",
      "SHA-256 해시로 중복 업로드 차단, 썸네일 자동 생성",
      "파일탐색기 스타일 관리 화면(폴더, 벌크 이동·삭제)",
      "Go 단일 바이너리 + SQLite 내장, Docker 배포"
    ],
    "slides": [
      {
        "header": "관리 화면",
        "image": "/opt/jmg1.webp",
        "groups": [
          {
            "title": "파일탐색기 스타일",
            "items": [
              "폴더와 이미지를 한 목록에서 탐색",
              "드래그앤드롭·클립보드 붙여넣기·폴더째 업로드",
              "업로드 즉시 고유 URL 생성, 클립보드 자동 복사"
            ]
          }
        ]
      },
      {
        "header": "미리보기",
        "image": "/opt/jmg2.webp",
        "groups": [
          {
            "title": "이미지 정보",
            "items": [
              "원본 이름·타입·크기·해상도·폴더·URL 확인",
              "URL 복사, 새 탭, 이름 변경, 삭제",
              "Slug URL(/photos/sunset), ETag 캐싱"
            ]
          }
        ]
      },
      {
        "header": "벌크 작업",
        "image": "/opt/jmg3.webp",
        "groups": [
          {
            "title": "여러 장 한 번에",
            "items": [
              "체크한 이미지를 한 번에 이동·삭제",
              "SHA-256 해시로 같은 이미지 중복 업로드 차단",
              "200·400·800px 썸네일 자동 생성"
            ]
          }
        ]
      },
      {
        "header": "배포",
        "image": "/opt/jmg4.webp",
        "groups": [
          {
            "title": "Go 단일 바이너리",
            "items": [
              "SQLite 내장(CGO 불필요), docker compose 한 줄로 실행",
              "업로드·관리는 토큰 인증, 이미지 열람은 공개",
              "화면은 바닐라 HTML/CSS/JS 한 파일을 바이너리에 포함"
            ]
          }
        ]
      }
    ],
    "cover": "/opt/jmg-card.webp"
  },
  {
    "slug": "jchat",
    "title": "JChat — AI 캐릭터 채팅",
    "date": "2026-03-25 ~ 04-21",
    "people": "1명 - 기여도 100%(설계 및 개발)",
    "stack": [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Zustand",
      "Tailwind CSS"
    ],
    "highlights": [
      "5단계 위저드로 캐릭터·시작 시나리오·로어북 생성",
      "Gemini / Claude 어댑터 패턴으로 모델 교체",
      "Supabase Auth·Storage·RLS로 사용자별 데이터 보호",
      "로어북 드래그앤드롭 정렬, base62 slug URL"
    ],
    "slides": [
      {
        "header": "캐릭터 목록",
        "image": "/opt/jchat1.webp",
        "groups": [
          {
            "title": "",
            "items": [
              "공개된 캐릭터 카드와 왼쪽 채팅 기록",
              "카드를 누르면 설명과 시작 시나리오를 고르고 이어하기·새로하기",
              "내 캐릭터는 ⋮ 메뉴로 수정·삭제"
            ]
          }
        ]
      },
      {
        "header": "채팅",
        "image": "/opt/jchat2.webp",
        "groups": [
          {
            "title": "스트리밍 대화",
            "items": [
              "첫 메시지를 보낼 때 채팅방 생성, 메시지는 DB에 저장",
              "최신 20개 로드 후 위로 스크롤하면 이전 메시지 추가",
              "메시지 수정·재생성·삭제, 시작 설정은 잠금"
            ]
          }
        ]
      },
      {
        "header": "설정 패널",
        "image": "/opt/jchat3.webp",
        "groups": [
          {
            "title": "유저 노트·페르소나·메모리",
            "items": [
              "캐릭터별 유저 노트, 글로벌 페르소나 선택",
              "대화가 쌓이면 자동 요약과 중요 사실 추출",
              "프롬프트 = 타입 → 상세 → 시나리오 → 페르소나 → 노트 → 로어북 → 메모리"
            ]
          }
        ]
      },
      {
        "header": "캐릭터 만들기",
        "image": "/opt/jchat4.webp",
        "groups": [
          {
            "title": "5단계 위저드",
            "items": [
              "기본 정보 → 상세 → 시작 시나리오 → 로어북 → 공개 설정",
              "단계별 유효성 검사, 오류 단계로 자동 이동",
              "오른쪽 미리보기, 기존 캐릭터 불러와 복사"
            ]
          }
        ]
      }
    ],
    "cover": "/opt/jchat-card.webp"
  },
  {
    "slug": "nextsl",
    "title": "NextSL — 스타리그 육성 시뮬레이션",
    "date": "2026-09-29 ~ ing",
    "people": "1명 - 기여도 100%(설계 및 개발)",
    "stack": [
      "TypeScript",
      "React",
      "Vite",
      "Tauri 2",
      "Rust"
    ],
    "cover": "/opt/nextsl-card.webp",
    "highlights": [
      "2007년 팬메이드 게임 '마이 스타크래프트'를 다시 만드는 비상업 리메이크",
      "외부 의존성 없는 게임 로직(core)과 492개 테스트",
      "3단계 경기 시뮬레이션과 픽셀 아트 관전 화면",
      "Tauri로 묶은 오프라인 exe, 세이브 서명·팩 검증"
    ],
    "slides": [
      {
        "header": "시작 화면",
        "image": "/opt/nextsl1.webp",
        "groups": [
          {
            "title": "2012년, 그다음 시즌",
            "items": [
              "브루드 워 마지막 스타리그 이후를 감독으로 이어 가는 육성 게임",
              "2012 기본 팩: 선수 103명·8개 팀·맵 20개·전략 45개",
              "실제 11-12 프로리그 전 세트 기록으로 선수 등급 산정, 공식 순위표로 검증",
              "엑셀(CSV) 데이터 팩을 합치고 zip으로 가져오기"
            ]
          }
        ]
      },
      {
        "header": "주차 진행",
        "image": "/opt/nextsl2.webp",
        "groups": [
          {
            "title": "프로리그·MySL·시장",
            "items": [
              "주 2칸 일정에 경기·스크림·광고 제의가 도착, 수락·거절",
              "시즌마다 맵 추첨, 승률로 맵 밸런스 패치",
              "성장·노쇠·은퇴, 실제 FA 제도(우선 협상→입찰→선수 선택)",
              "팬·스폰서·방송 수입으로 돌아가는 구단 경제"
            ]
          }
        ]
      },
      {
        "header": "VS 엔트리",
        "image": "/opt/nextsl3.webp",
        "groups": [
          {
            "title": "세트별 출전 선수 고르기",
            "items": [
              "맵 속성·종족 상성·컨디션을 보고 세트마다 선수 배치",
              "상대 엔트리 예측과 12축 능력치 레이더",
              "유명 선수는 전략이 노출되는 정보전, 신인은 정보 없음",
              "소모품(컨디션 부스터 등)과 에이스 결정전"
            ]
          }
        ]
      },
      {
        "header": "경기 화면",
        "image": "/opt/nextsl4.webp",
        "groups": [
          {
            "title": "빌드 → 교전 → 운영",
            "items": [
              "시드 고정 3단계 시뮬레이션: 스킵하거나 다시 불러와도 결과 동일",
              "직접 그린 도트 스프라이트로 건물·유닛·병력 흐름 표시",
              "색으로 구분한 중계 문구, 배속·세트 넘기기",
              "세이브 서명·메모리 값 위장·팩 경로 검증으로 가벼운 조작 차단"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "haengun-dream",
    "title": "행운드림 — 오늘의 행운 부적",
    "date": "2026-11-03 ~ ing",
    "people": "1명 - 기여도 100%(설계 및 개발)",
    "stack": [
      "Next.js",
      "React",
      "TypeScript",
      "PWA",
      "Upstash Redis",
      "Vercel"
    ],
    "cover": "/opt/haengun-card.webp",
    "highlights": [
      "이름·생년월일로 사주와 띠를 계산해 하루 고정 부적을 고르는 모바일 웹 앱",
      "끈을 당겨 두루마리를 푸는 인터랙션",
      "계산은 기기 안에서만, 개인정보를 서버로 보내지 않음",
      "홈 화면 추가·오프라인 실행(PWA)"
    ],
    "slides": [
      {
        "header": "부적 쓰기",
        "image": "/opt/haengun1.webp",
        "groups": [
          {
            "title": "이름 → 생년월일 → 풍습 → 중요한 날",
            "items": [
              "입력한 이름이 부적에 붓글씨로 써지고, 띠와 일간이 도장으로 찍힘",
              "생년월일로 년주·월주·일주와 오행 분포 계산",
              "한국·아시아·세계 풍습 중 고른 상징에서만 아이템 선택",
              "정보는 기기에만 저장"
            ]
          }
        ]
      },
      {
        "header": "두루마리",
        "image": "/opt/haengun2.webp",
        "groups": [
          {
            "title": "끈을 당겨 매듭 풀기",
            "items": [
              "하루 한 번 끈으로 묶인 두루마리로 도착",
              "끈 끝을 당기면 실제 매듭처럼 고리가 빠지며 풀림",
              "끈은 처음부터 끝까지 한 가닥으로 그림",
              "진동 지원 기기에서 짧은 진동, '동작 줄이기' 설정 존중"
            ]
          }
        ]
      },
      {
        "header": "오늘의 부적",
        "image": "/opt/haengun3.webp",
        "groups": [
          {
            "title": "사주·띠·일진으로 고른 아이템",
            "items": [
              "부족한 오행·삼합 띠·그날 일진에 가중치를 둔 결정 엔진",
              "같은 날에는 몇 번을 열어도 같은 부적",
              "행운의 빛·수·방향, 분야별로 실제 도움이 되는 팁",
              "'꾹 눌러 응원 받기': 자모 편집 거리로 비슷한 상황 찾기"
            ]
          }
        ]
      },
      {
        "header": "고운 말 뽑기통",
        "image": "/opt/haengun4.webp",
        "groups": [
          {
            "title": "서로 고운 말 주고받기",
            "items": [
              "통을 흔들어 랜덤으로 한 장 뽑고, 좋아요가 많은 말 모아 보기",
              "띄어쓰기·기호로 피한 욕설과 자모 욕까지 거르는 필터",
              "기기당 하루 5장, 신고 3건이면 제외",
              "Upstash Redis 저장, 기기 아이디는 해시만 보관"
            ]
          }
        ]
      }
    ]
  }
]



export const stats = [
  { value: experience.short, label: '실무 경력' },
  // 신나는플랫폼에서 운영한 대학 시스템 9개 + 메타노빅스에서 만든 시스템
  { value: String(9 + companies[0].commits.length), label: '운영·개발한 시스템' },
  { value: String(projects.length), label: '개인·팀 프로젝트' },
]
