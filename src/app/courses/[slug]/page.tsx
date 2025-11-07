"use server";
import { notFound } from "next/navigation";
import { getCourseData } from "@/lib/courses";
import { CourseClient } from "./course-client";

export default async function CoursePage({
  params,
}: {
  params: { slug: string };
}) {
  const course = await getCourseData(params.slug);

  if (!course) {
    notFound();
  }

  return <CourseClient course={course} />;
}
