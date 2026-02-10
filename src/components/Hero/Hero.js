import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { FaAngleDoubleDown } from "react-icons/fa";
import "./Hero.css";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      if (y > 50 && !hasScrolled) setHasScrolled(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  // 유성 생성기 — 스크롤 시작 후 랜덤 간격으로 계속 생성
  const spawnMeteor = useCallback(() => {
    const id = Date.now() + Math.random();
    const meteor = {
      id,
      right: Math.random() * 70 + 5,
      top: Math.random() * 35 + 2,
      duration: Math.random() * 0.8 + 1.0,
      size: Math.random() * 2 + 2,
      tailLen: Math.random() * 80 + 60,
    };
    setMeteors(prev => [...prev, meteor]);
    // 끝나면 제거
    setTimeout(() => {
      setMeteors(prev => prev.filter(m => m.id !== id));
    }, meteor.duration * 1000 + 200);
  }, []);

  useEffect(() => {
    if (!hasScrolled) return;

    // 처음 스크롤 시 2~3개 즉시 발사
    for (let i = 0; i < 3; i++) {
      setTimeout(() => spawnMeteor(), i * 400);
    }

    // 이후 1~4초 간격으로 계속 생성
    const spawn = () => {
      spawnMeteor();
      const next = Math.random() * 3000 + 1000;
      timeoutRef = setTimeout(spawn, next);
    };
    let timeoutRef = setTimeout(spawn, 2000);

    return () => clearTimeout(timeoutRef);
  }, [hasScrolled, spawnMeteor]);

  const viewportHeight = window.innerHeight;
  const fadeOutPoint = 2 * viewportHeight;

  const getHeroOpacity = () => (scrollY >= fadeOutPoint ? 0 : 1);
  const getTextVisibility = (start) => (scrollY >= start ? 1 : 0);

  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6,
    })), []);

  return (
    <motion.div
      className="hero-wrapper"
      style={{ opacity: getHeroOpacity() }}
    >
      <div className="hero-bg">
        <div className="hero-bg-gradient" />
        <div className="hero-stars" />
        <div className="hero-stars hero-stars--layer2" />

        {/* 유성들 — 동적 생성/제거 */}
        {meteors.map((m) => (
          <div
            key={m.id}
            className="shooting-star"
            style={{
              right: `${m.right}%`,
              top: `${m.top}%`,
              '--meteor-duration': `${m.duration}s`,
              '--meteor-tail': `${m.tailLen}px`,
              width: `${m.size}px`,
              height: `${m.size}px`,
            }}
          />
        ))}

        <div className="hero-aurora" />
        <div className="hero-aurora hero-aurora--2" />

        <div className="hero-mountain hero-mountain--back" />
        <div className="hero-mountain hero-mountain--mid" />
        <div className="hero-mountain hero-mountain--front" />

        <div className="hero-fog" />
        <div className="hero-fog hero-fog--2" />

        <div className="hero-particles">
          {particles.map((p) => (
            <span
              key={p.id}
              className="hero-particle"
              style={{
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="hero-container">
        <motion.div
          className="hero-box font-shadow"
          style={{ opacity: getTextVisibility(100) }}
        >
          <h1 className="hero-subtitle">Welcome to my Portfolio</h1>
        </motion.div>

        <motion.div
          className="hero-box font-highlight"
          style={{ opacity: getTextVisibility(400) }}
        >
          <h2 className="hero-title">사람과 사람을 연결하는 개발자</h2>
        </motion.div>

        <motion.div
          className="hero-box font-shadow"
          style={{ opacity: getTextVisibility(700) }}
        >
          <h2 className="hero-title hero-name">이재봉입니다</h2>
        </motion.div>
      </div>

      <div
        className="scroll-down-indicator"
        style={{ opacity: scrollY < 100 ? 1 : 0 }}
      >
        <div className="mouse">
          <div className="scroll"></div>
        </div>
        <FaAngleDoubleDown />
      </div>
    </motion.div>
  );
};

export default Hero;
