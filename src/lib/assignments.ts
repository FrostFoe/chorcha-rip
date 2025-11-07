"use server";

import type { Assignment } from "./types";
import fs from "node:fs/promises";
import path from "node:path";

const assignmentsDirectory = path.join(
  process.cwd(),
  "src/content/assignments",
);

async function getAssignmentFiles() {
  try {
    const files = await fs.readdir(assignmentsDirectory);
    return files.filter((file) => file.endsWith(".json"));
  } catch (error) {
    console.error("Error reading assignments directory:", error);
    return [];
  }
}

export async function getAssignmentsData(): Promise<Assignment[]> {
  const assignmentFiles = await getAssignmentFiles();
  const assignments = await Promise.all(
    assignmentFiles.map(async (file) => {
      const filePath = path.join(assignmentsDirectory, file);
      const fileContent = await fs.readFile(filePath, "utf-8");
      const assignment = JSON.parse(fileContent);
      return { ...assignment, slug: file.replace(/\.json$/, "") };
    }),
  );
  return assignments as Assignment[];
}

export async function getAssignmentData(
  id: string,
): Promise<Assignment | undefined> {
  const assignments = await getAssignmentsData();
  return assignments.find((assignment) => assignment.id === id);
}
