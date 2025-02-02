import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";  // 아이콘 추가
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Career from "./components/Career/Career";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      if (heroSection && window.scrollY >= heroSection.offsetHeight) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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

      {showScrollButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <AiOutlineArrowUp size={28} />
        </button>
      )}
    </div>
  );
};

export default App;
