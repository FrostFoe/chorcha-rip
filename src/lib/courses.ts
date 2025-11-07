"use server";

import type { Course } from "./types";
import fs from "node:fs/promises";
import path from "node:path";
import { getAllModulesData } from "./modules";

const coursesDirectory = path.join(process.cwd(), "src/content/courses");

export async function getAllCoursesData(): Promise<Course[]> {
  const categories = await fs.readdir(coursesDirectory, {
    withFileTypes: true,
  });
  const coursePromises: Promise<Course | null>[] = [];

  for (const category of categories) {
    if (category.isDirectory()) {
      const categoryPath = path.join(coursesDirectory, category.name);
      const courseDirs = await fs.readdir(categoryPath, {
        withFileTypes: true,
      });

      for (const courseDir of courseDirs) {
        if (courseDir.isDirectory()) {
          const courseJsonPath = path.join(
            categoryPath,
            courseDir.name,
            "course.json",
          );
          const promise = fs
            .readFile(courseJsonPath, "utf-8")
            .then((content) => JSON.parse(content) as Course)
            .catch(() => null);
          coursePromises.push(promise);
        }
      }
    }
  }

  const courses = (await Promise.all(coursePromises)).filter(
    (c): c is Course => c !== null,
  );

  // Sort courses by order
  courses.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return courses;
}

export async function getCourseData(
  courseIdOrSlug: string,
): Promise<Course | null> {
  const allCourses = await getAllCoursesData();
  return (
    allCourses.find(
      (course) => course.slug === courseIdOrSlug || course.id === courseIdOrSlug,
    ) || null
  );
}

export async function getCourseAndModulesData(courseIdOrSlug: string) {
  const course = await getCourseData(courseIdOrSlug);
  if (!course) {
    return null;
  }
  const modules = await getAllModulesData(course.id);
  return { course, modules };
}
