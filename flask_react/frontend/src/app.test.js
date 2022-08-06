import App from "flask_react/frontend/src";
import { render, screen } from "@testing-library/react";

test("Check if buttons exist", () => {
  render(<App />);
  const linkElement = screen.getByText(/origin/i);
  const linkElement2 = screen.getByText(/destination/i);
  const linkElement3 = screen.getByText(/submit/i);

  expect(linkElement).toBeInTheDocument();
});
