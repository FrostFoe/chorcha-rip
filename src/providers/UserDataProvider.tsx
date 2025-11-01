"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSupabase } from "@/app/supabase-provider";
import type { Course, Lesson } from "@/lib/types";

interface EnrolledCourse extends Course {
  progress: number;
}

interface UserDataContextType {
  enrolledCourses: EnrolledCourse[];
  loading: boolean;
  enrollCourse: (courseId: string) => void;
  getLessonProgress: (courseSlug: string) => string[];
  updateLessonProgress: (courseSlug: string, lessonSlug: string) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined,
);

interface UserDataProviderProps {
  children: React.ReactNode;
  allCourses: Course[];
  allLessons: Lesson[];
}

export function UserDataProvider({
  children,
  allCourses,
  allLessons,
}: UserDataProviderProps) {
  const { session } = useSupabase();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrolledCourses = useCallback(async () => {
    if (!session?.user) {
      setEnrolledCourses([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
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
            const totalLessons = allLessons.filter((l) =>
              l.slug.startsWith(course.slug),
            ).length;
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
      console.error("Failed to fetch enrolled courses:", error);
      setEnrolledCourses([]);
    } finally {
      setLoading(false);
    }
  }, [session, allCourses, allLessons]);

  useEffect(() => {
    fetchEnrolledCourses();

    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key?.startsWith("chorcha-enrollments-") ||
        e.key?.startsWith("chorcha-progress-")
      ) {
        fetchEnrolledCourses();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [fetchEnrolledCourses]);

  const enrollCourse = (courseId: string) => {
    if (!session?.user) return;
    const enrollmentsKey = `chorcha-enrollments-${session.user.id}`;
    const enrolledIds: string[] = JSON.parse(
      localStorage.getItem(enrollmentsKey) || "[]",
    );
    if (!enrolledIds.includes(courseId)) {
      const updatedIds = [...enrolledIds, courseId];
      localStorage.setItem(enrollmentsKey, JSON.stringify(updatedIds));
      fetchEnrolledCourses(); // Re-fetch to update state
    }
  };

  const getLessonProgress = (courseSlug: string): string[] => {
    if (!session?.user) return [];
    const course = allCourses.find((c) => c.slug === courseSlug);
    if (!course) return [];

    const progressKey = `chorcha-progress-${course.slug}-${session.user.id}`;
    const storedProgress = localStorage.getItem(progressKey);
    return storedProgress ? JSON.parse(storedProgress) : [];
  };

  const updateLessonProgress = (courseSlug: string, lessonSlug: string) => {
    if (!session?.user) return;
    const course = allCourses.find((c) => c.slug === courseSlug);
    if (!course) return;

    const progressKey = `chorcha-progress-${course.slug}-${session.user.id}`;
    const completedSlugs = getLessonProgress(courseSlug);

    if (!completedSlugs.includes(lessonSlug)) {
      const updatedSlugs = [...completedSlugs, lessonSlug];
      localStorage.setItem(progressKey, JSON.stringify(updatedSlugs));
      fetchEnrolledCourses(); // Re-fetch to update progress percentage
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        enrolledCourses,
        loading,
        enrollCourse,
        getLessonProgress,
        updateLessonProgress,
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
