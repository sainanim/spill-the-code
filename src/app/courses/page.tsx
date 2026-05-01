"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BotIcon as Robot, Brain, Code, Calculator, X } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"


interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ isOpen, onClose, courseTitle }) => {
  const [formData, setFormData] = useState<{ name: string; email: string; message: string }>({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, course: courseTitle }), // include courseTitle here
    });

      if (res.ok) {
        alert('Thank you for your enquiry!');
        setFormData({ name: '', email: '', message: '' }); // clear form
        onClose();
      } else {
        alert('Failed to send enquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    onClick={onClose}>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl max-w-md w-full"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold">Enquire for {courseTitle}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#197602] text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            {loading ? 'Sending...' : 'Submit Enquiry'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

interface AnimatedCardProps {
  children: React.ReactNode;
}
// Define the AnimatedCard component that wraps the Card with motion and viewport detection
const AnimatedCard: React.FC<AnimatedCardProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
    >
      {children}
    </motion.div>
  )
}

// Define animation for section headers
interface AnimatedSectionHeaderProps {
  icon: React.ReactNode;
  title: string;
}

const AnimatedSectionHeader: React.FC<AnimatedSectionHeaderProps> = ({ icon, title }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      x: -30
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={headerVariants}
      className="flex items-center gap-3 mb-6"
    >
      {icon}
      <h3 className="text-2xl font-bold">{title}</h3>
    </motion.div>
  )
}

