import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import PageHeading from "../components/PageHeading";

import SearchIcon from "../assets/search-icon.svg";
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
  
  tags: any,
  numTags: number,
  
  friends: UserObject[],
  numFriends: number,
}

interface TrackObject {
  albumArt: string, // url
  artistsNames: string[],
  duration: number, // ms
  playable: boolean,
  name: string,
  uuid: string, // Mixtify ID
}

interface PlaylistObject {
  collaborative: boolean,
  description?: string,
  image: string, // url
  name: string,
  owner: UserObject,
}

interface UserObject {
  username: string,
  isFriend: boolean,
  profileUri: string,
  uuid: string, // Mixtify ID
}

export default function SearchPage({ }) {
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState();

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
          <></> :

          <p className="hint">
            Search for tracks, artists, albums, tags, friends, or playlists.<br/>
            Confused? See the <Link to="/help">help center</Link>.
          </p>
      }
    </>
  );
}