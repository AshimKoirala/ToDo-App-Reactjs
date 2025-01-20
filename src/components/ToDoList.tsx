import React from "react";

interface ToDoListProps {
  todos: string[];
  startEdit:(index:number)=>void
  saveEdit:(index:number)=>void
  editingIndex:number | null;
  editTodo:string;
  setEditTodo:(index:string)=>void
  removeTodo:(index:number)=>void
}

const ToDoList: React.FC<ToDoListProps> = ({ 
  todos,
  startEdit,
  saveEdit,
  editingIndex,
  editTodo,
  setEditTodo,
  removeTodo, 
  }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <li key={index} className="todo-item">
          {editingIndex === index ? (
            <div className="todo-edit"> 
              <input
                type="text"
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
              />
              <button onClick={() => saveEdit(index)}>Save</button>
            </div>
          ) : (
            <>
            <span className="todo-text">  {todo} </span>
            <div className="todo-actions">
              <button onClick={() => startEdit(index)}>Edit</button>
              <button onClick={() => removeTodo(index)}>Remove</button>
            </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ToDoList;
