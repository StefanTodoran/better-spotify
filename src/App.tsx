import { useState } from "react";
import "./App.css";
import Header from "./components/Header";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <>
      <Header authenticated={authenticated}/>      
      
    </>
  )
}

export default App
