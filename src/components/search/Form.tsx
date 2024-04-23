import { useState, useEffect } from "react";
import Icons from "components/Icons";
import { cx, fetchResults } from "../../lib/utils";
import { ISUGGESTION } from "../../lib/types";
import searchStyles from "styles/Search.module.scss";
import componentsStyles from "styles/Components.module.scss";

interface IPROPS {
  active: boolean;
  setActive: (active: boolean) => void;
  searchQuery: string;
  searchResult: string;
  inputRef: React.RefObject<HTMLInputElement>;
  setSearchQuery: (query: string) => void;
  clickClose: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchForm = ({
  active,
  setActive,
  inputRef,
  searchQuery,
  searchResult,
  setSearchQuery,
  handleSubmit,
  clickClose,
  handleKeyDown,
}: IPROPS) => {
  const [error, setError] = useState(false);

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
        <input
          type="search"
          className={componentsStyles.input}
          placeholder="Zoeken"
          autoComplete="off"
          aria-label="Search"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
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
            componentsStyles["button--icon"],
            { [componentsStyles["button--error"]]: error }
          )}
          aria-label="Submit search"
        >
          <Icons name="search" />
        </button>
      </form>
    </>
  );
};

export default SearchForm;
