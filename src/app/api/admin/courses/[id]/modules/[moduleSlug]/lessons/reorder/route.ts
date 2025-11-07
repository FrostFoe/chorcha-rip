import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import type { Course, Module } from "@/lib/types";

const COURSES_DIR = join(process.cwd(), "src/content/courses");

async function findCoursePath(courseId: string): Promise<string | null> {
  const categories = await readdir(COURSES_DIR);

  for (const category of categories) {
    const categoryPath = join(COURSES_DIR, category);
    const categoryStat = await stat(categoryPath);

    if (categoryStat.isDirectory()) {
      const courseDirs = await readdir(categoryPath);

      for (const courseDir of courseDirs) {
        const coursePath = join(categoryPath, courseDir);
        const courseJsonPath = join(coursePath, "course.json");

        try {
          const courseJson = await readFile(courseJsonPath, "utf-8");
          const course = JSON.parse(courseJson) as Course;

          if (course.id === courseId) {
            return coursePath;
          }
        } catch (e) {
          // Skip
        }
      }
    }
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const { courseId, moduleSlug, fromIndex, toIndex } = await request.json();

    if (
      typeof courseId !== "string" ||
      typeof moduleSlug !== "string" ||
      typeof fromIndex !== "number" ||
      typeof toIndex !== "number"
    ) {
      return Response.json(
        { error: "Missing or invalid required fields" },
        { status: 400 },
      );
    }

    const coursePath = await findCoursePath(courseId);

    if (!coursePath) {
      return Response.json({ error: "Course not found" }, { status: 404 });
    }

    // Read module
    const modulePath = join(coursePath, "modules", `${moduleSlug}.json`);
    const moduleData = await readFile(modulePath, "utf-8");
    const module = JSON.parse(moduleData) as Module;

    // Ensure lessons array exists and is sorted correctly before reordering
    const lessons =
      module.lessons?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) || [];

    if (
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= lessons.length ||
      toIndex >= lessons.length
    ) {
      return Response.json({ error: "Invalid index" }, { status: 400 });
    }

    // Move lesson in array
    const [movedLesson] = lessons.splice(fromIndex, 1);
    lessons.splice(toIndex, 0, movedLesson);

    // Update order property for all lessons
    for (let i = 0; i < lessons.length; i++) {
      lessons[i].order = i;
    }
    module.lessons = lessons;

    // Write updated module
    await mkdir(join(coursePath, "modules"), { recursive: true });
    await writeFile(modulePath, JSON.stringify(module, null, 2));

    return Response.json({
      message: "Lesson reordered successfully",
      module,
    });
  } catch (error) {
    console.error("Failed to reorder lesson:", error);
    return Response.json(
      { error: "Failed to reorder lesson" },
      { status: 500 },
    );
  }
}
