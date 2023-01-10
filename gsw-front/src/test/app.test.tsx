import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("Check if loads user name", async () => {
    render(<App />);

    expect(screen.queryByText(/Lucas Santana/)).toBeNull();

    expect(await screen.findByText(/Lucas Santana/)).toBeInTheDocument();
  });

  it("Check if there is the button", async () => {
    render(<App />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
