import {create} from 'zustand';
import { CoursesResults } from '@/types/courses';

interface CoursesState {
  coursesResults: CoursesResults | null;
  setCoursesResults: (coursesResults: CoursesResults) => void;
  updateCourse: (updatedCourse: CoursesResults['data'][0]) => void;
  clearCourses: () => void;
}

export const useCoursesStore = create<CoursesState>((set) => ({
  coursesResults: null,
  setCoursesResults: (coursesResults) => set({ coursesResults }),
  updateCourse: (updatedCourse) =>
    set((state) => ({
      coursesResults: {
        ...state.coursesResults!,
        data: state.coursesResults!.data.map((course) =>
          course.id === updatedCourse.id ? updatedCourse : course
        ),
      },
    })),
  clearCourses: () => set({ coursesResults: null }),
}));
