import { NextResponse } from "next/server";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { Course, Module } from "@/lib/types";

const COURSES_DIR = path.join(process.cwd(), "src/content/courses");

async function findCoursePath(courseId: string): Promise<string | null> {
  try {
    const categories = await fs.readdir(COURSES_DIR);

    for (const category of categories) {
      const categoryPath = path.join(COURSES_DIR, category);
      const stat = await fs.stat(categoryPath);

      if (stat.isDirectory()) {
        const courseDirs = await fs.readdir(categoryPath);

        for (const courseDir of courseDirs) {
          const coursePath = path.join(categoryPath, courseDir);
          const courseJsonPath = path.join(coursePath, "course.json");

          try {
            const courseJson = await fs.readFile(courseJsonPath, "utf-8");
            const course = JSON.parse(courseJson) as Course;

            if (course.id === courseId) {
              return coursePath;
            }
          } catch (e) {
            // Skip folders without course.json or with invalid json
          }
        }
      }
    }
  } catch (error) {
    console.error("Error finding course path:", error);
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const { sourceCourseId, moduleSlugToClone, targetCourseId, newModuleSlug } =
      await request.json();

    if (
      !sourceCourseId ||
      !moduleSlugToClone ||
      !targetCourseId ||
      !newModuleSlug
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const [sourceCoursePath, targetCoursePath] = await Promise.all([
      findCoursePath(sourceCourseId),
      findCoursePath(targetCourseId),
    ]);

    if (!sourceCoursePath) {
      return NextResponse.json(
        { error: "Source course not found" },
        { status: 404 },
      );
    }

    if (!targetCoursePath) {
      return NextResponse.json(
        { error: "Target course not found" },
        { status: 404 },
      );
    }

    const sourceModulePath = path.join(
      sourceCoursePath,
      "modules",
      `${moduleSlugToClone}.json`,
    );
    const targetModulesDir = path.join(targetCoursePath, "modules");
    const targetModulePath = path.join(
      targetModulesDir,
      `${newModuleSlug}.json`,
    );

    // Check if target module slug already exists
    try {
      await fs.access(targetModulePath);
      return NextResponse.json(
        { error: "A module with this slug already exists in target course" },
        { status: 409 },
      );
    } catch (e) {
      // Slug is available, continue
    }

    const sourceModuleJson = await fs.readFile(sourceModulePath, "utf-8");
    const clonedModule = JSON.parse(sourceModuleJson) as Module;

    clonedModule.slug = newModuleSlug;
    clonedModule.title = `${clonedModule.title} (Copy)`;

    // Update module slug for all lessons within the cloned module
    if (clonedModule.lessons) {
      clonedModule.lessons = clonedModule.lessons.map((lesson) => ({
        ...lesson,
        module: newModuleSlug,
      }));
    }

    // Assign a new order to the cloned module in the target course
    try {
      const targetModuleFiles = await fs.readdir(targetModulesDir);
      clonedModule.order = targetModuleFiles.filter((f) =>
        f.endsWith(".json"),
      ).length;
    } catch {
      clonedModule.order = 0;
    }

    await fs.mkdir(targetModulesDir, { recursive: true });
    await fs.writeFile(targetModulePath, JSON.stringify(clonedModule, null, 2));

    return NextResponse.json({
      success: true,
      message: "Module cloned successfully",
    });
  } catch (error) {
    console.error("Failed to clone module:", error);
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return NextResponse.json(
        { error: "Source module file not found." },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "Failed to clone module" },
      { status: 500 },
    );
  }
}
