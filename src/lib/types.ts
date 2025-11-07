export interface Course {
  id: string;
  instructor: string;
  thumbnail: string;
  slug: string;
  category: "hsc" | "ssc" | "admission" | "bcs";
  totalLessons?: number;
  body?: string;
  title: string;
  description: string;
  image?: string;
  outcomes?: string[];
  outcomesHtml?: string; // HTML content for "এই কোর্স থেকে যা শিখবেন" section
  price: number;
  status?: "draft" | "published"; // Draft or Published status
  publishedAt?: string; // ISO timestamp
  lastModifiedAt?: string; // ISO timestamp
  versions?: CourseVersion[]; // Version history
  order?: number;
  modules?: Module[];
  name?: string;
}

export interface CourseVersion {
  id: string;
  version: number;
  createdAt: string;
  description?: string; // Change description
  data: Partial<Course>;
}

export type LessonType = "video" | "article" | "quiz";

export interface QuizQuestion {
  type:
    | "multiple-choice"
    | "true-false"
    | "fill-blank"
    | "multiple-select"
    | "matching";
  questionText: string;
  options?: string[]; // For multiple-choice, multiple-select
  correctAnswer?: number | number[]; // For multiple-choice, true-false (0=false, 1=true), multiple-select
  correctText?: string; // For fill-blank
  pairs?: { left: string; right: string }[]; // For matching
}

export interface Lesson {
  title: string;
  slug: string;
  duration: string;
  lessonType: LessonType;
  content: string | QuizQuestion[]; // YouTube video ID, article content, or quiz questions
  completed: boolean;
  active?: boolean;
  module: string;
  order?: number; // Lesson order/serial number in module
}

export interface Module {
  slug: string;
  title: string;
  order?: number; // Module order/serial number in course
  lessons?: Lesson[];
}

export interface Instructor {
  name: string;
  avatar: string;
  rating: number;
}

export type IconName =
  | "Lightbulb"
  | "TrendingUp"
  | "Target"
  | "BookUser"
  | "Palette"
  | "Users"
  | "CheckCircle"
  | "History"
  | "FileText"
  | "BrainCircuit"
  | "Trophy";

export interface Outcome {
  icon: IconName;
  text: string;
}

export interface CourseDetails {
  totalDuration: string;
  description: string;
  instructor: Instructor;
  modules: Module[];
  outcomes: Outcome[];
}

export interface DashboardProgressItem {
  subject: string;
  percentage: number;
}

export interface UserProfile {
  full_name: string;
  avatar_url: string;
}

export interface Assignment {
  id: string;
  title: string;
  courseName: string;
  dueDate: string;
  status?: "Pending" | "Submitted";
  content: string;
  slug: string;
}

export interface LeaderboardEntry {
  name: string;
  college: string;
}

export interface GemPack {
  amount: number;
  price: number;
}

export interface Feature {
  icon: IconName;
  title: string;
  description: string;
}
