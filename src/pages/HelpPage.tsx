import Button from "../components/Button";
import PageHeading from "../components/PageHeading";

import HelpIcon from "../assets/help-icon.svg";
import PlaylistIcon from "../assets/playlist-icon.svg";
import TagsIcon from "../assets/tag-icon.svg";
import FriendsIcon from "../assets/friends-icon.svg";
import "../styles/HelpPage.css";
import { useState } from "react";

interface HelpItem {
  name: string,
  content: string,
  icon: string,
}

const helpSections: HelpItem[] = [
  {
    name: "Overview",
    content: "TODO",
    icon: HelpIcon,
  },
  {
    name: "Playlists",
    content: "TODO",
    icon: PlaylistIcon,
  },
  {
    name: "Tags",
    content: "TODO",
    icon: TagsIcon,
  },
  {
    name: "Friends",
    content: "Build musical connections with friends regardless of their streaming platform of choice with Mixify, an application layer over Spotify, Apple Music, and other platforms which enables cross-platform playlist sharing and joint sessions.",
    icon: FriendsIcon,
  },
];

export default function HelpPage() {
  const [selected, setSelected] = useState(-1);

  function toggleSelected(target: number) {
    if (selected === target) setSelected(-1);
    else setSelected(target);
  }

  return (
    <>
      <PageHeading iconSrc={HelpIcon}>Help</PageHeading>

      <section className="cards-grid">
        {helpSections.map((section, idx) =>
          <Button
            key={idx}
            customClass={selected === idx ? "help-card selected" : "help-card"}
            onClick={() => { toggleSelected(idx) }}
          >
            <p><img src={section.icon}/>{section.name}</p>
            <p className="help-content">{section.content}</p>
          </Button>
        )}
      </section>
    </>
  );
}