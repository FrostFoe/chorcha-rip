import { CourseLearnLayout } from "@/components/courses/CourseLearnLayout";
import { getCourseAndModulesData } from "@/lib/courses";
import { notFound } from "next/navigation";

export default async function CourseLearnPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const data = await getCourseAndModulesData(params.slug);
  if (!data) {
    notFound();
  }

  return (
    <CourseLearnLayout course={data.course} modules={data.modules}>
      {children}
    </CourseLearnLayout>
  );
}
