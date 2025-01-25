import React, { useState,useEffect } from "react";
import ToDoList from "./components/ToDoList";

const App: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);//track index
  const[editTodo,setEditTodo]=useState<string>("");//track value
  const [completedTodo, setCompletedTodo] = useState<string[]>([]);

 useEffect(() => {
  const storedTodos = localStorage.getItem("todos");
  const storedCompletedTodo = localStorage.getItem("completedTodo");

  // console.log("Stored Todos:", storedTodos);
  // console.log("Stored Completed Todos:", storedCompletedTodo); 

  setTodos(storedTodos ? JSON.parse(storedTodos) : []);
  setCompletedTodo(storedCompletedTodo ? JSON.parse(storedCompletedTodo) : []);

}, []);

  const addTodo = () => {
  if (newTodo) {
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); 
    setNewTodo(""); // Reset input field
  }
};

  const removeTodo = (index: number) => {
  const updatedTodos = todos.filter((_, todoIndex) => todoIndex !== index);
  setTodos(updatedTodos);
  localStorage.setItem("todos", JSON.stringify(updatedTodos)); 
};
  
 const removeCompletedTodo = (index: number) => {

  
  const updatedCompletedTodos = completedTodo.filter((_, todoIndex) => todoIndex !== index);
  setCompletedTodo(updatedCompletedTodos);
  localStorage.setItem("completedTodo", JSON.stringify(updatedCompletedTodos));
  };

  const startEdit =(index:number)=>{
    setEditingIndex(index);
    setEditTodo(todos[index]);//todo value to being edited
  };

  const saveEdit =(index:number)=>{
    const updatedTodos=[...todos];
    updatedTodos[index]=editTodo; 

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setEditingIndex(null);//exit
    setEditTodo("");//clear
  }

  return (
    <div className="whole">
      <div className="upper">
        <h1>To-Do App</h1>
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