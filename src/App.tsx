import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Outlet, useNavigate } from "react-router-dom";

import "./App.css";

export default function App() {
  const navigate = useNavigate();
  
  const baseUrl = "/";
  const [authToken, setAuthToken] = useState<string | null>(null);
  // const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!authToken) navigate("/login");
  }, [authToken]);

  return (
    <>
      <div className="main-content">
        <Header authenticated={!!authToken} />
        <Outlet context={[
          baseUrl, 
          authToken, 
          setAuthToken
          ]}/>
      </div>
    </>
  )
}

export type outletContext = [
  string, // baseUrl
  string, // authToken
  (newToken: string | null) => void, // setAuthToken
];