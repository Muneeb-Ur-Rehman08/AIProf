import React, { useEffect, useState } from 'react';
import Header from '../components/landingPage/header';
import Hero from '../components/landingPage/hero';
import Sponsers from '../components/landingPage/sponsers';
import Services from '../components/landingPage/services';
import About from '../components/landingPage/about';
import Pricing from '../components/landingPage/pricing';
import Testimonial from '../components/landingPage/testimonial';
import Faqs from '../components/landingPage/faqs';
import Contact from '../components/landingPage/contact';
import Footer from '../components/landingPage/footer';

const MainPage = () => {
  const [startCounter, setStartCounter] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false); // State to manage back-to-top button visibility

  const navigation = [
    { href: "#page-hero", label: "Hero" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ];

 
  const handleScroll = () => {
    const sections = navigation.map(item => item.href.slice(1));
    for (const section of sections.reverse()) {
      const element = document.getElementById(section);
      if (element && element.getBoundingClientRect().top <= 100) {
        setActiveSection(section);
        break;
      }
    }

    // Toggle back-to-top button visibility
    if (window.scrollY > 50) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };


  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <Header />
      <Hero />
      <Sponsers />
      <Services />
      <About activeSection={activeSection} setStartCounter={setStartCounter} startCounter={startCounter} />
      <Pricing />
      <Testimonial />
      <Faqs />
      <Contact />
      <Footer />
       {/* Back to Top Button */}
       <div
        className={`back-to-top  ${showBackToTop ? 'show' : ''}`}
        id="back-to-top"
        onClick={scrollToTop}
      >
        <i className="bi bi-arrow-up icon "></i>
      </div>
    </React.Fragment>
  );
};

export default MainPage;
