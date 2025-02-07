import React, { useRef } from "react";
import useVisibilityObserver from "../../hooks/useVisibilityObserver"
import "./About.css";

const About = () => {
  const titleRef = useRef(null);
  const imageRefs = [useRef(null), useRef(null)];
  const textRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  
  const isVisible = useVisibilityObserver({
    title: titleRef,
    image0: imageRefs[0],
    image1: imageRefs[1],
    text0: textRefs[0],
    text1: textRefs[1],
    text2: textRefs[2],
    text3: textRefs[3],
    text4: textRefs[4],
    text5: textRefs[5]
  });

  return (
    <div className="wrapper">
      <div className="container ab-ct">
        <h2 ref={titleRef} className={`title ab-tt ${isVisible.title ? "slide-up-visible" : ""}`}>About Me</h2>
        <div className="about-content">
          <div
            className="image-container"
          >
            <img 
              ref={imageRefs[0]}
              className={`profile-image ${isVisible.image0 ? "slide-up-visible" : ""}`}
              src="/profile.png"
              alt="Profile" 
            />
            <p 
              ref={imageRefs[1]}
              className={`name ${isVisible.image1 ? "slide-up-visible" : ""}`}
            >
              이 재 봉 <span className="job-title">Web Developer</span>
            </p>
          </div>
          <div className="about-text">
            <p className="description slide-up-visible">
              <h3 ref={textRefs[0]} className={`${isVisible.text0 ? "slide-up-visible" : ""}`}>
                사람의 필요와 경험을 연결하는 과정에서 가치를 찾습니다.
              </h3>
              <p ref={textRefs[1]} className={`${isVisible.text1 ? "slide-up-visible" : ""}`}>
                문제를 해결할 때는 사용자의 관점에서 먼저 고민합니다.<br />
                변화하는 환경 속에서도 끊임없이 배우고 도전하는 자세를 잃지 않으려 합니다.<br />
                사람과 사람을 따뜻하게 이어주는 결과물을 만드는 것이 저의 목표입니다.
              </p>
            </p>
            <h3
              ref={textRefs[2]} 
              className={`contact-title ${isVisible.text2 ? "slide-up-visible" : ""}`}>Contact</h3>
            <p
              ref={textRefs[3]} 
              className={`email ${isVisible.text3 ? "slide-up-visible" : ""}`}
            >
              woor16645@gmail.com
            </p>
            <h3 
              ref={textRefs[4]}
              className={`archive-title ${isVisible.text4 ? "slide-up-visible" : ""}`}
            >
              GitHub
            </h3>
            <p
              ref={textRefs[5]} 
              className={`gitHub ${isVisible.text5 ? "slide-up-visible" : ""}`}
            >
              <a
                href="https://github.com/woor1668" 
                target="_blank" 
                rel="noopener noreferrer"
                className="link"
              >
                https://github.com/woor1668
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
