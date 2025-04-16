"use client";
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/home/HeroSection';
import DescriptionSection from '../components/home/DescriptionSection';
import WhatMakesUsUniqueSection from '../components/home/WhatMakesUsUniqueSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import AboutUsSection from '../components/home/AboutUsSection';
import MeetOurCEOSection from '../components/home/MeetOurCEOSection';
import ContactUsSection from '../components/home/ContactUsSection';

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-2"> {/* Added padding-top to account for fixed header */}
        <HeroSection />
        <DescriptionSection id="about-us" />
        <WhatMakesUsUniqueSection />
        <TestimonialsSection />
        <AboutUsSection />
        <MeetOurCEOSection />
        <ContactUsSection id="contact-us" />
      </main>
      <Footer />
    </>
  );
}