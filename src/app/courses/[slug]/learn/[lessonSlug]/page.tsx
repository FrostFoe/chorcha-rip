import { notFound } from "next/navigation";
import { LessonClient } from "./lesson-client";
import { getCourseData } from "@/lib/courses";
import { getLessonData } from "@/lib/lessons";

export default async function LessonPage({
  params,
}: {
  params: { slug: string; lessonSlug: string };
}) {
  const { slug, lessonSlug } = params;

  const course = await getCourseData(slug);
  if (!course) {
    notFound();
  }

  // Find the module slug for the current lesson
  const module = course.modules?.find((m) =>
    m.lessons?.some((l) => l.slug === lessonSlug),
  );
  if (!module) {
    notFound();
  }

  const lesson = await getLessonData(course.id, module.slug, lessonSlug);

  if (!lesson) {
    notFound();
  }

  return <LessonClient course={course} lesson={lesson} />;
}
