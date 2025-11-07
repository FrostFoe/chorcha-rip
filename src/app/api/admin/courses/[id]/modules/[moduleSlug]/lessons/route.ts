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

// GET all lessons in a module
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; moduleSlug: string }> },
) {
  try {
    const { id, moduleSlug } = await params;
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

    const lessons = module.lessons || [];

    // Sort lessons by order
    lessons.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return NextResponse.json(lessons);
  } catch (error) {
    console.error("Failed to fetch lessons:", error);
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
      { status: 500 },
    );
  }
}

// POST new lesson
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; moduleSlug: string }> },
) {
  try {
    const { id, moduleSlug } = await params;
    const lesson: Lesson = await request.json();

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

    // Ensure lessons array exists and is an array
    if (!module.lessons || !Array.isArray(module.lessons)) {
      module.lessons = [];
    }

    // Check if lesson with same slug already exists
    const existingIndex = module.lessons.findIndex(
      (l) => l.slug === lesson.slug,
    );
    if (existingIndex >= 0) {
      return NextResponse.json(
        { error: "A lesson with this slug already exists" },
        { status: 400 },
      );
    }

    // Assign order to new lesson based on the highest existing order
    const maxOrder = module.lessons.reduce(
      (max, l) => Math.max(max, l.order ?? -1),
      -1,
    );
    lesson.order = maxOrder + 1;

    module.lessons.push(lesson);

    await fs.writeFile(moduleJsonPath, JSON.stringify(module, null, 2));

    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    console.error("Failed to create lesson:", error);
    return NextResponse.json(
      { error: "Failed to create lesson" },
      { status: 500 },
    );
  }
}
