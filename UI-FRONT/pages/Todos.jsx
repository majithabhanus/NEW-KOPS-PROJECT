
import { useEffect, useState } from 'react'
import api from '../api'

export default function Todos() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')

const load = async () => {
  try {
    const res = await api.get('/todos')
    setTodos(Array.isArray(res.data) ? res.data : [])
  } catch (err) {
    console.error('Failed to load todos', err)
    setTodos([])
  }
}


  const add = async e => {
    e.preventDefault()
    await api.post('/todos', { title })
    setTitle('')
    load()
  }

  const del = async id => {
    await api.delete('/todos/' + id)
    load()
  }

  useEffect(()=>{ load() },[])

  return (
    <div className="todo-container">
  <h2>Todo List</h2>

  <form className="todo-form" onSubmit={add}>
    <input 
      value={title} 
      onChange={e=>setTitle(e.target.value)}
      placeholder="Add new task..."
    />
    <button>Add</button>
  </form>

  <ul className="todo-list">
    {todos.map(t=>(
      <li key={t.id}>
        {t.title}
        <button onClick={()=>del(t.id)}>X</button>
      </li>
    ))}
  </ul>
</div>

  )
}
