import Button from "../components/Button";
import "../styles/HelpPage.css";

export default function HelpPage({ }) {


  return (
    <>
      <h2>Help</h2>

      <section className="cards-grid">
        <Button
          customClass="help-card"
          onClick={() => {}}
        >Overview</Button>
        <Button
          customClass="help-card"
          onClick={() => {}}
        >Playlists</Button>
                <Button
          customClass="help-card"
          onClick={() => {}}
        >Tags</Button>
      </section>
    </>
  );
}