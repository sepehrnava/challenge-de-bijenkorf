import { useState, useEffect, useRef } from "react";
import { cx, fetchResults } from "../../lib/utils";
import { ISUGGESTION } from "../../lib/types";
import searchStyles from "styles/Search.module.scss";
import typographyStyles from "styles/Typography.module.scss";
import SearchSuggestion from "components/search/suggestion";
import SearchForm from "components/search/Form";

interface IPROPS {
  searchResult: string;
  setSearchResult: (query: string) => void;
  placeHolder?: string;
}

const Search = ({
  searchResult,
  setSearchResult,
  placeHolder = "",
}: IPROPS) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [active, setActive] = useState(false);
  const [suggestions, setSuggestions] = useState<ISUGGESTION[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.length > 2) {
        const data = await fetchResults(searchQuery, 1, 4);

        if ("error" in data) {
          setError(true);
          console.error(data.details || data.error);
          setSuggestions([]);
        } else {
          setSuggestions(data.results);
          setError(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    // on submitting form, it's no longer active therefore it will not get any suggestions
    if (active) {
      fetchData();
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!active) {
      setActiveIndex(-1);
      inputRef.current?.blur();
    }
  }, [active]);

  const handleClose = () => {
    setSearchQuery("");
    setActive(false);
    setSuggestions([]);
    setSearchResult("");
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "ArrowDown" && activeIndex < suggestions.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (e.key === "ArrowUp" && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      handleSuggestionClick(suggestions[activeIndex]);
      setActiveIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion: ISUGGESTION) => {
    setActive(false);
    setSuggestions([]);
    setSearchQuery(suggestion.searchterm);
    setSearchResult(suggestion.searchterm);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  return (
    <div className={cx(searchStyles.search, typographyStyles["text-body"])}>
      <SearchForm
        active={active}
        setActive={setActive}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResult={searchResult}
        activeIndex={activeIndex}
        handleSuggestionClick={handleSuggestionClick}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        suggestions={suggestions}
        handleKeyDown={handleKeyDown}
        error={error}
        inputRef={inputRef}
        placeHolder={placeHolder}
      />
      <SearchSuggestion
        suggestions={suggestions}
        searchQuery={searchQuery}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        handleSuggestionClick={handleSuggestionClick}
      />
    </div>
  );
};

export default Search;
