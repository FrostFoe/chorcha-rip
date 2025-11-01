"use server"

import type { Course } from "./types"
import { course as sscBiologyCourse } from "@/content/courses/ssc/ssc-biology/course"
import { course as hscPhysicsCourse } from "@/content/courses/hsc/hsc-physics-1st-paper/course"

const allCoursesData: Course[] = [hscPhysicsCourse, sscBiologyCourse]

export async function getCourseData(slug: string): Promise<Course | null> {
  const course = allCoursesData.find((c) => c.slug === slug)
  return course || null
}

export async function getAllCoursesData(): Promise<Course[]> {
  return allCoursesData
}
