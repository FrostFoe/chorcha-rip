import type { Lesson } from "@/lib/types"

export const lessons: Lesson[] = [
  {
    title: "কোষ বিভাজন",
    slug: "cell-division",
    duration: "25:00",
    lessonType: "video",
    content: "L0k-enzoeOM", // Example YouTube video ID
    completed: false,
    module: "cell-and-its-structure",
  },
  {
    title: "বংশগতিবিদ্যা",
    slug: "genetics",
    duration: "15:00",
    lessonType: "article",
    content: `
বংশগতিবিদ্যা বা জেনেটিক্স হলো জিন, বংশবৈশিষ্ট্য এবং প্রজন্ম থেকে প্রজন্মান্তরে জীবের বংশবৈশিষ্ট্য সঞ্চারণ সম্পর্কিত علم। আধুনিক বংশগতিবিদ্যার জনক গ্রেগর জোহান মেন্ডেল।
`,
    completed: false,
    module: "genetics-and-evolution",
  },
]
