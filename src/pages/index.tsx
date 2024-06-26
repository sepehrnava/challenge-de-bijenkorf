import Head from "next/head";
import Search from "components/search";
import SearchResult from "components/search/Result";
import LayoutStyles from "styles/Layout.module.scss";
import { useState } from "react";

const Home = () => {
  const [searchResult, setSearchResult] = useState("");

  return (
    <>
      <Head>
        <title>DBK FE Tech Assignment</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, maximum-scale=5, user-scalable=yes, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={LayoutStyles.header} role="banner">
        <Search
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          placeHolder="Zoeken"
        />
      </header>

      <main className={LayoutStyles.main} role="main">
        <SearchResult result={searchResult} />
      </main>
    </>
  );
};

export default Home;
