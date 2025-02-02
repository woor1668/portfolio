import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./Hero.css";

const Hero = () => {
  const sectionRef = useRef(null);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.3 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="hero-wrapper" ref={sectionRef}>
      <div className="vidio-container">
        <video class="bg-video__content" loop autoPlay muted playsInline>
          <source src="hero/mount.mp4" type="video/mp4" />
        </video>
      </div>

        <motion.div
          className="hero-container"
          initial="hidden"
          animate="visible"
          variants={variants}
          >
          <div className="hero-box">
            <motion.div className="hero-subtitle" variants={childVariants}>
              Welcome to my Portfolio
            </motion.div>
            <motion.div className="hero-title font-b" variants={childVariants}>
              사람과 사람을 연결하는 개발자
            </motion.div>
            <motion.div className="hero-title" variants={childVariants}>
              이재봉입니다
            </motion.div>
          </div>
        </motion.div>
    </div>
  );
};

export default Hero;
