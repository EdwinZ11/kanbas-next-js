import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import AssignmentControls from "./assignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentGroupControlButtons from "./AssignmentGroupControlButtons";

export default async function Assignments({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;

  return (
    <div>
      <AssignmentControls />
      <br />

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignment-group p-0 mb-5 fs-5 border-gray">
          {/* GROUP HEADER (flex + vertical center + buttons right) */}
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <span>ASSIGNMENTS</span>
            <div className="ms-auto">
              <AssignmentGroupControlButtons />
            </div>
          </div>

          <ListGroup className="wd-assignments rounded-0">
            {/* A1 */}
            <ListGroupItem className="wd-assignment p-3 ps-1">
              {/* TOP LINE (flex + vertical center + buttons right) */}
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <FaRegFileAlt className="me-2 fs-4 text-success" />

                <Link
                  href={`/courses/${cid}/assignments/123`}
                  className="text-decoration-none text-black"
                >
                  A1 - ENV + HTML
                </Link>

                <div className="ms-auto">
                  <AssignmentControlButtons />
                </div>
              </div>

              {/* SUBTEXT */}
              <div className="small ms-5">
                <span className="text-danger">Multiple Modules</span>
                <span className="text-secondary">
                  {" "}
                  | Not available until May 6 at 12:00am | Due May 13 at 11:59pm
                  | 100 pts
                </span>
              </div>
            </ListGroupItem>

            {/* A2 */}
            <ListGroupItem className="wd-assignment p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <FaRegFileAlt className="me-2 fs-4 text-success" />

                <Link
                  href={`/courses/${cid}/assignments/123`}
                  className="text-decoration-none text-black"
                >
                  A2 - CSS + BOOTSTRAP
                </Link>

                <div className="ms-auto">
                  <AssignmentControlButtons />
                </div>
              </div>

              <div className="small ms-5">
                <span className="text-danger">Multiple Modules</span>
                <span className="text-secondary">
                  {" "}
                  | Not available until May 13 at 12:00am | Due May 20 at 11:59pm
                  | 100 pts
                </span>
              </div>
            </ListGroupItem>

            {/* A3 */}
            <ListGroupItem className="wd-assignment p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <FaRegFileAlt className="me-2 fs-4 text-success" />

                <Link
                  href={`/courses/${cid}/assignments/123`}
                  className="text-decoration-none text-black"
                >
                  A3 - JAVASCRIPT + REACT
                </Link>

                <div className="ms-auto">
                  <AssignmentControlButtons />
                </div>
              </div>

              <div className="small ms-5">
                <span className="text-danger">Multiple Modules</span>
                <span className="text-secondary">
                  {" "}
                  | Not available until May 20 at 12:00am | Due May 27 at 11:59pm
                  | 100 pts
                </span>
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
