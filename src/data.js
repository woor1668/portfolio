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
    '신나는플랫폼에서 2년 10개월 동안 9개 대학의 NCS·포털·SSO 시스템을 운영하며 프론트엔드, 백엔드, 서버, DB를 함께 다뤘습니다.',
    'React·TypeScript로 출석 관리, 실시간 채팅, AI 발달 리포트 같은 서비스를 직접 설계하고 만들었습니다.',
    '2025년 11월부터 메타노빅스에서 일하고 있습니다.',
  ],
  stack: ['React', 'TypeScript', 'Java · Spring'],
}

export const nav = [
  { id: 'about', file: 'about.ts', label: 'About' },
  { id: 'skills', file: 'skills.json', label: 'Skills' },
  { id: 'career', file: 'career.log', label: 'Career' },
  { id: 'projects', file: 'projects/', label: 'Projects' },
]

/** icon: react-icons 이름 (components/icons.js 에 등록) */
export const skills = [
  { group: 'frontend', items: [['React', 'FaReact', '#61DAFB'], ['Angular', 'FaAngular', '#DD0031'], ['jQuery', 'SiJquery', '#0769AD']] },
  { group: 'basic', items: [['HTML5', 'FaHtml5', '#E34F26'], ['CSS3', 'FaCss3Alt', '#1572B6'], ['JavaScript', 'FaJs', '#F7DF1E'], ['TypeScript', 'BiLogoTypescript', '#3178C6']] },
  { group: 'backend', items: [['Java', 'FaJava', '#ED8B00'], ['Spring Boot', 'SiSpringboot', '#6DB33F'], ['Node.js', 'FaNodeJs', '#68A063'], ['Python', 'SiPython', '#3776AB'], ['Django', 'SiDjango', '#44B78B']] },
  { group: 'database', items: [['Oracle', 'GrOracle', '#F80000'], ['MariaDB', 'SiMariadb', '#C0765A'], ['MSSQL', 'DiMsqlServer', '#CC2927']] },
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
    // 담당 업무를 적으면 커밋처럼 표시됩니다 (main/front/back/server/database)
    commits: [],
  },
  {
    name: '신나는플랫폼',
    start: '2021.10',
    end: '2024.07',
    commits: [
      {
        year: '2021.10 — 2024.07',
        tag: 'v1.0 → v3.0',
        title: '9개 대학 NCS · 포털 · SSO 시스템 운영 및 개발',
        main: ['9개 대학 NCS 시스템 오류 수정 및 기능 개발', '신안산대 NCS 개발 PL 수행', 'OZ report 유지보수'],
        front: ['JS·jQuery로 NCS 시스템과 동국대 SSO 화면 개발', 'Angular 중앙대 포털, WebSquare 신성대 종합정보시스템', 'Nexacro 유한대 학생이력시스템'],
        back: ['Java·Spring으로 NCS·포털·SSO 유지보수 및 개발'],
        server: ['7개 대학 Linux 서버 운영', '동국대 포털·SSO 서버 복구, 사내 서버 AWS 이관'],
        database: ['Oracle(7개 대학)·MySQL(2개 대학) NCS DB 관리'],
      },
    ],
  },
].map((c) => {
  const m = months(c.start, c.end)
  return { ...c, months: m, period: `${c.start} — ${c.end ?? '현재'}`, duration: ko(m) }
})

export const totalMonths = companies.reduce((a, c) => a + c.months, 0)
export const experience = { short: short(totalMonths), ko: ko(totalMonths) }

