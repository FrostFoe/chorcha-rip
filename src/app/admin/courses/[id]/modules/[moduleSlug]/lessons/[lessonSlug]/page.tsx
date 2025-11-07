"use server";

import { getLessonData } from "@/lib/lessons";
import { getAllModulesData } from "@/lib/modules";
import { notFound } from "next/navigation";
import { EditLessonForm } from "@/components/admin/EditLessonForm";

export default async function EditLessonPage({
  params,
}: {
  params: {
    id: string;
    moduleSlug: string;
    lessonSlug: string;
  };
}) {
  const { id: courseId, moduleSlug, lessonSlug } = params;

  const [lesson, modules] = await Promise.all([
    getLessonData(courseId, moduleSlug, lessonSlug),
    getAllModulesData(courseId),
  ]);

  if (!lesson) {
    notFound();
  }

  return (
    <EditLessonForm
      courseId={courseId}
      moduleSlug={moduleSlug}
      initialLesson={lesson}
      modules={modules.map((m) => m.slug)}
    />
  );
}
