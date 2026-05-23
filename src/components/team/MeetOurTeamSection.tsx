"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Define TypeScript interface for team member data
interface TeamMember {
  id: number;
  name: string;
  imageUrl: string;
  points: string[];
  quote: string;
}

// Team data in JSON format
const teamData: TeamMember[] = [
  {
    id: 1,
    name: "Monica Sainani",
    imageUrl: "/team/Monica.jpeg",
    points: [
      "Monica is a graduate from the University of Toronto with degrees in Computer Science and Cognitive Science, with experience at tech companies like Cisco Systems.",
      "She's an advocate for learning that's personalized, meaningful, and accessible to all, having started coding young and found confidence through technology.",
      "Her leadership style is rooted in empathy, clarity, and a deep love for teaching. She remains hands-on with students and deeply involved in shaping the curriculum.",
      "Under her leadership, the Academy of Intelligent Minds has grown from a small after-school program to a comprehensive educational institution serving students across multiple age groups."
    ],
    quote: "\"I believe that technology education should be accessible, engaging, and future-focused. Our goal is to empower every student to become not just users of technology, but creators and innovators.\""
  },
  {
    id: 2,
    name: "Mukesh S",
    imageUrl: "/team/Mukesh.jpeg",
    points: [
      "With over 15 years of experience in the field, he has led multiple research teams developing cutting-edge robotic applications for industry and education.",
      "He brings a wealth of practical knowledge in hardware integration, sensors, and embedded systems that complements our software-focused curriculum.",
      "Mukesh is passionate about making robotics accessible to students of all ages and backgrounds, believing that hands-on experience is the key to understanding complex systems."
    ],
    quote: "\"Robotics is where theory meets practice. I'm committed to helping students build the skills to design, program, and innovate with technology that moves and interacts with the real world.\""
  }
];

const MeetOurTeamSection = () => {
  // Create state for client-side rendering to avoid hydration errors
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Text animation variants
  const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const textItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-8 bg-white mt-12">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] text-center mb-16"
        >
          Meet Our Team
        </motion.h2>
        
        {isClient && teamData.map((member, index) => (
          <div 
            key={member.id}
            className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto mb-20"
          >
            {/* Mobile layout: always photo first, then info */}
            <div className="flex flex-col w-full lg:hidden">
              <TeamMemberImage index={index} />
              <div className="mt-8">
                <TeamMemberContent member={member} index={index} />
              </div>
            </div>
            
            {/* Desktop layout: alternating */}
            <div className="hidden lg:flex lg:flex-row w-full">
              {index % 2 === 0 ? (
                <>
                  {/* Image on left for even indexes (0, 2, etc.) */}
                  <TeamMemberImage index={index} />
                  {/* Content on right */}
                  <TeamMemberContent member={member} index={index} />
                </>
              ) : (
                <>
                  {/* Content on left for odd indexes (1, 3, etc.) */}
                  <TeamMemberContent member={member} index={index} />
                  {/* Image on right */}
                  <TeamMemberImage index={index} />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Component for team member image
const TeamMemberImage = ({ index }: { index: number }) => {
  const member = teamData[index];
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      className="lg:w-1/3 flex justify-center"
    >
      {/* Team member photo with enhanced styling */}
      <div className="w-64 h-64 rounded-full overflow-hidden shadow-lg relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-[var(--color-primary)] transition-transform duration-300 hover:scale-105">
          <img 
            src={member.imageUrl} 
            alt={`${member.name} photo`}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Component for team member content
const TeamMemberContent = ({ member, index }: { member: TeamMember; index: number }) => {
  const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const textItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div 
      variants={textContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="lg:w-2/3 bg-gradient-to-r from-white to-blue-50 p-8 rounded-lg shadow-md"
    >
      <motion.h3 
        variants={textItem}
        className="text-2xl font-semibold text-[var(--color-primary)] mb-6"
      >
        {member.name}
      </motion.h3>
      
      <motion.div variants={textItem} className="space-y-4">
        {member.points.map((point, pointIndex) => (
          <div key={pointIndex} className="flex items-start mb-4">
            <span className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full w-6 h-6 mr-3 mt-1 flex-shrink-0">•</span>
            <p className="text-[var(--text-primary)] leading-relaxed">
              {point}
            </p>
          </div>
        ))}
      </motion.div>
      
      <motion.div 
        variants={textItem}
        className="mt-6 pt-6 border-t border-blue-100"
      >
        <blockquote className="italic text-[var(--text-primary)] text-lg">
          {member.quote}
        </blockquote>
      </motion.div>
    </motion.div>
  );
};

export default MeetOurTeamSection;