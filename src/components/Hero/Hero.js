import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import "./Hero.css";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [meteors, setMeteors] = useState([]);
  const viewportHeight = useRef(window.innerHeight);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrollY(y);
        if (y > 50 && !hasScrolled) setHasScrolled(true);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

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
    setTimeout(() => {
      setMeteors(prev => prev.filter(m => m.id !== id));
    }, meteor.duration * 1000 + 200);
  }, []);

  useEffect(() => {
    if (!hasScrolled) return;

    for (let i = 0; i < 3; i++) {
      setTimeout(() => spawnMeteor(), i * 400);
    }

    let timeoutRef;
    const spawn = () => {
      spawnMeteor();
      const next = Math.random() * 3000 + 1000;
      timeoutRef = setTimeout(spawn, next);
    };
    timeoutRef = setTimeout(spawn, 2000);

    return () => clearTimeout(timeoutRef);
  }, [hasScrolled, spawnMeteor]);

  const vh = viewportHeight.current;
  // About 섹션이 화면에 진입하기 전부터 fadeOut
  const aboutEl = document.getElementById('about');
  let heroOpacity = 1;
  if (aboutEl) {
    const aboutTop = aboutEl.getBoundingClientRect().top;
    const fadeStart = vh * 1.2;  // 화면 밖(120%) — 더 일찍 시작
    const fadeEnd = vh * 0.5;    // 화면 50%에서 완전히 사라짐
    if (aboutTop < fadeStart) {
      heroOpacity = Math.max(0, (aboutTop - fadeEnd) / (fadeStart - fadeEnd));
    }
  }
  const getTextVis = (start) => (scrollY >= start ? 1 : 0);

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
    <div className="hero-wrapper">
      {/* sticky 뷰포트 — hero-wrapper 안에서만 화면에 고정 */}
      <div className="hero-viewport" style={{
        opacity: heroOpacity,
        visibility: heroOpacity > 0 ? 'visible' : 'hidden',
      }}>
        <div className="hero-bg">
          <div className="hero-bg-gradient" />
          <div className="hero-stars" />
          <div className="hero-stars hero-stars--layer2" />

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
          <div className="hero-box font-shadow" style={{ opacity: getTextVis(100) }}>
            <h1 className="hero-subtitle">Welcome to my Portfolio</h1>
          </div>
          <div className="hero-box font-highlight" style={{ opacity: getTextVis(400) }}>
            <h2 className="hero-title">사람과 사람을 연결하는 개발자</h2>
          </div>
          <div className="hero-box font-shadow" style={{ opacity: getTextVis(700) }}>
            <h2 className="hero-title hero-name">이재봉입니다</h2>
          </div>
        </div>

        <div className="scroll-down-indicator" style={{ opacity: scrollY < 100 ? 1 : 0 }}>
          <div className="mouse">
            <div className="scroll"></div>
          </div>
          <FaAngleDoubleDown />
        </div>
      </div>
    </div>
  );
};

export default Hero;
