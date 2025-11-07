import { NextResponse } from "next/server";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { Course, Module, Lesson } from "@/lib/types";

const COURSES_DIR = path.join(process.cwd(), "src/content/courses");

async function findCoursePath(courseId: string): Promise<string | null> {
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
          // Skip
        }
      }
    }
  }

  return null;
}

// GET single lesson
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string; moduleSlug: string; lessonSlug: string }>;
  },
) {
  try {
    const { id, moduleSlug, lessonSlug } = await params;
    const coursePath = await findCoursePath(id);

    if (!coursePath) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const moduleJsonPath = path.join(
      coursePath,
      "modules",
      `${moduleSlug}.json`,
    );
    const moduleJson = await fs.readFile(moduleJsonPath, "utf-8");
    const module = JSON.parse(moduleJson) as Module;

    const lesson = module.lessons?.find((l) => l.slug === lessonSlug);

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Failed to fetch lesson:", error);
    return NextResponse.json(
      { error: "Failed to fetch lesson" },
      { status: 500 },
    );
  }
}

// PUT update lesson
export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string; moduleSlug: string; lessonSlug: string }>;
  },
) {
  try {
    const { id, moduleSlug, lessonSlug } = await params;
    const updatedLesson: Lesson = await request.json();

    const coursePath = await findCoursePath(id);

    if (!coursePath) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const moduleJsonPath = path.join(
      coursePath,
      "modules",
      `${moduleSlug}.json`,
    );
    const moduleJson = await fs.readFile(moduleJsonPath, "utf-8");
    const module = JSON.parse(moduleJson) as Module;

    const lessonIndex = module.lessons?.findIndex((l) => l.slug === lessonSlug);

    if (lessonIndex === undefined || lessonIndex === -1) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    if (module.lessons) {
      module.lessons[lessonIndex] = updatedLesson;
    }

    await fs.writeFile(moduleJsonPath, JSON.stringify(module, null, 2));

    return NextResponse.json(updatedLesson);
  } catch (error) {
    console.error("Failed to update lesson:", error);
    return NextResponse.json(
      { error: "Failed to update lesson" },
      { status: 500 },
    );
  }
}

// DELETE lesson
export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string; moduleSlug: string; lessonSlug: string }>;
  },
) {
  try {
    const { id, moduleSlug, lessonSlug } = await params;
    const coursePath = await findCoursePath(id);

    if (!coursePath) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const moduleJsonPath = path.join(
      coursePath,
      "modules",
      `${moduleSlug}.json`,
    );
    const moduleJson = await fs.readFile(moduleJsonPath, "utf-8");
    const module = JSON.parse(moduleJson) as Module;

    const lessonIndex = module.lessons?.findIndex((l) => l.slug === lessonSlug);

    if (lessonIndex === undefined || lessonIndex === -1) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    if (module.lessons) {
      module.lessons.splice(lessonIndex, 1);
    }

    await fs.writeFile(moduleJsonPath, JSON.stringify(module, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete lesson:", error);
    return NextResponse.json(
      { error: "Failed to delete lesson" },
      { status: 500 },
    );
  }
}
