import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { baseUrl } from "./utils";

import "./App.css";

export default function App() {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState<string | null>("null");
  // const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!authToken) navigate("/login");
    // if (authToken) window.location.href = baseUrl + "spotify/login/"; // TODO: add endpoint and check that instead
  }, [authToken]);

  return (
    <>
      <div className="main-content">
        <Header authenticated={!!authToken} />
        <Outlet context={[
          baseUrl,
          authToken,
          setAuthToken
        ]} />
      </div>
    </>
  )
}

export type outletContext = [
  string, // baseUrl
  string, // authToken
  (newToken: string | null) => void, // setAuthToken
];