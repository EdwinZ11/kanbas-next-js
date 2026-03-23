/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as db from "../database";
import { useState } from "react";
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
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
} from "../courses/reducer";
import { RootState } from "../store";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const { enrollments } = db;
  const isFaculty = currentUser?.role === "FACULTY";

  const visibleCourses = isFaculty
    ? courses
    : courses.filter(
        (course) =>
          currentUser &&
          enrollments.some(
            (enrollment) =>
              enrollment.user === currentUser._id &&
              enrollment.course === course._id
          )
      );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <Button
              variant="primary"
              className="float-end"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </Button>
            <Button
              variant="warning"
              className="float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
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
          {visibleCourses.map((c) => (
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/courses/${c._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src="/images/reactjs.jpg"
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
                      <>
                        <Button
                          variant="danger"
                          className="float-end"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            dispatch(deleteCourse(c._id));
                          }}
                          id="wd-delete-course-click"
                        >
                          Delete
                        </Button>

                        <Button
                          variant="warning"
                          className="float-end me-2"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCourse(c);
                          }}
                        >
                          Edit
                        </Button>
                      </>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}