"use server";

import { getAllCoursesData } from "@/lib/courses";
import { CoursesClient } from "@/components/admin/CoursesClient";
import type { Course } from "@/lib/types";

export default async function CoursesPage() {
  const courses: Course[] = await getAllCoursesData();

  return <CoursesClient courses={courses} />;
}
