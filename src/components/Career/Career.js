import React from 'react';
import './Career.css';

const companyData = [
  {
    name: "신나는플랫폼",
    duration: "2년 10개월",
    period: "(2021.10 - 2024.07)",
  }
];

const careerData = [
  {
    year: "2021.10 - 2022.09",
    main: [
      "대학 NCS 프로그램 오류 수정 및 개발",
      "대학 NCS 서버 유지보수 및 개발",
      "OZ report 유지보수 및 개발",
    ],
    front: [
      "JQuery를 활용한 동국대 SSO화면 로그인 개발",
      "Nexcaro를 활용한 유한대 학생이력시스템 개발",
      "JS를 활용한 9개 대학 NCS 시스템 유지보수 및 개발",
    ],
    back: [
      "Java를 활용한 9개 대학 NCS 시스템 유지보수 및 개발",
      "Java를 활용한 동국대 SSO 및 유한대 학생이력시스템 개발",
    ],
    server: [
      "7개 대학 Linux 시스템 유지보수 및 개발",
      "사내 서버 관리",
    ],
    database: [
      "Oracle을 활용한 7개 대학 NCS 관리",
      "MySQL을 활용한 2개 대학 NCS 관리",
    ],
  },
  {
    year: "2022.10 - 2023.09",
    main: [
      "대학 NCS 프로그램 오류 수정 및 개발",
      "대학 NCS 서버 유지보수 및 개발",
      "OZ report 유지보수 및 개발",
      "신안산대 NCS 개발 및 PL 수행",
    ],
    front: [
      "Angular를 활용한 중앙대 포털 관리",
      "JS를 활용한 9개 대학 NCS 시스템 유지보수 및 개발",
      "JQuery 활용한 동국대 포털 및 미래융합교육원 SSO 유지보수 및 개발",
    ],
    back: [
      "Java를 활용한 9개 대학 NCS 시스템 유지보수 및 개발",
      "Java를 활용한 중앙대 포털 및 동국대, 미래융합교육원 SSO 유지보수 및 개발",
    ],
    server: [
      "7개 대학 Linux 시스템 유지보수 및 개발",
      "사내 서버 관리",
      "동국대 포털, SSO, 미래융합교육원 서버 복구 작업",
    ],
    database: [
      "Oracle을 활용한 7개 대학 NCS 관리",
      "MySQL을 활용한 2개 대학 NCS 관리",
    ],
  },
  {
    year: "2023.10 - 2024.07",
    main: [
      "대학 NCS 프로그램 오류 수정 및 개발",
      "대학 NCS 서버 유지보수 및 개발",
      "OZ report 유지보수 및 개발",
    ],
    front: [
      "WebSqure를 활용한 신성대 종합정보시스템 유지보수 및 개발",
      "JS를 활용한 9개 대학 NCS 시스템 유지보수 및 개발",
    ],
    back: [
      "Java를 활용한 중앙대 포털 유지보수 및 개발",
      "Spring을 활용한 신성대 종합정보시스템 유지보수 및 개발",
    ],
    server: [
      "7개 대학 Linux 시스템 유지보수 및 개발",
      "사내 사옥 이전으로 인한 회사 정보 AWS 이관 작업",
    ],
    database: [
      "Oracle을 활용한 7개 대학 NCS 관리",
      "MySQL을 활용한 2개 대학 NCS 관리",
    ],
  },
];

const Career = () => {
  return (
    <div className='wrapper ca-wp'>
    <div className='container'>
        <h2 className="title ca-tt">Career</h2>
        <div className="career-container">
        <div className="layout-wrapper">
            <div className="company-section">
            <h2>{companyData[0].name}</h2>
            <span>{companyData[0].duration}<br/>{companyData[0].period}</span>
            </div>

            <div className="career-wrapper">
            {careerData.map((career, index) => (
                <div key={index} className="career-year-section">
                    <div className="year-circle-wrapper">
                        <span className="year-circle"></span>
                    </div>
                    <h3>{career.year}</h3>
                <div className="career-details">
                    <div className="tech-row">
                    <div className="tech-section">
                    <h4>Main</h4>
                    <ul>{career.main.map((item, idx) => (<li key={idx}>{item}</li>))}</ul>
                    </div>
                    </div>
                    {/* 기술 부분: 가로 정렬 */}
                    <div className="tech-row">
                    <div className="tech-section">
                        <h4>Frontend</h4>
                        <ul>{career.front.map((item, idx) => (<li key={idx}>{item}</li>))}</ul>
                    </div>
                    <div className="tech-section">
                        <h4>Backend</h4>
                        <ul>{career.back.map((item, idx) => (<li key={idx}>{item}</li>))}</ul>
                    </div>
                    </div>

                    <div className="tech-row">
                    <div className="tech-section">
                        <h4>Server</h4>
                        <ul>{career.server.map((item, idx) => (<li key={idx}>{item}</li>))}</ul>
                    </div>
                    <div className="tech-section">
                        <h4>Database</h4>
                        <ul>{career.database.map((item, idx) => (<li key={idx}>{item}</li>))}</ul>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    </div>
    </div>
  );
};

export default Career;