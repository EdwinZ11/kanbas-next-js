import { useDispatch } from "react-redux";
import { Button, ListGroupItem } from "react-bootstrap";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();

  return (
    <ListGroupItem className="p-3">
      <div className="d-flex align-items-center justify-content-between">
        
        <span>{todo.title}</span>

        <div className="d-flex gap-2">
          <Button
            variant="primary"
            onClick={() => dispatch(setTodo(todo))}
            id="wd-set-todo-click"
          >
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() => dispatch(deleteTodo(todo.id))}
            id="wd-delete-todo-click"
          >
            Delete
          </Button>
        </div>
      </div>
    </ListGroupItem>
  );
}