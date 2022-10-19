import React, { ReactNode } from "react";
import './button.css';

export interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?:string;
  children:ReactNode;
  disabled?:boolean;
}

const Button = (props: ButtonProps) => {
 return <button
    onClick={props.onClick}
    className={props.className}
    disabled={props.disabled}
  >
    {props.children}
  </button>;
};

export default Button;
