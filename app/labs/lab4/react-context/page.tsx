"use client";
import { CounterProvider } from "./counter/context";
import CounterContext from "./counter";
import { TodosProvider } from "./todos/context";
import TodosContext from "./todos";

export default function ReactContextExamples() {
  return (
    <div>
      <h1>React Context Examples</h1>
      <CounterProvider>
        <CounterContext />
      </CounterProvider>
      <TodosProvider>
        <TodosContext />
      </TodosProvider>
    </div>
  );
}
