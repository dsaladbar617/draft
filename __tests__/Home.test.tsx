import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("should have a welcome home message", () => {
    render(<Home />);

    const welcomeMessage = screen.getByText("Welcome Home");
    expect(welcomeMessage).toBeInTheDocument();
  });
});
