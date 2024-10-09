import React, { useState, useEffect } from 'react';
import headerLogo from '../../../assets/images/logo/logo.svg';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const scrollHeader = () => {
    // Update sticky header
    setIsSticky(window.scrollY >= 50);

    // Update active link based on scroll position
    const sections = document.querySelectorAll("section"); // Adjust this selector based on your layout
    let current = "";

    // Check if at the top of the page
    if (window.scrollY == 0) {
        current =  'page-hero'; // Set active link to home
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 50; // Adjust for header height
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });
    }

    setActiveLink(current);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);
    return () => window.removeEventListener("scroll", scrollHeader);
  }, []);

  return (
    <header className={`header-basic ${isSticky ? 'is-sticky' : ''} `} id="page-header">
      <div className="container">
        <nav className="menu-navbar" id="main-nav">
          <div className="header-logo">
            <a className="logo-link" href="#page-hero">
              <img className="logo-img light-logo" loading="lazy" src={`${headerLogo}`} alt="logo" />
            </a>
          </div>
          <div className="links menu-wrapper">
            <ul className="list-js links-list">
              <li className="nav-item menu-item has-sub-menu">
                <a className={`nav-link menu-link ${activeLink === 'page-hero' ? 'active' : ''}`} href="#page-hero">home</a>
              </li>
              <li className="nav-item menu-item">
                <a className={`nav-link menu-link ${activeLink === 'services' ? 'active' : ''}`} href="#services">services</a>
              </li>
              <li className="nav-item menu-item">
                <a className={`nav-link menu-link ${activeLink === 'about' ? 'active' : ''}`} href="#about">about</a>
              </li>
              <li className="nav-item menu-item">
                <a className={`nav-link menu-link ${activeLink === 'pricing' ? 'active' : ''}`} href="#pricing">pricing</a>
              </li>
              <li className="nav-item menu-item">
                <a className={`nav-link menu-link`} href="https://meetyourai.github.io/AIProf/blog/BlogIndex">Blog</a>
              </li>
              <li className="nav-item menu-item">
                <a className={`nav-link menu-link ${activeLink === 'faq' ? 'active' : ''}`} href="#faq">FAQ</a>
              </li>
              <li className="nav-item menu-item">
                <a className={`nav-link menu-link ${activeLink === 'contact-us' ? 'active' : ''}`} href="#contact-us">contact us</a>
              </li>
            </ul>
          </div>
          <div className="controls-box">
            <div className="control menu-toggler"><span></span><span></span><span></span></div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
