export const projectsData = [
    {
      slides: [
        {
          title: "X (구 트위터) CopyCat",
          date: "2024-07-20 ~ 08-07",
          people: "1명 - 기여도 100%(설계 및 개발)",
          techStack: ["React", "TypeScript", "FireBase"],
          featureHeader: "주요 기능",
          features: [
            "⦁ 글, 이미지 업로드 기능",
            "⦁ 좋아요, 싫어요 기능",
            "⦁ 프로필 변경 기능",
            "⦁ 무한스크롤 기능"
          ],
          image: "/projects/t0.png"
        },
        {
          featureHeader: "게시 기능",
          features: [
            "⦁ 게시글 작성",
            " - 엔터 또는 저장 버튼 클릭 시 DB에 저장",
            " - useEffect로 DB 변화 감지",
            "⦁ 게시물 조회",
            " - 저장한 ID를 확인하여 Select",
          ],
          image: "/projects/t1.gif"
        },
        {
          featureHeader: "이미지 업로드 기능",
          features: [
            "⦁ 버튼 교체",
            "- useRef를 이용해 기존 파일버튼 대신 input버튼으로 UI개선",
            "⦁ 이미지 감지",
            "- 파일을 추가하면 파일을 감지하여 버튼 텍스트 수정 및 프리뷰 기능"
          ],
          image: "/projects/t2.gif"
        },
        {
          featureHeader: "좋아요/싫어요 기능",
          features: [
            "⦁ 좋아요 기능",
            "- 클릭 시 좋아요 데이터를 insert/delete 반복",
            "- 사용자ID와 게시글 좋아요/싫어요를 한 ID를 검사해 직관적으로 표현",
            "⦁ 싫어요 기능",
            "- 싫어요 기능은 데이터가 있으면 추가 동작 방지",
            "- 좋아요, 싫어요 중복 동작 방지",
          ],
          image: "/projects/t3.gif"
        },
        {
          featureHeader: "댓글 기능",
          features: [
            "⦁ 댓글 기능",
            "- 게시글마다 댓글 입력 가능",
            "- 댓글 좋아요/싫어요 가능",
            "- 댓글 저장 시 외부 게시글에서 작성된 댓글갯수 확인 가능",
            "- 댓글에도 답글 가능",
            "- 답글도 댓글과 동일한 기능 제공"
          ],
          image: "/projects/t4.gif"
        }
      ]
    },
    {
      slides: [
          {
          title: "동백학원 웹사이트 제작",
          date: "2025-01-05 ~ ing",
          people: "2명 - 기여도 100%(설계 및 개발)",
          techStack: ["React", "TypeScript", "SpringBoot", "MariaDB"],
          featureHeader: "주요 기능",
          features: [
            "⦁ 학원생 출석 기능",
            "⦁ 학원생 등록 및 수정, 삭제 기능",
            "⦁ 학원생 월별, 일별 출석 확인 기능",
            "⦁ 공통코드 관리 기능",
          ],
          image: "/projects/a0.png"
        },
        {
          featureHeader: "출석 기능",
          features: [
            "⦁ 학원생 출석",
            "- 학원생 등원 시 개인정보 입력 후 출석",
            "- 일별로 체크 해 중복 저장 방지"
          ],
          image: "/projects/a1.gif"
        },
        {
          featureHeader: "공통코드 기능",
          features: [
            "⦁ 공통 코드",
            "- 자주 사용하는 데이터들을 관리",
            "- 사용처에 따라 코드를 분류하여 관리",
            "⦁ 세부 코드",
            "- 분류된 공통코드에서 실 사용할 데이터를 관리",
            "- 공통코드 클릭 시 해당 코드에 맞는 세부코드를 렌더링"
          ],
          image: "/projects/a2.gif"
        },
        {
          featureHeader: "원생 관리 기능",
          features: [
            "⦁ 원생 관리",
            "- 원생의 정보를 입력하여 관리",
            "- 원생의 납부금, 수업 등 관리",
            "⦁ 하위 원생 관리",
            "- 원생의 동생, 친척 등 연관되어 있는 원생 관리",
            "- UID를 검사해 추가하는 원생이 자기자신 중복 추가 불가",
          ],
          image: "/projects/a3.gif"
        },
        {
          featureHeader: "출석 관리 기능",
          features: [
            "⦁ 출석 관리",
            "- 학원생 출석 기록을 관리",
            "- 동명이인 존재 시 해당 이름으로 팝업 창 열림",
            "- 월별 출석 확인",
            "- 원하는 월 클릭 시 세부 출석 확인",
          ],
          image: "/projects/a4.gif"
        }
      ]
    }, {
      slides: [
        {
          title: "말씨맑음",
          date: "2025-01-20 ~ 01-23",
          people: "3명 - 기여도 70%(설계 및 개발)",
          featureHeader: "주요 기능",
          features: [
              "⦁ 웹소켓 통신으로 실시간 통신",
              "⦁ MutationObserver를 사용한 무한스크롤 기능",
              "⦁ 검사버튼으로 비속어 검사 및 순화표현 추천 기능",
              "⦁ 비속어 입력 시 GPT봇으로 순화표현 알림 기능",
          ],
          techStack: ["React", "JavaScript", "Firebase", "mysql"],
          image: "/projects/c0.png"
        },
        {
          featureHeader: "채팅 기능",
          features: [
            "⦁ 웹소켓 기능",
            "- 웹소켓 통신으로 양방향 실시간 통신",
            "- 채팅 입력 시 서버에서 채팅 기록이 확인되면 페이지에 리턴"
          ],
          image: "/projects/c1.gif"
        },
        {
          featureHeader: "무한스크롤 기능",
          features: [
            "⦁ 무한 스크롤 기능",
            "- 페이지 로딩 시 데이터를 20개만 가져와 서버부하 최소화",
            "- 스크롤이 최상단 위치 시 새로운 데이터를 가지고 옴",
            "- MutationObserver로 새로운 데이터를 가지고 온 후 스크롤 위치를 조정",
          ],
          image: "/projects/c2.gif"
        },
        {
          featureHeader: "비속어 체크 기능",
          features: [
            "⦁ 맑씨맑음봇",
            "- 학습시킨 모델을 사용해 채팅 입력 시 비속어 검사",
            "- 비속어로 분류될 시 해당 단어를 GPT에 전달",
            "- 리턴 받은 데이터를 맑씨맑음봇이라는 네임으로 채팅",
          ],
          image: "/projects/c3.gif"
        },
        {
          featureHeader: "검사 기능",
          features: [
            "⦁ 검사 기능",
            "- 사용자가 채팅 전송 전 비속어 검사 가능",
            "- 입력창에 작성된 텍스트를 검사",
            "- 비속어로 분류 시 2가지 선택지 제공",
            "- 적용버튼 클릭 시 해당 단어로 텍스트 변경"
          ],
          image: "/projects/c4.gif"
        },
      ]
    }, {
      slides: [
        {
          title: "포트폴리오",
          date: "2025-01-31 ~ 02-02",
          people: "1명 - 기여도 100%(설계 및 개발)",
          featureHeader: "주요 기능",
          features: [
              "⦁ 자기소개 사이트",
              "⦁ 기술스택",
              "⦁ 업무 경력",
              "⦁ 프로젝트 경험",
          ],
          techStack: ["React", "JavaScript", "Firebase"],
          image: "/projects/p0.png"
        },
        {
        featureHeader: "포트폴리오",
        features: [
          "⦁ 풀페이지",
          "- 풀페이지로 만든 포트폴리오 사이트",
          "- 나의 기술, 경력, 경험을 작성"
        ],
        image: "/projects/p1.png"
      },
      ]
    }
  ];