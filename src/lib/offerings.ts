import { PRODUCT_OFFERINGS, type ProductOffering } from "./products";

export interface OfferingBase {
  id: string;
  title: string;
  shortLabel: string;
  priceCents: number;
}

export interface CourseOffering extends OfferingBase {
  category: "course";
  subject: "ai" | "coding" | "robotics" | "math";
  level: "beginner" | "intermediate" | "advanced";
  session: "private" | "group";
}

const SESSION_PRICE_CENTS: Record<CourseOffering["session"], number> = {
  private: 3500,
  group: 2500,
};

const SESSION_LABEL: Record<CourseOffering["session"], string> = {
  private: "Private",
  group: "Group",
};

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

export type Offering = CourseOffering | CampOffering | ProductOffering;

const LEVEL_LABEL: Record<CourseOffering["level"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

// Each course level is sold as two offerings — one per session type — so the
// cart and checkout keep keying purely on offeringId and pricing stays server-side.
function courseOfferings(
  subject: CourseOffering["subject"],
  subjectLabel: string,
  level: CourseOffering["level"],
  title: string
): CourseOffering[] {
  return (["private", "group"] as const).map((session) => ({
    id: `course-${subject}-${level}-${session}`,
    category: "course",
    subject,
    level,
    session,
    title: `${title} (${SESSION_LABEL[session]})`,
    shortLabel: `${subjectLabel} · ${LEVEL_LABEL[level]} · ${SESSION_LABEL[session]}`,
    priceCents: SESSION_PRICE_CENTS[session],
  }));
}

export const COURSE_OFFERINGS: CourseOffering[] = [
  ...courseOfferings("ai", "AI", "beginner", "Beginner Level: Foundations of AI"),
  ...courseOfferings("ai", "AI", "intermediate", "Intermediate Level: Machine Learning Basics"),
  ...courseOfferings("ai", "AI", "advanced", "Advanced Level: Real-World AI Projects"),

  ...courseOfferings("coding", "Coding", "beginner", "Beginner Level: Coding Fundamentals"),
  ...courseOfferings("coding", "Coding", "intermediate", "Intermediate Level: Web & App Development"),
  ...courseOfferings("coding", "Coding", "advanced", "Advanced Level: Full Projects & Logic Building"),

  ...courseOfferings("robotics", "Robotics", "beginner", "Beginner Level: Intro to Robotics"),
  ...courseOfferings("robotics", "Robotics", "intermediate", "Intermediate Level: Sensors & Automation"),
  ...courseOfferings("robotics", "Robotics", "advanced", "Advanced Level: Mechatronics & AI + Robotics"),

  ...courseOfferings("math", "Mathematics", "beginner", "Beginner Level: Building Confidence in Math"),
  ...courseOfferings("math", "Mathematics", "intermediate", "Intermediate Level: Algebra and Problem Solving"),
  ...courseOfferings("math", "Mathematics", "advanced", "Advanced Level: Math for Coders & Engineers"),
];

export const CAMP_OFFERINGS: CampOffering[] = [
  {
    id: "camp-hourly",
    category: "camp",
    plan: "hourly",
    title: "Summer Camp: Hourly",
    shortLabel: "Hourly",
    priceCents: 2000,
    unit: "/ hour",
  },
  {
    id: "camp-daily",
    category: "camp",
    plan: "daily",
    title: "Summer Camp: Daily",
    shortLabel: "Daily",
    priceCents: 7500,
    unit: "/ day",
  },
  {
    id: "camp-weekly-halfday",
    category: "camp",
    plan: "weekly-halfday",
    title: "Summer Camp: Weekly — Half Day",
    shortLabel: "Weekly · Half Day",
    priceCents: 20000,
  },
  {
    id: "camp-weekly-fullday",
    category: "camp",
    plan: "weekly-fullday",
    title: "Summer Camp: Weekly — Full Day",
    shortLabel: "Weekly · Full Day",
    priceCents: 30000,
  },
  {
    id: "camp-monthly-halfday",
    category: "camp",
    plan: "monthly-halfday",
    title: "Summer Camp: Monthly — Half Day",
    shortLabel: "Monthly · Half Day",
    priceCents: 80000,
  },
  {
    id: "camp-monthly-fullday",
    category: "camp",
    plan: "monthly-fullday",
    title: "Summer Camp: Monthly — Full Day",
    shortLabel: "Monthly · Full Day",
    priceCents: 120000,
  },
];

export const ALL_OFFERINGS: Offering[] = [
  ...COURSE_OFFERINGS,
  ...CAMP_OFFERINGS,
  ...PRODUCT_OFFERINGS,
];

export const OFFERINGS_BY_ID: Map<string, Offering> = new Map(
  ALL_OFFERINGS.map((offering) => [offering.id, offering])
);

export function getOfferingById(id: string): Offering | undefined {
  return OFFERINGS_BY_ID.get(id);
}
