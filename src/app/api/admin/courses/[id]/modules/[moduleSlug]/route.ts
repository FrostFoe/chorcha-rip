import { NextResponse } from "next/server";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { Course, Module } from "@/lib/types";

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

// GET single module
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

    // Ensure lessons array exists
    if (!module.lessons) {
      module.lessons = [];
    }

    // Sort lessons by order field
    module.lessons.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return NextResponse.json(module);
  } catch (error) {
    console.error("Failed to fetch module:", error);
    return NextResponse.json(
      { error: "Failed to fetch module" },
      { status: 500 },
    );
  }
}

// PUT update module
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; moduleSlug: string }> },
) {
  try {
    const { id, moduleSlug } = await params;
    const module: Module = await request.json();

    const coursePath = await findCoursePath(id);

    if (!coursePath) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const moduleJsonPath = path.join(
      coursePath,
      "modules",
      `${moduleSlug}.json`,
    );
    await fs.writeFile(moduleJsonPath, JSON.stringify(module, null, 2));

    return NextResponse.json(module);
  } catch (error) {
    console.error("Failed to update module:", error);
    return NextResponse.json(
      { error: "Failed to update module" },
      { status: 500 },
    );
  }
}

// DELETE module
export async function DELETE(
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
    await fs.unlink(moduleJsonPath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete module:", error);
    return NextResponse.json(
      { error: "Failed to delete module" },
      { status: 500 },
    );
  }
}
