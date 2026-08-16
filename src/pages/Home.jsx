import React from "react";

import Hero from "../components/site/Hero";
import About from "../components/site/About";
import Services from "../components/site/Services";
import Gallery from "../components/site/Gallery";
import Testimonials from "../components/site/Testimonials";
import Contact from "../components/site/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Gallery />
      
    </>
  );
}