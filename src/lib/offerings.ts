interface OfferingBase {
  id: string;
  title: string;
  shortLabel: string;
  priceCents: number;
  isPlaceholderPrice: boolean;
}

export interface CourseOffering extends OfferingBase {
  category: "course";
  subject: "ai" | "coding" | "robotics" | "math";
  level: "beginner" | "intermediate" | "advanced";
}

export interface CampOffering extends OfferingBase {
  category: "camp";
  plan:
    | "hourly"
    | "daily"
    | "weekly-halfday"
    | "weekly-fullday"
    | "monthly-halfday"
    | "monthly-fullday";
  unit?: string;
}

export type Offering = CourseOffering | CampOffering;

const LEVEL_PLACEHOLDER_PRICE_CENTS: Record<CourseOffering["level"], number> = {
  beginner: 2500,
  intermediate: 2500,
  advanced: 2500,
};

const LEVEL_LABEL: Record<CourseOffering["level"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

function courseOffering(
  subject: CourseOffering["subject"],
  subjectLabel: string,
  level: CourseOffering["level"],
  title: string
): CourseOffering {
  return {
    id: `course-${subject}-${level}`,
    category: "course",
    subject,
    level,
    title,
    shortLabel: `${subjectLabel} · ${LEVEL_LABEL[level]}`,
    priceCents: LEVEL_PLACEHOLDER_PRICE_CENTS[level],
    isPlaceholderPrice: true,
  };
}

export const COURSE_OFFERINGS: CourseOffering[] = [
  courseOffering("ai", "AI", "beginner", "Beginner Level: Foundations of AI"),
  courseOffering("ai", "AI", "intermediate", "Intermediate Level: Machine Learning Basics"),
  courseOffering("ai", "AI", "advanced", "Advanced Level: Real-World AI Projects"),

  courseOffering("coding", "Coding", "beginner", "Beginner Level: Coding Fundamentals"),
  courseOffering("coding", "Coding", "intermediate", "Intermediate Level: Web & App Development"),
  courseOffering("coding", "Coding", "advanced", "Advanced Level: Full Projects & Logic Building"),

  courseOffering("robotics", "Robotics", "beginner", "Beginner Level: Intro to Robotics"),
  courseOffering("robotics", "Robotics", "intermediate", "Intermediate Level: Sensors & Automation"),
  courseOffering("robotics", "Robotics", "advanced", "Advanced Level: Mechatronics & AI + Robotics"),

  courseOffering("math", "Mathematics", "beginner", "Beginner Level: Building Confidence in Math"),
  courseOffering("math", "Mathematics", "intermediate", "Intermediate Level: Algebra and Problem Solving"),
  courseOffering("math", "Mathematics", "advanced", "Advanced Level: Math for Coders & Engineers"),
];

export const CAMP_OFFERINGS: CampOffering[] = [
  {
    id: "camp-hourly",
    category: "camp",
    plan: "hourly",
    title: "Summer Camp: Hourly",
    shortLabel: "Hourly",
    priceCents: 2000,
    isPlaceholderPrice: false,
    unit: "/ hour",
  },
  {
    id: "camp-daily",
    category: "camp",
    plan: "daily",
    title: "Summer Camp: Daily",
    shortLabel: "Daily",
    priceCents: 7500,
    isPlaceholderPrice: false,
    unit: "/ day",
  },
  {
    id: "camp-weekly-halfday",
    category: "camp",
    plan: "weekly-halfday",
    title: "Summer Camp: Weekly — Half Day",
    shortLabel: "Weekly · Half Day",
    priceCents: 20000,
    isPlaceholderPrice: false,
  },
  {
    id: "camp-weekly-fullday",
    category: "camp",
    plan: "weekly-fullday",
    title: "Summer Camp: Weekly — Full Day",
    shortLabel: "Weekly · Full Day",
    priceCents: 30000,
    isPlaceholderPrice: false,
  },
  {
    id: "camp-monthly-halfday",
    category: "camp",
    plan: "monthly-halfday",
    title: "Summer Camp: Monthly — Half Day",
    shortLabel: "Monthly · Half Day",
    priceCents: 80000,
    isPlaceholderPrice: false,
  },
  {
    id: "camp-monthly-fullday",
    category: "camp",
    plan: "monthly-fullday",
    title: "Summer Camp: Monthly — Full Day",
    shortLabel: "Monthly · Full Day",
    priceCents: 120000,
    isPlaceholderPrice: false,
  },
];

export const ALL_OFFERINGS: Offering[] = [...COURSE_OFFERINGS, ...CAMP_OFFERINGS];

export const OFFERINGS_BY_ID: Map<string, Offering> = new Map(
  ALL_OFFERINGS.map((offering) => [offering.id, offering])
);

export function getOfferingById(id: string): Offering | undefined {
  return OFFERINGS_BY_ID.get(id);
}
