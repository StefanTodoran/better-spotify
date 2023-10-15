import { useEffect, useRef, useState } from "react";
import SectionBreak from "../components/SectionBreak";
import ToggleButton from "../components/ToggleButton";
import PageHeading from "../components/PageHeading";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Track from "../components/Track";
import Tag from "../components/Tag";
import { FilterMode, SearchResult, getFilteredTracks } from "../utils";

import LibraryIcon from "../assets/album-icon.svg";
import TagIcon from "../assets/tag-icon.svg";
import TrackIcon from "../assets/playlist-icon.svg";
import "../styles/SearchPage.css";

export default function LibraryPage({ }) {
  const [loading, setLoading] = useState(false);
  const [libraryData, setLibraryData] = useState<SearchResult>();

  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  function fetchLibrary() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setLibraryData({
        tracks: [
          {
            albumArt: "https://i.scdn.co/image/ab67616d00001e0234c8199b0b3b3fb42b8a98a8",
            artistNames: ["Bad Bunny", "Jhayco"],
            duration: 205000, // ms
            playable: true,
            tags: ["TAG_123", "TAG_456"],
            name: "DAKITI",
            uuid: "UUID123", // Mixtify ID
          },
          {
            albumArt: "https://i.scdn.co/image/ab67616d00001e024d382194384bc6e08eb090f6",
            artistNames: ["Bad Bunny"],
            duration: 210000, // ms
            playable: true,
            tags: ["TAG_123", "TAG_789", "TAG2_123", "TAG2_456"],
            name: "MIA (feat. Drake)",
            uuid: "UUID456", // Mixtify ID
          },
          {
            albumArt: "https://i.scdn.co/image/ab67616d00001e0249d694203245f241a1bcaa72",
            artistNames: ["Bad Bunny", "Chencho Corleone"],
            duration: 178000, // ms
            playable: true,
            tags: ["TAG_123"],
            name: "Me Porto Bonito",
            uuid: "UUID789", // Mixtify ID
          },
          {
            albumArt: "https://i.scdn.co/image/ab67616d00001e0234c8199b0b3b3fb42b8a98a8",
            artistNames: ["Bad Bunny", "Jhayco"],
            duration: 205000, // ms
            playable: true,
            tags: ["TAG_123", "TAG_456"],
            name: "DAKITI",
            uuid: "UUID123", // Mixtify ID
          },
          {
            albumArt: "https://i.scdn.co/image/ab67616d00001e024d382194384bc6e08eb090f6",
            artistNames: ["Bad Bunny"],
            duration: 210000, // ms
            playable: true,
            tags: ["TAG_123", "TAG_789", "TAG2_123", "TAG2_456"],
            name: "MIA (feat. Drake)",
            uuid: "UUID456", // Mixtify ID
          },
          {
            albumArt: "https://i.scdn.co/image/ab67616d00001e0249d694203245f241a1bcaa72",
            artistNames: ["Bad Bunny", "Chencho Corleone"],
            duration: 178000, // ms
            playable: true,
            tags: ["TAG_123"],
            name: "Me Porto Bonito",
            uuid: "UUID789", // Mixtify ID
          },
        ],
        numTracks: 0,

        playlists: [],
        numPlaylists: 0,

        tags: [
          {
            name: "feeling bad >:)",
            uuid: "TAG_123",
          },
          {
            name: "bad boy vibes",
            uuid: "TAG_456",
          },
          {
            name: "bad bad",
            uuid: "TAG_789",
          },
          {
            name: "something something bad",
            uuid: "TAG2_123",
          },
          {
            name: "idk",
            uuid: "TAG2_456",
          },
          {
            name: "tag",
            uuid: "TAG2_789",
          },
        ],
        numTags: 0,

        friends: [],
        numFriends: 0,
      });
    }, 1000);
  }

  // TODO: instead of fetching the user's entire library each time
  // they navigate to this page, cache their tags and tracks.
  useEffect(() => {
    fetchLibrary();
  }, []);

  const [filterMode, setFilterMode] = useState<FilterMode>("Match Any");
  const [selectedTags, setSelectedTags] = useState(new Set<string>());

  function toggleTag(target: string) {
    const newSelected = new Set(selectedTags);
    if (newSelected.has(target)) {
      newSelected.delete(target);
    } else {
      newSelected.add(target);
    }
    setSelectedTags(newSelected);
  }

  const filteredTracks = getFilteredTracks(libraryData?.tracks, selectedTags, filterMode);

  return (
    <>
      <PageHeading iconSrc={LibraryIcon}>Library</PageHeading>


      <section className="search-results-container">
        <div className="controls-container">
          <TextInput
            label="Search"
            value={searchQuery}
            updateValue={!loading ? setSearchQuery : undefined}
            giveRef={searchInput}
          />

          <div className="controls-buttons">
            <Button
              onClick={fetchLibrary}
              disabled={loading}
            >Refresh</Button>
            <Button
              onClick={fetchLibrary}
              disabled={loading}
            >Manage</Button>
          </div>
        </div>

        {libraryData && libraryData.tags.length > 0 && <>
          <SectionBreak iconSrc={TagIcon}>Tags</SectionBreak>
          <div className="tags-container">
            <ToggleButton
              firstOption="Match Any"
              secondOption="Match All"
              current={filterMode === "Match Any" ? 0 : 1}
              // @ts-expect-error It will be of type FilterMode
              onClick={setFilterMode}
            />

            {libraryData?.tags.map((tag, idx) =>
              <Tag
                key={idx}
                {...tag}
                selected={selectedTags.has(tag.uuid)}
                onClick={() => { toggleTag(tag.uuid) }}
              />
            )}
          </div>
        </>}

        {libraryData && libraryData.tracks.length > 0 && <>
          <SectionBreak iconSrc={TrackIcon}>Tracks</SectionBreak>
          {filteredTracks.map((track, idx) =>
            <Track
              key={idx}
              {...track}
              currentlyPlaying={false}
              playPauseCallback={() => {}}
              onClick={() => { }}
            />
          )}

          {filteredTracks.length === 0 && <p className="hint" style={{ maxWidth: "unset" }}>
            No tracks match all tags!
          </p>}
        </>}
      </section>

      {/* <p className="hint">
        Your library contains all of your tags and tagged songs.<br />
        Confused? See the <Link to="/help">help center</Link>.
      </p> */}
    </>
  );
}