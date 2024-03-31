import { useState } from "react"
import './assets/css/style.css'

function App() {
  const [value, setValue] = useState('')
  const [id, setId] = useState(1)
  const [activeTasks, setActiveTasks] = useState([])
  const [doneTasks, setDoneTasks] = useState([])

  const onCreateTask = () => {
    if (!value) return
    const task = {
      id,
      text: value
    }
    setId(id + 1)
    setActiveTasks([...activeTasks, task])
    setValue('')
  }
  const deleteTask = (id) => {
    setActiveTasks(activeTasks.filter(task => task.id !== id))
  }
  const setTaskDone = (id) => {
    setActiveTasks(activeTasks.filter(task => task.id !== id))
    const task = activeTasks.find(task => task.id === id)
    setDoneTasks([...doneTasks, task])
  }

  return <>
    <button>Начать новый список</button>
    <div>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}placeholder="Что нужно делать?"
      />
      <button onClick={onCreateTask}>Enter</button>
    </div>
    <div>
      {activeTasks.map((task) => (
        <div key={task.id}>
          <span onClick={() => deleteTask(task.id)}>delete</span>
          <input onChange={() => setTaskDone(task.id)} type="checkbox" />
          <span>{task.text}</span>
        </div>
      ))}
    </div>
    <div className="mt-3">
      {doneTasks.map((task) => (
        <div key={task.id}>
          <span onClick={() => deleteTask(task.id)}>delete</span>
          <input type="checkbox" checked={true} />
          <span className="line-through">{task.text}</span>
        </div>
      ))}
    </div>
    <div>
      <button>Удалить выполненные</button>
    </div>
  </>
}

export default App
