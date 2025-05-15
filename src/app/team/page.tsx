"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MeetOurTeamSection from '@/components/team/MeetOurTeamSection';
import TeamCertificatesSection from '@/components/team/TeamCertificatesSection';


export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-2"> {/* Added padding-top to account for fixed header */}
        <MeetOurTeamSection />
        <TeamCertificatesSection />
      </main>
      
    </>
  );
}