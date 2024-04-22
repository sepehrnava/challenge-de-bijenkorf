import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import Icons from "components/Icons";

import { cx } from "lib/utils";
import { ISEARCH_INPUT } from "lib/types";

import searchStyles from "styles/Search.module.scss";
import componentsStyles from "styles/Components.module.scss";
import typographyStyles from "styles/Typography.module.scss";

const Search = () => {
  const [active, setActive] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = (data: ISEARCH_INPUT) => {
    console.log(data);
  };

  const searchQuery = useWatch({
    control,
    name: "query",
  });

  const clickClose = () => {
    setValue("query", "");
    setActive(false);
  };

  const inputClass = componentsStyles.input;
  const buttonIconClass = cx(
    componentsStyles.button,
    componentsStyles["button--icon"]
  );

  const buttonCloseClass = cx(buttonIconClass, {
    [componentsStyles["button--hidden"]]: !searchQuery,
  });

  return (
    <div className={cx(searchStyles.search, typographyStyles["text-body"])}>
      <form
        className={cx(searchStyles["search__form"], {
          [searchStyles["searchForm--active"]]: active,
        })}
        role="search"
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="search"
          className={inputClass}
          placeholder="Zoeken"
          aria-label="Search"
          {...register("query", { required: true })}
        />

        <button
          type="button"
          className={buttonCloseClass}
          onClick={clickClose}
          aria-label="Close search"
        >
          <Icons name="close" width={12} />
        </button>
        <button
          type="submit"
          className={buttonIconClass}
          aria-label="Submit search"
        >
          <Icons name="search" />
        </button>
      </form>
      <ul className={searchStyles["search__suggestions"]}>
        <li className={searchStyles["search__suggestions__item"]}>Home</li>
        <li className={searchStyles["search__suggestions__item"]}>Over ons</li>
        <li className={searchStyles["search__suggestions__item"]}>
          Onze diensten
        </li>
        <li className={searchStyles["search__suggestions__item"]}>
          Onze partners
        </li>
        <li className={searchStyles["search__suggestions__item"]}>Blog</li>
        <li className={searchStyles["search__suggestions__item"]}>Contact</li>
      </ul>
    </div>
  );
};

export default Search;
