import React from "react"

function App() {
  const [value, setValue] = React.useState('')
  const [id, setId] = React.useState(1)
  const [activeTasks, setActiveTasks] = React.useState([])
  const [doneTasks, setDoneTask] = React.useState([])

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

  const onDeleteActiveTask = (id) => {
    setActiveTasks(activeTasks.filter(task => task.id !== id))
  }

  const onDeleteDoneTask = (id) => {
    setDoneTask(doneTasks.filter(task => task.id !== id))
  }

  const onDone = (id) => {
    setActiveTasks(activeTasks.filter(task => task.id !== id))
    const task = activeTasks.find(task => task.id === id)
    setDoneTask([...doneTasks, task])
  }

  const onUnDone = (id) => {
    setDoneTask(doneTasks.filter(task => task.id !== id))
    const task = doneTasks.find(task => task.id === id)
    setActiveTasks([...activeTasks, task])
  }

  const onCreateNewList = () => {
    setActiveTasks([])
    setDoneTask([])
  }

  const onDeleteAllDoneTasks = () => {
    setDoneTask([])
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setValue
    }
  }

  return (
  <div className="wrapper">
    <div onClick={onCreateNewList} className="newList">Начать новый список</div>
    <div className="input">
      <input 
        type="text" 
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyPress={this.handleKeyPress}
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
