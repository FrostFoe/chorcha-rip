"use server";

import { getAllCoursesData } from "./courses";
import { getAllModulesData } from "./modules";

export async function getAdminStats() {
  try {
    const allCourses = await getAllCoursesData();
    const totalCourses = allCourses.length;

    const modulePromises = allCourses.map((course) =>
      getAllModulesData(course.id),
    );
    const allModulesNested = await Promise.all(modulePromises);
    const allModules = allModulesNested.flat();

    const totalModules = allModules.length;
    const totalLessons = allModules.reduce(
      (acc, module) => acc + (module.lessons?.length || 0),
      0,
    );

    return {
      totalCourses,
      totalModules,
      totalLessons,
    };
  } catch (error) {
    console.error("Error calculating stats:", error);
    return {
      totalCourses: 0,
      totalModules: 0,
      totalLessons: 0,
    };
  }
}
