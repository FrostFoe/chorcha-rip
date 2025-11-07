"use server";

import { Certificate } from "@/components/courses/Certificate";
import { getCourseData } from "@/lib/courses";
import { notFound } from "next/navigation";

export default async function CertificatePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const course = await getCourseData(slug);

  if (!course) {
    notFound();
  }

  return <Certificate courseName={course.title} />;
}
