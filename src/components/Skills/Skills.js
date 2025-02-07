import React, { useRef } from "react";
import { FaReact, FaAngular, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaGithub, FaGitlab, FaNodeJs, FaFigma, FaAws, FaJava } from "react-icons/fa";
import { SiSpringboot, SiMariadb, SiOracle, SiJenkins, SiFirebase, SiNotion, SiPython, SiDjango, SiJquery } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { DiMsqlServer } from "react-icons/di";
import useVisibilityObserver from "../../hooks/useVisibilityObserver"
import "./Skills.css";

const Skills = () => {
    const titleRef = useRef(null);
    const categoryRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null) ];
        
    const isVisible = useVisibilityObserver({
        title: titleRef,
        category0: categoryRefs[0],
        category1: categoryRefs[1],
        category2: categoryRefs[2],
        category3: categoryRefs[3],
        category4: categoryRefs[4],
        category5: categoryRefs[5],
        category6: categoryRefs[6],
        category7: categoryRefs[7],
    });

    return (
    <div className="wrapper sk-wp">
        <div className="container">
            <h2 ref={titleRef} className={`title sk-tt ${isVisible.title ? "slide-up-visible" : ""}`}>Skills</h2>
            <div className="skills-container">
                <div ref={categoryRefs[0]} className={`category big ${isVisible.category0 ? "slide-up-visible" : ""}`}>
                    <h2 className="category-title">Frontend</h2>
                    <div className="icons">
                    <FaReact title="React" color="#61DAFB"/>
                    <FaAngular title="Angular" color="#DD0031"/>
                    <SiJquery title="jQurey" color="#0769AD"/>
                    </div>
                </div>

                <div ref={categoryRefs[1]} className={`category big ${isVisible.category1 ? "slide-up-visible" : ""}`}>
                    <h2 className="category-title">Basic</h2>
                    <div className="icons">
                    <FaHtml5 title="HTML5" color="#E34F26"/>
                    <FaCss3Alt title="CSS3" color="#1572B6"/>
                    <FaJs title="JavaScript" color="#F7DF1E"/>
                    <BiLogoTypescript title="TypeScript" color="#3178C6"/>
                    </div>
                </div>

                <div ref={categoryRefs[2]} className={`category big ${isVisible.category2 ? "slide-up-visible" : ""}`}>
                    <h2 className="category-title">Backend</h2>
                    <div className="icons">
                    <FaJava title="Java" color="#007396"/>
                    <SiSpringboot title="Spring Boot" color="#6DB33F"/>
                    <FaNodeJs title="Node.js" color="#68A063"/>
                    <SiPython title="Python" color="#3776AB"/>
                    <SiDjango title="Django" color="#092E20"/>
                    </div>
                </div>

                <div ref={categoryRefs[3]} className={`category big ${isVisible.category3 ? "slide-up-visible" : ""}`}>
                    <h2 className="category-title">Database</h2>
                    <div className="icons">
                    <SiOracle title="Oracle" color="#F80000"/>
                    <SiMariadb title="MariaDB" color="#003545"/>
                    <DiMsqlServer title="MSSQL" color="#CC2927"/>
                    </div>
                </div>

                <div ref={categoryRefs[4]} className={`category ${isVisible.category4 ? "slide-up-visible" : ""}`}>
                    <h2 className="category-title">VCS</h2>
                    <div className="icons">
                    <FaGitAlt title="Git" color="#F05032"/>
                    <FaGithub title="GitHub" color="#181717"/>
                    <FaGitlab title="GitLab" color="#FC6D26"/>
                    </div>
                </div>

                <div ref={categoryRefs[5]} className={`category small ${isVisible.category5 ? "slide-up-visible" : ""}`}>
                    <h2 className="category-title">Cloud</h2>
                    <div className="icons">
                    <FaAws title="AWS" color="#FF9900"/>
                    <SiFirebase title="Firebase" color="#FFCA28"/>
                    </div>
                </div>

                <div ref={categoryRefs[6]} className={`category small ${isVisible.category6 ? "slide-up-visible" : ""}`}>
                    <h2 className="category-title">Tools</h2>
                    <div className="icons">
                    <FaFigma title="Figma" color="#F24E1E"/>
                    <SiNotion title="Notion" color="#000000"/>
                    </div>
                </div>

                <div ref={categoryRefs[7]} className={`category small ${isVisible.category7 ? "slide-up-visible" : ""}`}>
                    <h2 className="category-title">CI/CD</h2>
                    <div className="icons">
                    <SiJenkins title="Jenkins" color="#D24939"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Skills;
