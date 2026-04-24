/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Nav,
  Row,
} from "react-bootstrap";
import * as client from "../../../../client";

export default function QuizEditorPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      if (qid === "new") return;
      const data = await client.findQuizById(qid as string);
      setQuiz({
        ...data,
        showCorrectAnswers:
          data.showCorrectAnswers === true ||
          data.showCorrectAnswers === "true" ||
          data.showCorrectAnswers === "YES",
      });
    };
    loadQuiz();
  }, [qid]);

  if (!quiz) return null;

  const save = async (publish = false) => {
    const payload = {
      ...quiz,
      showCorrectAnswers:
        quiz.showCorrectAnswers === true ||
        quiz.showCorrectAnswers === "true" ||
        quiz.showCorrectAnswers === "YES",
      published: publish ? true : quiz.published,
    };

    console.log("SAVING QUIZ PAYLOAD:", payload);

    const updated = await client.updateQuiz(payload);
    console.log("UPDATED QUIZ RETURNED:", updated);

    if (publish) {
      router.push(`/courses/${cid}/quizzes`);
      return;
    }

    router.push(`/courses/${cid}/quizzes/${updated._id}`);
  };

  return (
    <div id="wd-quiz-editor" className="p-3">
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link active>Details</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() =>
              router.push(`/courses/${cid}/quizzes/${qid}/questions`)
            }
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <FormLabel>Quiz Title</FormLabel>
      <FormControl
        className="mb-3"
        value={quiz.title || ""}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
      />

      <FormLabel>Description</FormLabel>
      <FormControl
        as="textarea"
        rows={6}
        className="mb-4"
        value={quiz.description || ""}
        onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
      />

      <Row className="mb-3 align-items-center">
        <Col md={3} className="text-md-end">
          <FormLabel className="mb-0">Quiz Type</FormLabel>
        </Col>
        <Col md={9}>
          <FormSelect
            value={quiz.quizType}
            onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
          >
            <option value="GRADED_QUIZ">Graded Quiz</option>
            <option value="PRACTICE_QUIZ">Practice Quiz</option>
            <option value="GRADED_SURVEY">Graded Survey</option>
            <option value="UNGRADED_SURVEY">Ungraded Survey</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col md={3} className="text-md-end">
          <FormLabel className="mb-0">Assignment Group</FormLabel>
        </Col>
        <Col md={9}>
          <FormSelect
            value={quiz.assignmentGroup}
            onChange={(e) =>
              setQuiz({ ...quiz, assignmentGroup: e.target.value })
            }
          >
            <option value="QUIZZES">Quizzes</option>
            <option value="EXAMS">Exams</option>
            <option value="ASSIGNMENTS">Assignments</option>
            <option value="PROJECT">Project</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col md={3} className="text-md-end">
          <FormLabel className="mb-0">Points</FormLabel>
        </Col>
        <Col md={9}>
          <FormControl
            disabled
            value={
              quiz.questions?.reduce(
                (sum: number, q: any) => sum + (q.points || 0),
                0
              ) || 0
            }
          />
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col md={3} className="text-md-end">
          <FormLabel className="mb-0">Time Limit</FormLabel>
        </Col>
        <Col md={9}>
          <FormControl
            type="number"
            value={quiz.timeLimit || 20}
            onChange={(e) =>
              setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 0 })
            }
          />
        </Col>
      </Row>

      <div className="mb-3">
        <FormCheck
          label="Shuffle Answers"
          checked={!!quiz.shuffleAnswers}
          onChange={(e) =>
            setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
          }
        />
        <FormCheck
          label="Multiple Attempts"
          checked={!!quiz.multipleAttempts}
          onChange={(e) =>
            setQuiz({ ...quiz, multipleAttempts: e.target.checked })
          }
        />
        {quiz.multipleAttempts && (
          <FormControl
            className="mt-2"
            type="number"
            value={quiz.howManyAttempts || 1}
            onChange={(e) =>
              setQuiz({
                ...quiz,
                howManyAttempts: parseInt(e.target.value) || 1,
              })
            }
          />
        )}
        <FormCheck
          label="One Question at a Time"
          checked={!!quiz.oneQuestionAtATime}
          onChange={(e) =>
            setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
          }
        />
        <FormCheck
          label="Webcam Required"
          checked={!!quiz.webcamRequired}
          onChange={(e) =>
            setQuiz({ ...quiz, webcamRequired: e.target.checked })
          }
        />
        <FormCheck
          label="Lock Questions After Answering"
          checked={!!quiz.lockQuestionsAfterAnswering}
          onChange={(e) =>
            setQuiz({
              ...quiz,
              lockQuestionsAfterAnswering: e.target.checked,
            })
          }
        />
      </div>

      <FormLabel>Show Correct Answers</FormLabel>
      <FormSelect
        className="mb-3"
        value={quiz.showCorrectAnswers === true ? "YES" : "NO"}
        onChange={(e) =>
          setQuiz({
            ...quiz,
            showCorrectAnswers: e.target.value === "YES",
          })
        }
      >
        <option value="YES">Yes</option>
        <option value="NO">No</option>
      </FormSelect>

      <FormLabel>Access Code</FormLabel>
      <FormControl
        className="mb-3"
        value={quiz.accessCode || ""}
        onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
      />

      <Row className="mb-3">
        <Col>
          <FormLabel>Due Date</FormLabel>
          <FormControl
            type="datetime-local"
            value={quiz.dueDate || ""}
            onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <FormLabel>Available From</FormLabel>
          <FormControl
            type="datetime-local"
            value={quiz.availableFrom || ""}
            onChange={(e) =>
              setQuiz({ ...quiz, availableFrom: e.target.value })
            }
          />
        </Col>
        <Col>
          <FormLabel>Until</FormLabel>
          <FormControl
            type="datetime-local"
            value={quiz.availableUntil || ""}
            onChange={(e) =>
              setQuiz({ ...quiz, availableUntil: e.target.value })
            }
          />
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button
          variant="light"
          className="border"
          onClick={() => router.push(`/courses/${cid}/quizzes`)}
        >
          Cancel
        </Button>
        <Button variant="secondary" onClick={() => save(false)}>
          Save
        </Button>
        <Button variant="danger" onClick={() => save(true)}>
          Save & Publish
        </Button>
      </div>
    </div>
  );
}