// This file mocks database tables for profiles and enrollments.
// In a real application, this data would live in a database.
// The keys for userProfiles and userEnrollments would be the user's UUID from Supabase Auth.

// We don't have access to the actual user IDs, so we'll use placeholder IDs.
// When the app runs, the `useSupabase` hook will provide the real user ID,
// but for this static file, we can't know them in advance.
// The logic in the components will have to handle cases where the user ID doesn't exist here.

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
