"use client";

import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTodos } from "./context";

export default function TodosContext() {
  const { todos, todo, setTodo, addTodo, updateTodo, deleteTodo } = useTodos()!;

  return (
    <div id="wd-react-context-todo-list" className="container mt-3">
      <h2>Todo List</h2>
      <ListGroup>
        <ListGroupItem className="d-flex gap-2 align-items-center">
          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <Button variant="warning" onClick={updateTodo} id="wd-update-todo-click">
            Update
          </Button>
          <Button variant="success" onClick={addTodo} id="wd-add-todo-click">
            Add
          </Button>
        </ListGroupItem>

        {todos.map((t) => (
          <ListGroupItem
            key={t.id}
            className="d-flex justify-content-between align-items-center"
          >
            <span>{t.title}</span>
            <div>
              <Button
                variant="primary"
                className="me-2"
                onClick={() => setTodo(t)}
                id="wd-set-todo-click"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => deleteTodo(t.id)}
                id="wd-delete-todo-click"
              >
                Delete
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}