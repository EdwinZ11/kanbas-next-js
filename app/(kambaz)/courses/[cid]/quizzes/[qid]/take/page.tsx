/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, FormCheck, FormControl } from "react-bootstrap";
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
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submittedAttempt, setSubmittedAttempt] = useState<any>(null);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    const loadQuiz = async () => {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);

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
        // No attempts yet, ignore
      }
    };
    loadQuiz();
  }, [qid]);

  const answerMap = useMemo(() => {
    const map: Record<string, any> = {};
    if (submittedAttempt?.answers) {
      submittedAttempt.answers.forEach((a: any) => {
        map[a.questionId] = a;
      });
    }
    return map;
  }, [submittedAttempt]);

  const questions = quiz?.questions || [];
  const displayedQuestions = quiz?.oneQuestionAtATime
    ? questions.slice(questionIndex, questionIndex + 1)
    : questions;

  if (!quiz) return null;

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

    const savedAttempt = await client.submitQuizAttempt(qid as string, {
      answers: gradedAnswers,
      score,
    });

    setSubmittedAttempt(savedAttempt);
  };

  return (
    <div className="p-3" id="wd-take-quiz">
      <div className="d-flex align-items-center mb-3">
        <h2 className="me-auto">{quiz.title}</h2>
        {!submittedAttempt && (
          <Button
            variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}
          >
            Back
          </Button>
        )}
      </div>

      {submittedAttempt && (
        <div className="alert alert-info">
          Final Score: <strong>{submittedAttempt.score}</strong>
        </div>
      )}

      {displayedQuestions.map((question: any) => {
        const graded = answerMap[question._id];
        const submitted = submittedAttempt
          ? graded?.answer
          : answers[question._id];
        const borderClass = submittedAttempt
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
                    disabled={!!submittedAttempt}
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
                    disabled={!!submittedAttempt}
                    name={`tf-${question._id}`}
                    label="True"
                    checked={submitted === true}
                    onChange={() =>
                      setAnswers({ ...answers, [question._id]: true })
                    }
                  />
                  <FormCheck
                    type="radio"
                    disabled={!!submittedAttempt}
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
                  disabled={!!submittedAttempt}
                  value={submitted || ""}
                  onChange={(e) =>
                    setAnswers({ ...answers, [question._id]: e.target.value })
                  }
                />
              )}

              {submittedAttempt && (
                <div
                  className={`mt-3 fw-bold ${
                    graded?.isCorrect ? "text-success" : "text-danger"
                  }`}
                >
                  {graded?.isCorrect ? "Correct" : "Incorrect"}
                </div>
              )}
            </Card.Body>
          </Card>
        );
      })}

      {!submittedAttempt && quiz.oneQuestionAtATime && (
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

      {!submittedAttempt && (
        <Button variant="danger" onClick={onSubmit}>
          Submit Quiz
        </Button>
      )}
    </div>
  );
}