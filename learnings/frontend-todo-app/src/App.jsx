import React, { useEffect } from "react";

// creating custom hooks
function useTodos(){
  const [todos , setTodos] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/todos", {
      method: "GET", // is there by DEFAULT
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setTodos(data);
      });
    });
  }, []);

  // this is to make it appear real time as we add new todos
  setInterval(() => {
    fetch("http://localhost:3000/todos", {
      method: "GET",
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setTodos(data);
      })
    })
  }, 1000);

  return todos;
}

function App() {
  const todos = useTodos();

  return (
    <div>
      {todos.map((todo) => {
        return <Todo title = {todo.title} description = {todo.description}></Todo>
      })}
    </div>
  )

  function Todo(props){
    return <div>
    {props.title}
    {props.description}
    <button>Delete</button>
    <br/>
  </div>
  }
}

export default App;