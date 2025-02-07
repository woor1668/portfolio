import React, { useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Projects.css';
import { projectsData } from './ProjectsData';
import useVisibilityObserver from '../../hooks/useVisibilityObserver';

const Projects = () => {
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  const titleRef = useRef(null);
  const projectRefs = useRef(projectsData.map(() => React.createRef()));
      
  const isVisible = useVisibilityObserver({
      title: titleRef,
      ...projectRefs.current.reduce((acc, ref, idx) => {
        acc[`project${idx}`] = ref;
        return acc;
      }, {}),
  }, 0.1);

  return (
    <div className="wrapper pr-wp"> 
      <div className="container">
      <h2 ref={titleRef} className={`title pr-tt ${isVisible.title ? "slide-up-visible" : ""}`}>Projects</h2>
        {projectsData.map((project, projectIndex) => (
          <div
            key={projectIndex} 
            ref={projectRefs.current[projectIndex]}
            className={`project-section ${isVisible[`project${projectIndex}`] ? "slide-up-visible" : ""}`}
          >
            <Slider {...sliderSettings}>
              {project.slides.map((slide, slideIndex) => (
                  <div key={slideIndex} className="project-slide">
                    <div className="project-content">
                        <div className="text-content">
                        {slideIndex === 0 ? (
                            <>
                                <h3 className="project-title">{slide.title}</h3>
                                <h4>작업 기간</h4>    
                                <p className="project-p">{slide.date}</p>
                                <h4>참여 인원</h4>
                                <p className='project-p'>{slide.people}</p>
                                <h4>기술 스택</h4>
                                <div>
                                    {slide.techStack?.map((tech, idx) => (
                                        <span key={idx} className="tech-badge">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <h4>{slide.featureHeader}</h4>
                                <ul>
                                <div>
                                {slide.features?.map((feature, idx) => (
                                        <li key={idx} className="feat-badge">
                                            {feature}
                                        </li>
                                ))}
                                </div>
                                </ul>
                            </>
                          ):(
                            <>
                                <h4 className='ft-hd'>{slide.featureHeader}</h4>
                                <ul>
                                <div>
                                {slide.features?.map((feature, idx) => (
                                        <li key={idx} className="feat-badge ft-bd">
                                        {feature.startsWith("⦁") ? (
                                          <h4>{feature}</h4>
                                        ) : (
                                          feature
                                        )}
                                      </li>
                                ))}
                                 </div>
                                 </ul>
                            </>
                          )}
                        </div>
                        <div className="image-content">
                            <img
                            src={slide.image}
                            alt={`슬라이드 이미지 ${slideIndex + 1}`}
                            className="project-image"
                            />
                        </div>
                    </div>
                </div>
              ))}
            </Slider>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Projects;