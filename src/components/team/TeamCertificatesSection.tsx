"use client";
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Define TypeScript interface for certificate data
interface Certificate {
  id: number;
  title: string;
  issuedBy: string;
  issuedTo: string;
  year: string;
  imageUrl: string;
}

// Certificate data in JSON format (same as before)
const certificatesData: Certificate[] = [
    {
     id: 1,
     title: "workforce with Copilot",
     issuedBy: "Microsoft",
     issuedTo: "Monica Sainani",
     year: "2024",
     imageUrl: "/certificates/microsoft_challenge_use_case.png",
   },
   {
     id: 2,
     title: "workforce with Copilot",
     issuedBy: "Microsoft",
     issuedTo: "Monica Sainani",
     year: "2024",
     imageUrl: "/certificates/microsoft_use_case.png",
   },
   {
     id: 3,
     title: "Python",
     issuedBy: "MIT",
     issuedTo: "Mukesh S",
     year: "2021",
     imageUrl: "https://marketplace.canva.com/EAFh7cFx9So/5/0/1600w/canva-white-and-gold-certificate-of-appreciation-fE_Brsy8-8E.jpg",
   },
   {
     id: 4,
     title: "AI Ethics & Governance",
     issuedBy: "University of Toronto",
     issuedTo: "Monica Sainani",
     year: "2023",
     imageUrl: "https://marketplace.canva.com/EAFh7cFx9So/5/0/1600w/canva-white-and-gold-certificate-of-appreciation-fE_Brsy8-8E.jpg",
   },
   {
     id: 5,
     title: "Advanced Robotics Systems",
     issuedBy: "Tokyo Institute of Technology",
     issuedTo: "Mukesh S",
     year: "2022",
     imageUrl: "https://marketplace.canva.com/EAFh7cFx9So/5/0/1600w/canva-white-and-gold-certificate-of-appreciation-fE_Brsy8-8E.jpg",
   },
   {
     id: 6,
     title: "Computer Vision Mastery",
     issuedBy: "Carnegie Mellon University",
     issuedTo: "Mukesh S",
     year: "2023",
     imageUrl: "https://marketplace.canva.com/EAFh7cFx9So/5/0/1600w/canva-white-and-gold-certificate-of-appreciation-fE_Brsy8-8E.jpg",
   }
];

const TeamCertificatesSection = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animation variants for the container (staggering children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Animation variants for each card (appearing on scroll)
  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-blue-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-blue-900 text-center mb-16"
        >
          Our Team's Certifications
        </motion.h2>

        {isClient && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            // Regular Grid Layout: 1 col mobile, 2 cols tablet, 3 cols desktop
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto" // Increased gap
          >
            {certificatesData.map((certificate) => (
              // Removed the break-inside-avoid wrapper
              <CertificateCard
                key={certificate.id} // Key moved here
                certificate={certificate}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Certificate card component with Enhanced Parallax Effect
const CertificateCard = ({
  certificate,
  variants
}: {
  certificate: Certificate;
  variants: any;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // --- Enhanced Parallax Configuration ---
  const rotationRange = 18; // Increased rotation degrees
  const scaleAmount = 1.08; // Increased scale amount
  // Spring config (adjust stiffness/damping for different feel)
  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };

  // Card tilt effect
  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [`${rotationRange}deg`, `-${rotationRange}deg`]), springConfig);
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [`-${rotationRange}deg`, `${rotationRange}deg`]), springConfig);
  const scaleSpring = useSpring(1, springConfig);

  // Inner content shift (subtle counter-movement for depth)
  const innerTranslateFactor = 5; // How much inner content shifts (pixels)
  const translateXSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [`${innerTranslateFactor}px`, `-${innerTranslateFactor}px`]), springConfig);
  const translateYSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [`${innerTranslateFactor}px`, `-${innerTranslateFactor}px`]), springConfig);
  // --- End Enhanced Parallax Configuration ---


  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseXRelative = event.clientX - rect.left;
    const mouseYRelative = event.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    mouseX.set(mouseXRelative / width - 0.5);
    mouseY.set(mouseYRelative / height - 0.5);
    scaleSpring.set(scaleAmount);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scaleSpring.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants} // Scroll animation variants
      className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group bg-white" // Added bg-white here
      style={{
        perspective: '1200px', // Slightly increase perspective
        transformStyle: 'preserve-3d',
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        scale: scaleSpring,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Inner motion div for content parallax shift */}
      <motion.div
          className="h-full flex flex-col"
          style={{
              transformStyle: 'preserve-3d', // Apply to inner content too
              translateX: translateXSpring,
              translateY: translateYSpring,
          }}
      >
        {/* Certificate image container - Added aspect ratio */}
        {/* Using aspect-video (16:9). Adjust if your certs have a different common ratio e.g., aspect-[4/3] */}
        <div className="relative w-full overflow-hidden bg-gray-100 aspect-video">
          <img
            src={certificate.imageUrl}
            alt={`${certificate.title} Certificate`}
            // Fill the container, allow cropping if needed for uniform size with object-cover
            // Or use object-contain if showing the whole image is more important than filling the box
            className="w-full h-full object-contain transition-transform duration-500 group-hover:opacity-90"
             // Keep 3d transform for potential future effects on image itself
            style={{ transform: 'translateZ(20px)' }} // Pull image slightly forward
          />
          {/* Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/50 to-transparent">
             <h3 className="text-white font-semibold text-lg truncate" title={certificate.title}>{certificate.title}</h3>
             <p className="text-gray-200 text-sm">Issued to: {certificate.issuedTo}</p>
          </div>
        </div>

        {/* Certificate details */}
        <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-br from-white to-blue-50">
          <div>
            <p className="text-blue-800 font-medium mb-1">
              {certificate.issuedBy}
            </p>
            <p className="text-gray-600 text-sm">
              Year: {certificate.year}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeamCertificatesSection;