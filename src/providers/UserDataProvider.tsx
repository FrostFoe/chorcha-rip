
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSupabase } from "@/app/supabase-provider";
import type { Course, Lesson, UserProfile } from "@/lib/types";

interface EnrolledCourse extends Course {
  progress: number;
}

interface UserDataContextType {
  enrolledCourses: EnrolledCourse[];
  loading: boolean;
  enrollCourse: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  gemBalance: number;
  addGems: (amount: number) => void;
  spendGems: (amount: number) => boolean;
  getLessonProgress: (courseSlug: string) => string[];
  updateLessonProgress: (courseSlug: string, lessonSlug: string) => void;
  profile: UserProfile | null;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  isAssignmentSubmitted: (assignmentId: string) => boolean;
  submitAssignment: (assignmentId: string) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined,
);

interface UserDataProviderProps {
  children: React.ReactNode;
  allCourses: Course[];
  allLessons: Lesson[];
}

const GUEST_PROFILE: UserProfile = {
  full_name: "Guest",
  avatar_url: "", // Empty string will trigger fallback to icon
};

export function UserDataProvider({
  children,
  allCourses,
  allLessons,
}: UserDataProviderProps) {
  const { session } = useSupabase();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [gemBalance, setGemBalance] = useState(0);
  const [profile, setProfile] = useState<UserProfile | null>(GUEST_PROFILE);
  const [submittedAssignments, setSubmittedAssignments] = useState<string[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    if (!session?.user) {
      setEnrolledCourses([]);
      setGemBalance(0);
      setProfile(GUEST_PROFILE);
      setSubmittedAssignments([]);
      setLoading(false);
      return;
    }

    try {
      // Fetch Gem Balance
      const gemKey = `chorcha-gems-${session.user.id}`;
      const storedGems = localStorage.getItem(gemKey);
      setGemBalance(storedGems ? parseInt(storedGems, 10) : 500);

      // Fetch Profile
      const profileKey = `chorcha-profile-${session.user.id}`;
      const storedProfile = localStorage.getItem(profileKey);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      } else {
        const defaultProfile = {
          full_name:
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            "ব্যবহারকারী",
          avatar_url:
            session.user.user_metadata?.avatar_url ||
            "https://picsum.photos/seed/avatar/100/100",
        };
        setProfile(defaultProfile);
        localStorage.setItem(profileKey, JSON.stringify(defaultProfile));
      }

      // Fetch Assignments
      const submissionsKey = `chorcha-submissions-${session.user.id}`;
      const submittedIds: string[] = JSON.parse(
        localStorage.getItem(submissionsKey) || "[]",
      );
      setSubmittedAssignments(submittedIds);

      // Fetch Enrolled Courses and their progress
      const enrollmentsKey = `chorcha-enrollments-${session.user.id}`;
      const enrolledIds: string[] = JSON.parse(
        localStorage.getItem(enrollmentsKey) || "[]",
      );

      const enrolled = allCourses
        .filter((course: Course) => enrolledIds.includes(course.id))
        .map((course: Course) => {
          const progressKey = `chorcha-progress-${course.slug}-${session.user.id}`;
          const progressData = localStorage.getItem(progressKey);
          let progress = 0;

          if (progressData) {
            const completedLessons: string[] = JSON.parse(progressData);
            const courseLessons = allLessons.filter(
              (l) => l.module && l.module.startsWith(course.slug),
            ); // Simplified logic
            const totalLessons = courseLessons.length;
            if (totalLessons > 0) {
              progress = (completedLessons.length / totalLessons) * 100;
            }
          }

          return {
            ...course,
            progress: Math.round(progress),
          };
        });

      setEnrolledCourses(enrolled);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      // Reset state on error
      setEnrolledCourses([]);
      setGemBalance(0);
      setProfile(GUEST_PROFILE);
      setSubmittedAssignments([]);
    } finally {
      setLoading(false);
    }
  }, [session, allCourses, allLessons]);

  useEffect(() => {
    fetchUserData();

    const handleStorageChange = (e: StorageEvent | CustomEvent) => {
      // Listen for custom event triggered by local changes
      if (e instanceof CustomEvent && e.type === "chorcha:storage") {
        fetchUserData();
        return;
      }
      // Listen for changes from other tabs
      if (e instanceof StorageEvent) {
        const key = e.key;
        if (!key) return;

        const isUserDataKey =
          key.startsWith("chorcha-enrollments-") ||
          key.startsWith("chorcha-progress-") ||
          key.startsWith("chorcha-gems-") ||
          key.startsWith("chorcha-profile-") ||
          key.startsWith("chorcha-submissions-");

        if (
          isUserDataKey &&
          (!session?.user || key.includes(session.user.id))
        ) {
          fetchUserData();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("chorcha:storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("chorcha:storage", handleStorageChange);
    };
  }, [fetchUserData, session]);

  const dispatchStorageEvent = () => {
    window.dispatchEvent(new CustomEvent("chorcha:storage"));
  };

  const updateGemBalance = (newBalance: number) => {
    if (!session?.user) return;
    const gemKey = `chorcha-gems-${session.user.id}`;
    localStorage.setItem(gemKey, newBalance.toString());
    setGemBalance(newBalance);
    dispatchStorageEvent();
  };

  const addGems = (amount: number) => {
    if (!session?.user) return;
    updateGemBalance(gemBalance + amount);
  };

  const spendGems = (amount: number) => {
    if (!session?.user) return false;
    if (gemBalance >= amount) {
      updateGemBalance(gemBalance - amount);
      return true;
    }
    return false;
  };

  const enrollCourse = (courseId: string) => {
    if (!session?.user) return;
    const enrollmentsKey = `chorcha-enrollments-${session.user.id}`;
    const enrolledIds: string[] = JSON.parse(
      localStorage.getItem(enrollmentsKey) || "[]",
    );
    if (!enrolledIds.includes(courseId)) {
      const updatedIds = [...enrolledIds, courseId];
      localStorage.setItem(enrollmentsKey, JSON.stringify(updatedIds));
      dispatchStorageEvent();
    }
  };

  const isEnrolled = (courseId: string): boolean => {
    return enrolledCourses.some((c) => c.id === courseId);
  };

  const getLessonProgress = (courseSlug: string): string[] => {
    if (!session?.user) return [];
    const progressKey = `chorcha-progress-${courseSlug}-${session.user.id}`;
    const storedProgress = localStorage.getItem(progressKey);
    return storedProgress ? JSON.parse(storedProgress) : [];
  };

  const updateLessonProgress = (courseSlug: string, lessonSlug: string) => {
    if (!session?.user) return;

    const progressKey = `chorcha-progress-${courseSlug}-${session.user.id}`;
    const completedSlugs = getLessonProgress(courseSlug);

    if (!completedSlugs.includes(lessonSlug)) {
      const updatedSlugs = [...completedSlugs, lessonSlug];
      localStorage.setItem(progressKey, JSON.stringify(updatedSlugs));
      dispatchStorageEvent();
    }
  };

  const updateProfile = async (newProfile: Partial<UserProfile>) => {
    if (!session?.user) return;
    const profileKey = `chorcha-profile-${session.user.id}`;
    const currentProfile = profile || { full_name: "", avatar_url: "" };
    const updatedProfile = { ...currentProfile, ...newProfile };
    localStorage.setItem(profileKey, JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
    dispatchStorageEvent();
  };

  const isAssignmentSubmitted = (assignmentId: string): boolean => {
    return submittedAssignments.includes(assignmentId);
  };

  const submitAssignment = (assignmentId: string) => {
    if (!session?.user) return;
    const submissionsKey = `chorcha-submissions-${session.user.id}`;
    if (!submittedAssignments.includes(assignmentId)) {
      const updatedSubmissions = [...submittedAssignments, assignmentId];
      localStorage.setItem(
        submissionsKey,
        JSON.stringify(updatedSubmissions),
      );
      setSubmittedAssignments(updatedSubmissions);
      dispatchStorageEvent();
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        enrolledCourses,
        loading,
        enrollCourse,
        isEnrolled,
        gemBalance,
        addGems,
        spendGems,
        getLessonProgress,
        updateLessonProgress,
        profile,
        updateProfile,
        isAssignmentSubmitted,
        submitAssignment,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
