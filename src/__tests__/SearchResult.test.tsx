import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchResult from "components/search/Result";

describe("search result", () => {
  it("should display the default search result message when no input is given", () => {
    const result = "";
    render(<SearchResult result={result} />);
    const defaultMessage =
      "No search results yet. Please enter at least 3 characters in the search box to begin your search.";
    expect(screen.getByText(defaultMessage)).toBeInTheDocument();
  });
  it("when there is a search result, it should display No search results yet", () => {
    const result = "Sample Query";
    render(<SearchResult result={result} />);
    expect(
      screen.queryByText(
        "No search results yet. Please enter at least 3 characters in the search box to begin your search."
      )
    ).not.toBeInTheDocument();
  });
  it("should show the result passed to it", () => {
    const result = "Sample Query";
    render(<SearchResult result={result} />);
    expect(screen.getByText(result)).toBeInTheDocument();
  });
});
