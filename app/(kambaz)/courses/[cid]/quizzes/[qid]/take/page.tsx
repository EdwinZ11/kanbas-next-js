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

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submittedAttempt, setSubmittedAttempt] = useState<any>(null);
  const [previewResults, setPreviewResults] = useState<any>(null);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    const loadQuiz = async () => {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);

      if (preview && isFaculty) return;

      try {
        const latest = await client.findMyLatestQuizAttempt(qid as string);
        const count = await client.countMyQuizAttempts(qid as string);

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
  }, [qid, preview, isFaculty]);

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
  const displayedQuestions = quiz?.oneQuestionAtATime
    ? questions.slice(questionIndex, questionIndex + 1)
    : questions;

  if (!quiz) return null;

  const locked = !!submittedAttempt || !!previewResults;
  const showCorrect = preview || !!quiz.showCorrectAnswers;

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
  };

  const resultsSource = submittedAttempt || previewResults;

  return (
    <div className="p-3" id="wd-take-quiz">
      <div className="d-flex align-items-center mb-3">
        <h2 className="me-auto">
          {quiz.title} {preview && isFaculty ? "(Preview)" : ""}
        </h2>
        {!locked && (
          <Button
            variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}
          >
            Back
          </Button>
        )}
      </div>

      {resultsSource && (
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

      {displayedQuestions.map((question: any) => {
        const graded = answerMap[question._id];
        const submitted = locked ? graded?.answer : answers[question._id];
        const borderClass =
          locked && showCorrect
            ? graded?.isCorrect
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
                (question.choices || []).map((choice: any) => (
                  <FormCheck
                    key={choice._id}
                    type="radio"
                    disabled={locked}
                    name={`mc-${question._id}`}
                    label={choice.text}
                    checked={submitted === choice._id}
                    onChange={() =>
                      setAnswers({ ...answers, [question._id]: choice._id })
                    }
                  />
                ))}

              {question.type === "TRUE_FALSE" && (
                <>
                  <FormCheck
                    type="radio"
                    disabled={locked}
                    name={`tf-${question._id}`}
                    label="True"
                    checked={submitted === true}
                    onChange={() =>
                      setAnswers({ ...answers, [question._id]: true })
                    }
                  />
                  <FormCheck
                    type="radio"
                    disabled={locked}
                    name={`tf-${question._id}`}
                    label="False"
                    checked={submitted === false}
                    onChange={() =>
                      setAnswers({ ...answers, [question._id]: false })
                    }
                  />
                </>
              )}

              {question.type === "FILL_IN_BLANK" && (
                <FormControl
                  disabled={locked}
                  value={submitted || ""}
                  onChange={(e) =>
                    setAnswers({ ...answers, [question._id]: e.target.value })
                  }
                />
              )}

              {locked && showCorrect && (
                <div
                  className={`mt-3 fw-bold ${
                    graded?.isCorrect ? "text-success" : "text-danger"
                  }`}
                >
                  {graded?.isCorrect ? "✔ Correct" : "✘ Incorrect"}
                </div>
              )}
            </Card.Body>
          </Card>
        );
      })}

      {!locked && quiz.oneQuestionAtATime && (
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

      {!locked && (
        <Button variant="danger" onClick={onSubmit}>
          {preview && isFaculty ? "Finish Preview" : "Submit Quiz"}
        </Button>
      )}
    </div>
  );
}