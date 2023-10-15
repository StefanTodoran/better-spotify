import { useEffect, useRef, useState } from "react";
import SectionBreak from "../components/SectionBreak";
import ToggleButton from "../components/ToggleButton";
import PageHeading from "../components/PageHeading";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Track from "../components/Track";
import Tag from "../components/Tag";
import { FilterMode, SearchResult, getFilteredTracks, getRequestOptions } from "../utils";

import LibraryIcon from "../assets/album-icon.svg";
import TagIcon from "../assets/tag-icon.svg";
import TrackIcon from "../assets/playlist-icon.svg";
import { useOutletContext } from "react-router-dom";
import { outletContext } from "../App";
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

    const requestOptions = getRequestOptions("POST", {
      query: searchQuery,
    }, authToken);

    console.log(baseUrl + "api/search", requestOptions);
    fetch(baseUrl + "api/search", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setLibraryData(json);
        console.log("JSON", json);
      })
      .catch(error => {
        console.error("search:", error);
        setLoading(false);
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

  const [selectedTrack, setSelectedTrack] = useState(-1);
  function handleTrackSelection(target: number) {
    console.log(target);
    if (target === selectedTrack) setSelectedTrack(-1);
    else setSelectedTrack(target);
  }

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
              selected={selectedTrack === idx}
              currentlyPlaying={false}
              playPauseCallback={() => { }}
              onClick={() => { handleTrackSelection(idx) }}
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