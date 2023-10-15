import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

enum SearchMode {
  SONG,
  USER,
  TAG,
}

export default function SearchPage({ }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState(SearchMode.SONG);

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
      <div className="buttons-row">
        <div onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter") handleFullSearch();
        }}>
          <TextInput
            label="Search"
            value={searchQuery}
            updateValue={setSearchQuery}
            giveRef={searchInput}
          />
        </div>

        <Button
          customClass="primary"
          onClick={handleFullSearch}
          disabled={!searchQuery || loading}
        >Search</Button>
      </div>
    </>
  );
}