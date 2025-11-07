"use server";

import type { Lesson } from "./types";
import { getAllModulesData } from "./modules";

export async function getAllLessonsData(courseId: string): Promise<Lesson[]> {
  const allModules = await getAllModulesData(courseId);
  const lessons = allModules.flatMap((module) => module.lessons || []);

  // Sort all lessons by their order property within their respective modules
  lessons.sort((a, b) => {
    const moduleA = allModules.find((m) => m.slug === a.module);
    const moduleB = allModules.find((m) => m.slug === b.module);
    const moduleOrderA = moduleA?.order ?? 0;
    const moduleOrderB = moduleB?.order ?? 0;

    if (moduleOrderA !== moduleOrderB) {
      return moduleOrderA - moduleOrderB;
    }
    return (a.order ?? 0) - (b.order ?? 0);
  });

  return lessons;
}

export async function getLessonData(
  courseId: string,
  moduleSlug: string,
  lessonSlug: string,
): Promise<Lesson | null> {
  const allModules = await getAllModulesData(courseId);
  for (const module of allModules) {
    if (module.slug === moduleSlug) {
      const lesson = module.lessons?.find((l) => l.slug === lessonSlug);
      if (lesson) return lesson;
    }
  }

  return null;
}
