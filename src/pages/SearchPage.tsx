import { useEffect, useRef, useState } from "react";
import SectionBreak from "../components/SectionBreak";
import ToggleButton from "../components/ToggleButton";
import PageHeading from "../components/PageHeading";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Track from "../components/Track";
import Tag from "../components/Tag";
import { Link, useOutletContext } from "react-router-dom";
import { FilterMode, SearchResult, beginPlayback, getFilteredTracks, getRequestOptions, pausePlayback } from "../utils";
import { outletContext } from "../App";

import SearchIcon from "../assets/search-icon.svg";
import TagIcon from "../assets/tag-icon.svg";
import TrackIcon from "../assets/playlist-icon.svg";
import "../styles/SearchPage.css";

export default function SearchPage({ }) {
  const [loading, setLoading] = useState(false);
  const [baseUrl, authToken]: outletContext = useOutletContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult>();

  const searchInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  function handlePreviewSearch() {
    // TODO: implement this, gets local redis results
    console.log("handlePreviewSearch");
  }

  function handleFullSearch() {
    setLoading(true);

    const requestOptions = getRequestOptions("POST", {
      query: searchQuery,
    }, authToken);

    fetch(baseUrl + "api/search", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setSearchResult(json);
        console.log("JSON", json);
      })
      .catch(error => {
        console.error("search:", error);

        setTimeout(() => {
          setLoading(false);
          setSearchResult({
            tracks: [
              {
                albumArt: "https://i.scdn.co/image/ab67616d00001e0234c8199b0b3b3fb42b8a98a8",
                artistNames: ["Bad Bunny", "Jhayco"],
                duration: 205000, // ms
                playable: true,
                tags: ["feeling bad >:)", "bad boy vibes"],
                name: "DAKITI",
                uuid: "1", // Mixtify ID
              },
              {
                albumArt: "https://i.scdn.co/image/ab67616d00001e024d382194384bc6e08eb090f6",
                artistNames: ["Bad Bunny"],
                duration: 210000, // ms
                playable: true,
                tags: ["feeling bad >:)", "bad bad", "something something bad"],
                name: "MIA (feat. Drake)",
                uuid: "2", // Mixtify ID
              },
              {
                albumArt: "https://i.scdn.co/image/ab67616d00001e0249d694203245f241a1bcaa72",
                artistNames: ["Bad Bunny", "Chencho Corleone"],
                duration: 178000, // ms
                playable: true,
                tags: ["feeling bad >:)"],
                name: "Me Porto Bonito",
                uuid: "3", // Mixtify ID
              },
              {
                albumArt: "https://i.scdn.co/image/ab67616d00001e027b1fc51ff3257b5286a1ecec",
                artistNames: ["Bad Bunny"],
                duration: 165000, // ms
                playable: true,
                tags: ["feeling bad >:)", "bad boy vibes"],
                name: "UN PREVIEW",
                uuid: "4", // Mixtify ID
              },
              {
                albumArt: "https://i.scdn.co/image/ab67616d00001e025f3aef5159749e4b61686670",
                artistNames: ["Fuerza Regida", "Bad Bunny"],
                duration: 271000, // ms
                playable: true,
                tags: ["feeling bad >:)", "bad bad"],
                name: "Bebe Dame",
                uuid: "5", // Mixtify ID
              },
              {
                albumArt: "https://i.scdn.co/image/ab67616d00001e02f6f36a5ff816939253221bec",
                artistNames: ["Yahritza Y Su Esencia", "Bad Bunny"],
                duration: 160000, // ms
                playable: true,
                tags: [],
                name: "Frágil",
                uuid: "6", // Mixtify ID
              },
              {
                albumArt: "https://i.scdn.co/image/ab67616d00001e0282ce4c7bbf861185252e82ae",
                artistNames: ["Grupo Frontera", "Bad Bunny"],
                duration: 194000, // ms
                playable: true,
                tags: ["something something bad"],
                name: "un x100to",
                uuid: "7", // Mixtify ID
              },
            ],
            numTracks: 0,
  
            playlists: [],
            numPlaylists: 0,
  
            tags: [
              {
                name: "feeling bad >:)",
                uuid: "feeling bad >:)",
              },
              {
                name: "bad boy vibes",
                uuid: "bad boy vibes",
              },
              {
                name: "bad bad",
                uuid: "bad bad",
              },
              {
                name: "something something bad",
                uuid: "something something bad",
              },
            ],
            numTags: 0,
  
            friends: [],
            numFriends: 0,
          });
        }, 1500);
      });
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

  const filteredTracks = getFilteredTracks(searchResult?.tracks, selectedTags, filterMode);
  function toggleTag(target: string) {
    const newSelected = new Set(selectedTags);
    if (newSelected.has(target)) {
      newSelected.delete(target);
    } else {
      newSelected.add(target);
    }
    setSelectedTags(newSelected);
  }

  interface PlaybackState {
    id: string,
    offset: number,
    playing: boolean,
  }
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    id: "", offset: 0, playing: false,
  });

  const [selectedTrack, setSelectedTrack] = useState(-1);
  function handleTrackSelection(target: number) {
    if (target === selectedTrack) setSelectedTrack(-1);
    else setSelectedTrack(target);
  }

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
                  selected={selectedTrack === idx}
                  currentlyPlaying={playbackState.playing && playbackState.id === track.uuid}
                  playPauseCallback={() => {
                    // A track is currently playing and it is this track...
                    if (playbackState.id === track.uuid && playbackState.playing) {
                      pausePlayback(
                        authToken,
                        (json) => setPlaybackState({ id: track.uuid, playing: false, offset: json.position }),
                        (error) => console.error(error)
                      );
                    }

                    // A track is not playing...
                    if (!playbackState.playing) {
                      let offset = 0;
                      if (playbackState.id === track.uuid && playbackState.offset < track.duration) {
                        offset = playbackState.offset;
                      }

                      beginPlayback(track.uuid, offset, authToken,
                        () => setPlaybackState({ id: track.uuid, playing: true, offset }),
                        (error) => console.error(error),
                      );
                    }
                  }}
                  onClick={() => {
                    handleTrackSelection(idx);
                  }}
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