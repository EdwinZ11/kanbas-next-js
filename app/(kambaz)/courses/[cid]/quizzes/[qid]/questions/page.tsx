/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Card,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Nav,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import * as client from "../../../../client";

export default function QuizQuestionsPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const loadQuiz = async () => {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);
    };
    loadQuiz();
  }, [qid]);

  if (!quiz) return null;

  const totalPoints =
    quiz.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) ||
    0;

  const addQuestion = () => {
    const newQuestion = {
      _id: uuidv4(),
      type: "MULTIPLE_CHOICE",
      title: "New Question",
      points: 10,
      question: "",
      choices: [
        { _id: uuidv4(), text: "Choice 1", isCorrect: true },
        { _id: uuidv4(), text: "Choice 2", isCorrect: false },
      ],
      trueFalseAnswer: true,
      blankAnswers: [""],
    };

    setQuiz({ ...quiz, questions: [...(quiz.questions || []), newQuestion] });
    setEditingQuestionId(newQuestion._id);
  };

  const updateQuestion = (questionId: string, updates: any) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((q: any) =>
        q._id === questionId ? { ...q, ...updates } : q
      ),
    });
  };

  const saveQuiz = async () => {
    await client.updateQuiz(quiz);
    router.push(`/courses/${cid}/quizzes/${qid}/editor`);
  };

  const removeQuestion = (questionId: string) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.filter((q: any) => q._id !== questionId),
    });
  };

  return (
    <div className="p-3" id="wd-quiz-questions-editor">
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active>Questions</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="d-flex align-items-center mb-3">
        <h3 className="me-auto">Questions</h3>
        <div>
          <strong>Total Points:</strong> {totalPoints}
        </div>
      </div>

      <Button className="mb-3" variant="danger" onClick={addQuestion}>
        New Question
      </Button>

      {(quiz.questions || []).map((question: any) => {
        const editing = editingQuestionId === question._id;
        return (
          <Card key={question._id} className="mb-3">
            <Card.Body>
              {!editing ? (
                <>
                  <div className="d-flex align-items-center">
                    <h5 className="me-auto">{question.title}</h5>
                    <span className="me-3">{question.points} pts</span>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      className="me-2"
                      onClick={() => setEditingQuestionId(question._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => removeQuestion(question._id)}
                    >
                      Delete
                    </Button>
                  </div>
                  <div className="mt-2">
                    <strong>Type:</strong> {question.type}
                  </div>
                  <div className="mt-2">{question.question}</div>
                </>
              ) : (
                <>
                  <FormLabel>Question Type</FormLabel>
                  <FormSelect
                    className="mb-2"
                    value={question.type}
                    onChange={(e) =>
                      updateQuestion(question._id, { type: e.target.value })
                    }
                  >
                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                    <option value="TRUE_FALSE">True / False</option>
                    <option value="FILL_IN_BLANK">Fill in the Blank</option>
                  </FormSelect>

                  <FormLabel>Title</FormLabel>
                  <FormControl
                    className="mb-2"
                    value={question.title}
                    onChange={(e) =>
                      updateQuestion(question._id, { title: e.target.value })
                    }
                  />

                  <FormLabel>Points</FormLabel>
                  <FormControl
                    className="mb-2"
                    type="number"
                    value={question.points}
                    onChange={(e) =>
                      updateQuestion(question._id, {
                        points: parseInt(e.target.value) || 0,
                      })
                    }
                  />

                  <FormLabel>Question</FormLabel>
                  <FormControl
                    as="textarea"
                    rows={4}
                    className="mb-3"
                    value={question.question}
                    onChange={(e) =>
                      updateQuestion(question._id, { question: e.target.value })
                    }
                  />

                  {question.type === "MULTIPLE_CHOICE" && (
                    <div className="mb-3">
                      <FormLabel>Choices</FormLabel>
                      {(question.choices || []).map(
                        (choice: any, index: number) => (
                          <div
                            key={choice._id}
                            className="d-flex align-items-center mb-2 gap-2"
                          >
                            <FormCheck
                              type="radio"
                              name={`correct-${question._id}`}
                              checked={!!choice.isCorrect}
                              onChange={() => {
                                updateQuestion(question._id, {
                                  choices: question.choices.map((c: any) => ({
                                    ...c,
                                    isCorrect: c._id === choice._id,
                                  })),
                                });
                              }}
                            />
                            <FormControl
                              value={choice.text}
                              onChange={(e) => {
                                const newChoices = [...question.choices];
                                newChoices[index] = {
                                  ...choice,
                                  text: e.target.value,
                                };
                                updateQuestion(question._id, {
                                  choices: newChoices,
                                });
                              }}
                            />
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => {
                                updateQuestion(question._id, {
                                  choices: question.choices.filter(
                                    (c: any) => c._id !== choice._id
                                  ),
                                });
                              }}
                            >
                              X
                            </Button>
                          </div>
                        )
                      )}
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          updateQuestion(question._id, {
                            choices: [
                              ...(question.choices || []),
                              { _id: uuidv4(), text: "", isCorrect: false },
                            ],
                          })
                        }
                      >
                        Add Choice
                      </Button>
                    </div>
                  )}

                  {question.type === "TRUE_FALSE" && (
                    <div className="mb-3">
                      <FormCheck
                        type="radio"
                        label="True"
                        name={`tf-${question._id}`}
                        checked={question.trueFalseAnswer === true}
                        onChange={() =>
                          updateQuestion(question._id, {
                            trueFalseAnswer: true,
                          })
                        }
                      />
                      <FormCheck
                        type="radio"
                        label="False"
                        name={`tf-${question._id}`}
                        checked={question.trueFalseAnswer === false}
                        onChange={() =>
                          updateQuestion(question._id, {
                            trueFalseAnswer: false,
                          })
                        }
                      />
                    </div>
                  )}

                  {question.type === "FILL_IN_BLANK" && (
                    <div className="mb-3">
                      <FormLabel>Accepted Answers</FormLabel>
                      {(question.blankAnswers || []).map(
                        (ans: string, index: number) => (
                          <div key={index} className="d-flex gap-2 mb-2">
                            <FormControl
                              value={ans}
                              onChange={(e) => {
                                const newAnswers = [...question.blankAnswers];
                                newAnswers[index] = e.target.value;
                                updateQuestion(question._id, {
                                  blankAnswers: newAnswers,
                                });
                              }}
                            />
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => {
                                updateQuestion(question._id, {
                                  blankAnswers: question.blankAnswers.filter(
                                    (_: string, i: number) => i !== index
                                  ),
                                });
                              }}
                            >
                              X
                            </Button>
                          </div>
                        )
                      )}
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          updateQuestion(question._id, {
                            blankAnswers: [
                              ...(question.blankAnswers || []),
                              "",
                            ],
                          })
                        }
                      >
                        Add Answer
                      </Button>
                    </div>
                  )}

                  <div className="d-flex gap-2 justify-content-end">
                    <Button
                      variant="light"
                      className="border"
                      onClick={() => setEditingQuestionId(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => setEditingQuestionId(null)}
                    >
                      Save Question
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        );
      })}

      <div className="d-flex justify-content-end gap-2">
        <Button
          variant="light"
          className="border"
          onClick={() => router.push(`/courses/${cid}/quizzes`)}
        >
          Cancel
        </Button>
        <Button variant="danger" onClick={saveQuiz}>
          Save
        </Button>
      </div>
    </div>
  );
}
