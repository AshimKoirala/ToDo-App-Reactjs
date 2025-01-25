import React from "react";
import './ToDoList.css'

interface ToDoListProps {
  todos: string[];
  setTodos: React.Dispatch<React.SetStateAction<string[]>>;
  startEdit:(index:number)=>void
  saveEdit:(index:number)=>void
  editingIndex:number | null;
  editTodo:string;
  setEditTodo:(index:string)=>void
  removeTodo:(index:number)=>void
  completedTodo: string[];
  setCompletedTodo: React.Dispatch<React.SetStateAction<string[]>>;
  removeCompletedTodo:(index:number)=>void
}

const ToDoList: React.FC<ToDoListProps> = ({
  todos,
  setTodos,
  startEdit,
  saveEdit,
  editingIndex,
  editTodo,
  setEditTodo,
  removeTodo,
  completedTodo,
  setCompletedTodo,
  removeCompletedTodo,
}) => {

  // Handle Drag Start
  const handleDragStart = (todo: string, from: "todo" | "completed") => {
    return (e: React.DragEvent) => {
      e.dataTransfer.setData("text/plain", JSON.stringify({ todo, from }));
    };
  };

  // Handle Drop
  const handleDrop = (e: React.DragEvent, target: "todo" | "completed") => {
    const data = e.dataTransfer.getData("text/plain");
      if (data) {
         const { todo, from } = JSON.parse(data);
            if (from === "todo" && target === "completed") {
               setCompletedTodo((prev) => {
                 const updatedCompleted = [...prev, todo];
                  localStorage.setItem("completedTodo", JSON.stringify(updatedCompleted)); // Update localStorage
                  return updatedCompleted;
                    });
                   const index = todos.indexOf(todo);
                  if (index !== -1) {
                     removeTodo(index);
                     }
            } else if (from === "completed" && target === "todo") {
                 setCompletedTodo((prev) => {
                 const updatedCompleted = prev.filter((item) => item !== todo);
                 localStorage.setItem("completedTodo", JSON.stringify(updatedCompleted)); // Update localStorage
                  return updatedCompleted;
                  });
                 setTodos((prev) => {
                 const updatedTodos = [...prev, todo];
                 localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Update localStorage
                 return updatedTodos;
                });
            }
         }
      e.preventDefault();
  };


  // Handle Drag Over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

return (
    <div className="outer">
    {/* TODO List */}
      <div
        className="todo"
        onDrop={(e) => handleDrop(e, "todo")}
        onDragOver={handleDragOver}
      >
        <div className="todo-header">List Todo</div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="todo-item"
              draggable
              onDragStart={handleDragStart(todo, "todo")}
            >
              {editingIndex === index ? (
                <div className="todo-edit">
                  <div>
                    <input
                      type="text"
                      value={editTodo}
                      onChange={(e) => setEditTodo(e.target.value)}
                    />
                  </div>
                  <div className="todo-edit-save">
                    <button onClick={() => saveEdit(index)}>Save</button>
                  </div>
                </div>
              ) : (
                <>
                  <span className="todo-text">{todo}</span>
                  <div className="todo-actions">
                    <button className="edit-button" onClick={() => startEdit(index)}>Edit</button>
                    <button className="remove-button" onClick={() => removeTodo(index)}>Remove</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

  {/* Completed List */}
      <div
        className="completed"
        onDrop={(e) => handleDrop(e, "completed")}
        onDragOver={handleDragOver}
      >
        <div className="todo-header">List Completed</div>
        <ul className="todo-list">
          {completedTodo.map((todo, index) => (
            <li
              key={index}
              className="todo-item"
              draggable
              onDragStart={handleDragStart(todo, "completed")}
            >       
                  <span className="todo-text">{todo}</span>
                  <div className="todo-actions">
                    <button className="remove-button" onClick={() => removeCompletedTodo(index)}>Remove</button>
                  </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
