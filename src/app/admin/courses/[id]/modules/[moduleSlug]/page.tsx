"use server";

import { getModuleData } from "@/lib/modules";
import { notFound } from "next/navigation";
import { EditModuleForm } from "@/components/admin/EditModuleForm";

export default async function EditModulePage({
  params,
}: {
  params: { id: string; moduleSlug: string };
}) {
  const { id: courseId, moduleSlug } = params;
  const module = await getModuleData(courseId, moduleSlug);

  if (!module) {
    notFound();
  }

  return <EditModuleForm courseId={courseId} initialModule={module} />;
}
