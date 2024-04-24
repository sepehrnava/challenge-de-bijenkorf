import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Home from "pages/index";
import { act } from "react-dom/test-utils";

describe("Accessibility", () => {
  it("should comply with WCAG 2.1 accessibility standards", async () => {
    const { container } = render(<Home />);
    await act(async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
