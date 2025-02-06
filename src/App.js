import React, { useEffect, useState } from "react";
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
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection && window.scrollY >= aboutSection.offsetTop - 900) {
        setShowOpacity(1);
      } else {
        setShowOpacity(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section:not(#hero)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01 }
    );

    sections.forEach((section) => {
      section.classList.add("section-hidden");  // 초기에 숨기기
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Navbar />
      <div className="app-container">
        <section id="hero"><Hero /></section>
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