export const stats = [
  { value: experience.short, label: '실무 경력' },
  { value: '9', label: '대학 시스템 운영' },
  { value: '6', label: '개인·팀 프로젝트' },
]
export const projects = [
  {
    slug: "x-copycat",
    title: "X (구 트위터) CopyCat",
    date: "2024-07-20 ~ 08-07",
    people: "1명 - 기여도 100%(설계 및 개발)",
    stack: [
      "React",
      "TypeScript",
      "FireBase"
    ],
    cover: "/opt/t0-card.webp",
    highlights: [
      "Firebase Auth 기반 소셜 로그인(Google, GitHub)",
      "텍스트/이미지 게시물 CRUD 및 실시간 피드 업데이트",
      "좋아요/싫어요 토글 및 중복 방지 로직",
      "댓글·답글 다중 계층 구조 구현"
    ],
    slides: [
      {
        header: "주요 기능",
        image: "/opt/t0.webp",
        groups: [
          {
            title: "",
            items: [
              "Firebase Auth 기반 소셜 로그인(Google, GitHub)",
              "텍스트/이미지 게시물 CRUD 및 실시간 피드 업데이트",
              "좋아요/싫어요 토글 및 중복 방지 로직",
              "댓글·답글 다중 계층 구조 구현",
              "Intersection Observer 기반 무한스크롤"
            ]
          }
        ]
      },
      {
        header: "게시 기능",
        image: "/opt/t1.mp4",
        groups: [
          {
            title: "게시글 작성",
            items: [
              "엔터 또는 저장 버튼 클릭 시 Firestore에 실시간 저장",
              "onSnapshot 리스너로 DB 변경 즉시 피드 반영",
              "작성 시간, 작성자 정보 자동 메타데이터 기록"
            ]
          },
          {
            title: "게시물 조회",
            items: [
              "작성자 ID 기반 필터링 및 전체 타임라인 조회",
              "최신순 정렬 및 Firestore 커서 기반 페이지네이션",
              "게시물 수정/삭제 시 작성자 본인 여부 검증"
            ]
          }
        ]
      },
      {
        header: "이미지 업로드 기능",
        image: "/opt/t2.mp4",
        groups: [
          {
            title: "커스텀 파일 업로드 UI",
            items: [
              "useRef로 hidden file input 연결, 업로드 버튼 구현",
              "FileReader API로 선택 즉시 이미지 프리뷰 렌더링",
              "파일 선택 시 버튼 텍스트 변경 및 파일명 표시"
            ]
          },
          {
            title: "Firebase Storage 연동",
            items: [
              "Storage에 이미지 업로드 후 다운로드 URL 자동 생성",
              "게시물 Firestore 문서에 이미지 URL 연결하여 피드에 표시",
              "이미지 삭제 시 Storage에서도 동시 삭제 처리"
            ]
          }
        ]
      },
      {
        header: "좋아요/싫어요 기능",
        image: "/opt/t3.mp4",
        groups: [
          {
            title: "좋아요 토글",
            items: [
              "클릭마다 Firestore 서브컬렉션에 문서 insert/delete 반복 처리",
              "현재 사용자 ID로 좋아요 여부 실시간 체크 후 UI 즉시 반영",
              "좋아요 수 카운트를 게시물 문서에 동기화하여 피드에 표시"
            ]
          },
          {
            title: "싫어요 및 중복 방지",
            items: [
              "이미 싫어요한 게시물에 재클릭 방지 로직 구현",
              "좋아요 상태에서 싫어요 클릭 시 좋아요 자동 해제 (상호 배타적)",
              "본인 게시물에는 좋아요/싫어요 비활성화 처리"
            ]
          }
        ]
      },
      {
        header: "댓글 기능",
        image: "/opt/t4.mp4",
        groups: [
          {
            title: "다중 계층 댓글 시스템",
            items: [
              "게시글별 댓글 입력, 수정, 삭제 및 좋아요/싫어요 지원",
              "외부 피드에서 게시글당 댓글 수 실시간 카운트 표시",
              "댓글에 대한 답글 작성 가능 (parent ID 기반 재귀 구조)",
              "답글도 좋아요/싫어요, 수정/삭제 등 댓글과 동일 기능 제공"
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "dongbaek-academy",
    title: "동백학원 웹사이트 제작",
    date: "2025-01-05 ~ ing",
    people: "2명 - 기여도 100%(설계 및 개발)",
    stack: [
      "React",
      "TypeScript",
      "SpringBoot",
      "MariaDB"
    ],
    cover: "/opt/a0-card.webp",
    highlights: [
      "QR코드 기반 학원생 출석 체크 시스템",
      "학원생 CRUD 및 반 편성·납부 관리",
      "월별/일별 출석 현황 대시보드",
      "공통코드 기반 동적 데이터 관리 체계"
    ],
    slides: [
      {
        header: "주요 기능",
        image: "/opt/a0.webp",
        groups: [
          {
            title: "",
            items: [
              "QR코드 기반 학원생 출석 체크 시스템",
              "학원생 CRUD 및 반 편성·납부 관리",
              "월별/일별 출석 현황 대시보드",
              "공통코드 기반 동적 데이터 관리 체계",
              "SpringBoot REST API + React SPA 아키텍처"
            ]
          }
        ]
      },
      {
        header: "출석 기능",
        image: "/opt/a1.mp4",
        groups: [
          {
            title: "학원생 출석 체크",
            items: [
              "등원 시 이름/연락처 입력 후 출석 버튼으로 즉시 처리",
              "당일 중복 출석 방지를 위한 일별 중복 체크 로직 적용",
              "출석 시간 자동 기록 및 지각/조퇴/결석 자동 구분",
              "출석 완료 시 보호자에게 알림 메시지 전송 기능"
            ]
          }
        ]
      },
      {
        header: "공통코드 기능",
        image: "/opt/a2.mp4",
        groups: [
          {
            title: "공통코드 관리",
            items: [
              "반복 사용 데이터(학년, 과목, 요일, 반 등)를 코드화하여 중앙 관리",
              "사용처별 그룹 분류 체계로 데이터 일관성 및 확장성 확보",
              "코드 사용 여부 토글로 비활성 코드 관리"
            ]
          },
          {
            title: "세부코드 관리",
            items: [
              "공통코드 클릭 시 하위 세부코드 목록 동적 렌더링",
              "세부코드 추가/수정/삭제 시 연관된 원생 데이터에 자동 반영",
              "드래그 앤 드롭으로 세부코드 정렬 순서 변경 가능"
            ]
          }
        ]
      },
      {
        header: "원생 관리 기능",
        image: "/opt/a3.mp4",
        groups: [
          {
            title: "원생 정보 관리",
            items: [
              "학원생 인적사항, 보호자 연락처, 수업 스케줄 통합 관리",
              "납부금 현황 조회 및 미납 알림 기능",
              "이름/반/학년 기준 검색 및 다중 조건 필터링"
            ]
          },
          {
            title: "연관 원생 관리",
            items: [
              "형제/자매 등 연관 원생 연결로 가족 단위 할인 관리",
              "UID 검증으로 자기 자신 중복 등록 방지",
              "연관 원생 등록 시 보호자 정보 자동 연동"
            ]
          }
        ]
      },
      {
        header: "출석 관리 기능",
        image: "/opt/a4.mp4",
        groups: [
          {
            title: "출석 현황 대시보드",
            items: [
              "학원생 출석 기록 월별/일별 캘린더 뷰 조회",
              "동명이인 존재 시 선택 팝업으로 정확한 원생 식별",
              "월별 출석률 자동 계산 및 통계 차트 표시",
              "특정 날짜 클릭 시 해당 일자 상세 출석 내역 확인"
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "malssi-malgeum",
    title: "말씨맑음",
    date: "2025-01-20 ~ 01-23",
    people: "3명 - 기여도 70%(설계 및 개발)",
    stack: [
      "React",
      "JavaScript",
      "Firebase",
      "mysql"
    ],
    cover: "/opt/c0-card.webp",
    highlights: [
      "WebSocket 기반 실시간 양방향 채팅",
      "MutationObserver 활용 무한스크롤 최적화",
      "AI 비속어 감지 및 순화표현 자동 추천",
      "GPT 봇 연동 실시간 순화표현 알림"
    ],
    slides: [
      {
        header: "주요 기능",
        image: "/opt/c0.webp",
        groups: [
          {
            title: "",
            items: [
              "WebSocket 기반 실시간 양방향 채팅",
              "MutationObserver 활용 무한스크롤 최적화",
              "AI 비속어 감지 및 순화표현 자동 추천",
              "GPT 봇 연동 실시간 순화표현 알림",
              "채팅방 생성/참여 및 사용자 관리"
            ]
          }
        ]
      },
      {
        header: "채팅 기능",
        image: "/opt/c1.mp4",
        groups: [
          {
            title: "실시간 WebSocket 통신",
            items: [
              "WebSocket 프로토콜로 양방향 실시간 메시지 송수신",
              "서버에서 메시지 수신 즉시 전체 참여자에게 브로드캐스트",
              "연결 끊김 감지 시 자동 재연결 및 미수신 메시지 동기화",
              "채팅방 입장/퇴장 시 시스템 메시지 자동 표시"
            ]
          }
        ]
      },
      {
        header: "무한스크롤 기능",
        image: "/opt/c2.mp4",
        groups: [
          {
            title: "무한스크롤",
            items: [
              "초기 로딩 시 최근 20건만 조회하여 서버 부하 최소화",
              "스크롤 최상단 도달 시 이전 메시지 20건 추가 로딩 (커서 기반)",
              "MutationObserver로 새 메시지 DOM 삽입 감지 후 스크롤 위치 자동 보정",
              "로딩 중 스피너 표시로 사용자에게 데이터 로딩 상태 피드백"
            ]
          }
        ]
      },
      {
        header: "비속어 체크 기능",
        image: "/opt/c3.mp4",
        groups: [
          {
            title: "AI 비속어 자동 감지",
            items: [
              "자체 학습시킨 NLP 분류 모델로 채팅 입력 시 비속어 실시간 판별",
              "비속어로 분류된 단어를 OpenAI GPT API에 전달하여 순화표현 요청",
              "추천받은 순화표현을 '말씨맑음봇' 이름으로 채팅에 자동 게시",
              "비속어 감지 이력을 DB에 저장하여 사용자별 통계 관리"
            ]
          }
        ]
      },
      {
        header: "검사 기능",
        image: "/opt/c4.mp4",
        groups: [
          {
            title: "전송 전 비속어 사전 검사",
            items: [
              "검사 버튼 클릭 시 입력창 텍스트 전체를 비속어 모델로 스캔",
              "비속어 감지 시 해당 단어 하이라이트 및 순화표현 추천 팝업",
              "'그대로 전송' / '순화표현 적용' 2가지 선택지 제공",
              "적용 클릭 시 입력창 텍스트 내 비속어를 순화 단어로 자동 치환"
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "portfolio",
    title: "포트폴리오 (JB WORKS)",
    date: "2025-01-31 ~ 02-02 · 2026-11 리뉴얼",
    people: "1명 - 기여도 100%(설계 및 개발)",
    stack: [
      "React",
      "Vite",
      "Firebase",
      "GitHub Actions"
    ],
    cover: "/opt/p0-card.webp",
    highlights: [
      "개발 도구 화면을 모티브로 한 반응형 SPA",
      "Ctrl+K 명령 팔레트와 키보드 탐색",
      "GitHub Actions → Firebase Hosting 자동 배포",
      "이미지 WebP·영상 MP4 변환으로 용량 약 80% 감소"
    ],
    slides: [
      {
        header: "주요 기능",
        image: "/opt/p0.webp",
        groups: [
          {
            title: "",
            items: [
              "개발 도구 화면을 모티브로 한 반응형 SPA",
              "Ctrl+K 명령 팔레트와 키보드 탐색",
              "GitHub Actions → Firebase Hosting 자동 배포",
              "이미지 WebP·영상 MP4 변환으로 용량 약 80% 감소"
            ]
          }
        ]
      },
      {
        header: "리뉴얼",
        image: "/opt/p1.webp",
        groups: [
          {
            title: "구조",
            items: [
              "Create React App → Vite 로 이전",
              "모든 내용을 data.js 한 파일에서 관리",
              "섹션별 스크롤 등장 애니메이션 (transform·opacity 만 사용)"
            ]
          },
          {
            title: "배포·성능",
            items: [
              "main 푸시 시 GitHub Actions 로 빌드 후 Firebase Hosting 배포",
              "PR 마다 미리보기 주소 자동 생성",
              "화면 밖 섹션은 그리지 않도록 content-visibility 적용"
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "aibom",
    title: "AIBOM",
    date: "2025-03-14 ~ 04-11",
    people: "5명 - 기여도 100%(설계 및 개발)",
    stack: [
      "React",
      "TypeScript",
      "supabase",
      "MariaDB"
    ],
    cover: "/opt/aibom1-card.webp",
    highlights: [
      "K-DST / KICCE 기반 영·유아 행동발달 AI 측정",
      "OpenAI API 연동 자동 리포트 생성",
      "보호자 커뮤니티 (게시글, 댓글, 좋아요)",
      "소셜 로그인 및 다자녀 프로필 관리"
    ],
    slides: [
      {
        header: "주요 기능",
        image: "/opt/aibom1.webp",
        groups: [
          {
            title: "",
            items: [
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
        header: "메인페이지",
        image: "/opt/aibom2.webp",
        groups: [
          {
            title: "발달 측정 대시보드",
            items: [
              "영·유아 행동발달 측정 AI 플랫폼의 메인 허브",
              "K-DST(행동발달), KICCE(유아관찰) 기반 표준화 측정 제공",
              "미측정 항목 잠금 처리, 해당 월 미측정 시 측정 버튼 활성화",
              "월 1회 측정 결과 저장 및 월별 성장곡선 차트 시각화"
            ]
          }
        ]
      },
      {
        header: "커뮤니티",
        image: "/opt/aibom3.webp",
        groups: [
          {
            title: "보호자 커뮤니티",
            items: [
              "보호자 간 소통 공간으로 서비스 체류 시간 및 재방문율 증가 목적",
              "최신순/인기순 정렬 전환 및 키워드 검색 기능",
              "게시글 CRUD, 댓글·답글 계층 구조, 좋아요 기능 구현",
              "이미지 다중 첨부 및 게시글 카테고리(육아/정보/자유) 분류"
            ]
          }
        ]
      },
      {
        header: "마이페이지",
        image: "/opt/aibom4.webp",
        groups: [
          {
            title: "프로필 및 자녀 관리",
            items: [
              "Google/Kakao 소셜 로그인으로 간편 가입 및 자동 프로필 연동",
              "프로필 이미지 업로드 및 자기소개 수정 기능",
              "아이 추가 버튼으로 다자녀 등록 (이름, 생년월일, 성별 입력)",
              "자녀 목록을 나이·이름·성별 기준 자동 정렬"
            ]
          }
        ]
      },
      {
        header: "리포트",
        image: "/opt/aibom5.webp",
        groups: [
          {
            title: "AI 자동 리포트",
            items: [
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
    slug: "kkam-catch",
    title: "깜빡Catch",
    date: "2025-04-14 ~ 05-09",
    people: "4명 - 기여도 100%(PM, 웹개발)",
    stack: [
      "React",
      "TypeScript",
      "supabase"
    ],
    cover: "/opt/Kkam1-card.webp",
    highlights: [
      "AI 기반 무인매장 이상현상 실시간 탐지",
      "i18n 다국어 지원 (한/영/일/중)",
      "관리자 대시보드 및 승인 시스템",
      "React Native 모바일 앱 실시간 알림 연동"
    ],
    slides: [
      {
        header: "주요 기능",
        image: "/opt/Kkam1.webp",
        groups: [
          {
            title: "",
            items: [
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
        header: "메인페이지",
        image: "/opt/Kkam2.webp",
        groups: [
          {
            title: "서비스 소개 랜딩",
            items: [
              "무인매장 이상현상 AI 탐지 서비스의 핵심 가치 소개",
              "서비스 이용 흐름 및 주요 기능 시각적 인포그래픽 안내",
              "신규 가입과 기존 가입자 로그인 동선 분리 설계",
              "반응형 디자인으로 모바일/태블릿/데스크톱 대응"
            ]
          }
        ]
      },
      {
        header: "다국어 지원",
        image: "/opt/Kkam3.webp",
        groups: [
          {
            title: "i18n 다국어 시스템",
            items: [
              "react-i18next 라이브러리 기반 4개 언어 지원 (한/영/일/중)",
              "헤더 언어 선택기로 전체 UI 텍스트 동적 실시간 전환",
              "회원가입, 로그인, 메인, 관리자 등 전 페이지 다국어 처리",
              "언어별 JSON 번역 파일 분리 관리로 유지보수 용이"
            ]
          }
        ]
      },
      {
        header: "관리자 페이지",
        image: "/opt/Kkam4.webp",
        groups: [
          {
            title: "매장 관리 대시보드",
            items: [
              "신규 가입자 및 매장 변경 요청을 실시간 알림으로 수신",
              "관리자 승인/반려 후 즉시 앱 이용 권한 부여 또는 차단",
              "승인/미승인 버튼 클릭으로 Supabase 상태값 즉시 변경",
              "가입자 현황 테이블 (이름, 매장, 가입일, 상태) 필터링 조회"
            ]
          }
        ]
      },
      {
        header: "모바일 앱",
        image: "/opt/Kkam5.webp",
        groups: [
          {
            title: "실시간 모니터링 앱",
            items: [
              "React Native 기반 크로스플랫폼 모바일 앱 (iOS/Android)",
              "CCTV 영상 실시간 스트리밍 송출 및 다중 카메라 전환",
              "AI 얼굴 인식 기반 고객 얼굴 실시간 블라인드(모자이크) 처리",
              "고객 체류 시간, 이동 동선 등 행동 데이터 분석 대시보드"
            ]
          }
        ]
      }
    ]
  }
]
