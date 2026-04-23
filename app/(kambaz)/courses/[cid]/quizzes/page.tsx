/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, ListGroupItem, Dropdown } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { RootState } from "../../../store";
import {
  addQuiz,
  deleteQuiz as deleteQuizAction,
  setQuizzes,
  updateQuiz as updateQuizAction,
} from "./reducer";
import QuizControls from "./QuizControls";
import * as client from "../../client";

function formatAvailability(quiz: any) {
  const now = new Date();
  const from = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
  const until = quiz.availableUntil ? new Date(quiz.availableUntil) : null;

  if (from && now < from) {
    return `Not available until ${from.toLocaleString()}`;
  }
  if (until && now > until) {
    return "Closed";
  }
  if (from || until) {
    return "Available";
  }
  return "No availability dates";
}

export default function QuizzesPage() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { quizzes } = useSelector(
    (state: RootState) => state.quizzesReducer as any
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  const fetchQuizzes = async () => {
    const data = await client.findQuizzesForCourse(cid as string);

    if (isStudent) {
      const quizzesWithScores = await Promise.all(
        data.map(async (quiz: any) => {
          try {
            const latestAttempt = await client.findMyLatestQuizAttempt(
              quiz._id
            );
            return { ...quiz, latestScore: latestAttempt?.score };
          } catch {
            return quiz;
          }
        })
      );
      dispatch(setQuizzes(quizzesWithScores));
      return;
    }

    dispatch(setQuizzes(data));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid, currentUser?._id]);

  const createNewQuiz = async () => {
    const newQuiz = await client.createQuiz(cid as string, {
      title: "New Quiz",
      description: "",
      quizType: "GRADED_QUIZ",
      assignmentGroup: "QUIZZES",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      howManyAttempts: 1,
      showCorrectAnswers: "",
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      dueDate: "",
      availableFrom: "",
      availableUntil: "",
      published: false,
      questions: [],
    });
    dispatch(addQuiz(newQuiz));
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/editor`);
  };

  const deleteQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    dispatch(deleteQuizAction(quizId));
  };

  const togglePublish = async (quiz: any) => {
    const updated = quiz.published
      ? await client.unpublishQuiz(quiz._id)
      : await client.publishQuiz(quiz._id);
    dispatch(updateQuizAction(updated));
  };

  const visibleQuizzes = isFaculty
    ? quizzes
    : quizzes.filter((quiz: any) => quiz.published);

  return (
    <div>
      <QuizControls onAddQuiz={createNewQuiz} isFaculty={isFaculty} />

      {!visibleQuizzes.length && (
        <div className="alert alert-light border">
          {isFaculty
            ? <>No quizzes yet. Faculty can click <strong>+ Quiz</strong> to add one.</>
            : "No published quizzes available."}
        </div>
      )}

      <ListGroup className="rounded-0" id="wd-quizzes">
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div className="p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <span>QUIZZES</span>
          </div>

          <ListGroup className="rounded-0">
            {visibleQuizzes.map((quiz: any) => (
              <ListGroupItem key={quiz._id} className="p-3 ps-1">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <FaRegFileAlt className="me-2 fs-4 text-success" />

                  <div>
                    <Link
                      href={`/courses/${cid}/quizzes/${quiz._id}`}
                      className="text-decoration-none text-black fw-bold"
                    >
                      {quiz.title}
                    </Link>

                    <div className="small text-secondary mt-1">
                      <div>{formatAvailability(quiz)}</div>
                      <div>
                        Due{" "}
                        {quiz.dueDate
                          ? new Date(quiz.dueDate).toLocaleString()
                          : "No due date"}
                      </div>
                      <div>
                        {quiz.questions?.reduce(
                          (sum: number, q: any) => sum + (q.points || 0),
                          0
                        ) || 0}{" "}
                        pts | {quiz.questions?.length || 0} Questions
                        {isStudent &&
                          quiz.latestScore !== undefined &&
                          ` | Score: ${quiz.latestScore}`}
                      </div>
                    </div>
                  </div>

                  <div className="ms-auto d-flex align-items-center gap-2">
                    {isFaculty && (
                      <>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() =>
                            router.push(
                              `/courses/${cid}/quizzes/${quiz._id}/editor`
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            const ok = window.confirm("Delete this quiz?");
                            if (ok) deleteQuiz(quiz._id);
                          }}
                        >
                          Delete
                        </button>

                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => togglePublish(quiz)}
                        >
                          {quiz.published ? "Unpublish" : "Publish"}
                        </button>
                      </>
                    )}

                    {!quiz.published && (
                      <MdDoNotDisturbAlt
                        className="text-secondary fs-5"
                        style={{ cursor: isFaculty ? "pointer" : "default" }}
                        onClick={() => isFaculty && togglePublish(quiz)}
                      />
                    )}

                    {isFaculty && (
                      <Dropdown>
                        <Dropdown.Toggle variant="light" size="sm">
                          ⋮
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              router.push(
                                `/courses/${cid}/quizzes/${quiz._id}/editor`
                              )
                            }
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => togglePublish(quiz)}>
                            {quiz.published ? "Unpublish" : "Publish"}
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="text-danger"
                            onClick={() => deleteQuiz(quiz._id)}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}