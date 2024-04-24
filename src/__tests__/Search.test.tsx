import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "pages/index";

const searchQuery = "tru";
const shortSearchQuery = "tr";
const mockSuggestions = [
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
];

describe("Home page", () => {
  beforeEach(() => {
    render(<Home />);
  });

  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: mockSuggestions }),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should update search result state on user input", async () => {
    const inputElement = screen.getByRole("searchbox");
    userEvent.type(inputElement, searchQuery);
    fireEvent.submit(inputElement);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const suggestionElements = await screen.findAllByText(/tru/i);
    expect(suggestionElements.length).toBe(4);

    mockSuggestions.forEach((suggestion) => {
      const parts = suggestion.searchterm.split(
        new RegExp(`(${searchQuery})`, "gi")
      );
      parts.forEach(async (part) => {
        if (part.toLowerCase() === searchQuery.toLowerCase()) {
          expect(await screen.findByText(part)).toBeInTheDocument();
        }
      });
    });
  });

  it("should handle network request failures gracefully", async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ errorMessage: "Server error" }),
      })
    );
    const inputElement = screen.getByRole("searchbox");
    userEvent.type(inputElement, searchQuery);
    fireEvent.submit(inputElement);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByText(/tru/i)).not.toBeInTheDocument();
  });

  it("should show no results when search does not match any suggestions", async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: [] }),
      })
    );
    const inputElement = screen.getByRole("searchbox");
    userEvent.type(inputElement, searchQuery);
    fireEvent.submit(inputElement);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryByText(/tru/i)).not.toBeInTheDocument();
  });

  it("should not perform search when input is less than three characters", async () => {
    const inputElement = screen.getByRole("searchbox");
    userEvent.type(inputElement, shortSearchQuery);
    fireEvent.submit(inputElement);

    expect(fetch).not.toHaveBeenCalled();
    expect(screen.queryByText(/tru/i)).not.toBeInTheDocument();
  });
});
