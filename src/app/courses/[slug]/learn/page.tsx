"use server";

import { notFound } from "next/navigation";
import { getCourseData } from "@/lib/courses";
import { getAllLessonsData } from "@/lib/lessons";
import { CourseResumeRedirect } from "@/components/courses/CourseResumeRedirect";

// This page now acts as a server-side data fetcher
// and passes the data to a client component for redirection.
export default async function CourseLearnRedirectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const course = await getCourseData(slug);
  if (!course) {
    notFound();
  }

  const allLessons = await getAllLessonsData(slug);

  return <CourseResumeRedirect course={course} allLessons={allLessons} />;
}
