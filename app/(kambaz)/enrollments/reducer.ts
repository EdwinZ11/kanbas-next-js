/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../database";

const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },
    enroll: (state, { payload }) => {
      const alreadyEnrolled = state.enrollments.some(
        (e: any) => e.user === payload.userId && e.course === payload.courseId
      );
      if (!alreadyEnrolled) {
        state.enrollments = [
          ...state.enrollments,
          {
            _id: new Date().getTime().toString(),
            user: payload.userId,
            course: payload.courseId,
          },
        ] as any;
      }
    },
    unenroll: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) =>
          !(e.user === payload.userId && e.course === payload.courseId)
      ) as any;
    },
  },
});

export const { setEnrollments, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;