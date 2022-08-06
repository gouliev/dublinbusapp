import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "/frontend/src/";

describe("Test Search Function", () => {
  test("Search function is working correctly", async () => {
    render(<About />);

    userEvent.type(screen.getByTestId("origin"), "UCD");
    userEvent.click(screen.getByText("origin"));

    expect(screen.getByText("Test")).toBeInTheDocument();

    userEvent.click(screen.getByText("Submit"));
    expect(screen.queryByText("Test")).not.toBeInTheDocument();
  });
});
