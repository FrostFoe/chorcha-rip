"use server";

import { getAssignmentData } from "@/lib/assignments";
import { notFound } from "next/navigation";
import { AssignmentDetailsClient } from "./assignment-details-client";

export default async function AssignmentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const assignment = await getAssignmentData(params.id);

  if (!assignment) {
    notFound();
  }

  return <AssignmentDetailsClient assignment={assignment} />;
}
