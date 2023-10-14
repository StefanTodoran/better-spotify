import { useState } from "react";

import Logo from "./assets/logo.svg?react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Logo />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
