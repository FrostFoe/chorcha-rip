import type { Course } from "@/lib/types"

export const course: Course = {
  id: "1",
  title: "HSC Physics 1st Paper",
  name: "HSC Physics 1st Paper",
  slug: "hsc-physics-1st-paper",
  description:
    "A comprehensive course covering the fundamentals of Physics for HSC students.",
  image: "https://picsum.photos/seed/physics/1200/800",
  thumbnail: "https://picsum.photos/seed/physics/600/400",
  instructor: "Dr. Anisul Haque",
  price: 500,
  category: "hsc",
  outcomes: [
    "Understand the core concepts of vectors and their applications.",
    "Master the laws of motion and solve related problems.",
    "Gain a solid foundation in thermodynamics and energy.",
    "Learn about the properties of matter and fluid mechanics.",
  ],
  body: `
### About this course

This course is designed to provide a complete understanding of the HSC Physics 1st Paper syllabus. We will cover all the essential topics through detailed video lectures, articles, and quizzes.

- In-depth explanation of all chapters.
- Problem-solving sessions for mathematical concepts.
- Regular quizzes to test your understanding.
- Assignments to practice what you've learned.
`,
}
