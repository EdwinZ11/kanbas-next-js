/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, useState, useEffect } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );

  const course = courses.find((course: any) => course._id === cid);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.push("/account/signin");
      return;
    }

    const isEnrolled = enrollments.some(
      (e: any) =>
        e.user === currentUser._id && e.course === cid
    );

    if (!isEnrolled) {
      router.push("/dashboard");
    }
  }, [currentUser, enrollments, cid, router]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowNav(!showNav)}
          style={{ cursor: "pointer" }}
        />
        {course?.name}
      </h2>
      <hr />

      <div className="d-flex">
        {showNav && (
          <div className="d-none d-md-block">
            <CourseNavigation cid={cid} />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}