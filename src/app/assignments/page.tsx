"use server";

import { getAssignmentsData } from "@/lib/assignments";
import { AssignmentsClient } from "./assignments-client";

export default async function AssignmentsPage() {
  const staticAssignments = await getAssignmentsData();

  return <AssignmentsClient staticAssignments={staticAssignments} />;
}
