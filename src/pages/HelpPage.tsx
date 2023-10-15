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
    content: "Build musical connections with friends regardless of their streaming platform of choice with Mixify, an application layer over Spotify, Apple Music, and other platforms which enables cross-platform playlist sharing and joint sessions.",
    icon: HelpIcon,
  },
  {
    name: "Playlists",
    content: 'To get started, you can import your playlists, which will convert them to "taglists". You can play a taglist the just like a playlist, but tags are far more flexible.',
    icon: PlaylistIcon,
  },
  {
    name: "Tags",
    content: 'Tags are a superset of playlists, meaning anything one can do with playlist can be done with tags. Tags allow shuffling together multiple "playlists" or shuffling together only shared songs between multiple "playlists".',
    icon: TagsIcon,
  },
  {
    name: "Friends",
    content: "By invite your friends to create free Mixtify accounts, you can share music and listen together with friends, even if they use different streaming servies.",
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