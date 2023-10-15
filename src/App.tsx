import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Outlet, useNavigate } from "react-router-dom";

import "./App.css";

export default function App() {
  const navigate = useNavigate();
  
  const baseUrl = "localhost:8080/";
  const [authenticated, setAuthenticated] = useState(false);
  // const [authToken, setAuthToken] = useState();
  // const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!authenticated) navigate("/login");
  }, [authenticated]);

  return (
    <>
      <div className="main-content">
        <Header authenticated={authenticated} />
        <Outlet context={[baseUrl, authenticated, setAuthenticated]}/>
      </div>
    </>
  )
}

export type outletContext = [string, boolean, (authState: boolean) => void];