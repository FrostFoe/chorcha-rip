"use server";

import { notFound } from "next/navigation";
import { getCourseData, getAllCoursesData } from "@/lib/courses";
import { EditCourseForm } from "@/components/admin/EditCourseForm";
import type { Course } from "@/lib/types";

export default async function EditCoursePage({
  params,
}: {
  params: { id: string };
}) {
  const courseId = params.id;

  const [course, allCourses] = await Promise.all([
    getCourseData(courseId),
    getAllCoursesData(),
  ]);

  if (!course) {
    notFound();
  }

  return <EditCourseForm course={course} allCourses={allCourses} />;
}
