import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="wrapper ab-wp">
      <div className="container">
        <h2 className="title">About Me</h2>
        <div className="about-content">
          <div className="image-container">
            <img src="/profile.png" alt="Profile" className="profile-image" /> 
            <p className="name">
              이 재 봉 <span className="job-title">Web Developer</span>
            </p>
          </div>
          <div className="about-text">
            <p className="description">
              <h3 className="">사람의 필요와 경험을 연결하는 과정에서 가치를 찾습니다.</h3>
              문제를 해결할 때는 사용자의 관점에서 먼저 고민합니다.<br/>
              변화하는 환경 속에서도 끊임없이 배우고 도전하는 자세를 잃지 않으려 합니다.<br/>
              사람과 사람을 따뜻하게 이어주는 결과물을 만드는 것이 저의 목표입니다.
            </p>
            <h3 className="contact-title">Contact</h3>
            <p className="email">woor16645@gmail.com</p>
            <h3 className="archive-title">GitHub</h3>
              <a href="https://github.com/woor1668" className="gitHub" target="_blank" rel="noopener noreferrer"> https://github.com/woor1668</a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
