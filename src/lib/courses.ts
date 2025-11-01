"use server"

import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import type { Course } from "./types"

export async function getCourseData(slug: string): Promise<Course | null> {
  const coursesRootDirectory = path.join(
    process.cwd(),
    "src",
    "content",
    "courses"
  )
  const courseCategoryFolders = fs
    .readdirSync(coursesRootDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  for (const category of courseCategoryFolders) {
    const courseFilePath = path.join(
      coursesRootDirectory,
      category,
      slug,
      "course.mdx"
    )

    if (fs.existsSync(courseFilePath)) {
      const fileContents = fs.readFileSync(courseFilePath, "utf8")
      const { data, content } = matter(fileContents)

      const courseData = data as {
        id: string
        title: string
        description: string
        image: string
        thumbnail: string
        instructor: { name: string }
        outcomes?: string[]
        name: string
        price: number
        category: "hsc" | "ssc" | "admission" | "bcs"
      }

      return {
        slug,
        body: content,
        ...courseData,
        instructor: courseData.instructor.name,
      }
    }
  }

  return null
}

export async function getAllCoursesData(): Promise<Course[]> {
  const coursesRootDirectory = path.join(
    process.cwd(),
    "src",
    "content",
    "courses"
  )

  const courseCategoryFolders = fs
    .readdirSync(coursesRootDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  const allCoursesData: Course[] = []

  for (const category of courseCategoryFolders) {
    const categoryPath = path.join(coursesRootDirectory, category)
    const courseSlugFolders = fs
      .readdirSync(categoryPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)

    for (const slug of courseSlugFolders) {
      const courseFilePath = path.join(categoryPath, slug, "course.mdx")
      if (fs.existsSync(courseFilePath)) {
        const fileContents = fs.readFileSync(courseFilePath, "utf8")
        const { data, content } = matter(fileContents)
        const courseData = data as {
          id: string
          title: string
          description: string
          image: string
          thumbnail: string
          instructor: { name: string }
          outcomes?: string[]
          name: string
          price: number
          category: "hsc" | "ssc" | "admission" | "bcs"
        }

        allCoursesData.push({
          slug: slug,
          body: content,
          ...courseData,
          instructor: courseData.instructor.name,
        })
      }
    }
  }

  return allCoursesData
}
