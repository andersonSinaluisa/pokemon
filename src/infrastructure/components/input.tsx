import React from "react";

import './input.css'

export interface InputProps {
  type: string;
  className: string;
  id: string;
  placeholder?: string;
  onChange: any;
  label?: string;
  max?:string;
  min?:string
  name:string
  value?:string
}

const Input = (props: InputProps) => {
  return (
    <div className="input-content">
      {props.label && <label htmlFor={props.id}>{props.label}:</label>}
      <input
        {...props}
      />
    </div>
  );
};
export default Input;