import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Hero.css";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const viewportHeight = window.innerHeight;
  const fadeOutPoint = 2 * viewportHeight; // 200vh

  // Hero 전체 섹션의 opacity 제어 (마지막에 사라지게 설정)
  const getHeroOpacity = () => {
    return (scrollY >= fadeOutPoint) ? 0: 1 ;// Hero가 완전히 사라지는 시점
  };

  // 각 텍스트가 나타나는 시점을 결정
  const getTextVisibility = (start) => (scrollY >= start ? 1 : 0);

  return (
    <motion.div
      className="hero-wrapper"
      style={{ opacity: getHeroOpacity() }}
    >
      {/* 중앙 고정된 텍스트 */}
      <div className="hero-container">
        <motion.div
          className="hero-box font-shadow"
          style={{ opacity: getTextVisibility(100) }}
        >
          <h1 className="hero-subtitle">Welcome to my Portfolio</h1>
        </motion.div>

        <motion.div
          className="hero-box font-b"
          style={{ opacity: getTextVisibility(400) }}
        >
          <h2 className="hero-title">사람과 사람을 연결하는 개발자</h2>
        </motion.div>

        <motion.div
          className="hero-box font-shadow"
          style={{ opacity: getTextVisibility(700) }}
        >
          <h2 className="hero-title">이재봉입니다</h2>
        </motion.div>
      </div>

      {/* 배경 동영상 */}
      <motion.div
        className="vidio-container"
        style={{ opacity: getTextVisibility(1000) }}
      >
        <video className="bg-video__content" loop autoPlay muted playsInline>
          <source src="hero/mount_small.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
