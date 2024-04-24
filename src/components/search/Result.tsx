import searchStyles from "styles/Search.module.scss";

interface IPROPS {
  result: string;
}
const SearchResult = ({ result }: IPROPS) => {
  return (
    <div className={searchStyles["search__result"]}>
      <h1 className={searchStyles["search__result__title"]}>Search Result:</h1>
      <p className={searchStyles["search__result__text"]}>
        {result === ""
          ? `No search results yet. Please enter at least 3 characters in the search box to begin your search.`
          : result}
      </p>
    </div>
  );
};

export default SearchResult;
