import React, { useState } from "react";
import ToDoList from "./components/ToDoList";

const App: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (newTodo) {
      setTodos([...todos, newTodo]);
      setNewTodo(""); // Reset input field
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, todoIndex) => todoIndex !== index));
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new To-DO"
      />
      <button onClick={addTodo}>Add To-Do</button>
      <ToDoList todos={todos} removeTodo={removeTodo} />
    </div>
  );
};

export default App;