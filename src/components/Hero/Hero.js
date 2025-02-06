import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./Hero.css";

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [textCompleted, setTextCompleted] = useState(false);
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.4, duration: 0.8 },
    }),
  };

  return (
    <div className={`hero-wrapper ${textCompleted ? "video-visible" : ""}`} ref={ref}>
      <div className="vidio-container">
        <video 
          className="bg-video__content" 
          loop autoPlay muted playsInline 
          onCanPlay={handleVideoLoad}>
          <source src="hero/mount_small.mp4" type="video/mp4" />
        </video>
      </div>

      <motion.div
        className="hero-container"
        initial="hidden"
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
        }}
        onAnimationComplete={() => setTextCompleted(true)}
      >
        <motion.div className="hero-box">
          <motion.div className="hero-subtitle" custom={0} variants={variants}>
            Welcome to my Portfolio
          </motion.div>
          <motion.div className="hero-title font-b" custom={1} variants={variants}>
            사람과 사람을 연결하는 개발자
          </motion.div>
          <motion.div className="hero-title" custom={2} variants={variants}>
            이재봉입니다
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
