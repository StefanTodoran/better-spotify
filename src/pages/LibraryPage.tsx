import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import SectionBreak from "../components/SectionBreak";
import ToggleButton from "../components/ToggleButton";
import PageHeading from "../components/PageHeading";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Track from "../components/Track";
import { outletContext } from "../App";
import Tag from "../components/Tag";
import { FilterMode, SearchResult, beginPlayback, getFilteredTracks, getRequestOptions, pausePlayback } from "../utils";

import Loader from "../assets/loader.svg";
import LibraryIcon from "../assets/album-icon.svg";
import TagIcon from "../assets/tag-icon.svg";
import TrackIcon from "../assets/playlist-icon.svg";
import "../styles/SearchPage.css";

export default function LibraryPage({ }) {
  const [loading, setLoading] = useState(false);
  const [baseUrl, authToken]: outletContext = useOutletContext();
  const [libraryData, setLibraryData] = useState<SearchResult>();

  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  function fetchLibrary() {
    setLoading(true);

    const requestOptions = getRequestOptions("GET", undefined, authToken);
    console.log(baseUrl + "api/listSongs", requestOptions);

    fetch(baseUrl + "api/listSongs", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setLibraryData(json);
        console.log("JSON", json);
      })
      .catch(error => {
        console.error("search:", error);

        setTimeout(() => {
          setLoading(false);
          setLibraryData({
            tracks: [
              {
                albumArt: "https://i.scdn.co/image/ab67616d00001e02523458c391fe8180a19a1069",
                artistNames: ["Elton John"],
                duration: 202000, // ms
                playable: true,
                tags: ["dua fever"],
                name: "Cold Heart - PNAU Remix",
                uuid: "a", // Mixtify ID
              },
              {
                albumArt: "https://i.scdn.co/image/ab67616d00001e02383ed92279639a6b02e23ba3",
                artistNames: ["Dua Lipa"],
                duration: 210000, // ms
                playable: true,
                tags: ["dua fever"],
                name: "Don't Start Now",
                uuid: "b", // Mixtify ID
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
                albumArt: "https://i.scdn.co/image/ab67616d00001e0234c8199b0b3b3fb42b8a98a8",
                artistNames: ["Bad Bunny", "Jhayco"],
                duration: 205000, // ms
                playable: true,
                tags: ["feeling bad >:)", "bad boy vibes"],
                name: "DAKITI",
                uuid: "1", // Mixtify ID
              },
              {
                albumArt: "https://i.scdn.co/image/ab67616d00001e02cc7fbfef4f6b51ba9211c091",
                artistNames: ["Dua Lipa", "Angele"],
                duration: 156000, // ms
                playable: true,
                tags: ["dua fever", "bad bad"],
                name: "Fever",
                uuid: "c", // Mixtify ID
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
                name: "dua fever",
                uuid: "dua fever",
              },
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
        }, 1000);
      });
  }

  // TODO: instead of fetching the user's entire library each time
  // they navigate to this page, cache their tags and tracks.
  useEffect(() => {
    fetchLibrary();
  }, []);

  const [filterMode, setFilterMode] = useState<FilterMode>("Match Any");
  const [selectedTags, setSelectedTags] = useState(new Set<string>());

  const filteredTracks = getFilteredTracks(libraryData?.tracks, selectedTags, filterMode);
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
      <PageHeading iconSrc={LibraryIcon}>Library</PageHeading>

      {!libraryData ?
        <img src={Loader} style={{ height: "3rem" }} /> :

        <section className="content-section">
          <div className="controls-container">
            <div className="controls-buttons">
              <TextInput
                label="Search"
                value={searchQuery}
                updateValue={!loading ? setSearchQuery : undefined}
                giveRef={searchInput}
              />
              <Button
              customClass="primary"
                onClick={() => { }}
                disabled={loading}
              >Search</Button>
            </div>

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

          {libraryData.tags && libraryData.tags.length > 0 && <>
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

          {libraryData.tracks.length > 0 && <>
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

            {filteredTracks.length === 0 && <p className="hint" style={{ maxWidth: "unset" }}>
              No tracks match all tags!
            </p>}
          </>}
        </section>}
    </>
  );
}