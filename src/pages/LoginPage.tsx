import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import PageHeading from "../components/PageHeading";

import AuthIcon from "../assets/auth-icon.svg";
import { outletContext } from "../App";
import { getRequestOptions } from "../utils";

export default function LoginPage({ }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [baseUrl, authToken, setAuthToken]: outletContext = useOutletContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    usernameInput.current?.focus();
  }, []);

  function handleLoginAttempt() {
    setLoading(true);

    const requestOptions = getRequestOptions("POST", {
      username: username,
      password: password,
    });

    // fetch(baseUrl + "api/login/", requestOptions)
    fetch(baseUrl + "accounts/login/", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setAuthToken(json.token);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setAuthToken(null);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (authToken) navigate("/");
  }, [authToken]);

  return (
    <>
      <PageHeading iconSrc={AuthIcon}>Login</PageHeading>

      <TextInput
        label="Username"
        value={username}
        updateValue={setUsername}
        giveRef={usernameInput}
      />

      <div onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") handleLoginAttempt();
      }}>
        <TextInput
          label="Password"
          inputType="password"
          value={password}
          updateValue={setPassword}
        />
      </div>


      <div className="buttons-row">
        <Button
          customClass="primary"
          onClick={handleLoginAttempt}
          disabled={loading || !!authToken}
        >Log In</Button>
      </div>

      <p className="hint">
        Forgot your login information? Click <Link to="/forgot-password">here</Link> to 
        reset your password. For other technical issues, please contact the system administrator.
      </p>
    </>
  );
}