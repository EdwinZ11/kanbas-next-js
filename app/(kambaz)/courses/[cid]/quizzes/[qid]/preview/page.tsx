"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

export default function QuizPreviewPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center mb-3">
        <h2 className="me-auto">Quiz Preview</h2>
        <Button
          variant="danger"
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}
        >
          Edit Quiz
        </Button>
      </div>

      <p className="text-secondary">
        This preview uses the same interface as the student quiz screen, but preview answers are not saved.
      </p>

      <Button
        variant="primary"
        onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/take?preview=true`)}
      >
        Start Preview
      </Button>
    </div>
  );
}