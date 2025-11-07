"use server";

import type { Course, Module } from "./types";
import { getCourseData } from "./courses";
import fs from "node:fs/promises";
import path from "node:path";

export async function getAllModulesData(courseId: string): Promise<Module[]> {
  const course = await getCourseData(courseId);
  if (!course) return [];

  const modulesDir = path.join(
    process.cwd(),
    "src/content/courses",
    course.category,
    course.slug,
    "modules",
  );
  const modules: Module[] = [];

  try {
    const moduleFiles = await fs.readdir(modulesDir);
    const modulePromises = moduleFiles
      .filter((file) => file.endsWith(".json"))
      .map(async (file) => {
        const filePath = path.join(modulesDir, file);
        try {
          const fileContent = await fs.readFile(filePath, "utf-8");
          const module = JSON.parse(fileContent) as Module;
          // Sort lessons inside module by order
          if (module.lessons) {
            module.lessons.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          }
          return module;
        } catch {
          return null;
        }
      });

    const resolvedModules = (await Promise.all(modulePromises)).filter(
      (m): m is Module => m !== null,
    );
    modules.push(...resolvedModules);
  } catch (e) {
    // Modules directory might not exist, return empty array which is fine.
  }

  // Sort modules by order field
  modules.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return modules;
}

export async function getModuleData(
  courseId: string,
  moduleSlug: string,
): Promise<Module | null> {
  const modules = await getAllModulesData(courseId);
  return modules.find((m) => m.slug === moduleSlug) || null;
}
