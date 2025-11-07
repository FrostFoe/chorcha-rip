import { NextResponse } from "next/server";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { Course, Module } from "@/lib/types";

const COURSES_DIR = path.join(process.cwd(), "src/content/courses");

// GET single course with its modules
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Search for course with matching ID
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

            if (course.id === id) {
              // Now fetch modules for this course
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
                    // Sort lessons inside module by order
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

              return NextResponse.json(course);
            }
          } catch (e) {
            // Skip if course.json doesn't exist or is invalid
          }
        }
      }
    }

    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  } catch (error) {
    console.error("Failed to fetch course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 },
    );
  }
}

// PUT update course
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const course: Course = await request.json();

    // Find and update course
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
            const existingCourse = JSON.parse(courseJson) as Course;

            if (existingCourse.id === id) {
              await fs.writeFile(
                courseJsonPath,
                JSON.stringify(course, null, 2),
              );
              return NextResponse.json(course);
            }
          } catch (e) {
            // Skip if course.json doesn't exist
          }
        }
      }
    }

    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  } catch (error) {
    console.error("Failed to update course:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 },
    );
  }
}

// DELETE course
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Find and delete course directory
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
            const existingCourse = JSON.parse(courseJson) as Course;

            if (existingCourse.id === id) {
              // Delete the entire course directory
              await fs.rm(coursePath, { recursive: true, force: true });
              return NextResponse.json({ success: true });
            }
          } catch (e) {
            // Skip if course.json doesn't exist
          }
        }
      }
    }

    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  } catch (error) {
    console.error("Failed to delete course:", error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 },
    );
  }
}
