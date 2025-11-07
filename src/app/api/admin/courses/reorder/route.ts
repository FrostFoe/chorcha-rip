import { NextResponse } from "next/server";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { Course } from "@/lib/types";

const COURSES_DIR = path.join(process.cwd(), "src/content/courses");

export async function POST(request: Request) {
  try {
    const { fromIndex, toIndex } = await request.json();

    if (typeof fromIndex !== "number" || typeof toIndex !== "number") {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 },
      );
    }

    const courses: Course[] = [];
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
            courses.push(JSON.parse(courseJson) as Course);
          } catch (e) {
            // Skip
          }
        }
      }
    }

    courses.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= courses.length ||
      toIndex >= courses.length
    ) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    const [movedCourse] = courses.splice(fromIndex, 1);
    courses.splice(toIndex, 0, movedCourse);

    for (let i = 0; i < courses.length; i++) {
      courses[i].order = i;
    }

    for (const course of courses) {
      const courseDir = path.join(COURSES_DIR, course.category, course.slug);
      const courseJsonPath = path.join(courseDir, "course.json");
      await fs.writeFile(courseJsonPath, JSON.stringify(course, null, 2));
    }

    return NextResponse.json({
      message: "Courses reordered successfully",
      courses,
    });
  } catch (error) {
    console.error("Failed to reorder courses:", error);
    return NextResponse.json(
      { error: "Failed to reorder courses" },
      { status: 500 },
    );
  }
}
