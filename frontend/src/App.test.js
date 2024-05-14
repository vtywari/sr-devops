import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders the component", () => {
    render(<App />);
    const headerElement = screen.getByText(/Frontend/i);
    expect(headerElement).toBeInTheDocument();
  });

  test("displays initial server response", () => {
    render(<App />);
    const initialResponseElement = screen.getByText(/Server Response:/i);
    expect(initialResponseElement).toBeInTheDocument();
  });
});
