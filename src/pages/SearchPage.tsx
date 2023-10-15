import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Dropdown from "../components/DropDown";

enum SearchMode {
  Song,
  User,
  Tag,
};
const SearchModeStrings = Object.keys(SearchMode).filter((el) => { return isNaN(Number(el)) });

export default function SearchPage({ }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");

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

  console.log(Object.keys(SearchMode).filter((el) => { return isNaN(Number(el)) }));
  console.log(Object.keys(SearchMode).filter((el) => { return !isNaN(Number(el)) }));
  console.log(Object.keys(SearchMode).filter((el) => { return !isNaN(Number(el)) }).map(
    (elem) => [elem, SearchMode[parseInt(elem)]]
  ));

  return (
    <>
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

        <Dropdown
          value={searchType}
          updateValue={setSearchType}
          label={"Type"}
          options={(() => {
            const options: { [key: string]: string } = {};
            SearchModeStrings.forEach((mode, idx) => {
              options[idx.toString()] = mode;
            });

            return options;
          })()}
        />

        <Button
          customClass="primary"
          onClick={handleFullSearch}
          disabled={!searchQuery || loading}
        >Search</Button>
      </div>
    </>
  );
}