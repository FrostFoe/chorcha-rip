import type { Module } from "./types"
import { getAllLessonsData } from "./lessons"
import { getCourseData } from "./courses"
import { modules as hscPhysicsModules } from "@/content/courses/hsc/hsc-physics-1st-paper/modules"
import { modules as sscBiologyModules } from "@/content/courses/ssc/ssc-biology/modules"

const allModulesData: Record<string, Omit<Module, "lessons">[]> = {
  "hsc-physics-1st-paper": hscPhysicsModules,
  "ssc-biology": sscBiologyModules,
}

export async function getAllModulesData(courseSlug: string): Promise<Module[]> {
  const course = await getCourseData(courseSlug)
  if (!course) {
    return []
  }
  const modulesForCourse = allModulesData[courseSlug]
  if (!modulesForCourse) {
    return []
  }

  const allLessons = await getAllLessonsData(courseSlug)

  const modulesWithLessons = modulesForCourse.map((module) => {
    const moduleLessons = allLessons.filter(
      (lesson) => lesson.module === module.slug
    )
    return {
      ...module,
      lessons: moduleLessons,
    }
  })

  return modulesWithLessons
}
