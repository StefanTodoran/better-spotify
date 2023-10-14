import { useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

export default function LoginPage({ }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h2>Login</h2>
      <TextInput
        value={username}
        updateValue={setUsername}
        label="Username"
      />
      <TextInput
        value={password}
        updateValue={setPassword}
        label="Password"
        inputType="password"
      />

      <div className="buttons-row">
        <Button onClick={() => {

        }}>Help</Button>
        <Button customClass="primary" onClick={() => {

        }}>Log In</Button>
      </div>
    </>
  );
}