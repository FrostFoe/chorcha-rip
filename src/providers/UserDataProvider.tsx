
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
  isEnrolled: (courseId: string) => boolean;
  gemBalance: number;
  addGems: (amount: number) => void;
  spendGems: (amount: number) => boolean;
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
  const [gemBalance, setGemBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const getCourseBySlug = (slug: string) => {
    return allCourses.find((c) => c.slug === slug);
  };

  const getLessonsForCourse = (courseSlug: string) => {
    return allLessons.filter((l) => {
      // Assuming lesson module slugs are prefixed with the course slug, e.g., "hsc-physics-1-vectors"
      const course = getCourseBySlug(courseSlug);
      if (!course) return false;
      const moduleCourseSlug = l.module.split("-").slice(0, -1).join("-");
      // This logic might need to be more robust based on actual slug structures.
      // A simpler way could be to have a courseId in the lesson data.
      // For now, let's assume a course category folder structure is enough.
      return allLessons.some(lesson => lesson.slug === l.slug && getCourseFromLesson(lesson) === courseSlug);
    });
  };

  const getCourseFromLesson = (lesson: Lesson): string | undefined => {
      // This is a bit of a hack. A better data model would link lessons to courses via ID.
      // E.g. lesson.module = 'vectors' and we know 'vectors' belongs to 'hsc-physics-1'.
      // For now, we'll assume the file path structure is our source of truth.
      const course = allCourses.find(c => {
          const lessonsForCourse = allLessons.filter(l => l.module.startsWith(c.slug));
          return lessonsForCourse.some(l => l.slug === lesson.slug);
      });
      return course?.slug;
  }

  const fetchUserData = useCallback(async () => {
    if (!session?.user) {
      setEnrolledCourses([]);
      setGemBalance(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Fetch Gem Balance
      const gemKey = `chorcha-gems-${session.user.id}`;
      const storedGems = localStorage.getItem(gemKey);
      setGemBalance(storedGems ? parseInt(storedGems, 10) : 500); // Start with 500 gems

      // Fetch Enrolled Courses
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
              (l) => getCourseFromLesson(l) === course.slug
            );
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
      setEnrolledCourses([]);
      setGemBalance(0);
    } finally {
      setLoading(false);
    }
  }, [session, allCourses, allLessons]);

  useEffect(() => {
    fetchUserData();

    const handleStorageChange = (e: StorageEvent | CustomEvent) => {
      // Check for custom event
      if (e instanceof CustomEvent && e.type === "chorcha:storage") {
        fetchUserData();
        return;
      }

      // Check for StorageEvent
      if (e instanceof StorageEvent) {
          if (
            e.key?.startsWith("chorcha-enrollments-") ||
            e.key?.startsWith("chorcha-progress-") ||
            e.key?.startsWith("chorcha-gems-")
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
  }, [fetchUserData]);


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
    updateGemBalance(gemBalance + amount);
  };

  const spendGems = (amount: number) => {
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
