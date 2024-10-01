import React from 'react';
import Header from '../components/header';
import Hero from '../components/hero';
import Sponsers from '../components/sponsers';
import Services from '../components/services';
import About from '../components/about';
import Pricing from '../components/pricing';
import Testimonial from '../components/testimonial';
import Faqs from '../components/faqs';
import Contact from '../components/contact';
import Footer from '../components/footer';
const MainPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Hero />
      <Sponsers />
      <Services />
      <About />
      <Pricing />
      <Testimonial />
      <Faqs />
      <Contact />
      <Footer />
    </React.Fragment>
  );
};

export default MainPage;
