/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as client from "../courses/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { setEnrollments, enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchAllCourses = async () => {
    try {
      const allCourses = await client.fetchAllCourses();
      dispatch(setCourses(allCourses));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const myEnrollments = await client.findMyEnrollments();
      dispatch(setEnrollments(myEnrollments));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      router.push("/account/signin");
      return;
    }
    fetchAllCourses();
    fetchEnrollments();
  }, [currentUser, router]);

  if (!currentUser) return null;

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === courseId
    );

  const visibleCourses = showAllCourses
    ? courses
    : courses.filter((c: any) => isEnrolled(c._id));

  const handleEnroll = async (courseId: string) => {
    await client.enrollIntoCourse("current", courseId);
    dispatch(enroll({ user: currentUser._id, course: courseId }));
  };

  const handleUnenroll = async (courseId: string) => {
    await client.unenrollFromCourse("current", courseId);
    dispatch(unenroll({ user: currentUser._id, course: courseId }));
  };

  const handleAddCourse = async () => {
    await client.createCourse(course);
    await fetchAllCourses();
    await fetchEnrollments();

    setCourse({
      _id: "0",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      image: "/images/reactjs.jpg",
      description: "New Description",
    });
  };

  const handleUpdateCourse = async () => {
    const updatedCourse = await client.updateCourse(course);
    const updatedCourses = courses.map((c: any) =>
      c._id === updatedCourse._id ? updatedCourse : c
    );
    dispatch(setCourses(updatedCourses));
  };

  const handleDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };

  return (
    <div id="wd-dashboard">
      <div className="d-flex align-items-center">
        <h1 id="wd-dashboard-title" className="me-auto">
          Dashboard
        </h1>
        <Button
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          Enrollments
        </Button>
      </div>

      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <Button
              variant="primary"
              className="float-end"
              onClick={handleAddCourse}
            >
              Add
            </Button>
            <Button
              variant="warning"
              className="float-end me-2"
              onClick={handleUpdateCourse}
            >
              Update
            </Button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((c: any) => {
            const enrolled = isEnrolled(c._id);

            return (
              <Col
                key={c._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={enrolled ? `/courses/${c._id}/home` : "/dashboard"}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(e) => {
                      if (!enrolled && !isFaculty) {
                        e.preventDefault();
                      }
                      if (isFaculty) {
                        e.preventDefault();
                        setCourse(c);
                      }
                    }}
                  >
                    <CardImg
                      variant="top"
                      src={c.image || "/images/reactjs.jpg"}
                      width="100%"
                      height={160}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {c.name}
                      </CardTitle>

                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {c.description}
                      </CardText>

                      <Button variant="primary">Go</Button>

                      {isFaculty && (
                        <Button
                          variant="danger"
                          className="float-end"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDeleteCourse(c._id);
                          }}
                        >
                          Delete
                        </Button>
                      )}

                      {!isFaculty && (
                        <>
                          {enrolled ? (
                            <Button
                              variant="danger"
                              className="float-end"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleUnenroll(c._id);
                              }}
                            >
                              Unenroll
                            </Button>
                          ) : (
                            <Button
                              variant="success"
                              className="float-end"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleEnroll(c._id);
                              }}
                            >
                              Enroll
                            </Button>
                          )}
                        </>
                      )}
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}