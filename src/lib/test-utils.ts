export const searchFormProps = {
  active: false,
  setActive: jest.fn(),
  searchQuery: "",
  setSearchQuery: jest.fn(),
  searchResult: "",
  activeIndex: -1,
  handleSuggestionClick: jest.fn(),
  handleClose: jest.fn(),
  handleSubmit: jest.fn(),
  suggestions: [],
  handleKeyDown: jest.fn(),
  error: false,
  inputRef: { current: null },
};
