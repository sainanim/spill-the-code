"use client";
import HeroSection from '../components/home/HeroSection';
import DescriptionSection from '../components/home/DescriptionSection';
import WhatMakesUsUniqueSection from '../components/home/WhatMakesUsUniqueSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import AboutUsSection from '../components/home/AboutUsSection';
import NewLocationSection from '../components/home/NewLocationSection';
import MeetOurTeamSection from '../components/team/MeetOurTeamSection';
import ContactUsSection from '../components/home/ContactUsSection';
import OurMotto from '@/components/home/OurMotto';
import ExperienceSection from '@/components/home/ExperienceSection';
import ImageSlider from '@/components/home/ImageSliderProps';

export default function Home() {
  return (
    <>
      
      <main className=""> {/* Added padding-top to account for fixed header */}
        <HeroSection />
        <AboutUsSection id="about-us"/>
        <NewLocationSection id="new-location" />
        <DescriptionSection />
        <WhatMakesUsUniqueSection />
        {/* <ImageSlider/> */}
        {/* <TestimonialsSection /> */}
        <OurMotto/>
        {/* <ExperienceSection/> */}
        <ContactUsSection id="contact-us" />
      </main>
      
    </>
  );
}