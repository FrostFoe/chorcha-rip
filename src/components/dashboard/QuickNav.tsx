// This file mocks database tables for profiles and enrollments.
// In a real application, this data would live in a database.
// The keys for userProfiles and userEnrollments would be the user's UUID from Supabase Auth.

// We don't have access to the actual user IDs, so we'll use placeholder IDs.
// When the app runs, the `useSupabase` hook will provide the real user ID,
// but for this static file, we can't know them in advance.
// The logic in the components will have to handle cases where the user ID doesn't exist here.

import type { Assignment } from "./types"

interface UserProfile {
  full_name: string
  avatar_url: string
}

export const userProfiles: Record<string, UserProfile> = {
  // Example user ID, replace with actual user IDs from your Supabase Auth
  "placeholder-user-id-1": {
    full_name: "ডেমো ব্যবহারকারী",
    avatar_url: "https://picsum.photos/seed/demo-user/100/100",
  },
}

interface Enrollment {
  courseId: string
  progress: number
}

interface UserEnrollment {
  enrolledCourses: Enrollment[]
}

export const userEnrollments: Record<string, UserEnrollment> = {
  // Example user ID
  "placeholder-user-id-1": {
    enrolledCourses: [{ courseId: "1", progress: 75 }],
  },
}

export const questionBankExams = [
  { name: "BUET Preli 2022", questions: 100, time: 60 },
  { name: "Medical 2022", questions: 100, time: 60 },
  { name: "IUT 2022", questions: 100, time: 60 },
]

export const questionBankExams2 = [
  { name: "Dental 2022", questions: 100, time: 60 },
  { name: "BCS Preli 2022", questions: 100, time: 60 },
  { name: "Rajshahi University 2022", questions: 100, time: 60 },
]

export const questionBankExams3 = [
  { name: "Rajshahi University 2022", questions: 100, time: 60 },
  { name: "Dhaka University A 2022", questions: 100, time: 60 },
  { name: "CKRUET 2022", questions: 100, time: 60 },
]

export const analysisData = [
  { year: "2017", height: "63.288%" },
  { year: "2018", height: "77.8344%" },
  { year: "2019", height: "67.4091%" },
  { year: "2020", height: "65.5979%" },
  { year: "2021", height: "71.5741%" },
  { year: "2022", height: "79.0024%" },
]

export const quickPractice = [
  "ব্রিটিশ শাসনের বিরুদ্ধে বাঙালিদের প্রথম বিদ্রোহ-",
  "ফকির ও সন্ন্যাসী বিদ্রোহ",
  "নীল বিদ্রোহ",
  "সিপাহী বিদ্রোহ",
  "আগস্ট (১৯৪২) বিদ্রোহ",
]

export const testimonials = [
  {
    name: "Kankhito's World",
    avatar:
      "https://play-lh.googleusercontent.com/a-/ALV-UjV8IQfoKEz-v2Wx7ISqxcrVZaU3JtekP5xwrzVPFfRdJ7I",
    review:
      "This is really a great platform for the students of HSC and Admission candidates. The app design is outstanding.....and the main thing is.....a student won't need any hardcopy book for practice if he has 'chorcha' app. There are millions of questions. Student can himself choose about his exam , after giving a exam , chorcha will show the weakness topics . Personally, I feel much fun when I use the feature ' fast practice ' .",
  },
  {
    name: "sohan ahmed",
    avatar:
      "https://play-lh.googleusercontent.com/a-/ALV-UjVvlDPdBTnN04uwb4ZGKhwS9vmJkJTgni6UxhlFuAnU168",
    review:
      "Whose who are studying only online platform, they will feel the necessity of giving exam or some sort of test. But they can't have that proper way to give it frequently. So, for them this app can be a great companion I think. Though this app does have some bugs, if they were fixed, it can be better than good.",
  },
  {
    name: "Abdullah Shahriar",
    avatar:
      "https://play-lh.googleusercontent.com/a-/ALV-UjXaZ40evr2dMx8sWjtTpZrcxD9XuGtnfr38_Rv1ZhIYRlg",
    review:
      "Chorcha is a fantastic online exam app that has helped me immensely in my studies and exam preparation. It is a comprehensive platform with a vast library of practice questions, mock exams, and other resources that cover a wide range of subjects and topics.",
  },
  {
    name: "Gaming Riyadh",
    avatar:
      "https://play-lh.googleusercontent.com/a/ACg8ocKj0ZKi-0N1Iji86iyjnxeMrYNjCs0V477Mp692qNpX",
    review:
      "This Chorcha app is very much helpful for student's exam practice. A student can easily practice exam on any chapter or topic of that chapter. So, It's very helpful for a admission student.",
  },
]

export const leaderboard = [
  {
    avatar: "https://i.pravatar.cc/150?u=student1",
    name: "তাসপিয়া নাসরিন",
    college: "ঢাকা কলেজ",
  },
  {
    avatar: "https://i.pravatar.cc/150?u=student2",
    name: "ফারদিন ফাহিম",
    college: "রাজশাহী কলেজ",
  },
  {
    avatar: "https://i.pravatar.cc/150?u=student3",
    name: "মোঃ ফাহিম",
    college: "চট্টগ্রাম কলেজ",
  },
  {
    avatar: "https://i.pravatar.cc/150?u=student4",
    name: "ওয়ালিদ হাসান",
    college: "আনন্দ মোহন কলেজ",
  },
  {
    avatar: "https://i.pravatar.cc/150?u=student5",
    name: "আফরিন সুলতানা",
    college: "নটর ডেম কলেজ",
  },
  {
    avatar: "https://i.pravatar.cc/150?u=student6",
    name: "মেহেদি হাসান",
    college: "ভিক্টোরিয়া কলেজ",
  },
]

export interface DashboardProgressItem {
  subject: string
  percentage: number
}

export const dashboardProgress: DashboardProgressItem[] = [
  { subject: "পদার্থবিজ্ঞান", percentage: 0.11 },
  { subject: "রসায়ন", percentage: 0.66 },
  { subject: "উচ্চতর গণিত", percentage: 0 },
  { subject: "জীববিজ্ঞান", percentage: 0.3 },
  { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", percentage: 5.77 },
  { subject: "বাংলা", percentage: 0.95 },
  { subject: "English", percentage: 0.69 },
  { subject: "সাধারণ জ্ঞান", percentage: 0.27 },
]

export const allAssignments: Partial<Assignment>[] = [
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
