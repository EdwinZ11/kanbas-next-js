"use client";

import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTodoStore } from "./store";

export default function ZustandTodos() {
  const { todos, todo, setTodo, addTodo, updateTodo, removeTodo } =
    useTodoStore((state) => state);

  return (
    <div className="container mt-3">
      <h2 className="mb-4">Todo List</h2>

      <ListGroup className="rounded-3 overflow-hidden">
        <ListGroupItem className="p-3">
          <div className="d-flex align-items-center justify-content-between gap-3">
            <FormControl
              className="flex-grow-1 w-auto"
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />

            <div className="d-flex gap-2 flex-shrink-0">
              <Button
                variant="warning"
                onClick={updateTodo}
                id="wd-update-todo-click"
              >
                Update
              </Button>

              <Button
                variant="success"
                onClick={addTodo}
                id="wd-add-todo-click"
              >
                Add
              </Button>
            </div>
          </div>
        </ListGroupItem>

        {todos.map((t) => (
          <ListGroupItem key={t.id} className="p-3">
            <div className="d-flex justify-content-between align-items-center">
              <span>{t.title}</span>

              <div className="d-flex gap-2 flex-shrink-0">
                <Button
                  variant="primary"
                  onClick={() => setTodo(t)}
                  id="wd-set-todo-click"
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  onClick={() => removeTodo(t.id)}
                  id="wd-delete-todo-click"
                >
                  Delete
                </Button>
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}
