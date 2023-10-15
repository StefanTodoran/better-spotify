import PageHeading from "../components/PageHeading";
// import PageHeading from "../components/PageHeading";

import HomeIcon from "../assets/logo-icon.svg";
import "../styles/HelpPage.css";

export default function HomePage() {

  return (
    <>
      <PageHeading iconSrc={HomeIcon}>Home</PageHeading>

      <p className="hint">
        Welcome to Mixtify, a modern web app designed to be a bridge between
        Spotify, Apple Music, Amazon Music, and other streaming services, 
        allowing friends to come together and share in the joy of music no 
        matter the services they use.
      </p>
    </>
  );
}