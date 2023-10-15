import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

import "./App.css";

export default function App() {
  const navigate = useNavigate();
  
  const [authenticated, setAuthenticated] = useState(false); // TODO: change this
  // const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!authenticated) navigate("/login");
  }, [authenticated]);

  return (
    <>
      <div className="main-content">
        <Header authenticated={authenticated} />
        <Outlet context={[authenticated, setAuthenticated]}/>
      </div>
    </>
  )
}