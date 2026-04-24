/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button, Card, FormCheck, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../../../client";

function gradeQuestion(question: any, answer: any) {
  if (question.type === "MULTIPLE_CHOICE") {
    const correct = (question.choices || []).find((c: any) => c.isCorrect);
    const isCorrect = correct?._id === answer;
    return { isCorrect, pointsEarned: isCorrect ? question.points || 0 : 0 };
  }

  if (question.type === "TRUE_FALSE") {
    const isCorrect = question.trueFalseAnswer === answer;
    return { isCorrect, pointsEarned: isCorrect ? question.points || 0 : 0 };
  }

  if (question.type === "FILL_IN_BLANK") {
    const submitted = (answer || "").toString().trim().toLowerCase();
    const isCorrect = (question.blankAnswers || []).some(
      (a: string) => a.trim().toLowerCase() === submitted
    );
    return { isCorrect, pointsEarned: isCorrect ? question.points || 0 : 0 };
  }

  return { isCorrect: false, pointsEarned: 0 };
}

export default function TakeQuizPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const preview = searchParams.get("preview") === "true";
  const review = searchParams.get("review") === "true";

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submittedAttempt, setSubmittedAttempt] = useState<any>(null);
  const [previewResults, setPreviewResults] = useState<any>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [justSubmitted, setJustSubmitted] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);

      if (preview && isFaculty) return;

      try {
        const latest = await client.findMyLatestQuizAttempt(qid as string);
        const count = await client.countMyQuizAttempts(qid as string);

        if (review && latest) {
          setSubmittedAttempt(latest);
          return;
        }

        const maxedOut = data.multipleAttempts
          ? count >= data.howManyAttempts
          : count >= 1;

        if (maxedOut && latest) {
          setSubmittedAttempt(latest);
        }
      } catch {
        // no saved attempt yet
      }
    };

    loadQuiz();
  }, [qid, preview, review, isFaculty]);

  const answerMap = useMemo(() => {
    const source = submittedAttempt || previewResults;
    const map: Record<string, any> = {};
    if (source?.answers) {
      source.answers.forEach((a: any) => {
        map[a.questionId] = a;
      });
    }
    return map;
  }, [submittedAttempt, previewResults]);

  const questions = quiz?.questions || [];
  const useSingleQuestionView = !!quiz?.oneQuestionAtATime;
  const displayedQuestions = useSingleQuestionView
    ? questions.slice(questionIndex, questionIndex + 1)
    : questions;

  if (!quiz) return null;

  const resultsSource = submittedAttempt || previewResults;
  const previewSubmitted = !!previewResults;
  const inReviewMode = review || previewSubmitted || !!submittedAttempt;
  const locked = inReviewMode;
  const showCorrectAnswers =
    (review || previewSubmitted) && !!quiz.showCorrectAnswers;

  const onSubmit = async () => {
    const gradedAnswers = questions.map((q: any) => {
      const answer = answers[q._id];
      const result = gradeQuestion(q, answer);
      return {
        questionId: q._id,
        answer,
        isCorrect: result.isCorrect,
        pointsEarned: result.pointsEarned,
      };
    });

    const score = gradedAnswers.reduce(
      (sum: number, a: any) => sum + (a.pointsEarned || 0),
      0
    );

    if (preview && isFaculty) {
      setPreviewResults({
        score,
        answers: gradedAnswers,
        submittedAt: new Date().toISOString(),
      });
      return;
    }

    const savedAttempt = await client.submitQuizAttempt(qid as string, {
      answers: gradedAnswers,
      score,
    });

    setSubmittedAttempt(savedAttempt);
    setJustSubmitted(true);
  };

  const renderCorrectAnswer = (question: any) => {
    if (!showCorrectAnswers) return null;

    if (question.type === "MULTIPLE_CHOICE") {
      const correctChoice = (question.choices || []).find(
        (c: any) => c.isCorrect
      );
      return correctChoice ? (
        <div className="mt-2 small text-success">
          Correct answer: <strong>{correctChoice.text}</strong>
        </div>
      ) : null;
    }

    if (question.type === "TRUE_FALSE") {
      return (
        <div className="mt-2 small text-success">
          Correct answer:{" "}
          <strong>{question.trueFalseAnswer ? "True" : "False"}</strong>
        </div>
      );
    }

    if (question.type === "FILL_IN_BLANK") {
      return (
        <div className="mt-2 small text-success">
          Correct answer:{" "}
          <strong>{(question.blankAnswers || []).join(", ")}</strong>
        </div>
      );
    }

    return null;
  };

  if (justSubmitted && resultsSource && !preview) {
    return (
      <div className="p-3" id="wd-quiz-submitted-summary">
        <h2 className="mb-3">{quiz.title}</h2>

        <div className="alert alert-info">
          <div>
            Final Score: <strong>{resultsSource.score}</strong>
          </div>
          <div>
            Submitted:{" "}
            <strong>
              {new Date(resultsSource.submittedAt).toLocaleString()}
            </strong>
          </div>
          {resultsSource.attemptNumber && (
            <div>
              Attempt: <strong>{resultsSource.attemptNumber}</strong>
            </div>
          )}
        </div>

        <div className="d-flex gap-2">
          <Button
            variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}
          >
            Back to Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3" id="wd-take-quiz">
      <div className="d-flex align-items-center mb-3">
        <h2 className="me-auto">
          {quiz.title}
          {preview && isFaculty ? " (Preview)" : ""}
          {review ? " (Last Attempt Review)" : ""}
        </h2>

        {!review && !submittedAttempt && !previewSubmitted && (
          <Button
            variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}
          >
            Back
          </Button>
        )}
      </div>

      {resultsSource && (review || previewSubmitted || !!submittedAttempt) && (
        <div className="alert alert-info">
          <div>
            Final Score: <strong>{resultsSource.score}</strong>
          </div>
          <div>
            Submitted:{" "}
            <strong>
              {new Date(resultsSource.submittedAt).toLocaleString()}
            </strong>
          </div>
          {!preview && submittedAttempt?.attemptNumber && (
            <div>
              Attempt: <strong>{submittedAttempt.attemptNumber}</strong>
            </div>
          )}
        </div>
      )}

      {useSingleQuestionView && questions.length > 1 && (
        <div className="mb-3 d-flex flex-wrap gap-2">
          {questions.map((_: any, index: number) => {
            const isCurrent = index === questionIndex;
            return (
              <Button
                key={index}
                size="sm"
                variant={isCurrent ? "primary" : "light"}
                className={isCurrent ? "" : "border"}
                onClick={() => setQuestionIndex(index)}
              >
                {index + 1}
              </Button>
            );
          })}
        </div>
      )}

      {displayedQuestions.map((question: any) => {
        const graded = answerMap[question._id];
        const submitted = locked ? graded?.answer : answers[question._id];

        const borderClass =
          locked && graded
            ? graded.isCorrect
              ? "border-success"
              : "border-danger"
            : "";

        return (
          <Card key={question._id} className={`mb-3 ${borderClass}`}>
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <h5 className="me-auto">{question.title}</h5>
                <span>{question.points} pts</span>
              </div>

              <div className="mb-3">{question.question}</div>

              {question.type === "MULTIPLE_CHOICE" &&
                (question.choices || []).map((choice: any) => {
                  const isStudentAnswer = submitted === choice._id;
                  const isCorrectChoice = !!choice.isCorrect && showCorrectAnswers;

                  return (
                    <div key={choice._id} className="mb-1">
                      <FormCheck
                        type="radio"
                        disabled={locked}
                        name={`mc-${question._id}`}
                        label={
                          <span>
                            {choice.text}
                            {locked && isStudentAnswer && (
                              <span className="ms-2 fw-bold text-primary">
                                (Your answer)
                              </span>
                            )}
                            {locked && isCorrectChoice && (
                              <span className="ms-2 fw-bold text-success">
                                (Correct answer)
                              </span>
                            )}
                          </span>
                        }
                        checked={isStudentAnswer}
                        onChange={() =>
                          setAnswers({ ...answers, [question._id]: choice._id })
                        }
                      />
                    </div>
                  );
                })}

              {question.type === "TRUE_FALSE" && (
                <>
                  <FormCheck
                    type="radio"
                    disabled={locked}
                    name={`tf-${question._id}`}
                    label={
                      <span>
                        True
                        {locked && submitted === true && (
                          <span className="ms-2 fw-bold text-primary">
                            (Your answer)
                          </span>
                        )}
                        {locked &&
                          showCorrectAnswers &&
                          question.trueFalseAnswer === true && (
                            <span className="ms-2 fw-bold text-success">
                              (Correct answer)
                            </span>
                          )}
                      </span>
                    }
                    checked={submitted === true}
                    onChange={() =>
                      setAnswers({ ...answers, [question._id]: true })
                    }
                  />
                  <FormCheck
                    type="radio"
                    disabled={locked}
                    name={`tf-${question._id}`}
                    label={
                      <span>
                        False
                        {locked && submitted === false && (
                          <span className="ms-2 fw-bold text-primary">
                            (Your answer)
                          </span>
                        )}
                        {locked &&
                          showCorrectAnswers &&
                          question.trueFalseAnswer === false && (
                            <span className="ms-2 fw-bold text-success">
                              (Correct answer)
                            </span>
                          )}
                      </span>
                    }
                    checked={submitted === false}
                    onChange={() =>
                      setAnswers({ ...answers, [question._id]: false })
                    }
                  />
                </>
              )}

              {question.type === "FILL_IN_BLANK" && (
                <>
                  <FormControl
                    disabled={locked}
                    value={submitted || ""}
                    onChange={(e) =>
                      setAnswers({ ...answers, [question._id]: e.target.value })
                    }
                  />
                  {locked && submitted !== undefined && (
                    <div className="mt-2 small text-primary">
                      Your answer: <strong>{submitted}</strong>
                    </div>
                  )}
                </>
              )}

              {locked && graded && (
                <div
                  className={`mt-3 fw-bold ${
                    graded.isCorrect ? "text-success" : "text-danger"
                  }`}
                >
                  {graded.isCorrect ? "✔ Correct" : "✘ Incorrect"}
                </div>
              )}

              {locked && renderCorrectAnswer(question)}
            </Card.Body>
          </Card>
        );
      })}

      {useSingleQuestionView && (
        <div className="d-flex justify-content-between mb-3">
          <Button
            variant="light"
            className="border"
            disabled={questionIndex === 0}
            onClick={() => setQuestionIndex((i) => Math.max(i - 1, 0))}
          >
            Previous
          </Button>
          <Button
            variant="light"
            className="border"
            disabled={questionIndex >= questions.length - 1}
            onClick={() =>
              setQuestionIndex((i) => Math.min(i + 1, questions.length - 1))
            }
          >
            Next
          </Button>
        </div>
      )}

      {!review && !submittedAttempt && !previewSubmitted && (
        <Button variant="danger" onClick={onSubmit}>
          {preview && isFaculty ? "Submit Preview" : "Submit Quiz"}
        </Button>
      )}

      {(review || previewSubmitted || !!submittedAttempt) && (
        <div className="d-flex gap-2">
          <Button
            variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}
          >
            Back to Quiz
          </Button>

          {preview && isFaculty && (
            <Button
              variant="outline-primary"
              onClick={() => {
                setPreviewResults(null);
                setAnswers({});
                setQuestionIndex(0);
              }}
            >
              Try Preview Again
            </Button>
          )}
        </div>
      )}
    </div>
  );
}