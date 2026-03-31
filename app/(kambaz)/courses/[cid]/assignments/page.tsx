/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import { RootState } from "../../../store";
import { deleteAssignment, setAssignments } from "../assignments/reducer";
import AssignmentControls from "./assignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentGroupControlButtons from "./AssignmentGroupControlButtons";
import * as client from "../../client";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const courseAssignments = assignments.filter((a: any) => a.course === cid);
  const isFaculty = currentUser?.role === "FACULTY";

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  const removeAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  return (
    <div>
      <AssignmentControls />
      <br />

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignment-group p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <span>ASSIGNMENTS</span>
            <div className="ms-auto">
              <AssignmentGroupControlButtons />
            </div>
          </div>

          <ListGroup className="wd-assignments rounded-0">
            {courseAssignments.map((a: any) => (
              <ListGroupItem key={a._id} className="wd-assignment p-3 ps-1">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <FaRegFileAlt className="me-2 fs-4 text-success" />

                  <Link
                    href={`/courses/${cid}/assignments/${a._id}`}
                    className="text-decoration-none text-black"
                  >
                    {a.title || a.name}
                  </Link>

                  <div className="ms-auto d-flex align-items-center">
                    {isFaculty && (
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={(e) => {
                          e.preventDefault();
                          const ok = window.confirm(
                            "Are you sure you want to remove this assignment?"
                          );
                          if (ok) {
                            removeAssignment(a._id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    )}
                    <AssignmentControlButtons />
                  </div>
                </div>

                <div className="small ms-5">
                  <span className="text-danger">Multiple Modules</span>
                  <span className="text-secondary">
                    {" "}
                    | Available From{" "}
                    {a.availableFromDate ||
                      a.availableFrom ||
                      "May 6 at 12:00am"}{" "}
                    | Due {a.dueDate || "May 13 at 11:59pm"} |{" "}
                    {a.points || 100} pts
                  </span>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}