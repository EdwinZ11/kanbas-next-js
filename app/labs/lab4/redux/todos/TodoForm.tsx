import { useSelector, useDispatch } from "react-redux";
import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem className="p-3">
      <div className="d-flex align-items-center justify-content-between gap-2">
        <FormControl
          className="flex-grow-1 w-auto"
          value={todo.title}
          onChange={(e) =>
            dispatch(setTodo({ ...todo, title: e.target.value }))
          }
        />
        <div className="d-flex gap-2">
          <Button
            variant="warning"
            onClick={() => dispatch(updateTodo(todo))}
            id="wd-update-todo-click"
          >
            Update
          </Button>
          <Button
            variant="success"
            onClick={() => dispatch(addTodo(todo))}
            id="wd-add-todo-click"
          >
            Add
          </Button>
        </div>
      </div>
    </ListGroupItem>
  );
}
