// SearchForm.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "components/search/Form";
import { searchFormProps as props } from "../../../../lib/test-utils";

describe("SearchForm", () => {
  beforeEach(() => {
    render(<SearchForm {...props} />);
  });

  test("input should be initially empty", () => {
    const inputElement = screen.getByRole("searchbox") as HTMLInputElement;
    expect(inputElement.value).toBe("");
  });

  test("input value should update on change", () => {
    const inputElement = screen.getByRole("searchbox");
    fireEvent.change(inputElement, { target: { value: "Python" } });
    expect(props.setSearchQuery).toHaveBeenCalledWith("Python");
  });

  test("should call setActive on input focus", () => {
    const inputElement = screen.getByRole("searchbox");
    fireEvent.focus(inputElement);
  });
});
