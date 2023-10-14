import { useState } from "react";
import Header from "./components/Header";
import { Outlet, useSearchParams } from "react-router-dom";

import "./App.css";

export default function App() {
  const [authenticated, setAuthenticated] = useState(true); // TODO: change this
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="main-content">
        <Header authenticated={authenticated} />
        <Outlet />
      </div>
    </>
  )
}