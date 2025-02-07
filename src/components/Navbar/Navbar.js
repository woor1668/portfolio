import React, { useState } from "react";
import "./Navbar.css";
import { HiMenu } from "react-icons/hi";  // 햄버거 아이콘
import { AiOutlineClose } from "react-icons/ai";  // 닫기 아이콘

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0); 
  };

  return (
    <nav className="navbar">
      <div className="navi-container">
        <div className="navbar-logo" onClick={scrollToTop}>JB WORKS</div>

        {/* 햄버거 버튼 */}
        <div className="hamburger-icon" onClick={toggleMenu}>
          {menuOpen ? <AiOutlineClose size={30} /> : <HiMenu size={30} />}
        </div>

        {/* 네비게이션 메뉴 */}
        <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <li><a href="#about" onClick={toggleMenu}>About Me</a></li>
          <li><a href="#skills" onClick={toggleMenu}>Skills</a></li>
          <li><a href="#career" onClick={toggleMenu}>Career</a></li>
          <li><a href="#projects" onClick={toggleMenu}>Projects</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
