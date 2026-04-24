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
  const [draftQuestion, setDraftQuestion] = useState<any>(null);
  const [isNewQuestion, setIsNewQuestion] = useState(false);

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

  const startNewQuestion = () => {
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

    setDraftQuestion(newQuestion);
    setEditingQuestionId(newQuestion._id);
    setIsNewQuestion(true);
  };

  const startEditQuestion = (question: any) => {
    setDraftQuestion(JSON.parse(JSON.stringify(question)));
    setEditingQuestionId(question._id);
    setIsNewQuestion(false);
  };

  const cancelEditQuestion = () => {
    setDraftQuestion(null);
    setEditingQuestionId(null);
    setIsNewQuestion(false);
  };

  const saveQuestion = () => {
    if (!draftQuestion) return;

    if (isNewQuestion) {
      setQuiz({
        ...quiz,
        questions: [...(quiz.questions || []), draftQuestion],
      });
    } else {
      setQuiz({
        ...quiz,
        questions: quiz.questions.map((q: any) =>
          q._id === draftQuestion._id ? draftQuestion : q
        ),
      });
    }

    setDraftQuestion(null);
    setEditingQuestionId(null);
    setIsNewQuestion(false);
  };

  const removeQuestion = (questionId: string) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.filter((q: any) => q._id !== questionId),
    });

    if (editingQuestionId === questionId) {
      cancelEditQuestion();
    }
  };

  const saveQuiz = async () => {
    await client.updateQuiz(quiz);
    router.push(`/courses/${cid}/quizzes/${qid}`);
  };

  const questionsToRender = [...(quiz.questions || [])];
  if (isNewQuestion && draftQuestion) {
    questionsToRender.push(draftQuestion);
  }

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

      <Button
        className="mb-3"
        variant="danger"
        onClick={startNewQuestion}
        disabled={!!editingQuestionId}
      >
        New Question
      </Button>

      {questionsToRender.map((question: any) => {
        const editing = editingQuestionId === question._id;
        const currentQuestion = editing ? draftQuestion : question;

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
                      onClick={() => startEditQuestion(question)}
                      disabled={!!editingQuestionId}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => removeQuestion(question._id)}
                      disabled={!!editingQuestionId}
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
                    value={currentQuestion.type}
                    onChange={(e) =>
                      setDraftQuestion({
                        ...currentQuestion,
                        type: e.target.value,
                      })
                    }
                  >
                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                    <option value="TRUE_FALSE">True / False</option>
                    <option value="FILL_IN_BLANK">Fill in the Blank</option>
                  </FormSelect>

                  <FormLabel>Title</FormLabel>
                  <FormControl
                    className="mb-2"
                    value={currentQuestion.title}
                    onChange={(e) =>
                      setDraftQuestion({
                        ...currentQuestion,
                        title: e.target.value,
                      })
                    }
                  />

                  <FormLabel>Points</FormLabel>
                  <FormControl
                    className="mb-2"
                    type="number"
                    value={currentQuestion.points}
                    onChange={(e) =>
                      setDraftQuestion({
                        ...currentQuestion,
                        points: parseInt(e.target.value) || 0,
                      })
                    }
                  />

                  <FormLabel>Question</FormLabel>
                  <FormControl
                    as="textarea"
                    rows={4}
                    className="mb-3"
                    value={currentQuestion.question}
                    onChange={(e) =>
                      setDraftQuestion({
                        ...currentQuestion,
                        question: e.target.value,
                      })
                    }
                  />

                  {currentQuestion.type === "MULTIPLE_CHOICE" && (
                    <div className="mb-3">
                      <FormLabel>Choices</FormLabel>
                      {(currentQuestion.choices || []).map(
                        (choice: any, index: number) => (
                          <div
                            key={choice._id}
                            className="d-flex align-items-center mb-2 gap-2"
                          >
                            <FormCheck
                              type="radio"
                              name={`correct-${currentQuestion._id}`}
                              checked={!!choice.isCorrect}
                              onChange={() => {
                                setDraftQuestion({
                                  ...currentQuestion,
                                  choices: currentQuestion.choices.map(
                                    (c: any) => ({
                                      ...c,
                                      isCorrect: c._id === choice._id,
                                    })
                                  ),
                                });
                              }}
                            />
                            <FormControl
                              value={choice.text}
                              onChange={(e) => {
                                const newChoices = [
                                  ...(currentQuestion.choices || []),
                                ];
                                newChoices[index] = {
                                  ...choice,
                                  text: e.target.value,
                                };
                                setDraftQuestion({
                                  ...currentQuestion,
                                  choices: newChoices,
                                });
                              }}
                            />
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => {
                                setDraftQuestion({
                                  ...currentQuestion,
                                  choices: currentQuestion.choices.filter(
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
                          setDraftQuestion({
                            ...currentQuestion,
                            choices: [
                              ...(currentQuestion.choices || []),
                              { _id: uuidv4(), text: "", isCorrect: false },
                            ],
                          })
                        }
                      >
                        Add Choice
                      </Button>
                    </div>
                  )}

                  {currentQuestion.type === "TRUE_FALSE" && (
                    <div className="mb-3">
                      <FormCheck
                        type="radio"
                        label="True"
                        name={`tf-${currentQuestion._id}`}
                        checked={currentQuestion.trueFalseAnswer === true}
                        onChange={() =>
                          setDraftQuestion({
                            ...currentQuestion,
                            trueFalseAnswer: true,
                          })
                        }
                      />
                      <FormCheck
                        type="radio"
                        label="False"
                        name={`tf-${currentQuestion._id}`}
                        checked={currentQuestion.trueFalseAnswer === false}
                        onChange={() =>
                          setDraftQuestion({
                            ...currentQuestion,
                            trueFalseAnswer: false,
                          })
                        }
                      />
                    </div>
                  )}

                  {currentQuestion.type === "FILL_IN_BLANK" && (
                    <div className="mb-3">
                      <FormLabel>Accepted Answers</FormLabel>
                      {(currentQuestion.blankAnswers || []).map(
                        (ans: string, index: number) => (
                          <div key={index} className="d-flex gap-2 mb-2">
                            <FormControl
                              value={ans}
                              onChange={(e) => {
                                const newAnswers = [
                                  ...(currentQuestion.blankAnswers || []),
                                ];
                                newAnswers[index] = e.target.value;
                                setDraftQuestion({
                                  ...currentQuestion,
                                  blankAnswers: newAnswers,
                                });
                              }}
                            />
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => {
                                setDraftQuestion({
                                  ...currentQuestion,
                                  blankAnswers:
                                    currentQuestion.blankAnswers.filter(
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
                          setDraftQuestion({
                            ...currentQuestion,
                            blankAnswers: [
                              ...(currentQuestion.blankAnswers || []),
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
                      onClick={cancelEditQuestion}
                    >
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={saveQuestion}>
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