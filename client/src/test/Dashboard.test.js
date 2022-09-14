import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./../Dashboard";
import { render } from "@testing-library/react";

describe("Add Button", () => {
  it("rendered input", () => {
    const { queryByTitle } = render(<Dashboard />);
    const button = queryByTitle("add-button");
    expect(button).toBeTruthy();
  });
});