export default function CoursesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  const openModal = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setModalOpen(true);
  };

  return (
    <>
    <div className="min-h-screen bg-[#EOF2F7] px-5">
      <main className="container mx-auto py-10 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] text-center mb-12 mt-10"
        >
          Our Awesome Courses
        </motion.h2>

        {/* AI Section */}
        <section className="mb-12">
          <AnimatedSectionHeader 
            icon={<Brain className="h-8 w-8 text-[#FF9800]" />}
            title="Artificial Intelligence (AI)"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedCard>
              <CourseLevel
                title="Beginner Level: Foundations of AI"
                description="Start your AI adventure here!"
                topics={[
                  "Introduction to AI: What is AI?",
                  "Everyday examples of AI (Siri, ChatGPT, Google Search, etc.)",
                  "Introduction to data and pattern recognition",
                  "Basics of Python (variables, loops, conditions)",
                  "Build a simple chatbot using logic blocks or Python",
                ]}
                level="beginner"
                onEnroll={() => openModal("Beginner Level: Foundations of AI")}
              />
            </AnimatedCard>

            <AnimatedCard>
              <CourseLevel
                title="Intermediate Level: Machine Learning Basics"
                description="Level up your AI skills!"
                topics={[
                  "Types of Machine Learning: Supervised vs. Unsupervised",
                  "Hands-on projects with image recognition or sentiment analysis",
                  "Introduction to tools like Teachable Machine or ScratchML",
                  "Data cleaning and visualization (bar charts, line graphs)",
                  "Train a simple ML model using scikit-learn",
                ]}
                level="intermediate"
                onEnroll={() => openModal("Intermediate Level: Machine Learning Basics")}
              />
            </AnimatedCard>

            <AnimatedCard>
              <CourseLevel
                title="Advanced Level: Real-World AI Projects"
                description="Become an AI expert!"
                topics={[
                  "Neural Networks simplified",
                  "Intro to Natural Language Processing (NLP)",
                  "Create your own smart assistant or AI art generator",
                  "Ethical considerations in AI development",
                  "Capstone Project: Build and present your own AI application",
                ]}
                level="advanced"
                onEnroll={() => openModal("Advanced Level: Real-World AI Projects")}
              />
            </AnimatedCard>
          </div>
        </section>

        {/* Coding Section */}
        <section className="mb-12">
          <AnimatedSectionHeader 
            icon={<Code className="h-8 w-8 text-[#FF9800]" />}
            title="Coding"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedCard>
              <CourseLevel
                title="Beginner Level: Coding Fundamentals"
                description="Start your coding journey here!"
                topics={[
                  "Introduction to Computers and Programming",
                  "Visual Coding (Scratch or Blockly)",
                  "Basics of Python: Variables, Loops, If/Else, Functions",
                  "Build mini games like Rock-Paper-Scissors or a simple calculator",
                ]}
                level="beginner"
                onEnroll={() => openModal("Beginner Level: Coding Fundamentals")}
              />
            </AnimatedCard>

            <AnimatedCard>
              <CourseLevel
                title="Intermediate Level: Web & App Development"
                description="Create your own websites and apps!"
                topics={[
                  "HTML & CSS: Create your first webpage",
                  "JavaScript basics for interactivity",
                  "Build a personal portfolio website",
                  "Introduction to APIs and JSON",
                  "Mobile App Mockup using tools like Thunkable or Replit",
                ]}
                level="intermediate"
                onEnroll={() => openModal("Intermediate Level: Web & App Development")}
              />
            </AnimatedCard>

            <AnimatedCard>
              <CourseLevel
                title="Advanced Level: Full Projects & Logic Building"
                description="Become a coding wizard!"
                topics={[
                  "Python Modules & Libraries",
                  "Build a quiz app, simple game, or weather app",
                  "Version control (Git & GitHub basics)",
                  "Debugging techniques",
                  "Capstone Project: Build a complete game or mini web app",
                ]}
                level="advanced"
                onEnroll={() => openModal("Advanced Level: Full Projects & Logic Building")}
              />
            </AnimatedCard>
          </div>
        </section>

        {/* Robotics Section */}
        <section className="mb-12">
          <AnimatedSectionHeader 
            icon={<Robot className="h-8 w-8 text-[#FF9800]" />}
            title="Robotics"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedCard>
              <CourseLevel
                title="Beginner Level: Intro to Robotics"
                description="Start your robotics adventure here!"
                topics={[
                  "What is a robot? Hardware vs. Software",
                  "Build basic robots using Havi Kits",
                  "Intro to sensors: sound, motion, light",
                  "Block-based coding (using LEGO Spike or MakeCode)",
                ]}
                level="beginner"
                onEnroll={() => openModal("Beginner Level: Intro to Robotics")}
              />
            </AnimatedCard>

            <AnimatedCard>
              <CourseLevel
                title="Intermediate Level: Sensors & Automation"
                description="Make your robots smarter!"
                topics={[
                  "Advanced sensor programming (ultrasonic, color, gyroscope)",
                  "Conditional logic and loops in movement",
                  "Intro to Arduino and micro:bit",
                  "Simple automation: Line follower robot or obstacle avoider",
                ]}
                level="intermediate"
                onEnroll={() => openModal("Intermediate Level: Sensors & Automation")}
              />
            </AnimatedCard>

            <AnimatedCard>
              <CourseLevel
                title="Advanced Level: Mechatronics & AI + Robotics"
                description="Build amazing smart robots!"
                topics={[
                  "Robotics + AI (voice recognition, object detection)",
                  "Intro to Raspberry Pi",
                  "Mechanical design concepts: torque, balance, speed",
                  "Robotics competition simulations",
                  "Capstone Project: Design, build, and code a smart robot",
                ]}
                level="advanced"
                onEnroll={() => openModal("Advanced Level: Mechatronics & AI + Robotics")}
              />
            </AnimatedCard>
          </div>
        </section>

        {/* Math Section */}
        <section className="mb-12">
          <AnimatedSectionHeader 
            icon={<Calculator className="h-8 w-8 text-[#FF9800]" />}
            title="Mathematics"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedCard>
              <CourseLevel
                title="Beginner Level: Building Confidence in Math"
                description="Math can be fun!"
                topics={[
                  "Number operations, factors, multiples",
                  "Visual learning tools (math games, coding-based math)",
                  "Word problems and logic puzzles",
                  "Introduction to coordinates and basic geometry",
                ]}
                level="beginner"
                onEnroll={() => openModal("Beginner Level: Building Confidence in Math")}
              />
            </AnimatedCard>

            <AnimatedCard>
              <CourseLevel
                title="Intermediate Level: Algebra and Problem Solving"
                description="Level up your math skills!"
                topics={[
                  "Pre-algebra and algebra: expressions, equations",
                  "Ratios, percentages, and fractions through coding",
                  "Data analysis and graphing with Python or Excel",
                  "Geometry in motion: linking math to robotics",
                ]}
                level="intermediate"
                onEnroll={() => openModal("Intermediate Level: Algebra and Problem Solving")}
              />
            </AnimatedCard>

            <AnimatedCard>
              <CourseLevel
                title="Advanced Level: Math for Coders & Engineers"
                description="Become a math wizard!"
                topics={[
                  "Linear algebra, logic gates, and matrices",
                  "Probability and statistics through Python",
                  "Applied math for machine learning",
                  "Real-world applications: finance, engineering, computer graphics",
                  "Capstone Project: Use math to solve a real-world tech challenge",
                ]}
                level="advanced"
                onEnroll={() => openModal("Advanced Level: Math for Coders & Engineers")}
              />
            </AnimatedCard>
          </div>
        </section>
      </main>

      {/* Enrollment Modal */}
      <EnrollmentModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        courseTitle={selectedCourse} 
      />
    </div>
    </>
  )
}

interface CourseLevelProps {
  title: string
  description: string
  topics: string[]
  level: "beginner" | "intermediate" | "advanced"
  onEnroll: () => void
}

function CourseLevel({ title, description, topics, level, onEnroll }: CourseLevelProps) {
  const getBadgeColor = () => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-[#197602] hover:bg-green-100"
      case "intermediate":
        return "bg-orange-100 text-[#FF9800] hover:bg-orange-100"
      case "advanced":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100"
      default:
        return ""
    }
  }

  return (
    <Card className="bg-[#FAF9F6] border-2 border-[#FF9800] shadow-lg h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
          <Badge className={getBadgeColor()}>{level.charAt(0).toUpperCase() + level.slice(1)}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ul className="space-y-2 mb-6 flex-1">
          {topics.map((topic, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#FF9800] text-white mr-2 flex-shrink-0 text-sm">
                {index + 1}
              </span>
              <span className="text-sm md:text-base">{topic}</span>
            </li>
          ))}
        </ul>
        <motion.button 
          className="w-full py-2 px-4 bg-[#197602] text-white rounded-md hover:bg-opacity-90 transition-colors mt-auto"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onEnroll}
        >
          Enroll Now
        </motion.button>
      </CardContent>
    </Card>
  )
}