"use server";

import { getAllCoursesData } from "@/lib/courses";
import { BrowseClient } from "./browse-client";

export default async function BrowsePage() {
  const courses = await getAllCoursesData();
  return <BrowseClient courses={courses} />;
}
