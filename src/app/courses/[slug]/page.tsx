import { notFound } from "next/navigation";
import { getCourseData } from "@/lib/courses";
import { CourseClient } from "./course-client";
import { serialize } from "next-mdx-remote/serialize";

export default async function CoursePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const course = await getCourseData(slug);

  if (!course) {
    notFound();
  }

  const mdxSource = await serialize(course.body);

  return <CourseClient course={course} mdxSource={mdxSource} />;
}
