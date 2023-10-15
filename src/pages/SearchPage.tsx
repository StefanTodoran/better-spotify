import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import PageHeading from "../components/PageHeading";
import Track, { TrackObject } from "../components/Track";
import SectionBreak from "../components/SectionBreak";

import SearchIcon from "../assets/search-icon.svg";
import TagIcon from "../assets/tag-icon.svg";
import TrackIcon from "../assets/playlist-icon.svg";
import "../styles/SearchPage.css";

interface SearchResult {
  tracks: TrackObject[],
  numTracks: number,

  // artists: any,
  // numArtists: number,

  // albums: any,
  // numAlbums: number,

  playlists: PlaylistObject[],
  numPlaylists: number,

  tags: TaglistObject[],
  numTags: number,

  friends: UserObject[],
  numFriends: number,
}

interface PlaylistObject {
  collaborative: boolean,
  description?: string,
  image: string, // url
  name: string,
  owner: UserObject,
}

interface TaglistObject {
  name: string,
  // tracks: string[], // Mixify IDs
  uuid: string, // Mixify ID
}

interface UserObject {
  username: string,
  isFriend: boolean,
  profileUrl: string,
  uuid: string, // Mixify ID
}

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
            name: "DAKITI",
            uuid: "UUID123", // Mixtify ID
          },
          {
            albumArt: "https://i.scdn.co/image/ab67616d00001e024d382194384bc6e08eb090f6",
            artistNames: ["Bad Bunny"],
            duration: 210000, // ms
            playable: true,
            name: "MIA (feat. Drake)",
            uuid: "UUID456", // Mixtify ID
          },
          {
            albumArt: "https://i.scdn.co/image/ab67616d00001e0249d694203245f241a1bcaa72",
            artistNames: ["Bad Bunny", "Chencho Corleone"],
            duration: 178000, // ms
            playable: true,
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
            name: "hyperdabad",
            uuid: "TAG_789",
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
              {searchResult.tags.map((track, idx) =>
                <div></div>
                // <Track
                //   {...track}
                //   onClick={() => { }}
                // />
              )}
            </>}

            {searchResult.tracks.length > 0 && <>
              <SectionBreak iconSrc={TrackIcon}>Tracks</SectionBreak>
              {searchResult.tracks.map((track, idx) =>
                <Track
                  {...track}
                  onClick={() => { }}
                />
              )}
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