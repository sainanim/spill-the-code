"use client";
import MeetOurTeamSection from '@/components/team/MeetOurTeamSection';
import TeamCertificatesSection from '@/components/team/TeamCertificatesSection';


export default function Home() {
  return (
    <>
      <main className="pt-2 bg-white">
        <MeetOurTeamSection />
        <TeamCertificatesSection />
      </main>
      
    </>
  );
}