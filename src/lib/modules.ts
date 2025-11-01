import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import type { Module } from "./types"
import { getAllLessonsData } from "./lessons"
import { getCourseData } from "./courses"

export async function getAllModulesData(courseSlug: string): Promise<Module[]> {
  const course = await getCourseData(courseSlug)
  if (!course) {
    return []
  }
  const modulesDirectory = path.join(
    process.cwd(),
    "src",
    "content",
    "courses",
    course.category,
    courseSlug,
    "modules"
  )

  if (!fs.existsSync(modulesDirectory)) {
    return []
  }

  const allLessons = await getAllLessonsData(courseSlug)

  const dirents = fs.readdirSync(modulesDirectory, { withFileTypes: true })

  const allModulesData = dirents
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".mdx"))
    .map((dirent) => {
      const fileName = dirent.name
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(modulesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data } = matter(fileContents)

      const moduleLessons = allLessons.filter(
        (lesson) => lesson.module === slug
      )

      return {
        slug,
        lessons: moduleLessons,
        ...(data as { title: string }),
      }
    })

  return allModulesData
}
