import { useState, useEffect } from "react";
import Icons from "components/Icons";
import { cx } from "../lib/utils";
import { Suggestion, animationDelayStyle } from "../lib/types";
import searchStyles from "styles/Search.module.scss";
import componentsStyles from "styles/Components.module.scss";
import typographyStyles from "styles/Typography.module.scss";

const Search = () => {
  const [active, setActive] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery.length > 2) {
      fetch(`/api/search?search=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => setSuggestions(data))
        .catch((error) => console.error("Error fetching data: ", error));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const clickClose = () => {
    setSearchQuery("");
    setActive(false);
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion: Suggestion) => {
    const parts = suggestion.searchterm.split(
      new RegExp(`(${searchQuery})`, "gi")
    );
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <span
              key={index}
              style={{
                color: "#939393",
              }}
            >
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
        &nbsp;
        <span
          style={{
            color: "#939393",
          }}
          className={searchStyles["search__suggestions__nrResults"]}
        >
          ({suggestion.nrResults})
        </span>
      </>
    );
  };

  return (
    <div className={cx(searchStyles.search, typographyStyles["text-body"])}>
      <form
        className={cx(searchStyles["search__form"], {
          [searchStyles["searchForm--active"]]: active,
        })}
        role="search"
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="search"
          className={componentsStyles.input}
          placeholder="Zoeken"
          autoComplete="off"
          aria-label="Search"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
          type="button"
          className={cx(
            componentsStyles.button,
            componentsStyles["button--icon"],
            { [componentsStyles["button--hidden"]]: !searchQuery }
          )}
          onClick={clickClose}
          aria-label="Close search"
        >
          <Icons name="close" width={12} />
        </button>
        <button
          type="submit"
          className={cx(
            componentsStyles.button,
            componentsStyles["button--icon"]
          )}
          aria-label="Submit search"
        >
          <Icons name="search" />
        </button>
      </form>
      <ul
        className={searchStyles["search__suggestions"]}
        key={suggestions.length}
      >
        {suggestions.map((suggestion, index) => {
          const customStyle: React.CSSProperties & animationDelayStyle = {
            "--animation-delay": `${index * 0.05}s`,
          };
          return (
            <li
              key={index}
              className={searchStyles["search__suggestions__item"]}
              style={customStyle}
            >
              {renderSuggestion(suggestion)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Search;
