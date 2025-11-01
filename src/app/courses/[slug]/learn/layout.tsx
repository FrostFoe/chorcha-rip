import { CourseLearnLayout } from "@/components/courses/CourseLearnLayout";
import { notFound } from "next/navigation";
import { getCourseData } from "@/lib/courses";
import { getAllLessonsData } from "@/lib/lessons";
import { getAllModulesData } from "@/lib/modules";

export default async function CourseLearnPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string; lessonSlug: string };
}) {
  const course = await getCourseData(params.slug);
  if (!course) {
    notFound();
  }

  const modules = await getAllModulesData(params.slug);
  const lessons = await getAllLessonsData(params.slug);

  return (
    <CourseLearnLayout
      course={course}
      modules={modules}
      lessons={lessons}
      activeLessonSlug={params.lessonSlug}
    >
      {children}
    </CourseLearnLayout>
  );
}
