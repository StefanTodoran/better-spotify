import SectionBreak from "../components/SectionBreak";

import HomeIcon from "../assets/logo-icon.svg";
import HelpIcon from "../assets/help-icon.svg";
import { Link } from "react-router-dom";

export default function HomePage() {

  return (
    <>
      <h2>Welcome!</h2>

      <section className="content-section">

        <SectionBreak iconSrc={HomeIcon}>Overview</SectionBreak>
        <p>
          Welcome to Mixify, a modern web app designed to be a bridge between
          Spotify, Apple Music, Amazon Music, and other streaming services,
          allowing friends to come together and share in the joy of music no
          matter the services they use.
        </p>

        <SectionBreak iconSrc={HelpIcon}>How It Works</SectionBreak>
        <p>
          To get started, you will need to authorize Mixify to access your Spotify,
          Apple Music, or other music streaming account. Then you can import your
          playlist which will automatically converted into taglists. For information
          about tags, see the <Link to="/help">help center</Link>.
        </p>
      </section>
    </>
  );
}