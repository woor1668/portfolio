import React, { useRef, useState, useCallback } from 'react';
import './Projects.css';
import { projectsData } from './ProjectsData';
import useVisibilityObserver from '../../hooks/useVisibilityObserver';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SlideContent = ({ slide, slideIndex }) => {
  if (slideIndex === 0) {
    return (
      <>
        <h3 className="project-title">{slide.title}</h3>
        <h4>작업 기간</h4>    
        <p className="project-p">{slide.date}</p>
        <h4>참여 인원</h4>
        <p className="project-p">{slide.people}</p>
        <h4>기술 스택</h4>
        <div>
          {slide.techStack?.map((tech, idx) => (
            <span key={idx} className="tech-badge">{tech}</span>
          ))}
        </div>
        <h4>{slide.featureHeader}</h4>
        <ul>
          {slide.features?.map((feature, idx) => (
            <li key={idx} className="feat-summary">{feature.replace("⦁ ", "")}</li>
          ))}
        </ul>
      </>
    );
  }
  return (
    <>
      <h4 className="ft-hd">{slide.featureHeader}</h4>
      <ul>
        {slide.features?.map((feature, idx) => {
          if (feature.startsWith("⦁")) {
            return <li key={idx} className="feat-header">{feature.replace("⦁ ", "")}</li>;
          }
          return <li key={idx} className="feat-detail">{feature.replace("- ", "")}</li>;
        })}
      </ul>
    </>
  );
};

const ProjectCard = ({ project, isActive, onNextProject, onPrevProject }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const totalSlides = project.slides.length;
  const dragStartX = useRef(null);

  const goToSlide = (idx) => {
    if (idx < 0 || idx >= totalSlides) return;
    setSlideIndex(idx);
  };

  const handlePointerDown = (e) => {
    dragStartX.current = e.clientX;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    // 끝에서는 저항감 (offset을 절반만)
    if ((slideIndex === 0 && diff > 0) || (slideIndex === totalSlides - 1 && diff < 0)) {
      setDragOffset(diff * 0.3);
    } else {
      setDragOffset(diff);
    }
  };

  const handlePointerUp = () => {
    if (dragStartX.current === null) return;
    const threshold = 60;
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset < 0) {
        // 왼쪽으로 스와이프 → 다음
        if (slideIndex < totalSlides - 1) {
          setSlideIndex(slideIndex + 1);
        } else if (onNextProject) {
          onNextProject();
        }
      } else {
        // 오른쪽으로 스와이프 → 이전
        if (slideIndex > 0) {
          setSlideIndex(slideIndex - 1);
        } else if (onPrevProject) {
          onPrevProject();
        }
      }
    }
    
    setDragOffset(0);
    setIsDragging(false);
    dragStartX.current = null;
  };

  const trackStyle = {
    transform: `translateX(calc(-${slideIndex * 100}% + ${dragOffset}px))`,
    transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <div className={`project-layer ${isActive ? 'project-layer--active' : ''}`}>
      <div 
        className="slide-track"
        style={trackStyle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {project.slides.map((slide, idx) => (
          <div className="slide-item" key={idx}>
            <div className="project-content">
              <div className="text-content">
                <SlideContent slide={slide} slideIndex={idx} />
              </div>
              <div className="image-content">
                <img
                  src={slide.image}
                  alt={`슬라이드 ${idx + 1}`}
                  className="project-image"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalSlides > 1 && (
        <div className="slide-nav">
          <button 
            className={`slide-arrow ${slideIndex === 0 ? 'slide-arrow--disabled' : ''}`}
            onClick={() => goToSlide(slideIndex - 1)}
          >
            <FaChevronLeft />
          </button>
          <div className="slide-dots">
            {project.slides.map((_, idx) => (
              <button
                key={idx}
                className={`slide-dot ${slideIndex === idx ? 'slide-dot--active' : ''}`}
                onClick={() => goToSlide(idx)}
              />
            ))}
          </div>
          <button 
            className={`slide-arrow ${slideIndex === totalSlides - 1 ? 'slide-arrow--disabled' : ''}`}
            onClick={() => goToSlide(slideIndex + 1)}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const tabsRef = useRef(null);

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const isVisible = useVisibilityObserver({
    title: titleRef,
    content: contentRef,
  }, 0.1);

  const changeProject = useCallback((idx) => {
    if (idx < 0 || idx >= projectsData.length || idx === activeProject) return;
    setActiveProject(idx);

    if (tabsRef.current?.children[idx]) {
      tabsRef.current.children[idx].scrollIntoView({ 
        behavior: 'smooth', inline: 'center', block: 'nearest' 
      });
    }
  }, [activeProject]);

  return (
    <div className="wrapper pr-wp"> 
      <div className="container">
        <h2 ref={titleRef} className={`title pr-tt ${isVisible.title ? "slide-up-visible" : ""}`}>Projects</h2>
        <div className="project-container">
            <div className={`project-nav ${isVisible.title ? "slide-up-visible" : ""}`}>
              <button
                className={`project-nav-arrow ${activeProject === 0 ? 'project-nav-arrow--disabled' : ''}`}
                onClick={() => changeProject(activeProject - 1)}
                disabled={activeProject === 0}
              >
                <FaChevronLeft />
              </button>

              <div className="project-tabs-scroll" ref={tabsRef}>
                {projectsData.map((project, idx) => (
                  <button
                    key={idx}
                    className={`project-tab ${activeProject === idx ? 'project-tab--active' : ''}`}
                    onClick={() => changeProject(idx)}
                  >
                    <span className="project-tab-number">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="project-tab-name">{project.slides[0].title}</span>
                  </button>
                ))}
              </div>

              <button
                className={`project-nav-arrow ${activeProject === projectsData.length - 1 ? 'project-nav-arrow--disabled' : ''}`}
                onClick={() => changeProject(activeProject + 1)}
                disabled={activeProject === projectsData.length - 1}
              >
                <FaChevronRight />
              </button>
            </div>

            <div className={`project-counter ${isVisible.title ? "slide-up-visible" : ""}`}>
              <span className="project-counter-current">{String(activeProject + 1).padStart(2, '0')}</span>
              <span className="project-counter-sep">/</span>
              <span className="project-counter-total">{String(projectsData.length).padStart(2, '0')}</span>
            </div>

            <div
              ref={contentRef}
              className={`project-section ${isVisible.content ? "slide-up-visible" : ""}`}
            >
              {projectsData.map((project, idx) => (
                <ProjectCard
                  key={idx}
                  project={project}
                  isActive={activeProject === idx}
                  onNextProject={() => changeProject(activeProject + 1)}
                  onPrevProject={() => changeProject(activeProject - 1)}
                />
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};

export default Projects;
