import { useState } from "react"

function App() {
  const [value, setValue] = useState(1)
  
  return <>
    <div>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </div>
    <div>{value}</div>
    {Array.from({ length: value }).map((_, i) => (
      <div key={i}>{i}</div>
    ))}
  </>
}

export default App
