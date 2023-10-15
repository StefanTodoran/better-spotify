import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import PageHeading from "../components/PageHeading";

import AuthIcon from "../assets/auth-icon.svg";

export default function LoginPage({ }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // @ts-expect-error
  const [authenticated, setAuthenticated] = useOutletContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    usernameInput.current?.focus();
  }, []);

  function handleLoginAttempt() {
    setLoading(true);
    // TODO: make this actually POST and work

    setTimeout(() => {
      setAuthenticated(true);
    }, 500);
  }

  useEffect(() => {
    if (authenticated) navigate("/");
  }, [authenticated]);

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
          disabled={loading || authenticated}
        >Log In</Button>
      </div>
    </>
  );
}