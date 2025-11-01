import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import type { Assignment } from "./types"

const allAssignments: Assignment[] = [
  {
    id: "1",
    slug: "vector-diagram",
    title: "ভেক্টর ডায়াগ্রাম তৈরি",
    courseName: "HSC Physics 1st Paper",
    dueDate: "2024-08-15",
    status: "Pending",
    body: "অ্যাসাইনমেন্টের বিস্তারিত এখানে থাকবে।",
  },
  {
    id: "2",
    slug: "cell-division",
    title: "কোষ বিভাজনের ধাপসমূহ চিত্রসহ বর্ণনা",
    courseName: "SSC Biology",
    dueDate: "2024-08-20",
    status: "Pending",
    body: "অ্যাসাইনমেন্টের বিস্তারিত এখানে থাকবে।",
  },
  {
    id: "3",
    slug: "newtons-third-law",
    title: "নিউটনের ৩য় সূত্রের বাস্তব প্রয়োগ",
    courseName: "HSC Physics 1st Paper",
    dueDate: "2024-08-25",
    status: "Submitted",
    body: "অ্যাসাইনমেন্টের বিস্তারিত এখানে থাকবে।",
  },
]

export async function getAssignmentsData(): Promise<Assignment[]> {
  // This is a placeholder. In a real app, you'd fetch this from a database
  // or a more robust file-based system. For now, we return the static array.
  return allAssignments
}

export async function getAssignmentData(
  id: string
): Promise<Assignment | undefined> {
  const assignments = await getAssignmentsData()
  return assignments.find((assignment) => assignment.id === id)
}
