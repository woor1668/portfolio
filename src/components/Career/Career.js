import React, { useRef } from 'react';
import { careerData, companyData } from './CareerData';
import useVisibilityObserver from '../../hooks/useVisibilityObserver';
import './Career.css';

const Career = () => {
  const titleRef = useRef(null);
  const companyRefs = [useRef(null), useRef(null)];

  // 각 career 데이터에 대해 동적 ref 배열 생성
  const careerRefs = useRef(careerData.map(() => React.createRef()));

  // 각 섹션에 대한 동적 tech-section ref 배열 생성 및 초기화
  const techSectionRefs = useRef(
    careerData.map(() => ({
      main: React.createRef(),
      front: React.createRef(),
      back: React.createRef(),
      server: React.createRef(),
      database: React.createRef(),
    }))
  ).current;

  const isVisible = useVisibilityObserver({
    title: titleRef,
    company0: companyRefs[0],
    company1: companyRefs[1],
    ...careerRefs.current.reduce((acc, ref, idx) => {
      acc[`career${idx}`] = ref;
      return acc;
    }, {}),
    ...techSectionRefs.reduce((acc, refs, idx) => {
      acc[`techMain${idx}`] = refs.main;
      acc[`techFront${idx}`] = refs.front;
      acc[`techBack${idx}`] = refs.back;
      acc[`techServer${idx}`] = refs.server;
      acc[`techDatabase${idx}`] = refs.database;
      return acc;
    }, {})
  });

  return (
    <div className='wrapper ca-wp'>
      <div className='container'>
        <h2 ref={titleRef} className={`title ca-tt ${isVisible.title ? 'slide-up-visible' : ''}`}>Career</h2>
        <div className='career-container'>
          <div className='company-section'>
            <h2 ref={companyRefs[0]} className={`${isVisible.company0 ? 'slide-up-visible' : ''}`}>
              {companyData[0]?.name}
            </h2>
            <span ref={companyRefs[1]} className={`${isVisible.company1 ? 'slide-up-visible' : ''}`}>
              {companyData[0]?.duration}<br />{companyData[0]?.period}
            </span>
          </div>

          <div className='career-wrapper'>
            {careerData.map((career, index) => (
              <div key={index} className='career-year-section'>
                <div className="year-circle-wrapper">
                  <span className="year-circle"></span>
                </div>
                <h3 ref={careerRefs.current[index]} className={`year ${isVisible[`career${index}`] ? 'slide-up-visible' : ''}`}>
                  {career.year}
                </h3>
                <div className='career-details'>

                  {/* Main Section */}
                  <div className='tech-row'>
                    <div
                      ref={techSectionRefs[index].main}
                      className={`tech-section ${isVisible[`techMain${index}`] ? 'slide-up-visible' : ''}`}
                    >
                      <h4>Main</h4>
                      <ul>
                        {career.main?.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Frontend & Backend Section */}
                  <div className='tech-row'>
                    <div
                      ref={techSectionRefs[index].front}
                      className={`tech-section ${isVisible[`techFront${index}`] ? 'slide-up-visible' : ''}`}
                    >
                      <h4>Frontend</h4>
                      <ul>
                        {career.front?.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div
                      ref={techSectionRefs[index].back}
                      className={`tech-section ${isVisible[`techBack${index}`] ? 'slide-up-visible' : ''}`}
                    >
                      <h4>Backend</h4>
                      <ul>
                        {career.back?.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Server & Database Section */}
                  <div className='tech-row'>
                    <div
                      ref={techSectionRefs[index].server}
                      className={`tech-section ${isVisible[`techServer${index}`] ? 'slide-up-visible' : ''}`}
                    >
                      <h4>Server</h4>
                      <ul>
                        {career.server?.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div
                      ref={techSectionRefs[index].database}
                      className={`tech-section ${isVisible[`techDatabase${index}`] ? 'slide-up-visible' : ''}`}
                    >
                      <h4>Database</h4>
                      <ul>
                        {career.database?.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
