import React from "react";

interface ToDoListProps {
  todos: string[];
  removeTodo:(index:number)=>void
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, removeTodo }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo} <button onClick={() => removeTodo(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default ToDoList;
