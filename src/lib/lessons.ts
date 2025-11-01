"use server";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Lesson } from "./types";
import { getCourseData } from "./courses";

export async function getLessonData(
  courseSlug: string,
  lessonSlug: string,
): Promise<Lesson | null> {
  const course = await getCourseData(courseSlug);
  if (!course) return null;

  const lessonPath = path.join(
    process.cwd(),
    "src",
    "content",
    "courses",
    course.category,
    courseSlug,
    "lessons",
    `${lessonSlug}.mdx`,
  );

  if (!fs.existsSync(lessonPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(lessonPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: lessonSlug,
    content: content,
    ...(data as {
      title: string;
      duration: string;
      lessonType: "video" | "article" | "quiz";
      module: string;
      completed: boolean;
      active?: boolean;
    }),
  };
}

export async function getAllLessonsData(courseSlug: string): Promise<Lesson[]> {
  const course = await getCourseData(courseSlug);
  if (!course) return [];

  const lessonsDirectory = path.join(
    process.cwd(),
    "src",
    "content",
    "courses",
    course.category,
    courseSlug,
    "lessons",
  );

  if (!fs.existsSync(lessonsDirectory)) {
    return [];
  }

  const dirents = fs.readdirSync(lessonsDirectory, { withFileTypes: true });

  const allLessonsData = dirents
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".mdx"))
    .map((dirent) => {
      const fileName = dirent.name;
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(lessonsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        ...(data as {
          title: string;
          duration: string;
          lessonType: "video" | "article" | "quiz";
          module: string;
          completed: boolean;
          active?: boolean;
        }),
      };
    });

  return allLessonsData;
}
