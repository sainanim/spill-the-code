"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MeetOurCEOSection from '@/components/home/MeetOurCEOSection';


export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-2"> {/* Added padding-top to account for fixed header */}
        <MeetOurCEOSection />
      </main>
      <Footer />
    </>
  );
}