import { render, screen } from "@testing-library/react";
import Home from "../index";

describe("home", () => {
  it("should have a default message", () => {
    render(<Home />);

    screen.getByText("Edit index.tsx to get started.");
  });
});
