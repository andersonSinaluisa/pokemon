import React from "react";
import { render, screen } from "@testing-library/react";
import Button, { ButtonProps } from "./button";

describe("<Button {...props} />", () => {
  const handler = jest.fn();
  const props: ButtonProps = {
    className: "primary",
    children: "Button",
    onClick: handler,
  };
  beforeEach(() => {
    render(<Button {...props} />);
  });
  test("Renderiza un botón", () => {
    const button = screen.getByText("Button");
    expect(button).toBeVisible();
  });

  test("Ejecuta una acción al dar click", () => {
    const button = screen.getByText("Button");
    button.click();

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
