import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BotIcon as Robot, Brain, Code, Calculator } from "lucide-react"

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#EOF2F7]">
      <header className="bg-[#FAF9F6] py-6 px-4 md:px-6 border-b">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Spill The Code Academy</h1>
          <p className="text-center mt-2 text-lg">Learn, Create, and Have Fun!</p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Awesome Courses</h2>

        {/* AI Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="h-8 w-8 text-[#FF9800]" />
            <h3 className="text-2xl font-bold">Artificial Intelligence (AI)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            />

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
            />

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
            />
          </div>
        </section>

        {/* Coding Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Code className="h-8 w-8 text-[#FF9800]" />
            <h3 className="text-2xl font-bold">Coding</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            />

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
            />

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
            />
          </div>
        </section>

        {/* Robotics Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Robot className="h-8 w-8 text-[#FF9800]" />
            <h3 className="text-2xl font-bold">Robotics</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            />

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
            />

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
            />
          </div>
        </section>

        {/* Math Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="h-8 w-8 text-[#FF9800]" />
            <h3 className="text-2xl font-bold">Mathematics</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            />

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
            />

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
            />
          </div>
        </section>
      </main>

      <footer className="bg-[#FAF9F6] py-6 px-4 border-t">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2023 Spill The Code Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

interface CourseLevelProps {
  title: string
  description: string
  topics: string[]
  level: "beginner" | "intermediate" | "advanced"
}

function CourseLevel({ title, description, topics, level }: CourseLevelProps) {
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
        <button className="w-full py-2 px-4 bg-[#197602] text-white rounded-md hover:bg-opacity-90 transition-colors mt-auto">
          Enroll Now
        </button>
      </CardContent>
    </Card>
  )
}