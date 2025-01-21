import React, { useState } from "react";
import ToDoList from "./components/ToDoList";

const App: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);//track index
  const[editTodo,setEditTodo]=useState<string>("");//track value
  const [completedTodo, setCompletedTodo] = useState<string[]>([]);

  const addTodo = () => {
    if (newTodo) {
      setTodos([...todos, newTodo]);
      setNewTodo(""); // Reset input field
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, todoIndex) => todoIndex !== index));
  };
  
  const removeCompletedTodo = (index: number) => {
    setCompletedTodo((prev) => prev.filter((_, todoIndex) => todoIndex !== index));
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
    <div className="whole">
      <div className="upper">
        <h1>To-Do Web</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key==='Enter'){
            addTodo();
          }
        }}
        placeholder="Enter New To-Do"
      />
      <button onClick={addTodo} >Add To-Do</button>
      </div>

      <div className="lower">
        <ToDoList 
      todos={todos} 
      setTodos={setTodos}
      startEdit={startEdit}
      saveEdit={saveEdit}
      editingIndex={editingIndex}
      editTodo={editTodo}
      setEditTodo={setEditTodo}
      completedTodo={completedTodo}
      setCompletedTodo={setCompletedTodo} 
      removeTodo={removeTodo} 
      removeCompletedTodo={removeCompletedTodo}
      />

      </div>
      
      </div>

  );
};

export default App;