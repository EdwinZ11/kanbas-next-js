/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../../database";
import {
  Col,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();

  const assignment: any = db.assignments.find(
    (a: any) => a._id === aid && a.course === cid
  );

  const title = assignment?.title ?? "A1";
  const description =
    assignment?.description ??
    `The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kambaz application
• Links to all relevant source code repositories

The Kambaz application should include a link to navigate back to the landing page.`;

  const points = assignment?.points ?? 100;
  const group = assignment?.group ?? "ASSIGNMENTS";
  const displayGradeAs = assignment?.displayGradeAs ?? "PERCENTAGE";
  const submissionType = assignment?.submissionType ?? "ONLINE";
  const assignTo = assignment?.assignTo ?? "Everyone";

  const dueDate = assignment?.dueDate ?? "2024-05-13T23:59";
  const availableFrom = assignment?.availableFrom ?? "2024-05-06T00:00";
  const availableUntil = assignment?.availableUntil ?? "2024-05-20T23:59";

  return (
    <div id="wd-assignments-editor" className="p-3">
      <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
      <FormControl id="wd-name" defaultValue={title} className="mb-3" />

      <FormControl
        as="textarea"
        id="wd-description"
        rows={8}
        className="mb-4"
        defaultValue={description}
      />

      <Row className="mb-3 align-items-center">
        <Col xs={12} md={3} className="text-md-end">
          <FormLabel htmlFor="wd-points" className="mb-0">
            Points
          </FormLabel>
        </Col>
        <Col xs={12} md={9}>
          <FormControl id="wd-points" defaultValue={points} />
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col xs={12} md={3} className="text-md-end">
          <FormLabel htmlFor="wd-assignment-group" className="mb-0">
            Assignment Group
          </FormLabel>
        </Col>
        <Col xs={12} md={9}>
          <FormSelect id="wd-assignment-group" defaultValue={group}>
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
          <FormSelect id="wd-display-grade-as" defaultValue={displayGradeAs}>
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
          <FormSelect id="wd-submission-type" defaultValue={submissionType}>
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
                defaultChecked={assignment?.textEntry ?? false}
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
                defaultChecked={assignment?.websiteUrl ?? true}
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
                defaultChecked={assignment?.mediaRecordings ?? false}
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
                defaultChecked={assignment?.studentAnnotation ?? false}
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
                defaultChecked={assignment?.fileUploads ?? false}
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
              defaultValue={assignTo}
              className="mb-3"
            />

            <FormLabel htmlFor="wd-due-date">Due</FormLabel>
            <FormControl
              id="wd-due-date"
              type="datetime-local"
              defaultValue={dueDate}
              className="mb-3"
            />

            <Row>
              <Col>
                <FormLabel htmlFor="wd-available-from">
                  Available from
                </FormLabel>
                <FormControl
                  id="wd-available-from"
                  type="datetime-local"
                  defaultValue={availableFrom}
                />
              </Col>
              <Col>
                <FormLabel htmlFor="wd-available-until">Until</FormLabel>
                <FormControl
                  id="wd-available-until"
                  type="datetime-local"
                  defaultValue={availableUntil}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Link
          href={`/courses/${cid}/assignments`}
          id="wd-cancel-assignment"
          className="btn btn-light border"
        >
          Cancel
        </Link>
        <Link
          href={`/courses/${cid}/assignments`}
          id="wd-save-assignment"
          className="btn btn-danger"
        >
          Save
        </Link>
      </div>
    </div>
  );
}