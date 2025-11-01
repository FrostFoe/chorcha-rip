import { notFound } from "next/navigation";
import { getCourseData } from "@/lib/courses";
import { getLessonData } from "@/lib/lessons";
import { LessonClient } from "./lesson-client";
import { serialize } from "next-mdx-remote/serialize";
import type { QuizQuestion } from "@/lib/types";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export default async function LessonPage({
  params,
}: {
  params: { slug: string; lessonSlug: string };
}) {
  const { slug, lessonSlug } = params;

  const course = await getCourseData(slug);
  const lesson = await getLessonData(slug, lessonSlug);

  if (!course || !lesson) {
    notFound();
  }

  let mdxSource: MDXRemoteSerializeResult | undefined;
  if (lesson.lessonType === "article") {
    mdxSource = await serialize(lesson.content as string);
  } else if (lesson.lessonType === "quiz") {
    // Content is already an object, no need to serialize
  } else {
    // For video, no mdx content
  }

  return <LessonClient course={course} lesson={lesson} mdxSource={mdxSource} />;
}
