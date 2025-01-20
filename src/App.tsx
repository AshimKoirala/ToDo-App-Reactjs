import React, { useState } from "react";
import ToDoList from "./components/ToDoList";

const App: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);//track index
  const[editTodo,setEditTodo]=useState<string>("");//track value

  const addTodo = () => {
    if (newTodo) {
      setTodos([...todos, newTodo]);
      setNewTodo(""); // Reset input field
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, todoIndex) => todoIndex !== index));
  };

  const startEdit =(index:number)=>{
    setEditingIndex(index);
    setEditTodo(todos[index]);//todo value to being edited
  };

  const saveEdit =(index:number)=>{
    const UpdateTodos=[...todos];
    UpdateTodos[index]=editTodo;//update todo with new value
    setTodos(UpdateTodos);
    setEditingIndex(null);//exit
    setEditTodo("");//clear
  }

  return (
    <div>
      <h1>To-Do App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter New To-Do"
      />
      <button onClick={addTodo}>Add To-Do</button>

         <ToDoList 
      todos={todos} 
      startEdit={startEdit}
      saveEdit={saveEdit}
      editingIndex={editingIndex}
      editTodo={editTodo}
      setEditTodo={setEditTodo}
      removeTodo={removeTodo} 
      />
      </div>

  );
};

export default App;