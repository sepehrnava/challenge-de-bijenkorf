import { cx } from "../../../lib/utils";
import { ISUGGESTION, ANIMATION_DELAY_STYLE } from "../../../lib/types";
import searchStyles from "styles/Search.module.scss";
import SearchItem from "components/search/suggestion/Item";

interface IPROPS {
  suggestions: ISUGGESTION[];
  searchQuery: string;
  handleSuggestionClick: (suggestion: ISUGGESTION) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const SearchSuggestion = ({
  suggestions,
  searchQuery,
  handleSuggestionClick,
  activeIndex,
  setActiveIndex,
}: IPROPS) => {
  return (
    <>
      <ul
        className={searchStyles["search__suggestions"]}
        key={suggestions.length}
        id="suggestions-list"
        role="listbox"
      >
        {suggestions.map((suggestion, index) => {
          const isActive = index === activeIndex;
          const customStyle: React.CSSProperties & ANIMATION_DELAY_STYLE = {
            "--animation-delay": `${index * 0.05}s`,
          };

          return (
            <li
              key={index}
              className={cx(searchStyles["search__suggestions__item"], {
                [searchStyles["search__suggestions__item--active"]]: isActive,
              })}
              style={customStyle}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setActiveIndex(index)}
              role="option"
              aria-selected={index === activeIndex}
            >
              <SearchItem suggestion={suggestion} searchQuery={searchQuery} />
            </li>
          );
        })}
      </ul>
      <div
        aria-live="polite"
        aria-atomic="true"
        className={searchStyles["visually-hidden"]}
      >
        {suggestions.length > 0
          ? `${suggestions.length} suggestions found.`
          : "No suggestions found."}
      </div>
    </>
  );
};

export default SearchSuggestion;
