"use server"

import type { Lesson } from "./types"
import { lessons as sscBiologyLessons } from "@/content/courses/ssc/ssc-biology/lessons"
import { lessons as hscPhysicsLessons } from "@/content/courses/hsc/hsc-physics-1st-paper/lessons"
import { getCourseData } from "./courses"

const allLessonsData: Record<string, Lesson[]> = {
  "hsc-physics-1st-paper": hscPhysicsLessons,
  "ssc-biology": sscBiologyLessons,
}

export async function getLessonData(
  courseSlug: string,
  lessonSlug: string
): Promise<Lesson | null> {
  const lessons = allLessonsData[courseSlug]
  if (!lessons) return null

  const lesson = lessons.find((l) => l.slug === lessonSlug)
  return lesson || null
}

export async function getAllLessonsData(courseSlug: string): Promise<Lesson[]> {
  const course = await getCourseData(courseSlug)
  if (!course) return []

  return allLessonsData[courseSlug] || []
}
