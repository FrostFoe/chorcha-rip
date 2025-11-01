import type { MDXRemoteSerializeResult } from "next-mdx-remote"

export interface Course {
  id: string
  name: string
  instructor: string
  thumbnail: string
  slug: string
  category: "hsc" | "ssc" | "admission" | "bcs"
  totalLessons?: number
  body?: string
  mdxSource?: MDXRemoteSerializeResult
  title: string
  description: string
  image: string
  outcomes?: string[]
  price: number
}

export type LessonType = "video" | "article" | "quiz"

export interface QuizQuestion {
  questionText: string
  options: string[]
  correctAnswer: number
}

export interface Lesson {
  title: string
  slug: string
  duration: string
  lessonType: LessonType
  content: string | QuizQuestion[] // YouTube video ID, article markdown, or quiz questions
  completed: boolean
  active?: boolean
  module: string
  mdxSource?: MDXRemoteSerializeResult
}

export interface Module {
  slug: string
  title: string
  lessons: Lesson[]
}

export interface Instructor {
  name: string
  avatar: string
  rating: number
}

export type IconName =
  | "Lightbulb"
  | "TrendingUp"
  | "Target"
  | "BookUser"
  | "Palette"
  | "Users"
  | "CheckCircle"

export interface Outcome {
  icon: IconName
  text: string
}

export interface CourseDetails {
  totalDuration: string
  description: string
  instructor: Instructor
  modules: Module[]
  outcomes: Outcome[]
}

export interface DashboardProgressItem {
  subject: string
  percentage: number
}

export interface UserProfile {
  full_name: string
  avatar_url: string
}

export interface Assignment {
  id: string
  slug: string
  title: string
  courseName: string
  dueDate: string
  status?: "Pending" | "Submitted"
  body: string
}
