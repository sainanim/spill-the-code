"use client";
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/home/HeroSection';
import DescriptionSection from '../components/home/DescriptionSection';
import WhatMakesUsUniqueSection from '../components/home/WhatMakesUsUniqueSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import AboutUsSection from '../components/home/AboutUsSection';
import MeetOurTeamSection from '../components/team/MeetOurTeamSection';
import ContactUsSection from '../components/home/ContactUsSection';
import OurMotto from '@/components/home/OurMotto';
import ExperienceSection from '@/components/home/ExperienceSection';

export default function Home() {
  return (
    <>
      
      <main className="pt-2"> {/* Added padding-top to account for fixed header */}
        <HeroSection />
        <AboutUsSection id="about-us"/>
        <DescriptionSection />
        <WhatMakesUsUniqueSection />
        {/* <TestimonialsSection /> */}
        {/* <MeetOurTeamSection /> */}
        <OurMotto/>
        {/* <ExperienceSection/> */}
        <ContactUsSection id="contact-us" />
      </main>
      
    </>
  );
}