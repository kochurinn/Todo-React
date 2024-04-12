import React from "react"

function App() {
  const [value, setValue] = React.useState('')
  const [id, setId] = React.useState(1)
  const [activeTasks, setActiveTasks] = React.useState(JSON.parse(localStorage.getItem('activeTasks')) || [])
  const [doneTasks, setDoneTasks] = React.useState(JSON.parse(localStorage.getItem('doneTasks')) || [])
  
  const onCreateTask = () => {
    if (!value) return
    const task = {
      id,
      text: value
    }
    setId(id + 1)
    setActiveTasks([...activeTasks, task])
    localStorage.setItem('activeTasks', JSON.stringify([...activeTasks, task]))
    setValue('')
  }

  const onDeleteActiveTask = (id) => {
    const filterActiveTasks = activeTasks.filter(task => task.id !== id)
    setActiveTasks(filterActiveTasks)
    localStorage.setItem('activeTasks', JSON.stringify(filterActiveTasks))
  }

  const onDeleteDoneTask = (id) => {
    const filterDoneTasks =  doneTasks.filter(task => task.id !== id)
    setDoneTasks(filterDoneTasks)
    localStorage.setItem('doneTasks', JSON.stringify(filterDoneTasks))
  }

  const onDone = (id) => {
    const filterActiveTasks = activeTasks.filter(task => task.id !== id)
    const task = activeTasks.find(task => task.id === id)
    const newDoneTasks = [...doneTasks, task]
    setActiveTasks(filterActiveTasks)
    setDoneTasks(newDoneTasks)
    localStorage.setItem('activeTasks', JSON.stringify(filterActiveTasks))
    localStorage.setItem('doneTasks', JSON.stringify(newDoneTasks))
  }

  const onUnDone = (id) => {
    const filterDoneTasks = doneTasks.filter(task => task.id !== id)
    const task = doneTasks.find(task => task.id === id)
    const newActiveTasks = [...activeTasks, task]
    setDoneTasks(filterDoneTasks)
    setActiveTasks(newActiveTasks)
    localStorage.setItem('doneTasks', JSON.stringify(filterDoneTasks))
    localStorage.setItem('activeTasks', JSON.stringify(newActiveTasks))
  }

  const onCreateNewList = () => {
    setActiveTasks([])
    setDoneTasks([])
    localStorage.removeItem('activeTasks')
    localStorage.removeItem('doneTasks')
  }

  const onDeleteAllDoneTasks = () => {
    setDoneTasks([])
    localStorage.removeItem('doneTasks')
  }

  return (
  <div className="wrapper">
    <div onClick={onCreateNewList} className="newList">Начать новый список</div>
    <div className="input">
      <input 
        type="text" 
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' ? setValue(e.target.value) : null}
        placeholder="Новая задача"
      />
      <div onClick={onCreateTask}>Enter</div>
    </div>
    <div className="activeTasksList">
      {activeTasks.map((task, index) => (
        <div key={task.id} className="activeTask">
          <button onClick={() => onDeleteActiveTask(task.id)}>delete</button>
          <input 
            onChange={() => onDone(task.id)}
            type="checkbox"/>
          <span className="taskName">{index + 1}. {task.text}</span>
        </div>
      ))}
    </div>
    <div className="doneTasksList">
      {doneTasks.map((task) => (
        <div key={task.id} className="doneTask">
          <button onClick={() => onDeleteDoneTask(task.id)}>delete</button>
          <input onChange={() => onUnDone(task.id)} type="checkbox" checked/>
          <span className="taskName">{task.text}</span>
        </div>
      ))}
    </div>
    <div onClick={onDeleteAllDoneTasks} className="removeDoneTasks">Удалить выполненные</div>
  </div>
  )
}

export default App
