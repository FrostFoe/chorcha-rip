import { readFile, readdir, writeFile, stat } from "node:fs/promises";
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

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: courseId } = await params;
    const { fromIndex, toIndex } = await request.json();

    if (
      typeof courseId !== "string" ||
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

    // Read modules directory and get all module files
    const modulesDir = join(coursePath, "modules");
    let moduleFiles: string[] = [];

    try {
      moduleFiles = await readdir(modulesDir);
    } catch (e) {
      return Response.json({ error: "No modules found" }, { status: 404 });
    }

    const modules: Module[] = [];

    for (const file of moduleFiles) {
      if (file.endsWith(".json")) {
        try {
          const moduleJson = await readFile(join(modulesDir, file), "utf-8");
          const module = JSON.parse(moduleJson) as Module;
          modules.push(module);
        } catch (e) {
          // Ignore files that can't be parsed
        }
      }
    }

    // Sort by order field before reordering
    modules.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= modules.length ||
      toIndex >= modules.length
    ) {
      return Response.json({ error: "Invalid index" }, { status: 400 });
    }

    // Move module in array
    const [movedModule] = modules.splice(fromIndex, 1);
    modules.splice(toIndex, 0, movedModule);

    // Update order field for all modules
    for (let i = 0; i < modules.length; i++) {
      modules[i].order = i;
    }

    // Write updated modules back to files
    for (const module of modules) {
      const modulePath = join(modulesDir, `${module.slug}.json`);
      await writeFile(modulePath, JSON.stringify(module, null, 2));
    }

    return Response.json({
      message: "Module reordered successfully",
      modules,
    });
  } catch (error) {
    console.error("Failed to reorder module:", error);
    return Response.json(
      { error: "Failed to reorder module" },
      { status: 500 },
    );
  }
}
