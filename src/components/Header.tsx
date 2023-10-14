import Logo from "../assets/logo.svg?react";
import "../styles/Header.css";
import Button from "./Button";

interface Props {
  authenticated: boolean,
}

export default function Header({
  authenticated
}: Props) {
  return (
    <nav>
      <a
        className="branding"
      // href="/"
      >
        <Logo className="logo" />
        <h1 className="title">Super Spotify</h1>
      </a>

      <div>
        <Button onClick={() => { }} disabled={!authenticated}>
          Search
        </Button>
        <Button onClick={() => { }} disabled={!authenticated}>
          My Library
        </Button>
        <Button customClass="primary" disabled={true} onClick={() => { }}>
          Test
        </Button>
        <Button customClass="primary" onClick={() => { }}>
          Log In
        </Button>
      </div>
    </nav>
  );
}