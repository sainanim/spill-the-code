import { motion } from 'framer-motion';

interface Course {
  id: string;
  name: string;
  description: string;
  category: 'ai' | 'coding' | 'robotics' | 'mathematics';
}

interface CourseModalProps {
  course: Course;
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
        onClick={handleModalClick}
      >
        {/* Course Image Placeholder */}
        <div className="w-full h-48 bg-[var(--background-secondary)] flex items-center justify-center">
          <span className="text-[var(--color-primary)] text-lg">Course Image</span>
        </div>

        {/* Course Details */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-2">{course.name}</h2>
          <p className="text-[var(--text-secondary)] mb-6">{course.description}</p>
          
          {/* Additional Course Details (Dummy Data) */}
          <div className="mb-6 space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-[var(--text-primary)]">Duration:</span>
              <span className="text-[var(--text-secondary)]">8 weeks</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-[var(--text-primary)]">Level:</span>
              <span className="text-[var(--text-secondary)]">Beginner</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-[var(--text-primary)]">Format:</span>
              <span className="text-[var(--text-secondary)]">Online / Self-paced</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-[var(--text-primary)]">Prerequisites:</span>
              <span className="text-[var(--text-secondary)]">None</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <button 
            className="w-full py-3 bg-[var(--color-accent)] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Enroll Now
          </button>
        </div>

        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CourseModal;