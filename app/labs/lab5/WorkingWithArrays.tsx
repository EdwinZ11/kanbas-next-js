"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      <h4>Retrieving an Item from an Array by ID</h4>
      <div className="row g-2 align-items-center mb-2">
        <div className="col-md-8">
          <FormControl
            id="wd-todo-id"
            value={todo.id}
            onChange={(e) => setTodo({ ...todo, id: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <a
            id="wd-retrieve-todo-by-id"
            className="btn btn-primary w-100"
            href={`${API}/${todo.id}`}
          >
            Get Todo by ID
          </a>
        </div>
      </div>
      <hr />

      <h4>Filtering Array Items</h4>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />

      <h4>Creating New Items in an Array</h4>
      <a id="wd-create-todo" className="btn btn-success" href={`${API}/create`}>
        Create Todo
      </a>
      <hr />

      <h4>Removing from an Array</h4>
      <div className="row g-2 align-items-center mb-2">
        <div className="col-md-8">
          <FormControl
            value={todo.id}
            onChange={(e) => setTodo({ ...todo, id: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <a
            id="wd-remove-todo"
            className="btn btn-danger w-100"
            href={`${API}/${todo.id}/delete`}
          >
            Remove Todo with ID = {todo.id}
          </a>
        </div>
      </div>
      <hr />

      <h4>Updating an Item in an Array</h4>
      <div className="row g-2 align-items-center mb-2">
        <div className="col-md-3">
          <FormControl
            value={todo.id}
            onChange={(e) => setTodo({ ...todo, id: e.target.value })}
          />
        </div>
        <div className="col-md-5">
          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <a
            id="wd-update-todo-title"
            className="btn btn-primary w-100"
            href={`${API}/${todo.id}/title/${todo.title}`}
          >
            Update Todo
          </a>
        </div>
      </div>
      <hr />

      <h4>Updating Completed Property</h4>
      <div className="row g-2 align-items-center mb-2">
        <div className="col-md-8">
          <div className="form-check">
            <input
              id="wd-todo-completed"
              className="form-check-input"
              type="checkbox"
              checked={todo.completed}
              onChange={(e) =>
                setTodo({ ...todo, completed: e.target.checked })
              }
            />
            <label className="form-check-label" htmlFor="wd-todo-completed">
              Completed
            </label>
          </div>
        </div>
        <div className="col-md-4">
          <a
            id="wd-update-todo-completed"
            className="btn btn-warning w-100"
            href={`${API}/${todo.id}/completed/${todo.completed}`}
          >
            Complete Todo ID = {todo.id}
          </a>
        </div>
      </div>
      <hr />

      <h4>Updating Description Property</h4>
      <div className="row g-2 align-items-center mb-2">
        <div className="col-md-8">
          <FormControl
            value={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <a
            id="wd-update-todo-description"
            className="btn btn-secondary w-100"
            href={`${API}/${todo.id}/description/${todo.description}`}
          >
            Describe Todo ID = {todo.id}
          </a>
        </div>
      </div>
      <hr />
    </div>
  );
}
