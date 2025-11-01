import { notFound, redirect } from "next/navigation"
import { getCourseData } from "@/lib/courses"
import { getAllLessonsData } from "@/lib/lessons"

// This page now acts as a server-side redirect to the first available lesson.
export default async function CourseLearnRedirectPage({
  params,
}: {
  params: { slug: string }
}) {
  const course = await getCourseData(params.slug)

  if (!course) {
    notFound()
  }

  const allLessons = await getAllLessonsData(params.slug)

  const firstLesson = allLessons.find((l) => l.slug)

  if (!firstLesson) {
    // If there are no lessons, we can handle it gracefully.
    // For now, redirecting to the main course page might be best.
    redirect(`/courses/${params.slug}`)
  }

  // Redirect to the first lesson's page.
  redirect(`/courses/${params.slug}/learn/${firstLesson.slug}`)
}
