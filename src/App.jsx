import { useState} from 'react'
import { useEffect } from 'react'
import './App.css'
import { stringify, v4 as uuidv4 } from 'uuid';




function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  function settodo(e) {
    setTodo(e.target.value)
  }
  function handleadd(i) {
    setTodo("")
    setTodos([...todos, { id: uuidv4(), todo, checked: false }])
    localStorage.setItem("save-delete"  , JSON.stringify(todos))
  }
  function checkbox(i) {
    let id = i.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos]
    let x = newtodos[index]
    newtodos[index].checked = !newtodos[index].checked
    let x1 = newtodos[index].checked
    setTodos(newtodos)
    localStorage.setItem("save-delete"  , JSON.stringify(newtodos))
  }
  function handledelete(i) {
    let id = i.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos]
    let y = newtodos[index]
    let z = newtodos.splice(index, 1);
    console.log(z)
    setTodos(newtodos)
    localStorage.setItem("save-delete" , JSON.stringify(newtodos))
  }
  useEffect(() => {
    let delsave = JSON.parse(localStorage.getItem("save-delete")) 
    if (delsave) {
      setTodos(delsave)
    } 
    }, [])
  return (
    <>
      <div className="navbar">Tods list</div>
      <div className='input-container'><input className='input-tasks' onChange={settodo} value={todo} type="text" /> <button className='add-button' onClick={handleadd}>add</button></div>
      <div className="container">
        {todos.map((item) => {
          return <div key={item.id} className="tasks"><div className={item.checked ? "line-through" : "task-values"}>{item.todo}</div><input className='input-checkbox' name={item.id} onChange={checkbox} type="checkbox" /> <button className='delete-button' onClick={handledelete} name={item.id}>delete</button></div>
        })}
      </div>
    </>
  )
}

export default App
