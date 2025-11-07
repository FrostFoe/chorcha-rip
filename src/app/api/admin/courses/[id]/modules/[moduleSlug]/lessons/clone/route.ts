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
    const {
      courseId,
      moduleSlug,
      lessonSlug,
      newLessonSlug,
      targetModuleSlug,
    } = await request.json();

    if (
      !courseId ||
      !moduleSlug ||
      !lessonSlug ||
      !newLessonSlug ||
      !targetModuleSlug
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const coursePath = await findCoursePath(courseId);

    if (!coursePath) {
      return Response.json({ error: "Course not found" }, { status: 404 });
    }

    // Read source module to get the lesson
    const sourceModulePath = join(coursePath, "modules", `${moduleSlug}.json`);
    const sourceModuleData = await readFile(sourceModulePath, "utf-8");
    const sourceModule = JSON.parse(sourceModuleData) as Module;

    const lessonToDuplicate = sourceModule.lessons?.find(
      (l) => l.slug === lessonSlug,
    );
    if (!lessonToDuplicate) {
      return Response.json({ error: "Lesson not found" }, { status: 404 });
    }

    // Read target module
    const targetModulePath = join(
      coursePath,
      "modules",
      `${targetModuleSlug}.json`,
    );
    const targetModuleData = await readFile(targetModulePath, "utf-8");
    const targetModule = JSON.parse(targetModuleData) as Module;

    // Create cloned lesson
    const clonedLesson = {
      ...lessonToDuplicate,
      slug: newLessonSlug,
      title: `${lessonToDuplicate.title} (Copy)`,
      module: targetModuleSlug, // Set the correct target module slug
      order: targetModule.lessons?.length || 0, // Set order to be the last
    };

    // Add cloned lesson to target module
    targetModule.lessons = [...(targetModule.lessons || []), clonedLesson];

    // Write updated target module
    await mkdir(join(coursePath, "modules"), { recursive: true });
    await writeFile(targetModulePath, JSON.stringify(targetModule, null, 2));

    return Response.json({
      message: "Lesson cloned successfully",
      lesson: clonedLesson,
    });
  } catch (error) {
    console.error("Failed to clone lesson:", error);
    return Response.json({ error: "Failed to clone lesson" }, { status: 500 });
  }
}
