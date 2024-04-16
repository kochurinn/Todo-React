const Tasks = ({ activeTasks, onDeleteActiveTask, onDone, doneTasks, onDeleteDoneTask, onUnDone }) => {
    return (
        <>
            <div className="activeTasksList">
                {activeTasks.map((task, index) => (
                    <div key={task.id} className="activeTask">
                        <button onClick={() => onDeleteActiveTask(task.id)}>delete</button>
                        <input
                            onChange={() => onDone(task.id)}
                            type="checkbox"
                        />
                        <span className="taskName">{index + 1}. {task.text}</span>
                    </div>
                ))}
            </div>
            <div className="doneTasksList">
                {doneTasks.map((task) => (
                    <div key={task.id} className="doneTask">
                        <button onClick={() => onDeleteDoneTask(task.id)}>delete</button>
                        <input onChange={() => onUnDone(task.id)} type="checkbox" checked />
                        <span className="taskName">{task.text}</span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Tasks
