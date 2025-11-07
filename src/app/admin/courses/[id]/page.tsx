"use server";

import { notFound } from "next/navigation";
import { getCourseAndModulesData, getAllCoursesData } from "@/lib/courses";
import { EditCourseForm } from "@/components/admin/EditCourseForm";
import type { Course } from "@/lib/types";

export default async function EditCoursePage({
  params,
}: {
  params: { id: string };
}) {
  const courseId = params.id;

  const [courseData, allCourses] = await Promise.all([
    getCourseAndModulesData(courseId),
    getAllCoursesData(),
  ]);

  if (!courseData) {
    notFound();
  }

  const courseWithModules = {
    ...courseData.course,
    modules: courseData.modules,
  };

  return <EditCourseForm course={courseWithModules} allCourses={allCourses} />;
}
