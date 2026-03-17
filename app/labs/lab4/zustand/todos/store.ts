import { create } from "zustand";

// Define the todo state
interface TodoState {
    todos: { id: number; title: string }[];
    todo: { id: number; title: string };
    setTodo: (todo: { id: number; title: string }) => void;
    addTodo: () => void;
    updateTodo: () => void;
    removeTodo: (id: number) => void;
  }
  
  export const useTodoStore = create<TodoState>((set) => ({
    todos: [
      { id: 1, title: "Learn React" },
      { id: 2, title: "Learn Node" },
    ],
  
    todo: { id: -1, title: "Learn Mongo" },
  
    setTodo: (todo) => set({ todo }),
  
    addTodo: () =>
      set((state) => ({
        todos: [
          ...state.todos,
          { ...state.todo, id: new Date().getTime() },
        ],
        todo: { id: -1, title: "" },
      })),
  
    updateTodo: () =>
      set((state) => ({
        todos: state.todos.map((t) =>
          t.id === state.todo.id ? state.todo : t
        ),
        todo: { id: -1, title: "" },
      })),
  
    removeTodo: (id) =>
      set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      })),
  }));