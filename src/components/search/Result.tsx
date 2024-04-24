import searchStyles from "styles/Search.module.scss";

interface IPROPS {
  result: string;
}
const SearchResult = ({ result }: IPROPS) => {
  return (
    <section
      className={searchStyles["search__result"]}
      aria-labelledby="searchResultTitle"
      tabIndex={0}
    >
      <h1 className={searchStyles["search__result__title"]}>Search Result:</h1>
      <p className={searchStyles["search__result__text"]} role="status">
        {result === ""
          ? `No search results yet. Please enter at least 3 characters in the search box to begin your search.`
          : result}
      </p>
    </section>
  );
};

export default SearchResult;
