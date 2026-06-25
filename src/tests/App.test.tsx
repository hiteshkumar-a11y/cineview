import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders home page", () => {
    render(<App />);

    expect(
      screen.getByText(/home page/i)
    ).toBeInTheDocument();
  });
});