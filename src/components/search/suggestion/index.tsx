import { useState, useEffect } from "react";
import Icons from "components/Icons";
import { cx, fetchResults } from "../../../lib/utils";
import { ISUGGESTION, ANIMATION_DELAY_STYLE } from "../../../lib/types";
import searchStyles from "styles/Search.module.scss";
import componentsStyles from "styles/Components.module.scss";
import typographyStyles from "styles/Typography.module.scss";
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
            >
              <SearchItem suggestion={suggestion} searchQuery={searchQuery} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SearchSuggestion;
