"use client";

import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

export default function QuizControls({
  onAddQuiz,
  isFaculty,
}: {
  onAddQuiz: () => void;
  isFaculty: boolean;
}) {
  return (
    <div id="wd-quizzes-controls" className="d-flex align-items-center mb-3">
      <InputGroup style={{ maxWidth: 420 }}>
        <span className="input-group-text bg-white">
          <FiSearch />
        </span>
        <FormControl
          placeholder="Search quizzes..."
          id="wd-search-quiz"
          className="border-start-0"
        />
      </InputGroup>

      {isFaculty && (
        <div className="ms-auto d-flex">
          <Button
            variant="danger"
            size="lg"
            className="me-1 float-end"
            id="wd-add-quiz-btn"
            onClick={onAddQuiz}
          >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Quiz
          </Button>
        </div>
      )}
    </div>
  );
}