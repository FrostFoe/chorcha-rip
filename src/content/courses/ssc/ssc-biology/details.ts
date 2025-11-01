import type { CourseDetails } from "@/lib/types"

export const details: CourseDetails = {
  totalDuration: "9 ঘন্টা",
  description: "এসএসসি শিক্ষার্থীদের জন্য জীববিজ্ঞান বিষয়ের পূর্ণাঙ্গ প্রস্তুতি।",
  instructor: {
    name: "Imran Hossain",
    avatar: "https://i.pravatar.cc/150?u=imran",
    rating: 4.6,
  },
  modules: [
    {
      title: "Cell and its Structure",
      slug: "cell-and-its-structure",
      lessons: [],
    },
    {
      title: "Genetics and Evolution",
      slug: "genetics-and-evolution",
      lessons: [],
    },
  ],
  outcomes: [
    { icon: "Lightbulb", text: "জীববিজ্ঞানের মৌলিক বিষয়গুলি সম্পর্কে জানুন।" },
    {
      icon: "TrendingUp",
      text: "বংশগতি এবং বিবর্তন সম্পর্কে ধারণা অর্জন করুন।",
    },
    {
      icon: "Target",
      text: "এসএসসি পরীক্ষায় জীববিজ্ঞানে ভালো নম্বর পাওয়ার জন্য প্রস্তুত হন।",
    },
  ],
}
