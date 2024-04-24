import React from "react";
import { ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Search from "../components/search";
import SearchForm from "../components/search/Form";
import SuggestionComponent from "../components/search/suggestion";
import ResultComponent from "../components/search/Result";

export default {
  title: "Components/Search",
};

export const Form = SearchForm.bind({});
Form.args = {
  searchQuery: "",
  active: false,
  error: false,
  placeHolder: "Zoeken",
  handleClose: action("handleClose"),
  setActive: action("setActive"),
  handleKeyDown: action("handleKeyDown"),
  setSearchQuery: action("setSearchQuery"),
  handleSuggestionClick: action("handleSuggestionClick"),
  handleSubmit: action("handleSubmit"),
};

// export const withSuggestion = Search.bind({});
// withSuggestion.args = {
//   placeHolder: "Zoeken",
//   suggestions: [
//     {
//       searchterm: "heren truien",
//       nrResults: 1100,
//     },
//   ],

// };

const suggestionWrapper = (args: any) => {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <SuggestionComponent {...args} />
    </div>
  );
};

export const Suggestion = suggestionWrapper.bind({});
Suggestion.args = {
  searchQuery: "heren truien",
  activeIndex: 0,
  setActiveIndex: action("setActiveIndex"),
  handleSuggestionClick: action("handleSuggestionClick"),
  suggestions: [
    {
      searchterm: "heren truien",
      nrResults: 1100,
    },
    {
      searchterm: "dames truien",
      nrResults: 1501,
    },
    {
      searchterm: "kenzo trui",
      nrResults: 62,
    },
    {
      searchterm: "kenzo trui dames",
      nrResults: 21,
    },
  ],
};

export const Result = ResultComponent.bind({});
Result.args = {
  result: "heren truien",
};
