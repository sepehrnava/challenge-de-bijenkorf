import Icons from "components/Icons";
import { cx } from "../../lib/utils";
import { ISUGGESTION } from "../../lib/types";
import searchStyles from "styles/Search.module.scss";
import componentsStyles from "styles/Components.module.scss";

interface IPROPS {
  active: boolean;
  searchQuery: string;
  searchResult: string;
  activeIndex: number;
  error: boolean;
  suggestions: ISUGGESTION[];
  inputRef: React.RefObject<HTMLInputElement>;
  handleClose: () => void;
  setActive: (active: boolean) => void;
  handleKeyDown: (e: { key: string }) => void;
  setSearchQuery: (query: string) => void;
  handleSuggestionClick: (suggestion: ISUGGESTION) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm = ({
  active,
  setActive,
  activeIndex,
  searchQuery,
  searchResult,
  setSearchQuery,
  handleSubmit,
  handleClose,
  inputRef,
  handleKeyDown,
  error,
}: IPROPS) => {
  return (
    <>
      <form
        className={cx(
          searchStyles["search__form"],

          {
            [searchStyles["search__form--submit"]]: searchResult?.length > 0,
          },
          {
            [searchStyles["search__form--active"]]: active,
          }
        )}
        role="search"
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="searchInput"
          className={searchStyles["visually-hidden"]}
        >
          Search
        </label>
        <input
          type="search"
          className={componentsStyles.input}
          placeholder="Zoeken"
          autoComplete="off"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          aria-label="Search"
          aria-autocomplete="list"
          aria-controls="suggestions-list"
          aria-activedescendant={
            activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined
          }
        />

        <button
          type="button"
          className={cx(
            componentsStyles.button,
            componentsStyles["button--icon"],
            { [componentsStyles["button--hidden"]]: !searchQuery }
          )}
          onClick={handleClose}
          aria-label="Close search"
        >
          <Icons name="close" width={12} />
        </button>
        <button
          type="submit"
          className={cx(
            componentsStyles.button,
            componentsStyles["button--icon"],
            { [componentsStyles["button--error"]]: error }
          )}
          aria-label="Submit search"
        >
          <Icons name="search" />
        </button>
        {error && (
          <div
            aria-live="assertive"
            className={searchStyles["visually-hidden"]}
          >
            There was an error fetching the search results.
          </div>
        )}
      </form>
    </>
  );
};

export default SearchForm;
