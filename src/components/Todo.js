import React from "react"

const Todo =({todos, setTodos, todo, setTodo, todoEditing, setTodoEditing, editingText, setEditingText})=>{

    const handleSubmit=(e)=>{
        e.preventDefault()
        if (todo.trim()){
          const newTodo = {
          id: new Date().getTime(),
          text: todo,
          completed: false,
        }
        setTodos([...todos].concat(newTodo))
        setTodo("")}
      }
    
      const deleteTodo =(id)=>{
        const updatedTodos = [...todos].filter((todo) => todo.id !== id)
        setTodos(updatedTodos)
      }
    
      const toggleComplete = (id)=>{
        const updatedTodos = [...todos].map((todo)=> {
          if(todo.id ===id){
            todo.completed = !todo.completed
          }
          return todo
         } )
         setTodos(updatedTodos)
      }
      const editTodo = (id) =>{
        const updatedTodos = [...todos].map((todo) =>{
          if(todo.id===id) {
            if (editingText.trim()){
              todo.text = editingText
            }
           
          }
          return todo
        })
          setTodos(updatedTodos)
          setTodoEditing(null)
          setEditingText("")
        
      }
      const copyTodo = (id) =>{
        [...todos].map((todo) =>{
          if(todo.id===id) {
            navigator.clipboard.writeText(todo.text)
          }
          return todo
        })
      }
const toggleTodoForm=()=>{
    if (document.getElementById("todoForm").style.display==="none"){
        document.getElementById("todoForm").style.display="block"
        document.getElementById("btnTodoToggle").innerText="Hide form"
    }else{
        document.getElementById("todoForm").style.display="none"
        document.getElementById("btnTodoToggle").innerText="Add new todo"
    }
}

return(
<div className="todo-app">
      <h3>Todo-list</h3>
      {todos.map((todo)=>
      <div key={todo.id}>
        {todoEditing ===todo.id ?
          (
          <div>
          <input 
          type="text" 
          onChange = {(e)=>setEditingText(e.target.value)} 
          valiue = {editingText}
          placeholder="ctrl+v to paste original todo"
          className="input-todo"
          />
          <button onClick={()=>{
            editTodo(todo.id)
            copyTodo(todo.id)
            }} id="btn-todo-editSubmit">Save</button>
          </div>
          )
          :
          (<div id="todo-item-container">
            <p onClick={()=>toggleComplete(todo.id)} id="todo-item"className={`toto ${todo.completed?"completed":""}`}>{todo.text}</p>
            <button onClick={()=>deleteTodo(todo.id)} id="btn-todo-delete"><i className="fa-solid fa-trash-can"></i></button>
            <button onClick={()=>setTodoEditing(todo.id)} id="btn-todo-edit"><i class="fa-solid fa-pen-to-square"></i></button>
          </div>)}

      </div>)}
      <form onSubmit={handleSubmit} id="todoForm">
        <input className="input-todo"type="text" placeholder="Enter new todo..." onChange={(e)=>setTodo(e.target.value)} value={todo}/>
        <button type="submit" id="btn-new-todo">Add</button>
      </form>
      <button onClick={toggleTodoForm} id="btnTodoToggle">Hide add todo</button>
    </div>
)
}

export default Todo