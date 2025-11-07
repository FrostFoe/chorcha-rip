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

// GET all modules for a course
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const coursePath = await findCoursePath(id);

    if (!coursePath) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const modulesDir = path.join(coursePath, "modules");
    const modules: Module[] = [];

    try {
      const moduleFiles = await fs.readdir(modulesDir);

      for (const file of moduleFiles) {
        if (file.endsWith(".json")) {
          const moduleJson = await fs.readFile(
            path.join(modulesDir, file),
            "utf-8",
          );
          const module = JSON.parse(moduleJson) as Module;
          modules.push(module);
        }
      }
    } catch (e) {
      // Directory might not exist, return empty array which is fine.
    }

    // Sort modules by order field
    modules.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return NextResponse.json(modules);
  } catch (error) {
    console.error("Failed to fetch modules:", error);
    return NextResponse.json(
      { error: "Failed to fetch modules" },
      { status: 500 },
    );
  }
}

// POST new module
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const module: Module = await request.json();

    if (!module.title || !module.slug) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const coursePath = await findCoursePath(id);

    if (!coursePath) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const modulesDir = path.join(coursePath, "modules");
    await fs.mkdir(modulesDir, { recursive: true });

    // Calculate the next order number
    let maxOrder = -1;
    try {
      const moduleFiles = await fs.readdir(modulesDir);
      for (const file of moduleFiles) {
        if (file.endsWith(".json")) {
          const moduleJson = await fs.readFile(
            path.join(modulesDir, file),
            "utf-8",
          );
          const existingModule = JSON.parse(moduleJson) as Module;
          if (typeof existingModule.order === "number") {
            maxOrder = Math.max(maxOrder, existingModule.order);
          }
        }
      }
    } catch (e) {
      // Directory might not exist yet, so maxOrder remains -1
    }
    module.order = maxOrder + 1;
    module.lessons = [];

    const moduleJsonPath = path.join(modulesDir, `${module.slug}.json`);

    // Check if module with same slug already exists
    try {
      await fs.access(moduleJsonPath);
      return NextResponse.json(
        { error: "A module with this slug already exists" },
        { status: 400 },
      );
    } catch (e) {
      // File doesn't exist, which is good
    }

    await fs.writeFile(moduleJsonPath, JSON.stringify(module, null, 2));

    return NextResponse.json(module, { status: 201 });
  } catch (error) {
    console.error("Failed to create module:", error);
    return NextResponse.json(
      { error: "Failed to create module" },
      { status: 500 },
    );
  }
}
