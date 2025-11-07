import { NextResponse } from "next/server";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { Course, Module } from "@/lib/types";
import { randomUUID } from "node:crypto";

const COURSES_DIR = path.join(process.cwd(), "src/content/courses");

// GET all courses with full module and lesson data
export async function GET() {
  try {
    const courses: Course[] = [];

    // Iterate through category directories
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

            // Fetch all modules and their lessons for the current course
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
                  // Sort lessons within the module
                  if (module.lessons) {
                    module.lessons.sort(
                      (a, b) => (a.order ?? 0) - (b.order ?? 0),
                    );
                  }
                  modules.push(module);
                }
              }
            } catch (e) {
              // Modules directory might not exist, which is fine
            }

            // Sort modules by order
            modules.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            course.modules = modules;

            courses.push(course);
          } catch (e) {
            // Skip if course.json doesn't exist
          }
        }
      }
    }

    // Sort courses by order
    courses.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 },
    );
  }
}

// POST new course
export async function POST(request: Request) {
  try {
    const course: Course = await request.json();

    if (!course.title || !course.slug || !course.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if slug already exists
    const categories = await fs.readdir(COURSES_DIR);
    let totalCourses = 0;
    for (const category of categories) {
      const categoryPath = path.join(COURSES_DIR, category);
      const stat = await fs.stat(categoryPath).catch(() => null);

      if (stat?.isDirectory()) {
        const courseDirs = await fs.readdir(categoryPath);
        totalCourses += courseDirs.length;

        for (const courseDir of courseDirs) {
          if (courseDir === course.slug) {
            return NextResponse.json(
              { error: "A course with this slug already exists" },
              { status: 400 },
            );
          }
        }
      }
    }

    // Assign defaults
    course.order = totalCourses;
    course.id = course.id || randomUUID();

    const courseDir = path.join(COURSES_DIR, course.category, course.slug);

    // Create course directory
    await fs.mkdir(courseDir, { recursive: true });
    await fs.mkdir(path.join(courseDir, "modules"), { recursive: true });

    // Write course.json
    const courseJsonPath = path.join(courseDir, "course.json");
    await fs.writeFile(courseJsonPath, JSON.stringify(course, null, 2));

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Failed to create course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 },
    );
  }
}
