import type { Lesson } from "@/lib/types"

export const lessons: Lesson[] = [
  {
    title: "Course Introduction",
    slug: "introduction",
    duration: "5:00",
    lessonType: "video",
    content: "dQw4w9WgXcQ", // Example YouTube Video ID
    completed: false,
    module: "introduction",
  },
  {
    title: "Understanding Vectors",
    slug: "vectors",
    duration: "20:00",
    lessonType: "article",
    content: `
A vector is a quantity that has both magnitude and direction. It is typically represented by an arrow whose direction is the same as that of the quantity and whose length is proportional to the quantity's magnitude.

**Key properties of vectors:**
- Magnitude
- Direction
- Can be added and subtracted
`,
    completed: false,
    module: "vectors",
  },
  {
    title: "Quiz: Vectors",
    slug: "vectors-quiz",
    duration: "10:00",
    lessonType: "quiz",
    content: [
      {
        questionText: "Which of the following is a scalar quantity?",
        options: ["Velocity", "Force", "Mass", "Acceleration"],
        correctAnswer: 2,
      },
      {
        questionText: "The magnitude of a unit vector is always:",
        options: ["0", "1", "Greater than 1", "Depends on the vector"],
        correctAnswer: 1,
      },
    ],
    completed: false,
    module: "vectors",
  },
]
