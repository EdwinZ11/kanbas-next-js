import {
  Button,
  Col,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
      <FormControl id="wd-name" defaultValue="A1" className="mb-3" />

      <FormControl
        as="textarea"
        id="wd-description"
        rows={8}
        className="mb-4"
        defaultValue={`The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kambaz application
• Links to all relevant source code repositories

The Kambaz application should include a link to navigate back to the landing page.`}
      />

      <Row className="mb-3 align-items-center">
        <Col xs={12} md={3} className="text-md-end">
          <FormLabel htmlFor="wd-points" className="mb-0">
            Points
          </FormLabel>
        </Col>
        <Col xs={12} md={9}>
          <FormControl id="wd-points" defaultValue={100} />
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col xs={12} md={3} className="text-md-end">
          <FormLabel htmlFor="wd-assignment-group" className="mb-0">
            Assignment Group
          </FormLabel>
        </Col>
        <Col xs={12} md={9}>
          <FormSelect id="wd-assignment-group" defaultValue="ASSIGNMENTS">
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
          <FormSelect id="wd-display-grade-as" defaultValue="PERCENTAGE">
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
          <FormSelect id="wd-submission-type" defaultValue="ONLINE">
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
                defaultChecked
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
              defaultValue="Everyone"
              className="mb-3"
            />

            <FormLabel htmlFor="wd-due-date">Due</FormLabel>
            <FormControl
              id="wd-due-date"
              type="datetime-local"
              defaultValue="2024-05-13T23:59"
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
                  defaultValue="2024-05-06T00:00"
                />
              </Col>
              <Col>
                <FormLabel htmlFor="wd-available-until">Until</FormLabel>
                <FormControl
                  id="wd-available-until"
                  type="datetime-local"
                  defaultValue="2024-05-20T23:59"
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="light" className="border">
          Cancel
        </Button>
        <Button variant="danger">Save</Button>
      </div>
    </div>
  );
}
