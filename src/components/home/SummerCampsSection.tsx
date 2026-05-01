"use client";

interface SummerCampsSectionProps {
  id?: string;
}

const SummerCampsSection: React.FC<SummerCampsSectionProps> = ({ id }) => {
  return (
    <section id={id} className="py-16 bg-white min-h-[400px]">
    </section>
  );
};

export default SummerCampsSection;
