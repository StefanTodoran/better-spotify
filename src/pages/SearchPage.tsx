import { useEffect, useRef, useState } from "react";
import SectionBreak from "../components/SectionBreak";
import ToggleButton from "../components/ToggleButton";
import PageHeading from "../components/PageHeading";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Track from "../components/Track";
import Tag from "../components/Tag";
import { Link } from "react-router-dom";
import { FilterMode, SearchResult, getFilteredTracks } from "../utils";

import SearchIcon from "../assets/search-icon.svg";
import TagIcon from "../assets/tag-icon.svg";
import TrackIcon from "../assets/playlist-icon.svg";
import "../styles/SearchPage.css";

export default function SearchPage({ }) {
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult>();

  const searchInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  function handlePreviewSearch() {
    // TODO: implement this, gets first 5 results
    console.log("handlePreviewSearch");
  }

  function handleFullSearch() {
    // TODO: implement this, gets first 15, then has pagination
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSearchResult({
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

  // [ ===================== ] \\
  // DEBOUNCING SEARCH QUERIES \\

  const debounceTimeoutId = useRef(0);
  function debounceEventHandler(func: () => void, delay: number) {
    clearTimeout(debounceTimeoutId.current);
    debounceTimeoutId.current = setTimeout(() => func(), delay);
  }

  useEffect(() => {
    debounceEventHandler(handlePreviewSearch, 300);
  }, [searchQuery]);

  // DEBOUNCING SEARCH QUERIES \\
  // [ ===================== ] \\

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

  const filteredTracks = getFilteredTracks(searchResult?.tracks, selectedTags, filterMode);

  return (
    <>
      <PageHeading iconSrc={SearchIcon}>Search</PageHeading>

      <div className="buttons-row">
        <div onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter") handleFullSearch();
        }}>
          <TextInput
            label="Search"
            value={searchQuery}
            updateValue={!loading ? setSearchQuery : undefined}
            giveRef={searchInput}
          />
        </div>

        <Button
          customClass="primary"
          onClick={handleFullSearch}
          disabled={!searchQuery || loading}
        >Search</Button>
      </div>

      {
        searchResult ?
          <section className="search-results-container">
            {searchResult.tags.length > 0 && <>
              <SectionBreak iconSrc={TagIcon}>Tags</SectionBreak>
              <div className="tags-container">
                <ToggleButton
                  firstOption="Match Any"
                  secondOption="Match All"
                  current={filterMode === "Match Any" ? 0 : 1}
                  // @ts-expect-error It will be of type FilterMode
                  onClick={setFilterMode}
                />

                {searchResult.tags.map((tag, idx) =>
                  <Tag
                    key={idx}
                    {...tag}
                    selected={selectedTags.has(tag.uuid)}
                    onClick={() => { toggleTag(tag.uuid) }}
                  />
                )}
              </div>
            </>}

            {searchResult.tracks.length > 0 && <>
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

              {filteredTracks.length === 0 ?
                <p className="hint" style={{ maxWidth: "unset" }}>
                  No tracks match all tags!
                </p>
                :
                <p className="hint" style={{ maxWidth: "unset" }}>
                  Found <b>{filteredTracks.length}</b> tracks that match your search.
                </p>
              }
            </>}
          </section>
          :
          <p className="hint">
            Search for tracks, artists, albums, tags, friends, or playlists.<br />
            Confused? See the <Link to="/help">help center</Link>.
          </p>
      }
    </>
  );
}