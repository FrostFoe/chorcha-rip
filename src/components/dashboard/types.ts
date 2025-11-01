export interface Assignment {
  id: string
  slug: string
  title: string
  courseName: string
  dueDate: string
  status?: "Pending" | "Submitted"
  body: string
  course: string
  completed: boolean
}
