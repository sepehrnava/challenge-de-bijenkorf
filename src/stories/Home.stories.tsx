import React from "react";
import Home from "pages/index";

// More props and context setup can be added here if needed
export default {
  title: "Components/Search",
  component: Home,
  argTypes: { setSearchResult: { action: "setSearchResult" } },
};

const Template = (args) => <Home {...args} />;

export const Default = Template.bind({});
Default.args = {
  searchResult: "",
  setSearchResult: () => {},
};

export const WithSuggestions = Template.bind({});
WithSuggestions.args = {
  ...Default.args,
  searchResult: "Example",
};
