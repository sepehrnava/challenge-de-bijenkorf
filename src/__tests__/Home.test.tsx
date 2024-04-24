import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "pages/index";

describe("home", () => {
  it("should have a header element with search input", () => {
    render(<Home />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Zoeken")).toBeInTheDocument();
  });

  it("should have a main element with search results", () => {
    render(<Home />);
    const main = screen.getByRole("main");
    const status = screen.getByRole("status");
    expect(main).toBeInTheDocument();
    expect(main).toContainElement(screen.getByText("Search Result:"));
    expect(status).toBeInTheDocument();
  });
});
