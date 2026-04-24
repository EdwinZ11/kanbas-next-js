/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../../../client";

export default function QuizDetailsPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  useEffect(() => {
    const loadQuiz = async () => {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);

      if (isStudent) {
        try {
          const count = await client.countMyQuizAttempts(qid as string);
          setAttemptCount(count || 0);
          const latest = await client.findMyLatestQuizAttempt(qid as string);
          setLatestAttempt(latest);
        } catch {
          setAttemptCount(0);
          setLatestAttempt(null);
        }
      }
    };

    loadQuiz();
  }, [qid, currentUser?._id, isStudent]);

  if (!quiz) return null;

  const totalPoints =
    quiz.questions?.reduce(
      (sum: number, q: any) => sum + (q.points || 0),
      0
    ) || 0;

  const canRetake =
    isStudent &&
    (quiz.multipleAttempts
      ? attemptCount < (quiz.howManyAttempts || 1)
      : attemptCount < 1);

  const togglePublish = async () => {
    const updatedQuiz = quiz.published
      ? await client.unpublishQuiz(quiz._id)
      : await client.publishQuiz(quiz._id);
    setQuiz(updatedQuiz);
  };

  return (
    <div className="p-3" id="wd-quiz-details">
      <div className="d-flex align-items-center mb-3">
        <h2 className="me-auto">
          {quiz.title}{" "}
          {!quiz.published && (
            <span className="text-secondary fs-6">(Unpublished)</span>
          )}
        </h2>

        {isFaculty && (
          <>
            <Button
              variant={quiz.published ? "warning" : "success"}
              className="me-2"
              onClick={togglePublish}
            >
              {quiz.published ? "Unpublish" : "Publish"}
            </Button>
            <Button
              variant="secondary"
              className="me-2"
              onClick={() =>
                router.push(`/courses/${cid}/quizzes/${qid}/preview`)
              }
            >
              Preview
            </Button>
            <Button
              variant="danger"
              onClick={() =>
                router.push(`/courses/${cid}/quizzes/${qid}/editor`)
              }
            >
              Edit
            </Button>
          </>
        )}
      </div>

      <Card>
        <Card.Body>
          <p><strong>Description:</strong> {quiz.description || "No description"}</p>
          <p><strong>Quiz Type:</strong> {quiz.quizType}</p>
          <p><strong>Points:</strong> {totalPoints}</p>
          <p><strong>Assignment Group:</strong> {quiz.assignmentGroup}</p>
          <p><strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? "Yes" : "No"}</p>
          <p><strong>Time Limit:</strong> {quiz.timeLimit} Minutes</p>
          <p><strong>Multiple Attempts:</strong> {quiz.multipleAttempts ? "Yes" : "No"}</p>
          {quiz.multipleAttempts && (
            <p><strong>How Many Attempts:</strong> {quiz.howManyAttempts}</p>
          )}
          <p>
            <strong>Show Correct Answers:</strong>{" "}
            {quiz.showCorrectAnswers ? "Yes" : "No"}
          </p>
          <p><strong>Access Code:</strong> {quiz.accessCode || "None"}</p>
          <p><strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime ? "Yes" : "No"}</p>
          <p><strong>Webcam Required:</strong> {quiz.webcamRequired ? "Yes" : "No"}</p>
          <p><strong>Lock Questions After Answering:</strong> {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</p>
          <p><strong>Due:</strong> {quiz.dueDate || "No due date"}</p>
          <p><strong>Available From:</strong> {quiz.availableFrom || "Not set"}</p>
          <p><strong>Until:</strong> {quiz.availableUntil || "Not set"}</p>
          <p><strong>Status:</strong> {quiz.published ? "Published" : "Unpublished"}</p>
        </Card.Body>
      </Card>

      {isStudent && (
        <div className="mt-4">
          {latestAttempt && (
            <div className="alert alert-info">
              <div>
                Last score: <strong>{latestAttempt.score}</strong>
              </div>
              <div>
                Last submitted:{" "}
                <strong>
                  {new Date(latestAttempt.submittedAt).toLocaleString()}
                </strong>
              </div>
            </div>
          )}

          <div className="d-flex gap-2">
            {latestAttempt && (
              <Button
                variant="secondary"
                onClick={() =>
                  router.push(`/courses/${cid}/quizzes/${qid}/take?review=true`)
                }
              >
                Review Last Attempt
              </Button>
            )}

            {canRetake ? (
              <Button
                variant="primary"
                onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/take`)}
              >
                {attemptCount > 0 ? "Retake Quiz" : "Start Quiz"}
              </Button>
            ) : (
              <Button variant="secondary" disabled>
                No Attempts Remaining
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}