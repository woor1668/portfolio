import React, { useEffect, useState, useCallback } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Career from "./components/Career/Career";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App = () => {
  const [showOpacity, setShowOpacity] = useState(0);

  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    if (window.scrollY === 0) {
      html.style.scrollBehavior = "smooth";
    }
  }, []);

  const handleScroll = useCallback(() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection && window.scrollY >= aboutSection.offsetTop - 900) {
      setShowOpacity(1);
    } else {
      setShowOpacity(0);
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Navbar />
      <div className="app-container">
        <section id="hero" className="hero-section"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="career"><Career /></section>
        <section id="projects"><Projects /></section>
      </div>
      <Footer />

      <button className="scroll-to-top" onClick={scrollToTop} style={{ opacity: showOpacity }}>
        <AiOutlineArrowUp size={28} />
      </button>
    </div>
  );
};

export default App;
