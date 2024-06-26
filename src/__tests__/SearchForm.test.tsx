// SearchForm.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "components/search/Form";
import { searchFormProps as props } from "../lib/test-utils";

describe("SearchForm", () => {
  beforeEach(() => {
    render(<SearchForm {...props} />);
  });

  it("input should be initially empty", () => {
    const inputElement = screen.getByRole("searchbox") as HTMLInputElement;
    expect(inputElement.value).toBe("");
  });

  it("input value should update on change", () => {
    const inputElement = screen.getByRole("searchbox");
    fireEvent.change(inputElement, { target: { value: "search query" } });
    expect(props.setSearchQuery).toHaveBeenCalledWith("search query");
  });

  it("should call setActive on input focus", () => {
    const inputElement = screen.getByRole("searchbox");
    fireEvent.focus(inputElement);
  });

  it("should call setActive on input blur", () => {
    const inputElement = screen.getByRole("searchbox");
    fireEvent.blur(inputElement);
  });
});
