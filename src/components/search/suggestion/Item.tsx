import { cx } from "../../../lib/utils";
import { ISUGGESTION } from "../../../lib/types";
import searchStyles from "styles/Search.module.scss";

interface IPROPS {
  searchQuery: string;
  suggestion: ISUGGESTION;
}

const SearchSuggestionItem = ({ suggestion, searchQuery }: IPROPS) => {
  const parts = suggestion.searchterm.split(
    new RegExp(`(${searchQuery})`, "gi")
  );
  return (
    <>
      {parts.map((part, index) => (
        <span
          className={cx({
            [searchStyles["search__suggestions__item-active-text"]]:
              part.toLowerCase() === searchQuery.toLowerCase(),
          })}
          key={index}
        >
          {part}
        </span>
      ))}
      &nbsp;
      <span className={searchStyles["search__suggestions__item-active-text"]}>
        ({suggestion.nrResults})
      </span>
    </>
  );
};

export default SearchSuggestionItem;
