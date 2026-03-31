/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
  Button,
} from "react-bootstrap";
import { RootState } from "../../../../store";
import {
  addAssignment,
  updateAssignment as updateAssignmentInReducer,
} from "../../assignments/reducer";
import * as client from "../../../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  const existingAssignment = assignments.find(
    (a: any) => a._id === aid && a.course === cid
  );

  const isNew = aid === "new" || !existingAssignment;

  const [assignment, setAssignment] = useState<any>(
    existingAssignment || {
      _id: "new",
      course: cid,
      title: "A1",
      description: `The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kambaz application
• Links to all relevant source code repositories

The Kambaz application should include a link to navigate back to the landing page.`,
      points: 100,
      group: "ASSIGNMENTS",
      displayGradeAs: "PERCENTAGE",
      submissionType: "ONLINE",
      assignTo: "Everyone",
      dueDate: "2024-05-13T23:59",
      availableFrom: "2024-05-06T00:00",
      availableUntil: "2024-05-20T23:59",
      textEntry: false,
      websiteUrl: true,
      mediaRecordings: false,
      studentAnnotation: false,
      fileUploads: false,
    }
  );

  const save = async () => {
    if (isNew) {
      const newAssignment = await client.createAssignment(cid as string, {
        ...assignment,
        course: cid,
      });
      dispatch(addAssignment(newAssignment));
    } else {
      const updatedAssignment = await client.updateAssignment(assignment);
      dispatch(updateAssignmentInReducer(updatedAssignment));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const cancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
      <FormControl
        id="wd-name"
        value={assignment.title}
        className="mb-3"
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />

      <FormControl
        as="textarea"
        id="wd-description"
        rows={8}
        className="mb-4"
        value={assignment.description}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />

      <Row className="mb-3 align-items-center">
        <Col xs={12} md={3} className="text-md-end">
          <FormLabel htmlFor="wd-points" className="mb-0">
            Points
          </FormLabel>
        </Col>
        <Col xs={12} md={9}>
          <FormControl
            id="wd-points"
            type="number"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                points: parseInt(e.target.value),
              })
            }
          />
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col xs={12} md={3} className="text-md-end">
          <FormLabel htmlFor="wd-assignment-group" className="mb-0">
            Assignment Group
          </FormLabel>
        </Col>
        <Col xs={12} md={9}>
          <FormSelect
            id="wd-assignment-group"
            value={assignment.group}
            onChange={(e) =>
              setAssignment({ ...assignment, group: e.target.value })
            }
          >
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col xs={12} md={3} className="text-md-end">
          <FormLabel htmlFor="wd-display-grade-as" className="mb-0">
            Display Grade as
          </FormLabel>
        </Col>
        <Col xs={12} md={9}>
          <FormSelect
            id="wd-display-grade-as"
            value={assignment.displayGradeAs}
            onChange={(e) =>
              setAssignment({ ...assignment, displayGradeAs: e.target.value })
            }
          >
            <option value="PERCENTAGE">Percentage</option>
            <option value="POINTS">Points</option>
            <option value="LETTER_GRADE">Letter Grade</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col xs={12} md={3} className="text-md-end">
          <FormLabel htmlFor="wd-submission-type" className="mb-0">
            Submission Type
          </FormLabel>
        </Col>
        <Col xs={12} md={9}>
          <FormSelect
            id="wd-submission-type"
            value={assignment.submissionType}
            onChange={(e) =>
              setAssignment({ ...assignment, submissionType: e.target.value })
            }
          >
            <option value="ONLINE">Online</option>
            <option value="ON_PAPER">On Paper</option>
            <option value="NO_SUBMISSION">No Submission</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={3} className="text-md-end">
          <FormLabel className="mb-0">Online Entry Options</FormLabel>
        </Col>
        <Col xs={12} md={9}>
          <div className="border rounded p-3">
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="wd-text-entry"
                checked={assignment.textEntry}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    textEntry: e.target.checked,
                  })
                }
              />
              <label className="form-check-label" htmlFor="wd-text-entry">
                Text Entry
              </label>
            </div>

            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="wd-website-url"
                checked={assignment.websiteUrl}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    websiteUrl: e.target.checked,
                  })
                }
              />
              <label className="form-check-label" htmlFor="wd-website-url">
                Website URL
              </label>
            </div>

            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="wd-media-recordings"
                checked={assignment.mediaRecordings}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    mediaRecordings: e.target.checked,
                  })
                }
              />
              <label className="form-check-label" htmlFor="wd-media-recordings">
                Media Recordings
              </label>
            </div>

            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="wd-student-annotation"
                checked={assignment.studentAnnotation}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    studentAnnotation: e.target.checked,
                  })
                }
              />
              <label
                className="form-check-label"
                htmlFor="wd-student-annotation"
              >
                Student Annotation
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="wd-file-uploads"
                checked={assignment.fileUploads}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    fileUploads: e.target.checked,
                  })
                }
              />
              <label className="form-check-label" htmlFor="wd-file-uploads">
                File Uploads
              </label>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={3} className="text-md-end">
          <FormLabel className="mb-0">Assign</FormLabel>
        </Col>
        <Col xs={12} md={9}>
          <div className="border rounded p-3">
            <FormLabel htmlFor="wd-assign-to">Assign to</FormLabel>
            <FormControl
              id="wd-assign-to"
              value={assignment.assignTo}
              className="mb-3"
              onChange={(e) =>
                setAssignment({ ...assignment, assignTo: e.target.value })
              }
            />

            <FormLabel htmlFor="wd-due-date">Due</FormLabel>
            <FormControl
              id="wd-due-date"
              type="datetime-local"
              value={assignment.dueDate}
              className="mb-3"
              onChange={(e) =>
                setAssignment({ ...assignment, dueDate: e.target.value })
              }
            />

            <Row>
              <Col>
                <FormLabel htmlFor="wd-available-from">
                  Available from
                </FormLabel>
                <FormControl
                  id="wd-available-from"
                  type="datetime-local"
                  value={assignment.availableFrom}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      availableFrom: e.target.value,
                    })
                  }
                />
              </Col>
              <Col>
                <FormLabel htmlFor="wd-available-until">Until</FormLabel>
                <FormControl
                  id="wd-available-until"
                  type="datetime-local"
                  value={assignment.availableUntil}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      availableUntil: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button
          variant="light"
          className="border"
          id="wd-cancel-assignment"
          onClick={cancel}
        >
          Cancel
        </Button>
        <Button variant="danger" id="wd-save-assignment" onClick={save}>
          Save
        </Button>
      </div>
    </div>
  );
}